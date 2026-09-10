import React from 'react';
import { Language } from '../types';
import { MapPin, Navigation, Bus, Shirt, Clock, ShieldCheck, Sun, Info } from 'lucide-react';
import { MongolianFlag } from './MongolianFlag';

interface VenuesSectionProps {
  language: Language;
}

export const VenuesSection: React.FC<VenuesSectionProps> = ({ language }) => {
  const isMn = language === 'mn';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800/80">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isMn ? 'Байршил & Логистик' : 'Venues & Participant Logistics'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {isMn ? 'Арга Хэмжээ Зохион Байгуулагдах Газрууд' : 'Official Event Venues & Guidelines'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Day 1 Venue Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="h-1 w-full bg-blue-500 absolute top-0 left-0" />
          
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              DAY 1 • 2026.09.21
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              08:30 – 15:00 (+ Gala)
            </span>
          </div>

          <h4 className="text-lg font-bold text-white mb-2">
            {isMn ? 'Улаанбаатар Хотын Чуулганы Танхим' : 'Grand Convention Hall, Ulaanbaatar'}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {isMn 
              ? 'Төрийн дээд түвшний удирдлагууд, яам тамгын газрууд, хөрөнгө оруулалтын сангуудын нэгдсэн чуулган, Deal Room танхим болон Гала хүлээн авалт болно.'
              : 'Hosting top state leaders, ministries, investment funds, B2B Deal Room matchmaking, and the evening Gala Dinner.'}
          </p>

          <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            <div className="flex items-center gap-2">
              <Shirt className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                <strong className="text-slate-200">{isMn ? 'Хувцаслалт: ' : 'Dress Code: '}</strong>
                {isMn ? 'Албаны ажил хэрэгч (Business Formal / Lounge Suit)' : 'Business Formal / Lounge Suit'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-slate-200">{isMn ? 'Нэвтрэх: ' : 'Access: '}</strong>
                {isMn ? 'Цахим мандат эсвэл бүртгэлийн кодоор 08:30-д бүртгэл эхэлнэ' : 'Digital delegate pass or QR code at reception desk from 08:30'}
              </span>
            </div>
          </div>
        </div>

        {/* Day 2 Venue Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="h-1 w-full bg-amber-500 absolute top-0 left-0" />
          
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              DAY 2 • 2026.09.22
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              10:30 – Evening
            </span>
          </div>

          <h4 className="text-lg font-bold text-white mb-2">
            {isMn ? 'Чингис Хааны Хүрээ Аялал Жулчлалын Цогцолбор' : "Chinggis Khaan's Palace Tourist Complex"}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {isMn 
              ? 'Улаанбаатар хотоос баруун урагш байрлах байгалийн үзэсгэлэнт тал нутагт морин хуур, үндэсний бөх, сур харваа, хурдан морь болон хаалтын үдэшлэг зохион байгуулагдана.'
              : 'Scenic steppe complex featuring traditional ger camp, Morin Khuur symphony, wrestling tournament, archery, horse sprint, and VIP closing evening.'}
          </p>

          <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            <div className="flex items-center gap-2">
              <Shirt className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-slate-200">{isMn ? 'Хувцаслалт: ' : 'Dress Code: '}</strong>
                {isMn ? 'Монгол үндэсний дээл эсвэл Smart Casual (Газар дээр нь дээл өмсүүлнэ)' : 'Traditional Deel (Provided on site) or Smart Casual'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-slate-200">{isMn ? 'Тээвэр: ' : 'Transportation: '}</strong>
                {isMn ? 'VIP автобус төв зочид буудлуудаас 09:30-д хөдөлж, 17:00-д буцаана' : 'Scheduled VIP shuttle departs central hotels at 09:30; returns 17:00'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
