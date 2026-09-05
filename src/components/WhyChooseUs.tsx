import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Landmark, CheckCircle2, Building, Flame, Compass, Wrench } from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase mb-3 border border-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            WHY CHOOSE CTC SHINSEI
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            株式会社CTC 心誠不動産が選ばれる理由
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            単なる物件紹介にとどまらず、建物の安全構造・外壁・災害耐性を見極める高度な専門資格と、23行に及ぶ金融機関ネットワークで安心の不動産取引を実現します。
          </p>
        </motion.div>

        {/* 3 Core Pillars with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Pillar 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-50 rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">POINT 01</span>
              <h3 className="font-mincho text-xl font-bold text-slate-900 mt-1 mb-3">
                建築・安全の専門資格を多数保有
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                自然災害調査士や外壁診断士、石綿（アスベスト）作業主任者など、建物の真の耐久性や修繕リスクを正確に見極める技術系資格を保有しています。
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/80 space-y-2">
              {COMPANY_DATA.qualifications.slice(0, 4).map((q) => (
                <div key={q} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-50 rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 mb-5">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">POINT 02</span>
              <h3 className="font-mincho text-xl font-bold text-slate-900 mt-1 mb-3">
                提携銀行23行の強力ネットワーク
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                都市銀行（みずほ・三菱UFJ・三井住友）から埼玉りそな・武蔵野銀行、各地域信用金庫まで23行と取引。優遇金利の引き出しや審査相談に強みがあります。
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/80">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">主要取引金融機関</div>
              <div className="flex flex-wrap gap-1.5">
                {COMPANY_DATA.banks.slice(0, 8).map((b) => (
                  <span key={b} className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                    {b}
                  </span>
                ))}
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                  他 全23行
                </span>
              </div>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-50 rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">POINT 03</span>
              <h3 className="font-mincho text-xl font-bold text-slate-900 mt-1 mb-3">
                鶴ヶ島・川越エリア密着と直接買取
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                埼玉県鶴ヶ島市松ヶ丘を拠点に、東武東上線・越生線・川越線エリアの相場を熟知。仲介だけでなく「直接買取」「空き家・相続相談」にも即応します。
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>秘密厳守・無料スピード机上査定</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>仲介手数料不要の直接買取対応</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>顧問税理士（ベンチャーサポート）連携</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Qualifications Detail Banner with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-sky-600 via-sky-700 to-cyan-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-sky-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                <Wrench className="w-3.5 h-3.5 text-sky-200" />
                TECHNICAL QUALIFICATIONS
              </div>
              <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-white leading-snug">
                住まいの安全を守る、確かな保有資格と免許
              </h3>
              <p className="text-sky-100 text-xs sm:text-sm leading-relaxed">
                宅地建物取引業のみならず、古物商許可や建設・安全管理の専門資格を網羅。お客様の大切な資産を多角的な視点から誠心誠意サポートいたします。
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPANY_DATA.qualifications.map((qual, idx) => (
                <div key={idx} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{qual}</div>
                    <div className="text-[10px] text-sky-100">専門技術者認定</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
