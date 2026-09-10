import React, { useState, useEffect } from 'react';
import { Language, RegistrationData } from './types';
import { PROGRAM_DAYS } from './data/programData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProgramView } from './components/ProgramView';
import { RegistrationSection } from './components/RegistrationSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { DelegatesListModal } from './components/DelegatesListModal';

const STORAGE_KEY = 'advancing_investment_registrations_v2';

const INITIAL_DEMO_DELEGATES: RegistrationData[] = [
  {
    id: 'reg-seed-01',
    ticketNumber: 'ADV-2026-8812',
    fullName: 'Michael Vance',
    organization: 'Global Infrastructure Partners',
    jobTitle: 'Managing Director',
    participationType: 'Full Event (Day 1 & Day 2)',
    email: 'm.vance@gipartners-demo.com',
    phone: '+1 415-555-0192',
    investmentAmount: '25,000,000',
    sectorsOfInterest: 'Renewable energy, mining logistics, cross-border infrastructure',
    additionalNotes: 'Requesting 1:1 meeting with Ministry of Economy & Erdenes Mongol',
    attendingDays: 'both',
    registeredAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeDayId, setActiveDayId] = useState<'day1' | 'day2'>('day1');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDelegatesOpen, setIsDelegatesOpen] = useState(false);

  const [registrations, setRegistrations] = useState<RegistrationData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_DEMO_DELEGATES;
  });

  // Sync with server on mount
  useEffect(() => {
    fetch('/api/registrations')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.registrations)) {
          setRegistrations(data.registrations);
        }
      })
      .catch(() => {
        // Local fallback in case dev server starts up
      });
  }, []);

  // Save to local storage as backup
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    } catch {
      // ignore
    }
  }, [registrations]);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleOpenRegister = () => {
    const registerEl = document.getElementById('register');
    if (registerEl) {
      registerEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsRegisterOpen(true);
    }
  };

  const handleSuccessRegister = (newReg: RegistrationData) => {
    setRegistrations((prev) => [newReg, ...prev.filter((r) => r.id !== newReg.id)]);
  };

  const handleDeleteRegistration = async (id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
    try {
      await fetch(`/api/registrations/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete on server:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white font-sans antialiased">
      {/* Sticky App Header */}
      <Header
        language={language}
        onSelectLanguage={handleSelectLanguage}
        onOpenRegister={handleOpenRegister}
        onOpenDelegates={() => setIsDelegatesOpen(true)}
        registeredCount={registrations.length}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner with Mongolian Flag & Overview */}
        <HeroBanner
          language={language}
          onOpenRegister={handleOpenRegister}
          activeDay={activeDayId}
          onSelectDay={(day) => setActiveDayId(day)}
        />

        {/* Day 1 & Day 2 Interactive Schedule (Gala & Evening events removed) */}
        <ProgramView
          days={PROGRAM_DAYS}
          activeDayId={activeDayId}
          onSelectDay={(day) => setActiveDayId(day)}
          language={language}
          onOpenRegister={handleOpenRegister}
        />

        {/* Registration Section (Form & 3-Step Guide matching user's uploaded image) */}
        <RegistrationSection
          language={language}
          onSuccessRegister={handleSuccessRegister}
        />
      </main>

      {/* Footer (No Contact/tergel@ubgroup.mn email visible, clean institutional branding) */}
      <Footer
        language={language}
        onOpenRegister={handleOpenRegister}
      />

      {/* Registration Modal (Fallback & Quick-launch from header if desired) */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        language={language}
        onSuccessRegister={handleSuccessRegister}
      />

      {/* Registered Delegates, Excel (.xlsx) Download & Google Drive Live Sync */}
      <DelegatesListModal
        isOpen={isDelegatesOpen}
        onClose={() => setIsDelegatesOpen(false)}
        registrations={registrations}
        onDeleteRegistration={handleDeleteRegistration}
        onOpenNewRegister={() => {
          setIsDelegatesOpen(false);
          handleOpenRegister();
        }}
        language={language}
      />
    </div>
  );
}
