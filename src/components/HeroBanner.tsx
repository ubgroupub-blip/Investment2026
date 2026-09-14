import React from 'react';
import { EventLogo } from './EventLogo';
import { Soyombo } from './Soyombo';
import { Language } from '../types';
import { CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  language: Language;
  onOpenRegister: () => void;
  activeDay: 'day1' | 'day2';
  onSelectDay: (day: 'day1' | 'day2') => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  onOpenRegister,
  activeDay,
  onSelectDay,
}) => {
  const t = {
    en: {
      badge: 'Official Program of Mongolia',
      titlePrefix: 'Advancing Investment,',
      titleHighlight: 'Accelerating Development',
      description:
        'A premier 2-day high-level gathering featuring the Prime Minister of Mongolia, Deputy PM, MNCCI leadership, and global institutional investors. Day 1 delivers strategic macroeconomic outlooks, state assets, and B2B/B2G Deal Room transactions. Day 2 offers an immersive nomadic cultural journey and traditional Mini Naadam sports at Chinggis Khaan’s Palace.',
      highlight1: 'Strategic B2B & B2G Deal Rooms',
      highlight2: 'Traditional Bökh, Archery & Horse Racing',
      highlight3: 'Instant Delegate Confirmation & Pass',
      registerCta: 'Register for Event',
      day1Badge: 'DAY 1 • 09/21',
      day1Time: '08:30 – 15:00',
      day1Title: 'Investment Conference & PPP Projects',
      day1Desc: 'Prime Minister keynote, state asset portfolio, investment deal rooms & project showcase.',
      day2Badge: 'DAY 2 • 09/22',
      day2Time: '10:30 – 18:30',
      day2Title: "Chinggis Khaan's Palace Mini Naadam",
      day2Desc: 'Nomadic heritage, traditional wrestling, horse racing showcase, and steppe banquet.',
    },
    zh: {
      badge: '蒙古国官方重点大会日程',
      titlePrefix: '推进投资，',
      titleHighlight: '加速发展',
      description:
        '汇聚蒙古国总理、副总理、国家工商会及全球机构投资领袖的高规格双日盛会。第一天聚焦宏观经济战略、国有核心资产与政企一对一投资对接（Deal Room）；第二天前往成吉思汗行宫沉浸式体验游牧文化瑰宝与专属迷你那达慕传统三大竞技。',
      highlight1: '精准 B2B & B2G 投资对接室',
      highlight2: '搏克摔跤、射箭与骏马奔腾实景表演',
      highlight3: '即时生成参会凭证与数据同步',
      registerCta: '即刻注册参会',
      day1Badge: '第一天 • 09/21',
      day1Time: '08:30 – 15:00',
      day1Title: '投资论坛与重点合作项目推介',
      day1Desc: '国家总理主旨演讲、重大基础设施工程、国有资本投资组合与一对一洽谈。',
      day2Badge: '第二天 • 09/22',
      day2Time: '10:30 – 18:30',
      day2Title: '成吉思汗行宫游牧文化与迷你那达慕',
      day2Desc: '蒙古长袍体验、马头琴合奏、搏克冠军赛、草原骑射与地道草原特色午宴。',
    },
    ja: {
      badge: 'モンゴル国 公式カンファレンス日程',
      titlePrefix: '投資の推進、',
      titleHighlight: '発展の加速',
      description:
        'モンゴル国首相、副首相、商工会議所幹部、および世界各国の機関投資家が集う2日間のハイレベルフォーラム。1日目は国家戦略・国有資産・官民連携（B2B/B2G）の個別商談を実施。2日目はチンギスハーン宮殿にて遊牧文化の精髄と伝統ミニ・ナーダム競技をご体験いただきます。',
      highlight1: '戦略的 B2B / B2G ディールルーム商談',
      highlight2: '伝統相撲（ボフ）、弓術、草原競馬の迫力実演',
      highlight3: '公式入場パス即時発行＆データベース同期',
      registerCta: '今すぐ参加登録',
      day1Badge: 'DAY 1 • 09/21',
      day1Time: '08:30 – 15:00',
      day1Title: '投資フォーラム＆重点官民プロジェクト',
      day1Desc: '首相基調講演、国家重要鉱物ポートフォリオ、プロジェクト路演、個別商談セッション。',
      day2Badge: 'DAY 2 • 09/22',
      day2Time: '10:30 – 18:30',
      day2Title: 'チンギスハーン宮殿 文化体験＆ミニ・ナーダム',
      day2Desc: '伝統デール試着、馬頭琴演奏、草原の相撲大会、競馬パフォーマンス、草原ランチ。',
    },
  }[language];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
      <div className="absolute right-0 top-0 -mt-10 -mr-10 opacity-5 pointer-events-none hidden lg:block">
        <Soyombo className="w-96 h-96" fill="#FFD700" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* National Badge with Event Logo */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 shadow-inner">
              <EventLogo variant="badge" className="h-5 w-auto max-w-[50px] p-0.5 rounded" />
              <span className="font-bold tracking-wide text-amber-300 uppercase">
                {t.badge}
              </span>
              <span className="h-3 w-px bg-slate-700" />
              <span className="text-slate-400 font-mono">2026.09.21 – 09.22</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.titlePrefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-400 to-sky-400">
                {t.titleHighlight}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {t.description}
            </p>

            {/* Quick Feature Highlights */}
            <div className="pt-2 flex flex-wrap gap-4 sm:gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.highlight1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.highlight2}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.highlight3}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                id="hero-register-btn"
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-lg shadow-red-900/40 transition transform active:scale-98 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>{t.registerCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2-Day Selector Cards in Hero */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            
            {/* Day 1 Quick Card */}
            <button
              id="hero-day1-toggle"
              onClick={() => onSelectDay('day1')}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                activeDay === 'day1'
                  ? 'bg-slate-800/90 border-blue-500/60 shadow-lg shadow-blue-950/50 ring-1 ring-blue-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                  {t.day1Badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">{t.day1Time}</span>
              </div>
              <h3 className="font-bold text-white text-sm">
                {t.day1Title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {t.day1Desc}
              </p>
            </button>

            {/* Day 2 Quick Card */}
            <button
              id="hero-day2-toggle"
              onClick={() => onSelectDay('day2')}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                activeDay === 'day2'
                  ? 'bg-slate-800/90 border-amber-500/60 shadow-lg shadow-amber-950/50 ring-1 ring-amber-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  {t.day2Badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">{t.day2Time}</span>
              </div>
              <h3 className="font-bold text-white text-sm">
                {t.day2Title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {t.day2Desc}
              </p>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
