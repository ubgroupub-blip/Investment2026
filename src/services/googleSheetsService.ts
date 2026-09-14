/**
 * Google Workspace / Google Sheets direct integration service
 * Uses Google Identity Services (GSI) OAuth token and Google Sheets v4 API
 */

import { RegistrationData } from '../types';

export const GOOGLE_OAUTH_CLIENT_ID = '1059567244483-usi23sti90qt77bd0bt5s9580o7imqgv.apps.googleusercontent.com';
export const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file';
const TOKEN_STORAGE_KEY = 'advancing_inv_google_access_token';
const SPREADSHEET_ID_KEY = 'advancing_inv_spreadsheet_id';
const SPREADSHEET_URL_KEY = 'advancing_inv_spreadsheet_url';

export const SHEET_HEADERS = [
  'Full name *',
  'Organization *',
  'Job title',
  'Participation type *',
  'Email *',
  'Phone *',
  'Investment amount (USD)',
  'Sectors of interest',
  'Additional notes',
  'Ticket number',
  'Registered at',
];

export interface GoogleSheetsState {
  isConnected: boolean;
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
}

export function getStoredSheetsState(): GoogleSheetsState {
  if (typeof window === 'undefined') {
    return { isConnected: false, spreadsheetId: null, spreadsheetUrl: null };
  }
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const spreadsheetId = localStorage.getItem(SPREADSHEET_ID_KEY);
  const spreadsheetUrl = localStorage.getItem(SPREADSHEET_URL_KEY);
  return {
    isConnected: !!token,
    spreadsheetId,
    spreadsheetUrl,
  };
}

/**
 * Prompt user for Google OAuth Token using Google Identity Services (GSI)
 */
export function requestGoogleAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !(window as any).google?.accounts?.oauth2) {
      return reject(new Error('Google Identity Services SDK is not loaded yet. Please refresh the page.'));
    }

    try {
      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_OAUTH_CLIENT_ID,
        scope: SCOPES,
        callback: (response: any) => {
          if (response.error) {
            return reject(new Error(response.error_description || response.error));
          }
          if (response.access_token) {
            localStorage.setItem(TOKEN_STORAGE_KEY, response.access_token);
            resolve(response.access_token);
          } else {
            reject(new Error('No access token returned from Google'));
          }
        },
      });

      client.requestAccessToken();
    } catch (err: any) {
      reject(err);
    }
  });
}

/**
 * Creates a brand new Google Sheet in the connected user's Google Drive
 * with the exact columns requested:
 * Full name * | Organization * | Job title | Participation type * | Email * | Phone * | Investment amount (USD) | Sectors of interest | Additional notes
 */
export async function createRegistrationGoogleSheet(accessToken: string): Promise<{ id: string; url: string }> {
  const title = `Advancing Investment 2026 - Registrations (${new Date().toISOString().split('T')[0]})`;

  // 1. Create Spreadsheet via Google Sheets v4 API
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Registrations',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create Google Sheet (${createRes.status})`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Append Header Row
  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Registrations!A1:K1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [SHEET_HEADERS],
      }),
    }
  );

  if (!appendRes.ok) {
    console.warn('Failed to append header row, continuing with created sheet');
  }

  // Save to local storage
  localStorage.setItem(SPREADSHEET_ID_KEY, spreadsheetId);
  localStorage.setItem(SPREADSHEET_URL_KEY, spreadsheetUrl);

  return { id: spreadsheetId, url: spreadsheetUrl };
}

/**
 * Appends a new delegate row to the user's active Google Sheet
 */
export async function appendRegistrationToGoogleSheet(
  record: RegistrationData,
  accessToken?: string,
  spreadsheetId?: string
): Promise<boolean> {
  const token = accessToken || (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null);
  const targetSheetId = spreadsheetId || (typeof window !== 'undefined' ? localStorage.getItem(SPREADSHEET_ID_KEY) : null);

  if (!token || !targetSheetId) {
    return false;
  }

  const row = [
    record.fullName || '',
    record.organization || '',
    record.jobTitle || '',
    record.participationType || '',
    record.email || '',
    record.phone || '',
    record.investmentAmount || '',
    record.sectorsOfInterest || '',
    record.additionalNotes || '',
    record.ticketNumber || '',
    record.registeredAt || new Date().toISOString(),
  ];

  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${targetSheetId}/values/Registrations!A:K:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [row],
        }),
      }
    );

    if (res.ok) {
      console.log('Successfully recorded into Google Sheet:', targetSheetId);
      return true;
    } else {
      console.warn('Google Sheet append error:', res.status, await res.text());
      return false;
    }
  } catch (err) {
    console.warn('Failed to append row to Google Sheet:', err);
    return false;
  }
}
