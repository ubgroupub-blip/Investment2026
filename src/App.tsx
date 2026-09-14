import React, { useState, useEffect } from 'react';
import { Language, RegistrationData } from './types';
import { PROGRAM_DAYS } from './data/programData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProgramView } from './components/ProgramView';
import { RegistrationSection } from './components/RegistrationSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';

const STORAGE_KEY = 'advancing_investment_registrations_v2';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeDayId, setActiveDayId] = useState<'day1' | 'day2'>('day1');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [registrations, setRegistrations] = useState<RegistrationData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
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

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white font-sans antialiased">
      {/* Sticky App Header */}
      <Header
        language={language}
        onSelectLanguage={handleSelectLanguage}
        onOpenRegister={handleOpenRegister}
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

        {/* Registration Section (Form & 3-Step Guide) */}
        <RegistrationSection
          language={language}
          onSuccessRegister={handleSuccessRegister}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenRegister={handleOpenRegister}
      />

      {/* Registration Modal (Fallback & Quick-launch from header) */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        language={language}
        onSuccessRegister={handleSuccessRegister}
      />
    </div>
  );
}
