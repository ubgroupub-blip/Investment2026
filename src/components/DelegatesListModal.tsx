import React, { useState } from 'react';
import { RegistrationData, Language } from '../types';
import { DelegatePass } from './DelegatePass';
import { X, Users, Trash2, Download, Printer, Plus, FileSpreadsheet, Check, Cloud } from 'lucide-react';

interface DelegatesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: RegistrationData[];
  onDeleteRegistration: (id: string) => void;
  onOpenNewRegister: () => void;
  language: Language;
}

export const DelegatesListModal: React.FC<DelegatesListModalProps> = ({
  isOpen,
  onClose,
  registrations,
  onDeleteRegistration,
  onOpenNewRegister,
  language,
}) => {
  const [selectedDelegate, setSelectedDelegate] = useState<RegistrationData | null>(null);
  const [showDriveSync, setShowDriveSync] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState(false);

  if (!isOpen) return null;

  const t = {
    en: {
      title: 'Registered Delegates & Sync Records',
      subtitle: `${registrations.length} confirmed delegates`,
      downloadExcel: 'Download Excel (.xlsx)',
      downloadCsv: 'Download CSV',
      googleDriveSync: 'Google Drive Sync',
      emptyTitle: 'No registered delegates yet.',
      emptyDesc: 'New submissions will appear here and sync to Google Drive / Excel automatically.',
      registerBtn: 'Register First Delegate',
      ticket: 'Ticket',
      type: 'Participation Type',
      investment: 'Investment',
      printBadge: 'Badge',
      deletePrompt: 'Delete registration',
      close: 'Close',
      addAnother: 'Register Another Delegate',
      backToList: 'Back to delegates list',
      formulaTitle: 'Live Google Sheets & Drive Integration',
      formulaDesc: 'Paste this formula into cell A1 of any Google Spreadsheet in your Google Drive to auto-populate and stream registrations in real time:',
      copyFormula: 'Copy Google Sheets Formula',
      copied: 'Formula Copied!',
    },
    zh: {
      title: '参会代表名单与数据同步',
      subtitle: `已确认 ${registrations.length} 位参会代表`,
      downloadExcel: '下载 Excel 表格 (.xlsx)',
      downloadCsv: '下载 CSV 数据',
      googleDriveSync: 'Google Drive 实时表格同步',
      emptyTitle: '暂无注册代表记录',
      emptyDesc: '新提交的信息将自动在此显示并实时同步至 Google Drive 与 Excel。',
      registerBtn: '注册首位代表',
      ticket: '入场编号',
      type: '参会类型',
      investment: '预计投资',
      printBadge: '通行证',
      deletePrompt: '删除记录',
      close: '关闭',
      addAnother: '新增参会代表',
      backToList: '返回代表名单',
      formulaTitle: 'Google Drive / 谷歌云端表格实时同步',
      formulaDesc: '将以下公式直接粘贴至 Google Drive 新建表格的 A1 单元格，即可实时自动拉取与同步参会数据：',
      copyFormula: '复制 Google 表格同步公式',
      copied: '已成功复制公式！',
    },
    ja: {
      title: '登録代表者リスト＆データ同期',
      subtitle: `確認済み代表者 ${registrations.length} 名`,
      downloadExcel: 'Excel形式でダウンロード (.xlsx)',
      downloadCsv: 'CSVダウンロード',
      googleDriveSync: 'Google Drive 連携・自動同期',
      emptyTitle: '登録された代表者はまだいません',
      emptyDesc: '新規登録はここに表示され、Google Drive / Excel に即座に記録・同期されます。',
      registerBtn: '最初の代表者を登録する',
      ticket: 'チケット番号',
      type: '参加区分',
      investment: '想定投資額',
      printBadge: 'パス表示',
      deletePrompt: '登録削除',
      close: '閉じる',
      addAnother: '新規代表者を登録する',
      backToList: 'リストに戻る',
      formulaTitle: 'Google Drive / スプレッドシート リアルタイム連携',
      formulaDesc: 'Google Drive のスプレッドシート A1 セルに以下の関数を貼り付けると、最新の登録リストがリアルタイムで自動同期されます：',
      copyFormula: 'Google Sheets 連携関数をコピー',
      copied: 'コピー完了！',
    },
  }[language];

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const sheetsFormula = `=IMPORTDATA("${origin}/api/export/csv")`;

  const handleCopyFormula = () => {
    navigator.clipboard.writeText(sheetsFormula);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in duration-200">
        
        {/* Top Tricolor Accent */}
        <div className="h-1.5 w-full flex">
          <div className="h-full w-1/3 bg-[#C41E3A]" />
          <div className="h-full w-1/3 bg-[#0055A5]" />
          <div className="h-full w-1/3 bg-[#C41E3A]" />
        </div>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-base">
                {t.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {registrations.length > 0 && (
              <>
                <a
                  href="/api/export/excel"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition cursor-pointer"
                  title="Download .xlsx file"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Excel (.xlsx)</span>
                </a>

                <button
                  onClick={() => setShowDriveSync(!showDriveSync)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 transition cursor-pointer"
                >
                  <Cloud className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t.googleDriveSync}</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer ml-auto sm:ml-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Google Drive / Sheets Live Sync Helper */}
        {showDriveSync && (
          <div className="p-4 bg-[#0a1224] border-b border-blue-900/60 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-300 flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-blue-400" />
                {t.formulaTitle}
              </span>
              <button
                onClick={() => setShowDriveSync(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {t.formulaDesc}
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300 select-all overflow-x-auto">
              {sheetsFormula}
            </div>
            <div>
              <button
                onClick={handleCopyFormula}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer"
              >
                {copiedFormula ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copiedFormula ? t.copied : t.copyFormula}</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 max-h-[65vh] overflow-y-auto">
          {selectedDelegate ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedDelegate(null)}
                className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← {t.backToList}
              </button>
              <DelegatePass
                registration={selectedDelegate}
                language={language}
                onClose={() => setSelectedDelegate(null)}
              />
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-300 text-sm font-semibold">{t.emptyTitle}</p>
              <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">{t.emptyDesc}</p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewRegister();
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-amber-500 text-white transition cursor-pointer shadow"
              >
                <Plus className="w-4 h-4" />
                <span>{t.registerBtn}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{reg.fullName}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold">
                        {reg.ticketNumber}
                      </span>
                      {reg.investmentAmount && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          ${reg.investmentAmount} USD
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-300">
                      {reg.jobTitle ? `${reg.jobTitle} • ` : ''}
                      <span className="text-blue-400 font-semibold">{reg.organization}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap">
                      <span>{reg.email}</span>
                      <span>•</span>
                      <span>{reg.phone}</span>
                      <span>•</span>
                      <span className="text-amber-400/90 font-medium">{reg.participationType}</span>
                    </div>

                    {reg.sectorsOfInterest && (
                      <div className="text-[11px] text-slate-500 pt-0.5">
                        <span className="text-slate-400 font-semibold">Sectors:</span> {reg.sectorsOfInterest}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setSelectedDelegate(reg)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 transition cursor-pointer flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{t.printBadge}</span>
                    </button>
                    <button
                      onClick={() => onDeleteRegistration(reg.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                      title={t.deletePrompt}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenNewRegister();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addAnother}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};
