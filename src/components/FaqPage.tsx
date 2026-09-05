import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { FAQ_DATA, FaqItem } from '../data/faqData';
import { COMPANY_DATA } from '../data/company';

interface FaqPageProps {
  onConsultClick: (note?: string) => void;
  onBackToHome: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  onConsultClick,
  onBackToHome
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-4']);

  const categories = [
    { id: 'all', label: 'すべてのご質問' },
    { id: '売却・査定', label: '不動産売却・無料査定' },
    { id: '空き家・相続', label: '空き家・相続・実家処分' },
    { id: '購入・内覧', label: '物件購入・内覧' },
    { id: '住宅ローン・資金', label: '住宅ローン・資金計画' },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2" aria-label="パンくずリスト">
          <button onClick={onBackToHome} className="hover:text-slate-900 transition-colors cursor-pointer">
            ホーム
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">よくあるご質問（FAQ）と安心ガイド</span>
        </nav>

        {/* Page Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-slate-200">
              <HelpCircle className="w-3.5 h-3.5 text-[#96723e]" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h1 className="font-mincho text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              よくあるご質問と<br />
              <span className="text-[#96723e]">お取引の安心ガイド</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              査定費用や秘密厳守、住宅ローン審査、空き家の荷物片付けなど、お客様から日頃多く寄せられる疑問に誠心誠意お答えいたします。
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1e2638] text-white border-[#1e2638] shadow-sm ring-2 ring-[#96723e]/40'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-100 text-[#96723e] font-serif font-bold text-sm flex items-center justify-center border border-slate-200">
                      Q
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-[#96723e] uppercase tracking-wider block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 mt-1 ${isOpen ? 'rotate-180 text-slate-700' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/40 text-slate-700 text-xs sm:text-sm leading-relaxed pl-14 sm:pl-16">
                        <div className="flex items-start gap-2.5">
                          <span className="shrink-0 font-bold text-slate-900 font-serif">A.</span>
                          <p className="whitespace-pre-line">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-[#1e2638] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="font-mincho text-xl font-bold text-white">
              解決しない疑問やご不安はございませんか？
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              どんな小さなお悩みでも専門スタッフが丁寧にお答えします。匿名・相場確認だけでもお気軽にどうぞ。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#96723e]" />
              <span>お電話 {COMPANY_DATA.phone}</span>
            </a>
            <button
              onClick={() => onConsultClick('よくある質問ページからのお問い合わせ')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#96723e] to-[#b38a4d] text-white font-bold text-xs flex items-center gap-1.5 hover:brightness-105 transition-colors shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>無料相談フォーム</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
