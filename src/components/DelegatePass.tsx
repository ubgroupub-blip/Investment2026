import React from 'react';
import { RegistrationData, Language } from '../types';
import { EventLogo } from './EventLogo';
import { Soyombo } from './Soyombo';
import { Printer, CheckCircle, Building, Briefcase } from 'lucide-react';

interface DelegatePassProps {
  registration: RegistrationData;
  language: Language;
  onClose?: () => void;
}

export const DelegatePass: React.FC<DelegatePassProps> = ({
  registration,
  language,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const getEventTitle = () => {
    if (language === 'zh') return '推进投资 · 加速发展';
    if (language === 'ja') return '投資の推進 · 発展の加速';
    return 'Advancing Investment, Accelerating Development';
  };

  const getSubtitle = () => {
    if (language === 'zh') return '官方国际峰会与游牧文化盛典 · 2026';
    if (language === 'ja') return '公式国際フォーラム＆遊牧文化体験 · 2026';
    return 'High-Level Forum & Cultural Program · 2026';
  };

  const getPassLabel = () => {
    if (language === 'zh') return '官方特邀贵宾通告证';
    if (language === 'ja') return '公式デリゲート・入場パス';
    return 'Official Delegate Pass';
  };

  return (
    <div className="w-full max-w-md mx-auto print:max-w-none">
      <div
        id="delegate-badge-card"
        className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl border-2 border-amber-500/50 shadow-2xl shadow-black/80 overflow-hidden print:border-black print:text-black print:bg-white"
      >
        {/* Top Mongolian National Tricolor Ribbon */}
        <div className="h-2.5 w-full flex">
          <div className="h-full w-1/3 bg-[#C41E3A]" />
          <div className="h-full w-1/3 bg-[#0055A5]" />
          <div className="h-full w-1/3 bg-[#C41E3A]" />
        </div>

        {/* Header */}
        <div className="p-6 text-center border-b border-slate-800/80 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Soyombo className="w-48 h-48" fill="#FFD700" />
          </div>

          <div className="flex justify-center mb-3">
            <EventLogo variant="pass" className="h-14 w-auto max-w-[150px] ring-1 ring-amber-400/40" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider mb-1.5">
            <Soyombo className="w-2 h-3" fill="#FBBF24" />
            <span>{getPassLabel()}</span>
          </div>

          <h3 className="text-base font-extrabold text-white tracking-tight">
            {getEventTitle()}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {getSubtitle()}
          </p>
          <p className="text-[11px] text-amber-400 font-mono mt-1">
            2026.09.21 – 09.22 • Ulaanbaatar, Mongolia
          </p>
        </div>

        {/* Delegate Information Body */}
        <div className="p-6 space-y-4">
          <div className="text-center py-3 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
              {language === 'zh' ? '参会贵宾' : language === 'ja' ? '登録者氏名' : 'Confirmed Delegate'}
            </div>
            <div className="text-xl font-extrabold text-white tracking-tight">
              {registration.fullName}
            </div>
            {registration.jobTitle && (
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                {registration.jobTitle}
              </div>
            )}
            <div className="text-xs text-blue-400 font-semibold mt-0.5 flex items-center justify-center gap-1">
              <Building className="w-3.5 h-3.5" />
              <span>{registration.organization}</span>
            </div>
          </div>

          {/* Pass Details Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">
                {language === 'zh' ? '入场编号' : language === 'ja' ? 'チケット番号' : 'Ticket No.'}
              </div>
              <div className="font-mono font-bold text-amber-300 text-xs mt-0.5">
                {registration.ticketNumber}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">
                {language === 'zh' ? '状态' : language === 'ja' ? 'ステータス' : 'Status'}
              </div>
              <div className="font-semibold text-emerald-400 flex items-center gap-1 text-xs mt-0.5">
                <CheckCircle className="w-3 h-3" />
                <span>{language === 'zh' ? '已确认审核' : language === 'ja' ? '確認済み' : 'Confirmed'}</span>
              </div>
            </div>

            <div className="col-span-2 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">
                {language === 'zh' ? '参与类别' : language === 'ja' ? '参加区分' : 'Participation Type'}
              </div>
              <div className="font-bold text-slate-200 text-xs mt-0.5">
                {registration.participationType || 'Full Event (Day 1 & Day 2)'}
              </div>
            </div>

            {registration.investmentAmount && (
              <div className="col-span-2 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">
                  {language === 'zh' ? '预计投资规模' : language === 'ja' ? '想定投資規模' : 'Indicative Investment'}:
                </span>
                <span className="font-mono font-bold text-amber-400 text-xs">
                  ${registration.investmentAmount} USD
                </span>
              </div>
            )}
          </div>

          {/* QR Code */}
          <div className="pt-2 flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white rounded-2xl shadow-inner flex flex-col items-center">
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-black">
                <rect x="5" y="5" width="28" height="28" fill="black" />
                <rect x="9" y="9" width="20" height="20" fill="white" />
                <rect x="13" y="13" width="12" height="12" fill="black" />

                <rect x="67" y="5" width="28" height="28" fill="black" />
                <rect x="71" y="9" width="20" height="20" fill="white" />
                <rect x="75" y="13" width="12" height="12" fill="black" />

                <rect x="5" y="67" width="28" height="28" fill="black" />
                <rect x="9" y="71" width="20" height="20" fill="white" />
                <rect x="13" y="75" width="12" height="12" fill="black" />

                <rect x="36" y="17" width="28" height="4" fill="black" />
                <rect x="17" y="36" width="4" height="28" fill="black" />

                <rect x="40" y="40" width="8" height="8" fill="black" />
                <rect x="52" y="40" width="8" height="8" fill="black" />
                <rect x="40" y="52" width="8" height="8" fill="black" />
                <rect x="52" y="52" width="16" height="8" fill="black" />
                <rect x="40" y="68" width="8" height="12" fill="black" />
                <rect x="52" y="68" width="12" height="8" fill="black" />
                <rect x="72" y="40" width="8" height="16" fill="black" />
                <rect x="84" y="40" width="8" height="8" fill="black" />
                <rect x="72" y="64" width="16" height="8" fill="black" />
                <rect x="80" y="76" width="12" height="16" fill="black" />
                <rect x="40" y="84" width="16" height="8" fill="black" />
              </svg>
            </div>
            <span className="font-mono text-[10px] text-slate-400 uppercase">
              SCAN AT ENTRANCE • OFFICIAL RECEPTION PASS
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'zh' ? '打印通行证' : language === 'ja' ? 'パスを印刷' : 'Print Pass'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition cursor-pointer"
            >
              {language === 'zh' ? '关闭' : language === 'ja' ? '閉じる' : 'Close'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
