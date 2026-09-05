import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Scale, 
  Handshake, 
  Landmark, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Send,
  Users,
  Compass,
  AlertTriangle,
  Layers,
  Sprout,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

interface CorporatePartnerPageProps {
  onBackToHome: () => void;
  onOpenContact: (type?: string) => void;
}

export const CorporatePartnerPage: React.FC<CorporatePartnerPageProps> = ({
  onBackToHome,
  onOpenContact,
}) => {
  // Active tab for real estate partner 4 categories
  const [activeCategory, setActiveCategory] = useState<'access_limit' | 'complex_rights' | 'farmland' | 'development'>('access_limit');
  
  // Form states
  const [partnerClassification, setPartnerClassification] = useState<string>('access_limit');
  const [companyName, setCompanyName] = useState('');
  const [department, setDepartment] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactPerson.trim() || !email.trim() || !phone.trim()) {
      return;
    }
    setIsSubmitted(true);
  };

  // 不動産業者の提携 4大分類 (ユーザー指定の設計)
  const realEstatePartnerCategories = [
    {
      id: 'access_limit' as const,
      number: '①',
      name: '接道・建築制限系',
      tagline: '調整区域 ／ 再建築不可 ／ 旗竿地',
      badge: 'ほぼ同じ業者が扱う専門領域',
      color: 'from-blue-900 to-indigo-950',
      accentColor: 'text-sky-400',
      icon: AlertTriangle,
      rationale: 'この3つは「建築・接道に制限がある土地」という同じ切り口で、専門買取業者はだいたいセットで対応しています。',
      targetProperties: [
        '市街化調整区域の既存宅地・線引き前宅地・資材置場適地',
        '建築基準法第42条の道路に2m以上接していない「再建築不可」物件',
        '通路幅が狭く奥まった敷地「旗竿地（路地状敷地）」や不整形地',
        'セットバック未了の狭あい道路に面した築古戸建・空き家',
      ],
      partnerBenefits: [
        '最短即日〜翌営業日の迅速な直接買取査定・現金化対応',
        '契約不適合責任免責・現況有姿（古家・残置物・雑木林そのまま）での引渡し可',
        '建築資格者（外壁診断士・自然災害調査士等）による解体・改修費用の即座な試算',
        '建築基準法第43条但し書き・開発許可等の行政調査を自社で迅速代行',
      ],
      note: '※一般仲介では買い手が見つかりにくい難解な土地でも、専門買取業者様と連携して最短で出口を創出します。',
    },
    {
      id: 'complex_rights' as const,
      number: '②',
      name: '権利関係が複雑な系',
      tagline: '共有持分 ／ 借地・底地',
      badge: 'これも同じ業者が多い専門領域',
      color: 'from-amber-900 to-stone-900',
      accentColor: 'text-amber-400',
      icon: Layers,
      rationale: '「他の権利者・地主との交渉が必要」という同じスキルセットなので、この2つも同じ専門業者が扱っていることが多いです。',
      targetProperties: [
        '遺産相続等で複数人名義となり一部のみ売却したい「共有持分」',
        '借地権（旧法借地・普通借地・定期借地）および借地権付き古家',
        '地代収入のみで固定資産税や管理に悩む「底地（貸宅地）」',
        '地主様と借地人様の間で意見が合わない・境界が未確定の土地',
      ],
      partnerBenefits: [
        '他の共有者や地主様との専門的な権利調整・円滑な合意形成ノウハウ',
        '「自分の共有持分だけ」「底地だけ」の単独直接買取への対応',
        '提携弁護士・司法書士・税理士と連携した遺産分割や登記のワンストップ解決',
        '地主様と借地人様双方の同時売却・等価交換による資産価値最大化',
      ],
      note: '※親族間トラブルや地主交渉で膠着している案件も、秘密厳守で丁寧に進められます。',
    },
    {
      id: 'farmland' as const,
      number: '③',
      name: '農地',
      tagline: '農地法の許可 ／ 農業委員会対応',
      badge: '単独で残す方が安全な専門領域',
      color: 'from-emerald-900 to-slate-900',
      accentColor: 'text-emerald-400',
      icon: Sprout,
      rationale: '農地法の許可・農業委員会対応が絡むので、①②と業者が重ならないケースもあります。ただ地域によっては①の業者が農地も一緒に扱っていることもあるので、実際に開拓しながら「同じ業者だった」と分かれば統合すればOKです。',
      targetProperties: [
        '田・畑・果樹園（市街化区域農地・市街化調整区域農地）',
        '農業従事者の後継者不在による耕作放棄地・休耕地',
        '農用地区域（青地）除外手続きが必要な農地',
        '宅地・資材置場・駐車場・太陽光発電用地への転用希望農地',
      ],
      partnerBenefits: [
        '農地法第3条（農地としての権利移転・農業者へのあっせん）の対応',
        '農地法第4条・第5条（農地転用許可申請・届出）を行政書士・土地家屋調査士と迅速連携',
        '各市町村の農業委員会との事前協議・現地調査の代行',
        '転用を前提とした事業用地・資材置場ニーズ企業様へのマッチング',
      ],
      note: '※行政手続きに時間のかかる農地も、許認可の見通しを早期に精査して最適な売却ルートを提案します。',
    },
    {
      id: 'development' as const,
      number: '④',
      name: '開発・収益系',
      tagline: 'アパート開発業者 ／ 収益物件専門業者',
      badge: '性質が違うので分けた専門領域',
      color: 'from-sky-600 to-cyan-700',
      accentColor: 'text-sky-100',
      icon: TrendingUp,
      rationale: 'こちらは「土地の欠陥を安く買う」話ではなく「建てる・運用する」話なので、①②③とは業者の毛色が違います。この2つも実際は重なる会社があるかもしれませんが、一旦は別扱いが無難です。',
      targetProperties: [
        '木造・軽量鉄骨アパート、戸建賃貸の開発適地（敷地40坪〜200坪超）',
        '既存の一棟RC・S造・木造マンション／アパート（オーナーチェンジ・空室対策要）',
        'ロードサイド店舗・工場・物流倉庫・配送センター向け事業用地',
        'リノベーション再販用の一棟再生・戸建リノベ投資用物件',
      ],
      partnerBenefits: [
        '東武東上線沿線（鶴ヶ島・川越・坂戸・東松山）の家賃相場・学生/単身者需要を踏まえたボリューム検討',
        '県内外全23金融機関との取引網を活用した投資家・ビルダー様への円滑な融資斡旋',
        '未公開の土地仕入れ情報の優先共有と透明な共同仲介',
        '竣工後の賃貸入居者募集（客付け）から管理・将来の出口戦略まで継続協業',
      ],
      note: '※「仕入れて建てる」「高利回りで運用する」専門業者様向けに、事業性の高い優良情報をダイレクトにお届けします。',
    },
  ];

  const currentCatData = realEstatePartnerCategories.find(c => c.id === activeCategory) || realEstatePartnerCategories[0];

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button 
            onClick={onBackToHome}
            className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>ホーム</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">不動産業者の提携・業務提携のご案内</span>
        </div>

        {/* Hero Banner (爽やかな水色グラデーション) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-sky-600 via-sky-700 to-cyan-700 text-white rounded-3xl p-8 sm:p-12 border border-sky-500 shadow-xl relative overflow-hidden"
        >
          {/* Subtle Background Badge */}
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
            <Building2 className="w-96 h-96 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-xs">
              <Handshake className="w-4 h-4 text-sky-200" />
              <span>REAL ESTATE ALLIANCE & PARTNERSHIP</span>
            </div>

            <h1 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              不動産業者様・買取専門会社様へ<br />
              <span className="text-sky-200">業務提携・4つの専門分類</span>のご案内
            </h1>

            <p className="text-sky-50 text-sm sm:text-base leading-relaxed pt-2">
              埼玉県西エリア（鶴ヶ島・川越・坂戸・東松山）に根差す株式会社CTC 心誠不動産では、
              業者様それぞれの強みや取り扱い属性に合わせて提携内容を<strong>明確に4分類</strong>し、
              スムーズな情報共有とスピード決済、公正な共同仲介を実現しています。<br className="hidden sm:inline" />
              <strong>「先義後利」</strong>の理念のもと、情報の囲い込みをせず、貴社との継続的なWin-Winの協業を推進いたします。
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#partner-form"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-sky-50 text-sky-900 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <Mail className="w-4 h-4 text-sky-600" />
                <span>提携・案件相談フォームへ</span>
              </a>
              <a
                href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`}
                className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/30 flex items-center gap-2 transition-all font-mono"
              >
                <Phone className="w-4 h-4 text-sky-200" />
                <span>業者様専用直通: {COMPANY_DATA.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4 CLASSIFICATIONS OF REAL ESTATE ALLIANCE (USER SPECIFIED) */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold tracking-wider">
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              提携先業者様の属性に応じた合理的な区分
            </div>
            <h2 className="font-mincho text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              不動産業者の提携 ４つの分類
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              物件の制限・交渉スキル・許認可・開発目的の性質に合わせて4つに分類して連携しています。<br className="hidden sm:inline" />
              貴社の得意とする領域をお選びいただき、ぜひ強みを活かした協業をご検討ください。
            </p>
          </div>

          {/* 4 Category Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {realEstatePartnerCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-5 rounded-3xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-600 shadow-lg ring-2 ring-sky-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {cat.number} 分類
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-mincho text-lg font-bold leading-snug">
                        {cat.name}
                      </h3>
                      <p className={`text-xs font-semibold mt-1 ${isSelected ? 'text-sky-100' : 'text-sky-600'}`}>
                        {cat.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/50">
                    <span className={`text-[11px] font-medium leading-tight block ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                      {cat.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Classification Deep-Dive Card */}
          <motion.div
            key={currentCatData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8"
          >
            {/* Header of Detail */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <currentCatData.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                      分類 {currentCatData.number}
                    </span>
                    <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">
                      CATEGORY PROFILE
                    </span>
                  </div>
                  <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                    {currentCatData.name} <span className="text-base sm:text-lg font-normal text-slate-500 font-sans">（{currentCatData.tagline}）</span>
                  </h3>
                </div>
              </div>
              <span className="inline-flex self-start md:self-center px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">
                {currentCatData.badge}
              </span>
            </div>

            {/* Why This Grouping Exists (Rationale from User Specification) */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border-l-4 border-l-[#96723e] border-y border-r border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#96723e]" />
                <span>分類の背景と業者の特徴（なぜこの切り口なのか）</span>
              </div>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                {currentCatData.rationale}
              </p>
              <div className="text-xs text-slate-500 pt-1">
                {currentCatData.note}
              </div>
            </div>

            {/* 2 Column Details: Target Properties vs Benefits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Target Properties */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                    対象
                  </div>
                  <h4 className="font-mincho text-base font-bold text-slate-900">
                    取り扱い対象となる主な物件・土地
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {currentCatData.targetProperties.map((prop, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#96723e] shrink-0 mt-2" />
                      <span>{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partnership Merits */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-[#c29d66]/20 text-[#96723e] flex items-center justify-center font-bold text-xs">
                    連携
                  </div>
                  <h4 className="font-mincho text-base font-bold text-slate-900">
                    心誠不動産との提携メリット・連携スキーム
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {currentCatData.partnerBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#96723e] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Quick Consultation Button */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                ※該当する案件をお持ちの仲介業者様・買取再販業者様、または買い手として登録希望の業者様もお気軽にご連絡ください。
              </div>
              <a
                href="#partner-form"
                onClick={() => setPartnerClassification(currentCatData.id)}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs"
              >
                <span>【{currentCatData.name}】について提携・案件相談</span>
                <ArrowRight className="w-4 h-4 text-sky-100" />
              </a>
            </div>

          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* OTHER ALLIANCES: Legal, Financial, Construction */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              ALLIANCE NETWORK / 各種専門機関との協業
            </div>
            <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-slate-900">
              士業・金融機関・施工業者様との包括的提携
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              不動産売買に伴う法務・税務・融資・建築工事を各分野のプロと連携してワンストップで支えています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Legal */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-mincho text-lg font-bold text-slate-900">
                弁護士・税理士・司法書士様
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                遺産分割・成年後見・任意売却・破産管財に伴う不動産価格査定書の無料作成。権利調整や相続登記義務化への実務対応をバックアップします。
              </p>
            </div>

            {/* Finance */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-mincho text-lg font-bold text-slate-900">
                金融機関・サービサー様
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                全23金融機関との確固たる取引実績。担保不動産の現地適正評価、任意売却による円滑な債権回収、取引先企業の事業承継・遊休地処分を支援します。
              </p>
            </div>

            {/* Construction */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-mincho text-lg font-bold text-slate-900">
                施工・解体・遺品整理業者様
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                自社買取物件のリフォーム・解体更地渡しの継続的な相互発注。自然災害調査士・外壁診断士・石綿主任者としての有資格協業を推進します。
              </p>
            </div>
          </div>
        </div>

        {/* 3 Strong Advantages of CTC 心誠不動産 (爽やかな水色グラデーション) */}
        <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-cyan-700 text-white rounded-3xl p-8 sm:p-12 border border-sky-500 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              OUR COMMITMENT
            </div>
            <h2 className="font-mincho text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              提携先企業様から選ばれる3つの理由
            </h2>
            <p className="text-xs sm:text-sm text-sky-100">
              机上の計算だけでなく、現場力と確かな財務・信用基盤でスピーディーに応えます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-lg font-mono">
                01
              </div>
              <h4 className="font-mincho text-lg font-bold text-white">
                建築現場のプロフェッショナル資格
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                自然災害調査士、外壁診断士、石綿（アスベスト）作業主任者等の現場技術資格を保有。建物の修繕・解体費用を即座に見積もれるため、査定・買取の判断が圧倒的に早いです。
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#c29d66]/20 text-[#c29d66] flex items-center justify-center font-bold text-lg font-mono">
                02
              </div>
              <h4 className="font-mincho text-lg font-bold text-white">
                全23金融機関との確固たる取引実績
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                埼玉りそな・武蔵野銀行をはじめ、メガバンク・地方銀行・信用金庫計23行と取引関係があり、融資付けや自社買取の決済スピードに絶対の自信を持っています。
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#c29d66]/20 text-[#c29d66] flex items-center justify-center font-bold text-lg font-mono">
                03
              </div>
              <h4 className="font-mincho text-lg font-bold text-white">
                「先義後利」と情報の囲い込みゼロ
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                ご紹介くださった法人様・先生方の信用を何よりも大切にします。情報を囲い込まず、透明性のあるオープンな流通で最善の取引を実現します。
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Workflow (4 Steps) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <div className="text-xs font-bold text-[#96723e] uppercase tracking-wider">
              FLOW / 提携・案件相談の流れ
            </div>
            <h3 className="font-mincho text-2xl font-bold text-slate-900">
              ご相談から協業までのシンプルな4ステップ
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'お問い合わせ・面談',
                desc: 'お電話・Webフォームよりお気軽にご連絡ください。オンラインまたは貴社へのご訪問面談も対応いたします。',
              },
              {
                step: '02',
                title: '案件のご相談・査定依頼',
                desc: '具体的な案件や査定対象物件の情報をお預かりします。秘密保持契約（NDA）締結も迅速に行います。',
              },
              {
                step: '03',
                title: '現地調査・プランご提示',
                desc: '建築資格者による現場確認と役所調査を経て、無料査定書や買取金額・売却スキームをご提示します。',
              },
              {
                step: '04',
                title: '共同業務・継続的な連携',
                desc: 'クライアント様との合意形成・契約・決済まで誠心誠意サポート。定期的な情報交換へと繋げます。',
              },
            ].map((st, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                <div className="text-sm font-bold font-mono text-[#96723e]">STEP {st.step}</div>
                <h4 className="font-mincho text-sm font-bold text-slate-900">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Corporate Contact Form */}
        <div id="partner-form" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
              <Mail className="w-3.5 h-3.5 text-[#96723e]" />
              <span>不動産業者様・法人様専用 提携相談窓口</span>
            </div>
            <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-slate-900">
              業務提携・物件買取・共同仲介のお問い合わせ
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              秘密厳守にて担当役員より24時間以内に折り返しご連絡申し上げます。
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-mincho text-2xl font-bold text-slate-900">
                お問い合わせありがとうございます
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                提携・案件お問い合わせを受け付けました。<br />
                担当役員より、ご指定のお電話番号またはメールアドレスへ迅速にご連絡差し上げます。
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 px-6 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-colors cursor-pointer"
              >
                別の案件について問い合わせる
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    貴社名 / 事務所名 <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-600 text-white font-normal ml-1">必須</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例: 株式会社〇〇 / 〇〇法律事務所"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    部署 / 役職
                  </label>
                  <input
                    type="text"
                    placeholder="例: 不動産仕入部 / 開発営業 / 代表取締役"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ご担当者様氏名 <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-600 text-white font-normal ml-1">必須</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例: 山田 太郎"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    提携・対象物件の分類 <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-600 text-white font-normal ml-1">必須</span>
                  </label>
                  <select
                    value={partnerClassification}
                    onChange={(e) => setPartnerClassification(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none cursor-pointer"
                  >
                    <optgroup label="不動産業者様・買取専門会社様（4分類）">
                      <option value="access_limit">① 接道・建築制限系（調整区域／再建築不可／旗竿地）</option>
                      <option value="complex_rights">② 権利関係が複雑な系（共有持分／借地・底地）</option>
                      <option value="farmland">③ 農地（農地法許可・農業委員会対応）</option>
                      <option value="development">④ 開発・収益系（アパート開発／収益物件）</option>
                    </optgroup>
                    <optgroup label="士業・金融機関・その他業者様">
                      <option value="legal">士業様（相続・任意売却・査定書作成）</option>
                      <option value="finance">金融機関様（担保評価・任意売却・事業承継）</option>
                      <option value="construction">建築・解体・整理業者様（施工・送客提携）</option>
                      <option value="other">その他のお問い合わせ</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    メールアドレス <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-600 text-white font-normal ml-1">必須</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="corp@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    お電話番号 <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-600 text-white font-normal ml-1">必須</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="049-277-5294"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ご相談内容 / 案件概要
                </label>
                <textarea
                  rows={4}
                  placeholder="「再建築不可・調整区域の買取査定をお願いしたい」「共有持分のみの買い取りについて相談したい」「農地転用を絡めた売却案件がある」「鶴ヶ島・川越エリアでのアパート用地情報を探している」「共同仲介の面談を希望」など、お気軽にご記入ください。"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer border border-sky-500"
                >
                  <Send className="w-4 h-4 text-sky-100" />
                  <span>秘密厳守で提携・案件相談を送信する</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  ※ご入力いただいた企業・案件情報は秘密厳守にて取り扱い、提携対応以外の目的には一切使用いたしません。
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Return to Home Bottom Nav */}
        <div className="text-center pt-4">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 rounded-xl bg-white text-slate-700 hover:text-slate-900 font-bold text-xs border border-slate-300 hover:border-slate-400 shadow-xs transition-all cursor-pointer"
          >
            ← トップページへ戻る
          </button>
        </div>

      </div>
    </div>
  );
};
