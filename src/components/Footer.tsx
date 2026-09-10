import React from 'react';
import { Language } from '../types';
import { MongolianFlag } from './MongolianFlag';
import { Soyombo } from './Soyombo';
import { Building2, Award } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenRegister }) => {
  const t = {
    en: {
      title: 'Advancing Investment, Accelerating Development',
      subtitle: 'High-Level Investment Conference & Cultural Experience',
      desc: 'Official conference schedule and delegate registration portal. Designed to foster international public-private partnerships, sovereign investment deal flows, and nomadic cultural heritage in Mongolia.',
      institutions: 'Key Institutions',
      inst1: 'Government of Mongolia',
      inst2: 'Ministry of Economy and Development',
      inst3: 'Mongolian National Chamber of Commerce & Industry (MNCCI)',
      inst4: 'Erdenes Mongol SOE',
      quickLinks: 'Delegate Registration',
      registerBtn: 'Register for the event',
      syncNote: 'Registrations are synced to organizing database & Excel sheet',
      copyright: '© 2026 Advancing Investment, Accelerating Development. All Rights Reserved.',
      flagNote: 'Official Certified Flag of Mongolia Proportions',
    },
    zh: {
      title: '推进投资 · 加速发展',
      subtitle: '高规格投资论坛与游牧文化交流盛典',
      desc: '官方双日大会议程与代表注册系统。旨在深化国际政企合作、推动主权资产投资落地，并展现蒙古国千年游牧文明与那达慕体育精神。',
      institutions: '主协办机构',
      inst1: '蒙古国政府',
      inst2: '蒙古国经济与发展部',
      inst3: '蒙古国家工商会（MNCCI）及香港代表处',
      inst4: '额尔登斯蒙古国有控股公司',
      quickLinks: '参会服务',
      registerBtn: '提交参会注册',
      syncNote: '参会数据实时录入数据库与工作表格',
      copyright: '© 2026 推进投资 · 加速发展 组织委员会 版权所有。',
      flagNote: '蒙古国国旗标准尺寸规范',
    },
    ja: {
      title: '投資の推進 · 発展の加速',
      subtitle: 'ハイレベル投資フォーラム＆伝統文化体験',
      desc: '公式カンファレンスプログラムおよび代表団参加登録ポータル。国際的な官民連携の推進、ソブリン投資の促進、遊牧文化遺産の共有を目的としています。',
      institutions: '主要参画機関',
      inst1: 'モンゴル国政府',
      inst2: 'モンゴル経済開発省',
      inst3: 'モンゴル商工会議所（MNCCI）',
      inst4: 'エルデネス・モンゴル国有持株会社',
      quickLinks: '参加手続き',
      registerBtn: '参加登録を行う',
      syncNote: '登録情報は事務局データベースおよびExcelへ即時記録されます',
      copyright: '© 2026 投資の推進 · 発展の加速 実行委員会 All Rights Reserved.',
      flagNote: 'モンゴル国旗 標準規格準拠',
    },
  }[language];

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      {/* Tricolor bar */}
      <div className="h-1 w-full flex mb-8">
        <div className="h-full w-1/3 bg-[#C41E3A]" />
        <div className="h-full w-1/3 bg-[#0055A5]" />
        <div className="h-full w-1/3 bg-[#C41E3A]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Overview */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-3">
              <MongolianFlag variant="badge" className="w-12 h-6 ring-1 ring-amber-400/40" />
              <div>
                <h4 className="font-extrabold text-white text-base">
                  {t.title}
                </h4>
                <p className="text-xs text-amber-400 font-medium">
                  {t.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Key Institutions */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.institutions}</span>
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li>• {t.inst1}</li>
              <li>• {t.inst2}</li>
              <li>• {t.inst3}</li>
              <li>• {t.inst4}</li>
            </ul>
          </div>

          {/* Registration Action */}
          <div className="md:col-span-3 space-y-2.5 text-xs">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.quickLinks}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {t.syncNote}
            </p>
            <div>
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 hover:border-amber-400 transition cursor-pointer"
              >
                {t.registerBtn}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <Soyombo className="w-3 h-5" fill="#F59E0B" />
            <span>{t.copyright}</span>
          </div>
          <div>
            {t.flagNote}
          </div>
        </div>

      </div>
    </footer>
  );
};
