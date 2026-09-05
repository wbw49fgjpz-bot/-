import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Send, 
  CheckCircle2, 
  Instagram,
  Sparkles
} from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

interface ContactSectionProps {
  selectedPropertyTitle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedPropertyTitle }) => {
  const [formType, setFormType] = useState('売却・買取・無料査定');
  const [companyName, setCompanyName] = useState('');
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [furigana, setFurigana] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyNote, setPropertyNote] = useState(selectedPropertyTitle || '');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update propertyNote if selectedPropertyTitle updates
  React.useEffect(() => {
    if (selectedPropertyTitle) {
      setPropertyNote(selectedPropertyTitle);
      if (selectedPropertyTitle.includes('売却') || selectedPropertyTitle.includes('査定')) {
        setFormType('売却・買取・無料査定');
      } else {
        setFormType('物件内覧・詳細希望');
      }
    }
  }, [selectedPropertyTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-widest uppercase mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            LET’S TALK / お問い合わせ
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            まずは、話してみませんか。
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            売却時期が未定の方も、いくら残るか知りたい方も大歓迎です。<br className="hidden sm:inline" />
            お電話・公式LINE・Webフォームから、ご都合のよい方法でお気軽にご連絡ください。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Phone, Official LINE, Email & Instagram with Motion (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Phone Card */}
            <div className="bg-gradient-to-br from-[#1e2638] to-[#29344c] text-white rounded-3xl p-7 border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#c29d66] uppercase tracking-wider">お電話でのお問い合わせ</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#c29d66]/20 text-[#c29d66] font-semibold border border-[#c29d66]/30">
                  迅速対応
                </span>
              </div>

              <div>
                <a
                  href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`}
                  className="font-mincho text-3xl sm:text-4xl font-black text-white hover:text-[#c29d66] transition-colors block tracking-tight font-mono"
                >
                  {COMPANY_DATA.phone}
                </a>
                <div className="text-xs text-slate-300 mt-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c29d66]" />
                  <span>営業時間 {COMPANY_DATA.businessHours}（定休日: {COMPANY_DATA.regularHolidays}）</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-slate-300 space-y-1">
                <p>「ホームページを見た」とお伝えいただくとスムーズです。</p>
                <p className="text-slate-400 text-[11px]">※お急ぎの売却査定・スピード買取相談も当日受付可能です。</p>
              </div>
            </div>

            {/* Official LINE Card */}
            <div className="bg-[#06C755]/10 border-2 border-[#06C755]/40 rounded-3xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#06C755] flex items-center justify-center text-white font-bold text-xs">
                    L
                  </div>
                  <span className="text-xs font-bold text-slate-900">公式LINEで気軽に相談</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#06C755] text-white font-bold">
                  おすすめ
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                友だち追加後、気になる写真や相談文をそのまま送信できます。担当者より迅速にご返信いたします。
              </p>
              <a
                href={COMPANY_DATA.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-4 h-4" />
                <span>公式LINEで無料相談する ↗</span>
              </a>
            </div>

            {/* Instagram Follow Us */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  FOLLOW US / INSTAGRAM
                </div>
                <div className="font-mincho text-sm font-bold text-slate-900 mt-0.5">
                  心誠不動産を、もっと身近に。
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  公式アカウント @ctc_shinnsei_
                </div>
              </div>
              <a
                href={COMPANY_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white hover:opacity-90 shadow-sm transition-opacity"
                title="Instagramを見る"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

          </motion.div>

          {/* Right Column: Web Form with Motion (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm"
          >
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-mincho text-2xl font-bold text-slate-900">
                  お問い合わせを受け付けました
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  心誠不動産にお問い合わせいただき誠にありがとうございます。<br />
                  担当者より、入力いただいたメールアドレスまたはお電話番号へ迅速にご連絡差し上げます。
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#1e2638] text-white text-xs font-bold hover:bg-[#29344c] transition-colors cursor-pointer"
                >
                  別のお問い合わせを作成する
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Inquiry Type Radio / Buttons */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    お問い合わせ種別 <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2638] text-white font-normal ml-1">必須</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      '売却・買取・無料査定',
                      '空き家・相続の相談',
                      '物件内覧・詳細希望',
                      '住宅ローン・資金相談',
                      '法人様・業務提携のご相談',
                      'その他のお問い合わせ',
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormType(type)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left cursor-pointer ${
                          formType === type
                            ? 'bg-[#1e2638] text-white border-[#1e2638] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Company & Department (Shown for corporate, or optional for everyone) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      貴社名 / 法人・事務所名 <span className="text-[10px] text-slate-400 font-normal">（法人・士業様）</span>
                    </label>
                    <input
                      type="text"
                      placeholder="例: 株式会社〇〇 / 〇〇法律事務所"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#96723e]/30 focus:border-[#96723e] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      部署名 / 役職
                    </label>
                    <input
                      type="text"
                      placeholder="例: 不動産開発部 / 代表取締役 / 司法書士"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#96723e]/30 focus:border-[#96723e] outline-none"
                    />
                  </div>
                </div>

                {/* Name & Furigana */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      お名前 <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2638] text-white font-normal ml-1">必須</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="山田 太郎"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#96723e]/30 focus:border-[#96723e] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      フリガナ
                    </label>
                    <input
                      type="text"
                      placeholder="ヤマダ タロウ"
                      value={furigana}
                      onChange={(e) => setFurigana(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#96723e]/30 focus:border-[#96723e] outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      メールアドレス <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2638] text-white font-normal ml-1">必須</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#96723e]/30 focus:border-[#96723e] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      お電話番号 <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2638] text-white font-normal ml-1">必須</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="090-1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#96723e]/30 focus:border-[#96723e] outline-none"
                    />
                  </div>
                </div>

                {/* Target Property / Subject Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    対象物件・所在地（分かる範囲で構いません）
                  </label>
                  <input
                    type="text"
                    placeholder="例: 鶴ヶ島市松ヶ丘の一戸建て / または検討中の物件名"
                    value={propertyNote}
                    onChange={(e) => setPropertyNote(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#96723e]/30 focus:border-[#96723e] outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ご相談内容・ご希望
                  </label>
                  <textarea
                    rows={4}
                    placeholder="「手元にいくら残るか試算してほしい」「住みながら売却できるか知りたい」「近所に知られず買取してほしい」など、ご自由にご記入ください。"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#96723e]/30 focus:border-[#96723e] outline-none"
                  />
                </div>

                {/* Privacy & Submit */}
                <div className="pt-2 space-y-3">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    ※ ご入力いただいた個人情報は、物件調査・査定結果のご連絡、およびご相談対応のみに使用いたします。しつこいセールス電話等は一切行いません。
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#1e2638] hover:bg-[#29344c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer border border-slate-700"
                  >
                    <Send className="w-4 h-4 text-[#c29d66]" />
                    <span>この内容で相談・無料査定を申し込む</span>
                  </button>
                </div>

              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
