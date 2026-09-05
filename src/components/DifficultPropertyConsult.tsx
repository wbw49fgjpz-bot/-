import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Home,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface DifficultPropertyConsultProps {
  onInquire: (topic: string) => void;
}

export const DifficultPropertyConsult: React.FC<DifficultPropertyConsultProps> = ({ onInquire }) => {
  const cases = [
    {
      number: '01',
      title: '空き家・古家付き土地',
      lead: 'そのまま売るか、手を加えるか。状態や費用を確認して比較検討します。',
      details: '長年放置された空き家や、草木が茂った状態でも問題ありません。解体や残置物撤去に多額の費用を支払う前に、「現況有姿のまま引き渡せる買主」を探す方法や当社での直接買取を比較検討します。',
      point: '残置物（家財道具・大型家電）の処分見積もりからワンストップで代行対応。',
      suitable: '家具やゴミが残ったまま / 解体費用を出したくない'
    },
    {
      number: '02',
      title: '相続した不動産',
      lead: '何から始めればよいか分からない方も、状況の整理から始められます。',
      details: '2024年4月からの「相続登記の義務化」への対応や、兄弟・親族間での遺産分割協議、相続税の申告期限（10ヶ月以内）前の換価売却など。提携司法書士・顧問税理士と連携してスムーズに進めます。',
      point: '「空き家の3,000万円特別控除特例」の要件確認や税制優遇のアドバイス。',
      suitable: '名義変更が未完了 / 相続税の納税期日が近い'
    },
    {
      number: '03',
      title: '旗竿地・狭小地・不整形地',
      lead: '土地の形状や接道状況を確認し、物件の特性に合わせて考えます。',
      details: '道路に面した間口が狭い「旗竿地（敷地延長）」や三角形などの変形地、20坪以下の狭小地。一般の住宅用地としては売りにくい物件も、隣地所有者への売却交渉や設計工夫で価値を見出します。',
      point: '建築基準法の道路種別・セットバック（道路後退）の有無を現地・公図で綿密に調査。',
      suitable: '間口が狭く車が入らない / 三角地や変形地'
    },
    {
      number: '04',
      title: '再建築の確認が必要な物件',
      lead: '建築や利用の条件を調べ、売却に向けた課題を確認します。',
      details: '接道義務（幅員4m以上の道路に2m以上接道）を満たしていない「再建築不可物件」や市街化調整区域内の既存宅地。43条但書許可の可能性調査や、リノベーション需要の買取業者ルートを開拓します。',
      point: '他社で「再建築不可だから売れない」と断られた物件も、出口の選択肢をご提示。',
      suitable: '他社で断られた / 市街化調整区域'
    }
  ];

  return (
    <section id="difficult" className="py-20 sm:py-24 bg-[#f8fafc] text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            03 / PROPERTY CONSULTATION
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            「売れるか分からない」<br />
            <span className="text-amber-700">その不動産も、まずはお話を。</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            管理が行き届かない空き家。相続したまま何年も経った土地。<br className="hidden sm:inline" />
            事情があるからこそ、現状の整理から一緒に始めます。他社で難色を示された物件もお気軽にご相談ください。
          </p>
        </motion.div>

        {/* 4 Cards Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {cases.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-200 hover:border-amber-400 p-6 sm:p-8 rounded-3xl transition-all shadow-sm hover:shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-extrabold text-amber-600">
                    {item.number}
                  </span>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
                    無料事前調査対応
                  </span>
                </div>

                <h3 className="font-mincho text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-amber-800 leading-snug">
                  {item.lead}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.details}
                </p>

                <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 flex items-start gap-2.5 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{item.point}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">{item.suitable}</span>
                <button
                  onClick={() => onInquire(`【不動産相談】${item.title}について相談したい`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors group-hover:translate-x-1 cursor-pointer"
                >
                  <span>詳しく相談する</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preparation Notice Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md shadow-amber-500/5"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-bold text-amber-800 tracking-wider uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>PREPARATION / ご相談前の注意点</span>
            </div>
            <h4 className="font-mincho text-lg sm:text-xl font-bold text-slate-900">
              片付けや修繕の前に、まず現状をお知らせください。
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              「リフォームした方が高く売れるのでは？」「解体してから更地にすべき？」と悩まれる前に、まずはその状態のままご相談ください。手を加える前に、現況での売却と費用をかける方法を比較することが大切です。
            </p>
          </div>

          <button
            onClick={() => onInquire('【現状相談】片付けや修繕前の物件の現状確認・査定を依頼したい')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs hover:brightness-105 shadow-md shadow-amber-500/20 cursor-pointer transition-all"
          >
            現状のまま無料相談する
          </button>
        </motion.div>

      </div>
    </section>
  );
};
