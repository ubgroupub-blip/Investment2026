import { RegistrationData } from '../types';

export const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycby6LrkJuY07tbFdFCDj_W0tJsTtPxuOsdEOc8N5kLkQ7BGskVO0g1wfzm0cAJLTrLLVSw/exec';

export interface SubmitRegistrationInput {
  fullName: string;
  organization: string;
  jobTitle?: string;
  participationType: string;
  email: string;
  phone?: string;
  investmentAmount?: string;
  sectorsOfInterest?: string;
  additionalNotes?: string;
  attendingDays?: 'both' | 'day1' | 'day2';
}

/**
 * Submits registration data directly to the Google Sheets Apps Script Webhook.
 * Compatible with Vercel static deployments and full-stack environments.
 * Non-blocking: will never crash or prevent user confirmation if webhook times out.
 */
export async function submitRegistration(
  input: SubmitRegistrationInput
): Promise<RegistrationData> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const code =
    input.participationType && input.participationType.toLowerCase().includes('day 1')
      ? 'D1'
      : input.participationType && input.participationType.toLowerCase().includes('day 2')
      ? 'D2'
      : 'ADV';

  const record: RegistrationData = {
    id: `reg-${Date.now()}`,
    ticketNumber: `${code}-2026-${randomSuffix}`,
    fullName: input.fullName.trim(),
    organization: input.organization.trim(),
    jobTitle: (input.jobTitle || '').trim(),
    participationType: (input.participationType || 'Full Event (Day 1 & Day 2)').trim(),
    email: input.email.trim(),
    phone: (input.phone || '').trim(),
    investmentAmount: input.investmentAmount ? input.investmentAmount.trim() : '',
    sectorsOfInterest: input.sectorsOfInterest ? input.sectorsOfInterest.trim() : '',
    additionalNotes: input.additionalNotes ? input.additionalNotes.trim() : '',
    attendingDays: input.attendingDays || 'both',
    registeredAt: new Date().toISOString(),
  };

  // 1. Immediately send full registration data to Google Sheets Apps Script Webhook
  try {
    const formData = new FormData();
    // Stringified payload (standard Apps Script webhook pattern)
    formData.append('payload', JSON.stringify(record));
    // Exact form field titles requested by user
    formData.append('Full name', record.fullName);
    formData.append('Organization', record.organization);
    formData.append('Job title', record.jobTitle);
    formData.append('Participation type', record.participationType);
    formData.append('Email', record.email);
    formData.append('Phone', record.phone);
    formData.append('Investment amount (USD)', record.investmentAmount || '');
    formData.append('Sectors of interest', record.sectorsOfInterest || '');
    formData.append('Additional notes', record.additionalNotes || '');
    // Standard camelCase fields for code access
    formData.append('ticketNumber', record.ticketNumber);
    formData.append('fullName', record.fullName);
    formData.append('organization', record.organization);
    formData.append('jobTitle', record.jobTitle);
    formData.append('participationType', record.participationType);
    formData.append('email', record.email);
    formData.append('phone', record.phone);
    formData.append('investmentAmount', record.investmentAmount || '');
    formData.append('sectorsOfInterest', record.sectorsOfInterest || '');
    formData.append('additionalNotes', record.additionalNotes || '');
    formData.append('attendingDays', record.attendingDays || 'both');
    formData.append('registeredAt', record.registeredAt);

    // Give the Google Sheets webhook 4 seconds to complete without blocking the user
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
      signal: controller.signal,
    }).catch((err) => {
      // Soft notice without throwing
      console.warn('Google Sheets sync dispatch notice:', err);
    });

    clearTimeout(timeoutId);
  } catch (err) {
    console.warn('Google Sheets sync non-blocking catch:', err);
  }

  // 2. Direct Google Drive / Google Sheets API append if user authorized OAuth
  try {
    const { appendRegistrationToGoogleSheet } = await import('./googleSheetsService');
    await appendRegistrationToGoogleSheet(record).catch((err) => {
      console.warn('Google Drive direct append notice:', err);
    });
  } catch (err) {
    console.warn('Google Sheets direct service notice:', err);
  }

  // 3. Optional local server dispatch when running with Express backend
  // Note: on Vercel static builds, this harmlessly fails and is safely caught.
  try {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-synced': 'true',
      },
      body: JSON.stringify(record),
    }).catch(() => {
      // Ignore static environment fallbacks
    });
  } catch {
    // Ignore
  }

  return record;
}
