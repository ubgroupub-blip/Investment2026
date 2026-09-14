import React from 'react';
import { EventLogo } from './EventLogo';
import { Soyombo } from './Soyombo';
import { Language } from '../types';
import { UserPlus, MapPin, Globe } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onOpenRegister: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onSelectLanguage,
  onOpenRegister,
}) => {
  const getTitle = () => {
    if (language === 'zh') return '推进投资 · 加速发展';
    if (language === 'ja') return '投資の推進 · 発展の加速';
    return 'Advancing Investment, Accelerating Development';
  };

  const getSubtitle = () => {
    if (language === 'zh') return '乌兰巴托 & 成吉思汗行宫 · 2026年9月21-22日';
    if (language === 'ja') return 'ウランバートル ＆ チンギスハーン宮殿 · 2026年9月21-22日';
    return 'Ulaanbaatar & Chinggis Khaan Palace · Sept 21–22, 2026';
  };

  return (
    <header className="relative w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      {/* Mongolian National Tricolor Accent Bar */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#C41E3A]" />
        <div className="h-full w-1/3 bg-[#0055A5]" />
        <div className="h-full w-1/3 bg-[#C41E3A]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Brand & Flag */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative group shrink-0">
              <EventLogo
                variant="header"
                className="h-10 sm:h-12 w-auto max-w-[140px]"
                alt="MI 2026 - High-Level Investment Dialogue"
              />
              <span className="sr-only">MI 2026 - High-Level Investment Dialogue</span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Soyombo className="w-2.5 h-4 inline-block -mt-0.5" fill="#FBBF24" />
                  09/21 – 09/22
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>{getSubtitle()}</span>
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                {getTitle()}
              </h1>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-end flex-wrap">
            
            {/* Language Switcher: strictly English, Chinese, Japanese */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-700/80 shadow-inner">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
              <button
                id="lang-en"
                onClick={() => onSelectLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                id="lang-zh"
                onClick={() => onSelectLanguage('zh')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  language === 'zh'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                中文
              </button>
              <button
                id="lang-ja"
                onClick={() => onSelectLanguage('ja')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  language === 'ja'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                日本語
              </button>
            </div>

            {/* Primary Registration Button */}
            <button
              id="register-header-btn"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-md shadow-red-900/30 transition transform active:scale-98 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>
                {language === 'zh' ? '参会注册' : language === 'ja' ? '参加登録' : 'Register for Event'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
