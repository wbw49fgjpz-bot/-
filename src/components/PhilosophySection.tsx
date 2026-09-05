import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Zap, Shield } from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

export const PhilosophySection: React.FC = () => {
  const { philosophy } = COMPANY_DATA;

  return (
    <section id="philosophy" className="py-20 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-widest uppercase mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            OUR PHILOSOPHY
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            経営理念
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4">
            「正直」な業界を構築し、「働く」の常識を新しく創る。
          </p>
        </motion.div>

        {/* Mission & Vision Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-2">
              MISSION / 私達の使命
            </div>
            <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-4">
              {philosophy.mission.lead}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {philosophy.mission.detail}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#1e2638] to-[#29344c] text-white rounded-3xl p-8 sm:p-10 border border-slate-700 shadow-xl relative overflow-hidden"
          >
            <div className="text-xs font-mono font-bold text-[#c29d66] uppercase tracking-widest mb-2">
              VISION / 私達が目指す姿
            </div>
            <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-white leading-snug mb-4">
              {philosophy.vision.lead}
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {philosophy.vision.detail}
            </p>
          </motion.div>

        </div>

        {/* 3 Values: ありがとう / 挑戦 / 先義先義 */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">
              VALUE / 私達が共有する価値観
            </div>
            <h4 className="font-mincho text-2xl font-bold text-slate-900">
              心誠不動産が守り続ける3つの約束
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. ありがとう */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-[#96723e]/40 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#96723e]/10 flex items-center justify-center text-[#96723e]">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="font-mincho text-2xl font-bold text-slate-900">
                  ありがとう
                </div>
                <div className="text-xs font-bold text-[#96723e]">
                  過去には感謝を。現在には信頼。未来には希望を。
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  出会えたすべてのご縁に感謝し、現在のお客様に誠心誠意信頼される仕事を全うし、お客様の明るい未来の暮らしを創り続けます。
                </p>
              </div>
            </motion.div>

            {/* 2. 挑戦 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-[#96723e]/40 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1e2638] flex items-center justify-center text-[#c29d66]">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="font-mincho text-2xl font-bold text-slate-900">
                  挑戦
                </div>
                <div className="text-xs font-bold text-slate-900">
                  変化を恐れない。
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  古い不動産業界の悪しき慣習や常識にとらわれず、新しい働き方、最新のテクノロジー、率直な情報開示に果敢に挑戦します。
                </p>
              </div>
            </motion.div>

            {/* 3. 先義先義 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-amber-50 to-amber-100/70 p-6 sm:p-8 rounded-3xl border-2 border-amber-300 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-serif font-bold text-xl shadow">
                  義
                </div>
                <div className="font-mincho text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>先義先義</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-sans font-bold">
                    オリジナル理念
                  </span>
                </div>
                <div className="text-xs font-bold text-amber-900">
                  顧客を優先して、なお、お客様を優先する。ギブアンドギブの精神。
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  「先義後利」を少し変えた言葉です。「後利」には後で利益を得たい思いが残ります。心誠不動産は、利益のために顧客を優先するのではなく、徹底的にお客様を優先し尽くす精神を貫きます。
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
