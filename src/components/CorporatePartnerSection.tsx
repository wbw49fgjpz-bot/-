import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Scale, 
  Handshake, 
  Landmark, 
  Wrench, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  AlertTriangle,
  Layers,
  Sprout,
  TrendingUp,
  Compass
} from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

interface CorporatePartnerSectionProps {
  onOpenPartnerPage: () => void;
  onOpenContact: (type?: string) => void;
}

export const CorporatePartnerSection: React.FC<CorporatePartnerSectionProps> = ({
  onOpenPartnerPage,
  onOpenContact,
}) => {
  // 不動産業者の提携 4つの分類
  const fourCategories = [
    {
      number: '①',
      name: '接道・建築制限系',
      tagline: '調整区域 ／ 再建築不可 ／ 旗竿地',
      feature: 'ほぼ同じ専門業者がセットで対応',
      icon: AlertTriangle,
      desc: '建築・接道に制限がある土地を同じ切り口として集約。最短即日回答のスピード査定・直接買取に対応。',
      items: ['市街化調整区域（既存宅地等）', '接道義務未充足・再建築不可', '旗竿地（路地状敷地）・狭小不整形地'],
    },
    {
      number: '②',
      name: '権利関係が複雑な系',
      tagline: '共有持分 ／ 借地・底地',
      feature: '他の権利者・地主との交渉スキル',
      icon: Layers,
      desc: '合意形成ノウハウが必要な共通スキルセット。持分のみ・底地のみの直接買い取りや地主交渉を代行。',
      items: ['相続等に伴う共有持分のみの売却', '借地権・借地権付き建物の整理', '底地（貸宅地）・同時売却・等価交換'],
    },
    {
      number: '③',
      name: '農地',
      tagline: '農地法許可 ／ 農業委員会対応',
      feature: '許認可が絡むため独立管理',
      icon: Sprout,
      desc: '農業委員会手続きや農地法（3・4・5条）が絡むため単独で専門対応。転用を見据えた実需者マッチングも実施。',
      items: ['田・畑・市街化調整区域の農地', '耕作放棄地・後継者不在の農地', '農地転用（5条転用）による開発・資材置場化'],
    },
    {
      number: '④',
      name: '開発・収益系',
      tagline: 'アパート開発 ／ 収益物件専門',
      feature: '建てる・運用する目的で別扱い',
      icon: TrendingUp,
      desc: '土地の欠陥を買うのではなく「収益化・運用」を行う専門業者様向け。利回り重視のボリューム検討と仕入れ連携。',
      items: ['アパート・戸建賃貸の開発適地', '一棟RC/S/木造収益マンション', 'ロードサイド店舗・工場・事業用地'],
    },
  ];

  return (
    <section id="partner" className="py-20 sm:py-24 bg-slate-50/70 border-t border-slate-200 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold tracking-widest uppercase">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            REAL ESTATE ALLIANCE / 不動産業者の提携
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            不動産業者の提携 <span className="text-[#96723e]">４つの分類</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            株式会社CTC 心誠不動産では、提携業者様の強み・専門スキル・買取属性に合わせて<br className="hidden sm:inline" />
            提携スキームを<strong>合理的に4つに分類</strong>し、スピーディーかつ透明性の高い協業体制を敷いています。
          </p>
        </motion.div>

        {/* 4 Classifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {fourCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#96723e]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-sky-600 text-white">
                      分類 {cat.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mincho text-xl font-bold text-slate-900">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-bold text-[#96723e] mt-1">
                      {cat.tagline}
                    </p>
                    <span className="inline-block text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded mt-1.5">
                      {cat.feature}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-700">主な対象：</div>
                    {cat.items.map((it, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-tight">
                        <CheckCircle2 className="w-3 h-3 text-[#96723e] shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={onOpenPartnerPage}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-sky-600 text-slate-800 hover:text-white border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                  >
                    <span>提携詳細・案件相談へ</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-600 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting Mini-Alliances (士業・金融機関・施工会社) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">ALLIANCE NETWORK</span>
              <h4 className="font-mincho text-lg font-bold text-slate-900">
                士業・金融機関・各種専門事業者様との提携
              </h4>
            </div>
            <button
              onClick={onOpenPartnerPage}
              className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
            >
              <span>法人専用ページですべて見る</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-sky-600" />
                <span>弁護士・司法書士・税理士様</span>
              </div>
              <p className="text-[11px] text-slate-600">遺産分割・任意売却・破産管財の査定書作成、難解物件の直接買取</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-sky-600" />
                <span>金融機関・サービサー様</span>
              </div>
              <p className="text-[11px] text-slate-600">全23行との取引実績。担保適正評価、任意売却による債権回収支援</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-sky-600" />
                <span>施工・解体・整理業者様</span>
              </div>
              <p className="text-[11px] text-slate-600">リノベーション・解体更地渡しの継続的発注、有資格専門協業</p>
            </div>
          </div>
        </div>

        {/* Highlight Banner / CTA (爽やかな水色グラデーション) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-sky-600 via-sky-700 to-cyan-700 text-white rounded-3xl p-6 sm:p-10 border border-sky-500 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-200" />
                秘密厳守・スピード決済・全23金融機関取引網
              </div>
              <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-white leading-snug">
                案件のご相談・共同仲介・買取査定など<br className="hidden sm:inline" />
                まずはお気軽にお声がけください
              </h3>
              <p className="text-xs sm:text-sm text-sky-100 leading-relaxed max-w-2xl">
                自然災害調査士・外壁診断士・石綿主任者などの建築技術資格者が在籍し、物件の瑕疵や修繕費を即座に見極めます。同業者様からの買取持ち込みや、提携・共同事業のご相談を最優先で対応いたします。
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOpenPartnerPage}
                className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-sky-50 text-sky-900 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-sky-600" />
                <span>提携詳細・専用窓口へ</span>
              </button>
              <a
                href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`}
                className="w-full py-3.5 px-5 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold border border-white/30 flex items-center justify-center gap-2 transition-all font-mono"
              >
                <Phone className="w-4 h-4 text-sky-200" />
                <span>直通: {COMPANY_DATA.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
