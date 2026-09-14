import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, ExternalLink, CheckCircle2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import {
  getStoredSheetsState,
  requestGoogleAccessToken,
  createRegistrationGoogleSheet,
  GoogleSheetsState,
  SHEET_HEADERS,
} from '../services/googleSheetsService';

export const GoogleSheetSyncPanel: React.FC = () => {
  const [state, setState] = useState<GoogleSheetsState>(getStoredSheetsState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setState(getStoredSheetsState());
  }, []);

  const handleCreateOrConnectSheet = async () => {
    setIsProcessing(true);
    setErrorMessage(null);
    setStatusMessage('Connecting with Google...');

    try {
      // 1. Request access token using Google Identity Services (GSI)
      const token = await requestGoogleAccessToken();
      setStatusMessage('Creating new Google Sheet with delegate columns...');

      // 2. Create the exact spreadsheet via Google Sheets v4 API
      const newSheet = await createRegistrationGoogleSheet(token);

      setState({
        isConnected: true,
        spreadsheetId: newSheet.id,
        spreadsheetUrl: newSheet.url,
      });

      setStatusMessage('Google Sheet created and connected successfully!');
    } catch (err: any) {
      console.error('Google Sheet setup error:', err);
      setErrorMessage(err?.message || 'Failed to authenticate or create Google Sheet');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-5 sm:p-6 rounded-2xl bg-[#0b1325] border border-amber-500/30 text-slate-100 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-base text-white">Google Sheet Live Sync</h4>
              {state.spreadsheetUrl && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Creates a Google Sheet in your Drive with the 9 delegate registration columns.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {state.spreadsheetUrl ? (
            <div className="flex items-center gap-2">
              <a
                href={state.spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition cursor-pointer"
              >
                <span>Open in Google Sheets</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCreateOrConnectSheet}
                disabled={isProcessing}
                title="Create another new sheet"
                className="p-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 transition cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleCreateOrConnectSheet}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg transition cursor-pointer disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating sheet...</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Create Sheet in Google Drive</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {statusMessage && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Columns Preview */}
      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Columns Configured (9 Registration Fields + Ticket + Timestamp):
          </div>
          <a
            href="https://docs.google.com/spreadsheets/create"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
          >
            <span>Or open fresh blank sheet</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SHEET_HEADERS.map((col, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium"
            >
              {col}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
