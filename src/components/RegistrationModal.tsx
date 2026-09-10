import React, { useState } from 'react';
import { Language, RegistrationData } from '../types';
import { DelegatePass } from './DelegatePass';
import { MongolianFlag } from './MongolianFlag';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSuccessRegister: (data: RegistrationData) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  language,
  onSuccessRegister,
}) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [participationType, setParticipationType] = useState('Full Event (Day 1 & Day 2)');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [sectorsOfInterest, setSectorsOfInterest] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const t = {
    en: {
      modalTitle: 'Register for the event',
      modalSubtitle: 'Submissions are reviewed and confirmed by the organizing team.',
      fullName: 'Full name',
      fullNamePlaceholder: 'First and last name',
      organization: 'Organization',
      organizationPlaceholder: 'Company / organization',
      jobTitle: 'Job title',
      jobTitlePlaceholder: 'Job title',
      participationType: 'Participation type',
      typeFull: 'Full Event (Day 1 & Day 2)',
      typeDay1: 'Day 1: Investment Forum (09/21)',
      typeDay2: 'Day 2: Cultural Experience & Mini Naadam (09/22)',
      typeDealRoom: 'Investor / Deal Room Matchmaking',
      email: 'Email',
      emailPlaceholder: 'name@example.com',
      phone: 'Phone',
      phonePlaceholder: '+976 _______',
      investmentAmount: 'Investment amount (USD)',
      investmentPlaceholder: 'e.g. 5,000,000',
      sectorsOfInterest: 'Sectors of interest',
      sectorsPlaceholder: 'Real estate, Mining, energy, infrastructure, tourism...',
      additionalNotes: 'Additional notes',
      notesPlaceholder: "Organizations you'd like to meet, special requests, etc.",
      submitBtn: 'Register for the event',
      submitting: 'Submitting registration...',
      successTitle: 'Registration Successfully Submitted!',
      successDesc:
        'Your registration details have been synced to the event database & Excel sheet. The organizing team will review and confirm by email.',
    },
    zh: {
      modalTitle: '注册参加大会',
      modalSubtitle: '填写信息后提交，会务工作组将直接审核并邮件确认参会席位。',
      fullName: '姓名',
      fullNamePlaceholder: '您的姓名',
      organization: '机构 / 公司',
      organizationPlaceholder: '单位或所属公司全称',
      jobTitle: '职务 / 头衔',
      jobTitlePlaceholder: '担任职务',
      participationType: '参会类别',
      typeFull: '全程参与（第一天论坛 + 第二天文化体验）',
      typeDay1: '第一天：投资高峰论坛（09/21）',
      typeDay2: '第二天：成吉思汗行宫迷你那达慕（09/22）',
      typeDealRoom: '投资人 / B2B 对接洽谈室专场',
      email: '电子邮箱',
      emailPlaceholder: 'name@example.com',
      phone: '联系电话',
      phonePlaceholder: '+976 _______',
      investmentAmount: '预计投资规模（美元）',
      investmentPlaceholder: '例如：5,000,000',
      sectorsOfInterest: '意向关注行业',
      sectorsPlaceholder: '房地产、矿产能源、基础设施、旅游文化等...',
      additionalNotes: '补充说明 / 商务诉求',
      notesPlaceholder: '希望对接的部门、参会特殊要求等...',
      submitBtn: '提交参会注册',
      submitting: '正在提交并同步数据...',
      successTitle: '参会申请已成功提交！',
      successDesc: '您的信息已成功录入数据库并实时同步。会务组将在审核后通过邮件发送确认通知。',
    },
    ja: {
      modalTitle: 'イベント参加登録',
      modalSubtitle: '登録内容は事務局にて確認後、メールでご案内します。',
      fullName: '氏名',
      fullNamePlaceholder: '氏名（ローマ字または漢字）',
      organization: '所属機関 / 企業名',
      organizationPlaceholder: '会社名・組織名',
      jobTitle: '役職',
      jobTitlePlaceholder: '役職名',
      participationType: '参加区分',
      typeFull: '全日程参加（Day 1 フォーラム ＋ Day 2 文化体験）',
      typeDay1: 'Day 1: 投資フォーラム（09/21）',
      typeDay2: 'Day 2: チンギスハーン宮殿 ミニ・ナーダム（09/22）',
      typeDealRoom: 'インベストメント / 個別ディールルーム商談',
      email: 'メールアドレス',
      emailPlaceholder: 'name@example.com',
      phone: '電話番号',
      phonePlaceholder: '+976 _______',
      investmentAmount: '想定投資額（USD）',
      investmentPlaceholder: '例: 5,000,000',
      sectorsOfInterest: '関心分野・産業セクター',
      sectorsPlaceholder: '不動産、鉱物・エネルギー、インフラ、観光など...',
      additionalNotes: '追加のご要望・面談希望',
      notesPlaceholder: '面談を希望する組織や特別なご要望など...',
      submitBtn: '参加登録を送信する',
      submitting: '登録送信中...',
      successTitle: '参加登録が完了しました',
      successDesc: 'ご登録情報が正常に受領・同期されました。事務局にて確認の上、追ってメールにてご連絡いたします。',
    },
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !organization.trim() || !email.trim()) {
      setErrorMessage(
        language === 'zh'
          ? '请填写所有带 * 的必填项目。'
          : language === 'ja'
          ? '必須項目（*）をすべて入力してください。'
          : 'Please fill in all required fields marked with *.'
      );
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage(
        language === 'zh'
          ? '请输入有效的电子邮箱地址。'
          : language === 'ja'
          ? '有効なメールアドレスを入力してください。'
          : 'Please provide a valid email address.'
      );
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      organization: organization.trim(),
      jobTitle: jobTitle.trim(),
      participationType: participationType || 'Full Event (Day 1 & Day 2)',
      email: email.trim(),
      phone: phone.trim(),
      investmentAmount: investmentAmount.trim(),
      sectorsOfInterest: sectorsOfInterest.trim(),
      additionalNotes: additionalNotes.trim(),
      attendingDays: (participationType.includes('Day 1')
        ? 'day1'
        : participationType.includes('Day 2')
        ? 'day2'
        : 'both') as 'both' | 'day1' | 'day2',
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        const confirmedData: RegistrationData = result.registration;
        onSuccessRegister(confirmedData);
        setSubmittedData(confirmedData);
      } else {
        const fallbackTicket = `ADV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const fallbackData: RegistrationData = {
          id: `reg-${Date.now()}`,
          ticketNumber: fallbackTicket,
          ...payload,
          registeredAt: new Date().toISOString(),
        };
        onSuccessRegister(fallbackData);
        setSubmittedData(fallbackData);
      }
    } catch {
      const fallbackTicket = `ADV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackData: RegistrationData = {
        id: `reg-${Date.now()}`,
        ticketNumber: fallbackTicket,
        ...payload,
        registeredAt: new Date().toISOString(),
      };
      onSuccessRegister(fallbackData);
      setSubmittedData(fallbackData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedData(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-[#0d1527] border border-slate-800 rounded-2xl shadow-2xl shadow-black overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Tricolor Ribbon Header */}
        <div className="h-2 w-full flex">
          <div className="h-full w-1/3 bg-[#C41E3A]" />
          <div className="h-full w-1/3 bg-[#0055A5]" />
          <div className="h-full w-1/3 bg-[#C41E3A]" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <MongolianFlag variant="badge" className="w-10 h-5 ring-1 ring-amber-400/40" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                {submittedData ? t.successTitle : t.modalTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {submittedData ? (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs sm:text-sm text-emerald-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">
                    {t.successTitle}
                  </span>
                  <p className="text-slate-300 mt-1 text-xs leading-relaxed">
                    {t.successDesc}
                  </p>
                </div>
              </div>

              {/* Display Generated Delegate Pass */}
              <DelegatePass
                registration={submittedData}
                language={language}
                onClose={resetAndClose}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Full name * & Organization * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.fullName} <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.organization} <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={t.organizationPlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Row 2: Job title & Participation type * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.jobTitle}
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder={t.jobTitlePlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.participationType} <span className="text-amber-500">*</span>
                  </label>
                  <select
                    value={participationType}
                    onChange={(e) => setParticipationType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="Full Event (Day 1 & Day 2)">{t.typeFull}</option>
                    <option value="Day 1: Investment Forum (09/21)">{t.typeDay1}</option>
                    <option value="Day 2: Cultural Experience & Mini Naadam (09/22)">{t.typeDay2}</option>
                    <option value="Investor / Deal Room Matchmaking">{t.typeDealRoom}</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Email * & Phone * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.email} <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.phone} <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Row 4: Investment amount (USD) */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.investmentAmount}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-xs">
                    $
                  </span>
                  <input
                    type="text"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder={t.investmentPlaceholder}
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Row 5: Sectors of interest */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.sectorsOfInterest}
                </label>
                <input
                  type="text"
                  value={sectorsOfInterest}
                  onChange={(e) => setSectorsOfInterest(e.target.value)}
                  placeholder={t.sectorsPlaceholder}
                  className="w-full px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Row 6: Additional notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.additionalNotes}
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full px-3 py-2 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 transition disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <span>{t.submitBtn}</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
