import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft,
  Share2, 
  CheckCircle2, 
  FileText, 
  ShieldCheck,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { COLUMNS_DATA, ColumnArticle } from '../data/columnsData';

interface ColumnsPageProps {
  onConsultClick: (note?: string) => void;
  onBackToHome: () => void;
  initialArticleSlug?: string;
}

export const ColumnsPage: React.FC<ColumnsPageProps> = ({
  onConsultClick,
  onBackToHome,
  initialArticleSlug
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<ColumnArticle | null>(() => {
    if (initialArticleSlug) {
      return COLUMNS_DATA.find((c) => c.slug === initialArticleSlug || c.id === initialArticleSlug) || null;
    }
    return null;
  });

  const categories = [
    { id: 'all', label: 'すべてのコラム' },
    { id: '相続・登記', label: '相続・登記' },
    { id: '空き家・解体', label: '空き家・解体' },
    { id: '売却ノウハウ', label: '売却ノウハウ' },
    { id: '難物件・再生', label: '再建築不可・難物件' },
    { id: '住宅ローン・資金', label: '住宅ローン・資金' },
  ];

  const filteredArticles = selectedCategory === 'all'
    ? COLUMNS_DATA
    : COLUMNS_DATA.filter((a) => a.category === selectedCategory);

  // Article Reader View
  if (activeArticle) {
    return (
      <div className="bg-slate-50 min-h-screen pt-28 pb-24 text-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap" aria-label="パンくずリスト">
            <button onClick={onBackToHome} className="hover:text-slate-900 transition-colors cursor-pointer">
              ホーム
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => setActiveArticle(null)} className="hover:text-slate-900 transition-colors cursor-pointer">
              売却・相続お役立ちコラム
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {activeArticle.title}
            </span>
          </nav>

          {/* Back Button */}
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>コラム一覧へ戻る</span>
          </button>

          {/* Article Main Paper Card */}
          <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
            
            {/* Header Meta */}
            <header className="space-y-4 border-b border-slate-100 pb-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-[#96723e] font-bold border border-slate-200">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  公開: {activeArticle.publishDate}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  読了目安: {activeArticle.readTime}
                </span>
              </div>

              <h1 className="font-mincho text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug tracking-tight">
                {activeArticle.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {activeArticle.summary}
              </p>
            </header>

            {/* Table of Contents */}
            {activeArticle.tableOfContents && activeArticle.tableOfContents.length > 0 && (
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5 text-[#96723e]" />
                  <span>本記事の目次</span>
                </div>
                <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {activeArticle.tableOfContents.map((toc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#96723e] font-mono font-bold">{idx + 1}.</span>
                      <span>{toc.replace(/^[0-9]+\.\s*/, '')}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Main Content Sections */}
            <div className="space-y-8 text-sm sm:text-base text-slate-800 leading-relaxed">
              {activeArticle.content.map((sec, idx) => (
                <section key={idx} className="space-y-3 pt-2">
                  <h2 className="font-mincho text-xl sm:text-2xl font-bold text-slate-900 border-l-4 border-[#96723e] pl-3.5">
                    {sec.heading}
                  </h2>
                  <p className="whitespace-pre-line text-slate-700 leading-relaxed text-sm sm:text-base">
                    {sec.body}
                  </p>

                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="space-y-3 pt-2 pl-1">
                      {sec.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                          <h3 className="font-bold text-slate-900 text-sm">{sub.subHeading}</h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sub.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.pointBox && (
                    <div className="bg-amber-50/60 p-4 rounded-2xl border border-[#96723e]/30 text-xs sm:text-sm text-slate-800 font-medium">
                      {sec.pointBox}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Keyword Tags */}
            <div className="border-t border-slate-100 pt-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>関連キーワード</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeArticle.keywords.map((kw, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium border border-slate-200">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Author / Editorial Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#1e2638] text-white flex items-center justify-center font-bold text-sm">
                  心誠
                </div>
                <div>
                  <div className="text-xs text-slate-500">{activeArticle.author.role}</div>
                  <div className="font-bold text-slate-900 text-sm">{activeArticle.author.name}</div>
                  <div className="text-[11px] text-slate-500">{activeArticle.author.qualification}</div>
                </div>
              </div>
              <button
                onClick={() => onConsultClick(`コラム「${activeArticle.title}」に関するご相談`)}
                className="px-5 py-2.5 rounded-xl bg-[#1e2638] hover:bg-[#28334a] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>このテーマについて無料相談する</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c29d66]" />
              </button>
            </div>

          </article>
        </div>
      </div>
    );
  }

  // Article List View
  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-24 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb & Header */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2" aria-label="パンくずリスト">
          <button onClick={onBackToHome} className="hover:text-slate-900 transition-colors cursor-pointer">
            ホーム
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">不動産売却・空き家・相続 お役立ちナレッジコラム</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-slate-200">
              <BookOpen className="w-3.5 h-3.5 text-[#96723e]" />
              REAL ESTATE KNOWLEDGE & SEO COLUMNS
            </div>
            <h1 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              不動産売却・相続・空き家の<br />
              <span className="text-[#96723e]">お役立ちナレッジコラム</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              2024年の相続登記義務化の対応から、空き家解体費用のリアル、仲介と買取の損得比較、再建築不可物件の活用法まで、地元埼玉の不動産実務に精通した専門家が分かりやすく解説します。
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1e2638] text-white border-[#1e2638] shadow-sm ring-2 ring-[#96723e]/40'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="p-6 sm:p-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-[#96723e] font-bold border border-slate-200">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h2 
                  onClick={() => {
                    setActiveArticle(article);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-mincho text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#96723e] transition-colors cursor-pointer leading-snug"
                >
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {article.keywords.slice(0, 3).map((kw, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-100">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {article.updatedDate} 更新
                </span>
                <button
                  onClick={() => {
                    setActiveArticle(article);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#96723e] group-hover:text-[#7a5a2e] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>続きを読む</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Free Consultation Banner */}
        <div className="bg-[#1e2638] text-white rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-xs font-bold text-[#c29d66] uppercase tracking-wider">
              個別のご相談・机上査定は完全無料
            </div>
            <h3 className="font-mincho text-2xl font-bold">
              「うちの場合はいくらになる？」専門スタッフにお気軽にご相談ください
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              相続登記・空き家解体・住宅ローン等、個別案件に合わせた的確な試算をご案内します。
            </p>
          </div>

          <button
            onClick={() => onConsultClick('コラム一覧からの無料相談・査定依頼')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#96723e] to-[#b38a4d] hover:brightness-105 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>無料相談・査定を依頼する</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
