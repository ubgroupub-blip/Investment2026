import React, { useState, useMemo } from 'react';
import { DayProgram, Language, ProgramItem, SessionCategory } from '../types';
import { 
  Clock, 
  MapPin, 
  User, 
  Search, 
  CalendarPlus, 
  Printer, 
  Share2,
  Check,
  Briefcase,
  Trophy,
} from 'lucide-react';

interface ProgramViewProps {
  days: DayProgram[];
  activeDayId: 'day1' | 'day2';
  onSelectDay: (dayId: 'day1' | 'day2') => void;
  language: Language;
  onOpenRegister: () => void;
}

export const ProgramView: React.FC<ProgramViewProps> = ({
  days,
  activeDayId,
  onSelectDay,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SessionCategory>('all');
  const [copiedDay, setCopiedDay] = useState(false);

  const activeDay = useMemo(() => {
    return days.find((d) => d.dayId === activeDayId) || days[0];
  }, [days, activeDayId]);

  const categories = useMemo(() => {
    if (language === 'zh') {
      return [
        { key: 'all' as SessionCategory, label: '全部日程' },
        { key: 'remarks' as SessionCategory, label: '开幕与致辞' },
        { key: 'keynote' as SessionCategory, label: '主旨与推介' },
        { key: 'showcase' as SessionCategory, label: '项目与洽谈室' },
        { key: 'culture' as SessionCategory, label: '文化与那达慕' },
        { key: 'networking' as SessionCategory, label: '午宴与茶歇' },
      ];
    }
    if (language === 'ja') {
      return [
        { key: 'all' as SessionCategory, label: '全プログラム' },
        { key: 'remarks' as SessionCategory, label: '開会挨拶' },
        { key: 'keynote' as SessionCategory, label: '基調講演・発表' },
        { key: 'showcase' as SessionCategory, label: 'プロジェクト・商談' },
        { key: 'culture' as SessionCategory, label: '文化・ナーダム' },
        { key: 'networking' as SessionCategory, label: '昼食・ネットワーキング' },
      ];
    }
    return [
      { key: 'all' as SessionCategory, label: 'All Sessions' },
      { key: 'remarks' as SessionCategory, label: 'Opening Remarks' },
      { key: 'keynote' as SessionCategory, label: 'Keynotes & Presentations' },
      { key: 'showcase' as SessionCategory, label: 'Projects & Deal Room' },
      { key: 'culture' as SessionCategory, label: 'Culture & Mini Naadam' },
      { key: 'networking' as SessionCategory, label: 'Dining & Networking' },
    ];
  }, [language]);

  const filteredSchedule = useMemo(() => {
    return activeDay.schedule.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'keynote' && !['keynote', 'presentation', 'discussion'].includes(item.category)) {
          return false;
        }
        if (selectedCategory === 'showcase' && item.category !== 'showcase') {
          return false;
        }
        if (selectedCategory === 'remarks' && item.category !== 'remarks') {
          return false;
        }
        if (selectedCategory === 'culture' && item.category !== 'culture') {
          return false;
        }
        if (selectedCategory === 'networking' && item.category !== 'networking') {
          return false;
        }
      }

      // Search match across languages
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.time.toLowerCase().includes(q) ||
        item.titleEn.toLowerCase().includes(q) ||
        item.titleZh.toLowerCase().includes(q) ||
        item.titleJa.toLowerCase().includes(q) ||
        item.detailsEn.toLowerCase().includes(q) ||
        item.detailsZh.toLowerCase().includes(q) ||
        item.detailsJa.toLowerCase().includes(q) ||
        (item.speakerEn && item.speakerEn.toLowerCase().includes(q)) ||
        (item.speakerZh && item.speakerZh.toLowerCase().includes(q)) ||
        (item.speakerJa && item.speakerJa.toLowerCase().includes(q))
      );
    });
  }, [activeDay, selectedCategory, searchQuery]);

  const handleDownloadCalendar = () => {
    const icsData = generateIcs(activeDay, language);
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${activeDay.dayId}-program-schedule.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedDay(true);
    setTimeout(() => setCopiedDay(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getDayTitle = (day: DayProgram) => {
    if (language === 'zh') return day.titleZh;
    if (language === 'ja') return day.titleJa;
    return day.titleEn;
  };

  const getDayDate = (day: DayProgram) => {
    if (language === 'zh') return day.dateDisplayZh;
    if (language === 'ja') return day.dateDisplayJa;
    return day.dateDisplayEn;
  };

  const getDaySubtitle = (day: DayProgram) => {
    if (language === 'zh') return day.subtitleZh;
    if (language === 'ja') return day.subtitleJa;
    return day.subtitleEn;
  };

  const getDayVenue = (day: DayProgram) => {
    if (language === 'zh') return day.venueZh;
    if (language === 'ja') return day.venueJa;
    return day.venueEn;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Day Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        
        {/* Navigation Tabs for Day 1 and Day 2 */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
          <button
            id="tab-day1"
            onClick={() => onSelectDay('day1')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeDayId === 'day1'
                ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md shadow-blue-950/60 ring-1 ring-blue-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-blue-200 font-mono">Day 1 • 09/21</div>
              <div className="text-xs sm:text-sm font-bold">
                {language === 'zh' ? '投资论坛与PPP合作' : language === 'ja' ? '投資フォーラム＆PPP' : 'Investment Conference'}
              </div>
            </div>
          </button>

          <button
            id="tab-day2"
            onClick={() => onSelectDay('day2')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeDayId === 'day2'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-950/60 ring-1 ring-amber-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-amber-200 font-mono">Day 2 • 09/22</div>
              <div className="text-xs sm:text-sm font-bold">
                {language === 'zh' ? '游牧文化与迷你那达慕' : language === 'ja' ? '文化体験＆ミニ・ナーダム' : 'Culture & Mini Naadam'}
              </div>
            </div>
          </button>
        </div>

        {/* Action utilities */}
        <div className="flex items-center gap-2">
          <button
            id="btn-calendar-export"
            onClick={handleDownloadCalendar}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition cursor-pointer"
            title="iCalendar (.ics)"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'zh' ? '添加至日历 (.ics)' : language === 'ja' ? 'カレンダーに追加 (.ics)' : 'Add to Calendar'}</span>
          </button>

          <button
            id="btn-print-program"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition cursor-pointer"
            title="Print"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{language === 'zh' ? '打印日程' : language === 'ja' ? '印刷' : 'Print'}</span>
          </button>

          <button
            id="btn-share-program"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition cursor-pointer"
            title="Share link"
          >
            {copiedDay ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">
              {copiedDay
                ? (language === 'zh' ? '已复制' : language === 'ja' ? 'コピー完了' : 'Copied')
                : (language === 'zh' ? '分享' : language === 'ja' ? '共有' : 'Share')}
            </span>
          </button>
        </div>
      </div>

      {/* Active Day Meta Header */}
      <div className="mt-6 mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden shadow-lg">
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${activeDayId === 'day1' ? 'bg-blue-600' : 'bg-amber-500'}`} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase font-mono ${
                activeDayId === 'day1' 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {activeDay.dayId === 'day1' ? 'Day 1 • 08:30–15:00' : 'Day 2 • 10:30–18:30'}
              </span>
              <span className="text-sm font-semibold text-slate-300">
                {getDayDate(activeDay)}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {getDayTitle(activeDay)}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400">
              {getDaySubtitle(activeDay)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-2 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700/60">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{getDayVenue(activeDay)}</span>
            </div>
            <span className="text-slate-400 font-medium">
              {filteredSchedule.length} {language === 'zh' ? '个日程节点' : language === 'ja' ? 'プログラム掲載' : 'sessions listed'}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="program-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'zh'
                ? '搜索议题、发言嘉宾或关键词...'
                : language === 'ja'
                ? 'セッション、登壇者、キーワード検索...'
                : 'Search session or speaker...'
            }
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-slate-700 text-white border border-slate-600 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Program Schedule List */}
      <div className="space-y-3">
        {filteredSchedule.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/50 rounded-2xl border border-slate-800/80">
            <p className="text-slate-400 text-sm">
              {language === 'zh'
                ? '未找到符合条件的日程安排。'
                : language === 'ja'
                ? '該当するセッションが見つかりませんでした。'
                : 'No sessions match your search criteria.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-blue-400 hover:underline cursor-pointer"
            >
              {language === 'zh' ? '重置筛选条件' : language === 'ja' ? 'フィルターをリセット' : 'Reset filters'}
            </button>
          </div>
        ) : (
          filteredSchedule.map((item) => {
            return (
              <ProgramCard
                key={item.id}
                item={item}
                language={language}
              />
            );
          })
        )}
      </div>

    </section>
  );
};

interface ProgramCardProps {
  item: ProgramItem;
  language: Language;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ item, language }) => {
  const getTitle = () => {
    if (language === 'zh') return item.titleZh;
    if (language === 'ja') return item.titleJa;
    return item.titleEn;
  };

  const getSpeaker = () => {
    if (language === 'zh') return item.speakerZh || item.speakerEn;
    if (language === 'ja') return item.speakerJa || item.speakerEn;
    return item.speakerEn;
  };

  const getDetails = () => {
    if (language === 'zh') return item.detailsZh;
    if (language === 'ja') return item.detailsJa;
    return item.detailsEn;
  };

  return (
    <div
      id={item.id}
      className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700/90 transition-all shadow-sm group"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
        
        {/* Time Column */}
        <div className="md:w-36 shrink-0 flex items-center md:items-start gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 group-hover:bg-slate-700 text-amber-400 border border-slate-700/60">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{item.time}</span>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 space-y-1.5">
          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
            {getTitle()}
          </h4>

          {/* Speaker / Institution */}
          {getSpeaker() && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200">
              <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{getSpeaker()}</span>
            </div>
          )}

          {/* Details */}
          <div className="text-xs text-slate-400 leading-relaxed pt-0.5">
            {getDetails()}
          </div>
        </div>

        {/* Category Pill */}
        <div className="md:w-28 shrink-0 flex md:justify-end items-center">
          <CategoryPill category={item.category} language={language} />
        </div>

      </div>
    </div>
  );
};

const CategoryPill: React.FC<{ category: SessionCategory; language: Language }> = ({ category, language }) => {
  switch (category) {
    case 'remarks':
      return (
        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {language === 'zh' ? '致辞发言' : language === 'ja' ? '開会挨拶' : 'Opening'}
        </span>
      );
    case 'keynote':
    case 'presentation':
      return (
        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {language === 'zh' ? '主旨演讲' : language === 'ja' ? '基調講演' : 'Keynote'}
        </span>
      );
    case 'discussion':
      return (
        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          {language === 'zh' ? '圆桌论坛' : language === 'ja' ? 'パネル' : 'Panel'}
        </span>
      );
    case 'showcase':
      return (
        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          {language === 'zh' ? '项目洽谈' : language === 'ja' ? 'ディール' : 'Deal Room'}
        </span>
      );
    case 'culture':
      return (
        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          {language === 'zh' ? '那达慕文化' : language === 'ja' ? '文化・ナーダム' : 'Culture'}
        </span>
      );
    case 'networking':
      return (
        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
          {language === 'zh' ? '午宴交流' : language === 'ja' ? '昼食・交流' : 'Networking'}
        </span>
      );
    default:
      return null;
  }
};

function generateIcs(day: DayProgram, language: Language): string {
  const getTitle = (item: ProgramItem) => {
    if (language === 'zh') return item.titleZh;
    if (language === 'ja') return item.titleJa;
    return item.titleEn;
  };
  const getVenue = () => {
    if (language === 'zh') return day.venueZh;
    if (language === 'ja') return day.venueJa;
    return day.venueEn;
  };

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Advancing Investment Program//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${day.titleEn}`,
  ];

  day.schedule.forEach((item) => {
    ics.push('BEGIN:VEVENT');
    ics.push(`UID:${item.id}-202609@advancing-investment.mn`);
    ics.push(`SUMMARY:${getTitle(item)}`);
    ics.push(`DESCRIPTION:${item.detailsEn}`);
    ics.push(`LOCATION:${getVenue()}`);
    ics.push('STATUS:CONFIRMED');
    ics.push('END:VEVENT');
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}
