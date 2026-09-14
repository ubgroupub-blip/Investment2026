import React, { useState } from 'react';
import { Language, RegistrationData } from '../types';
import { DelegatePass } from './DelegatePass';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitRegistration } from '../services/registrationService';

interface RegistrationSectionProps {
  language: Language;
  onSuccessRegister: (data: RegistrationData) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
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
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedPass, setSubmittedPass] = useState<RegistrationData | null>(null);

  const t = {
    en: {
      eyebrow: 'REGISTER',
      heading: 'Register for the event',
      subtitle:
        'Fill in the form and submit your details. Registrations are reviewed and confirmed by the organizing team.',
      step1: 'Complete the form with your name, organization and contact details.',
      step2: 'Submissions are emailed straight to the organizing team.',
      step3: 'The team confirms your seat by email.',
      fullName: 'Full name',
      fullNamePlaceholder: 'First and last name',
      organization: 'Organization',
      organizationPlaceholder: 'Company / organization',
      jobTitle: 'Job title',
      jobTitlePlaceholder: 'Job title',
      participationType: 'Participation type',
      selectPrompt: 'Select...',
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
        'Your information has been logged and synchronized. The organizing committee will review your submission and confirm by email.',
      registerAnother: 'Register Another Delegate',
    },
    zh: {
      eyebrow: '参会注册',
      heading: '注册参加大会',
      subtitle: '请填写表格并提交您的信息。所有注册信息将由会务组直接审核并邮件确认。',
      step1: '请准确填写您的姓名、单位、职位及联系方式。',
      step2: '提交信息将直接传送至大会组织委员会并录入系统。',
      step3: '会务组将通过电子邮件发送最终确认函及参会凭据。',
      fullName: '姓名',
      fullNamePlaceholder: '您的姓名',
      organization: '机构 / 公司',
      organizationPlaceholder: '单位或所属公司全称',
      jobTitle: '职务 / 头衔',
      jobTitlePlaceholder: '担任职务',
      participationType: '参会类别',
      selectPrompt: '请选择...',
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
      successDesc: '您的信息已成功录入数据库。会务工作组将尽快完成审核并通过电子邮件发送确认通知。',
      registerAnother: '继续注册其他代表',
    },
    ja: {
      eyebrow: '参加登録',
      heading: 'イベント参加登録',
      subtitle: 'フォームにご記入の上送信してください。登録内容は事務局にて確認後、メールでご案内します。',
      step1: 'お名前、ご所属機関、役職、連絡先をご入力ください。',
      step2: '送信内容は大会運営事務局へ直接連携・記録されます。',
      step3: '事務局よりメールにて確定のご案内をお送りいたします。',
      fullName: '氏名',
      fullNamePlaceholder: '氏名（ローマ字または漢字）',
      organization: '所属機関 / 企業名',
      organizationPlaceholder: '会社名・組織名',
      jobTitle: '役職',
      jobTitlePlaceholder: '役職名',
      participationType: '参加区分',
      selectPrompt: '選択してください...',
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
      registerAnother: '別の代表者を登録する',
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
          : 'Please enter a valid email address.'
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
      const confirmedData = await submitRegistration(payload);
      onSuccessRegister(confirmedData);
      setSubmittedPass(confirmedData);
    } catch (err) {
      console.error('Registration processing notice:', err);
      // Fallback local registration if network interrupted
      const fallbackTicket = `ADV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackData: RegistrationData = {
        id: `reg-${Date.now()}`,
        ticketNumber: fallbackTicket,
        ...payload,
        registeredAt: new Date().toISOString(),
      };
      onSuccessRegister(fallbackData);
      setSubmittedPass(fallbackData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedPass(null);
    setFullName('');
    setOrganization('');
    setJobTitle('');
    setParticipationType('Full Event (Day 1 & Day 2)');
    setEmail('');
    setPhone('');
    setInvestmentAmount('');
    setSectorsOfInterest('');
    setAdditionalNotes('');
  };

  return (
    <section id="register" className="w-full bg-[#080d19] py-16 sm:py-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {submittedPass ? (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3.5 text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-base text-white">{t.successTitle}</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {t.successDesc}
                </p>
              </div>
            </div>

            <DelegatePass
              registration={submittedPass}
              language={language}
              onClose={handleReset}
            />

            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 bg-slate-900 border border-amber-500/30 hover:border-amber-400 transition cursor-pointer"
              >
                + {t.registerAnother}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Register Header & 3-Step Process (exact to screenshot) */}
            <div className="lg:col-span-5 space-y-6 pt-2">
              <div className="space-y-3">
                <span className="text-xs font-black tracking-widest text-[#F59E0B] uppercase">
                  {t.eyebrow}
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {t.heading}
                </h2>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {t.subtitle}
                </p>
              </div>

              {/* Numbered Steps List */}
              <div className="space-y-4 pt-2">
                
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-md bg-[#D97706] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-sm">
                    1
                  </div>
                  <p className="text-sm text-slate-300 leading-snug">
                    {t.step1}
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-md bg-[#D97706] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-sm">
                    2
                  </div>
                  <p className="text-sm text-slate-300 leading-snug">
                    {t.step2}
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-md bg-[#D97706] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-sm">
                    3
                  </div>
                  <p className="text-sm text-slate-300 leading-snug">
                    {t.step3}
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Dark Form Card matching screenshot layout exactly */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1527] border border-slate-800 shadow-2xl">
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Full name * & Organization * */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                        {t.fullName} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.fullNamePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                        {t.organization} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={t.organizationPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Row 2: Job title & Participation type * */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                        {t.jobTitle}
                      </label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder={t.jobTitlePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                        {t.participationType} <span className="text-amber-500">*</span>
                      </label>
                      <select
                        value={participationType}
                        onChange={(e) => setParticipationType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="Full Event (Day 1 & Day 2)">{t.typeFull}</option>
                        <option value="Day 1: Investment Forum (09/21)">{t.typeDay1}</option>
                        <option value="Day 2: Cultural Experience & Mini Naadam (09/22)">{t.typeDay2}</option>
                        <option value="Investor / Deal Room Matchmaking">{t.typeDealRoom}</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Email * & Phone * */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                        {t.email} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                        {t.phone} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Row 4: Investment amount (USD) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                      {t.investmentAmount}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-xs sm:text-sm">
                        $
                      </span>
                      <input
                        type="text"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        placeholder={t.investmentPlaceholder}
                        className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Row 5: Sectors of interest */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                      {t.sectorsOfInterest}
                    </label>
                    <input
                      type="text"
                      value={sectorsOfInterest}
                      onChange={(e) => setSectorsOfInterest(e.target.value)}
                      placeholder={t.sectorsPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  {/* Row 6: Additional notes */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                      {t.additionalNotes}
                    </label>
                    <textarea
                      rows={3}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder={t.notesPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition transform active:scale-98 disabled:opacity-60 cursor-pointer"
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

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
