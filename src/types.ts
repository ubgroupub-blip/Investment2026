export type Language = 'en' | 'zh' | 'ja';

export type SessionCategory = 
  | 'all'
  | 'remarks'
  | 'keynote'
  | 'presentation'
  | 'discussion'
  | 'networking'
  | 'showcase'
  | 'culture';

export interface ProgramItem {
  id: string;
  time: string;
  titleEn: string;
  titleZh: string;
  titleJa: string;
  speakerEn?: string;
  speakerZh?: string;
  speakerJa?: string;
  detailsEn: string;
  detailsZh: string;
  detailsJa: string;
  category: SessionCategory;
  isSpecialHighlight?: boolean;
  location?: string;
}

export interface DayProgram {
  dayId: 'day1' | 'day2';
  dateStr: string;
  dateDisplayEn: string;
  dateDisplayZh: string;
  dateDisplayJa: string;
  titleEn: string;
  titleZh: string;
  titleJa: string;
  subtitleEn: string;
  subtitleZh: string;
  subtitleJa: string;
  venueEn: string;
  venueZh: string;
  venueJa: string;
  schedule: ProgramItem[];
}

export interface RegistrationData {
  id: string;
  fullName: string;
  organization: string;
  jobTitle: string;
  participationType: string;
  email: string;
  phone: string;
  investmentAmount?: string;
  sectorsOfInterest?: string;
  additionalNotes?: string;
  attendingDays?: 'both' | 'day1' | 'day2';
  registeredAt: string;
  ticketNumber: string;
}
