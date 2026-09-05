import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Banknote, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  AlertCircle,
  FileText,
  ChevronRight,
  Sparkles,
  TrendingUp,
  KeyRound,
  Hammer
} from 'lucide-react';

interface SellingExitStrategyProps {
  onOpenEstimate: () => void;
  onInquire: (topic: string) => void;
}

export const SellingExitStrategy: React.FC<SellingExitStrategyProps> = ({
  onOpenEstimate,
  onInquire,
}) => {
  // Exit strategy active tab
  const [activeStrategy, setActiveStrategy] = useState<'brokerage' | 'buyout' | 'leaseback' | 'as_is'>('brokerage');

  // Net Proceeds Simulator State
  const [price, setPrice] = useState<number>(2800); // 万円
  const [loanBalance, setLoanBalance] = useState<number>(800); // 万円
  const [isBuyoutMode, setIsBuyoutMode] = useState<boolean>(false);
  const [needDemolition, setNeedDemolition] = useState<boolean>(false);
  const [applyTaxExemption, setApplyTaxExemption] = useState<boolean>(true); // 3000万円特別控除

  // Cost Calculations
  const brokerageFee = isBuyoutMode ? 0 : Math.round((price * 0.03 + 6) * 1.1 * 10) / 10;
  const stampDuty = price <= 1000 ? 0.5 : price <= 5000 ? 1 : 3; // 万円
  const registrationFee = loanBalance > 0 ? 5 : 2; // 抵当権抹消等 (万円)
  const demolitionCost = needDemolition ? 150 : 0; // 万円
  const capitalGain = Math.max(0, price - 1500); // rough assumption
  const taxAmount = applyTaxExemption ? 0 : Math.round(capitalGain * 0.20315 * 10) / 10;

  const totalDeductions = Math.round((brokerageFee + stampDuty + registrationFee + demolitionCost + loanBalance + taxAmount) * 10) / 10;
  const netProceeds = Math.max(0, Math.round((price - totalDeductions) * 10) / 10);

  const strategies = [
    {
      id: 'brokerage',
      badge: '01 / 一般市場向け売却',
      title: '不動産仲介（高値追求）',
      tagline: '時間をかけて、市場の適正価格〜最高値を目指す王道の出口',
      description: 'ポータルサイトや東日本レインズ、独自の購入顧客ネットワークを活用し、一般のエンドユーザー買主を探します。売却時期に余裕があり、手元に残る資金を最大化したい方に最適です。',
      merits: [
        '市場相場の上限価格・最高値での売却が期待できる',
        '住宅ローン完済後の残債清算・住み替え資金を多く残せる',
        '売却条件や引き渡し時期を売主主導で交渉可能'
      ],
      caution: '成約までに一定の期間（目安3〜6ヶ月）と、購入希望者の内覧対応が必要です。',
      suitableFor: '住み替え資金を多く残したい方、時間に余裕がある方',
      speed: '3〜6ヶ月程度',
      cost: '仲介手数料（法定上限：3%+6万円+税）',
      responsibility: '一定期間の契約不適合責任あり'
    },
    {
      id: 'buyout',
      badge: '02 / 即時現金化・直接買取',
      title: '不動産買取（スピード売却）',
      tagline: '心誠不動産が直接購入。最短数日で契約・現金決済が完了する出口',
      description: '一般の買主を探すのではなく、当社または提携不動産会社が直接買い取ります。近所に売却活動を知られたくない方や、相続税納付期限が迫っている方、残置物の片付けが困難な方に選ばれています。',
      merits: [
        '最短数日〜2週間で即現金化（期日指定可能）',
        '仲介手数料が不要（0円）',
        '契約不適合責任（売却後の雨漏り・シロアリ等の修補責任）が完全免責',
        '荷物やゴミが残ったままでも、現況そのままで引き渡し可能'
      ],
      caution: '市場価格の70%〜85%程度が買取目安となります。',
      suitableFor: '期限がある方、周囲に知られず秘密裏に売却したい方、片付けが面倒な方',
      speed: '最短3日〜2週間',
      cost: '仲介手数料 0円',
      responsibility: '完全免責（売主責任なし）'
    },
    {
      id: 'leaseback',
      badge: '03 / 住み続けながら資金化',
      title: 'リースバック（賃貸居住継続）',
      tagline: '自宅を売却して一括資金を得つつ、家賃を払って住み慣れた家に住み続ける出口',
      description: '自宅の所有権を買取先へ移転し、まとまった売却代金を受け取った上で、賃貸借契約を締結してそのまま生活を続けられます。引っ越す必要がなく、近所にも売却したことが一切分かりません。',
      merits: [
        '住み慣れた自宅・近所環境を変えずに生活を継続できる',
        'まとまった老後資金や医療費・事業資金の確保',
        '固定資産税・都市計画税の支払いが不要になる',
        '将来の買い戻し特約を設定できるプランもご用意'
      ],
      caution: '毎月の家賃支払いが発生します。物件やエリアによって適用審査があります。',
      suitableFor: '引っ越しをしたくない高齢世帯、住宅ローン返済を一度リセットしたい方',
      speed: '2週間〜1ヶ月',
      cost: '仲介手数料または買取事務手数料',
      responsibility: '賃貸借契約への移行'
    },
    {
      id: 'as_is',
      badge: '04 / 古家・空き家・現況有姿',
      title: '現況有姿・古家付き土地',
      tagline: '解体費用やリフォームをかけず、そのままの状態で次へ引き継ぐ出口',
      description: '「古い家を取り壊してから売るべきか？」と迷われる方が多くいらっしゃいますが、解体には数百万円の自己資金が必要となり、更地にすると固定資産税が最大6倍に跳ね上がります。心誠不動産では現況のままでの出口を最優先に比較検討します。',
      merits: [
        '解体工事費用（150万〜300万円）の持ち出しが一切不要',
        '建物付きのままなら住宅用地特例で固定資産税を低く抑えられる',
        'DIY型リノベーション需要や古民家再生の買主とのマッチング',
        '現況引渡し＋契約不適合免責特約で安心'
      ],
      caution: '建物の倒壊危険性や残置物の量に応じて、適正な価格調整が必要です。',
      suitableFor: '遠方の空き家を相続した方、解体資金を出したくない方',
      speed: '1〜3ヶ月',
      cost: '現況での査定',
      responsibility: '特約により免責可能'
    }
  ];

  const currentStrategy = strategies.find((s) => s.id === activeStrategy) || strategies[0];

  return (
    <section id="sale" className="py-20 sm:py-24 bg-[#f8fafc] text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            01 / SELL & BUYOUT & EXIT STRATEGY
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            売却の方法は、一つではありません。<br className="hidden sm:inline" />
            <span className="text-amber-700 underline decoration-amber-300 decoration-4 underline-offset-8">
              出口から逆算して、納得の選択を。
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-5 leading-relaxed">
            「いくら手元に残るのか」「いつまでに現金化できるか」「近所に知られずに進められるか」。<br className="hidden sm:inline" />
            大切にしたいご事情を伺い、仲介・直接買取・リースバック・現況有姿の4つの出口から、あなたに最も有利な選択肢を正直にご提案します。
          </p>
        </motion.div>

        {/* 4 Strategy Selection Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {strategies.map((strat) => {
            const isActive = strat.id === activeStrategy;
            return (
              <button
                key={strat.id}
                onClick={() => setActiveStrategy(strat.id as any)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-white border-amber-500 text-slate-900 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className={`text-[11px] font-mono font-bold mb-1 ${isActive ? 'text-amber-700' : 'text-slate-500'}`}>
                  {strat.badge}
                </div>
                <div className="font-bold text-sm sm:text-base text-slate-900">
                  {strat.title}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1 hidden sm:block">
                  {strat.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Strategy Card with Motion */}
        <motion.div 
          key={activeStrategy}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
                  {currentStrategy.badge}
                </span>
                <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {currentStrategy.title}
                </h3>
                <p className="text-amber-800 text-sm sm:text-base font-bold mt-2">
                  {currentStrategy.tagline}
                </p>
                <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                  {currentStrategy.description}
                </p>
              </div>

              {/* Merits */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>この出口を選ぶメリット</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentStrategy.merits.map((merit, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-snug font-medium">{merit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caution & Suitable */}
              <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs text-amber-950 space-y-1">
                <div className="font-bold text-amber-900">事前に知っておきたい留意点:</div>
                <p className="text-slate-700 leading-relaxed">{currentStrategy.caution}</p>
              </div>
            </div>

            {/* Quick Specs Column */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200 pb-2.5 flex items-center justify-between">
                <span>出口条件の目安スペック</span>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">心誠不動産基準</span>
              </h4>

              <div className="divide-y divide-slate-200 text-xs">
                <div className="py-3 flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-amber-600" />
                    現金化までのスピード
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{currentStrategy.speed}</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    仲介手数料
                  </span>
                  <span className="font-bold text-emerald-700 text-sm">{currentStrategy.cost}</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    契約不適合責任
                  </span>
                  <span className="font-bold text-slate-900">{currentStrategy.responsibility}</span>
                </div>
                <div className="py-3 flex justify-between items-start pt-3">
                  <span className="text-slate-600 font-medium">特におすすめの方</span>
                  <span className="text-right text-slate-800 font-bold max-w-[200px]">
                    {currentStrategy.suitableFor}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onInquire(`【売却出口の相談】${currentStrategy.title}について相談したい`)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <span>{currentStrategy.title}の相談をする</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE NET PROCEEDS SIMULATOR (売却手残り資金シミュレーター) */}
        {/* ------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl mb-16 relative overflow-hidden"
        >
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider mb-2 border border-amber-200">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              NET PROCEEDS SIMULATOR
            </div>
            <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-slate-900">
              売却手残り資金シミュレーター
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
              売却価格から仲介手数料・印紙代・ローン残債を差し引いて、「最終的に手元に残る現金」を具体的に試算できます。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Method Switch: Brokerage vs Buyout */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">売却方法の選択</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBuyoutMode(false)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      !isBuyoutMode 
                        ? 'bg-[#1e2638] text-white border-[#1e2638] shadow-xs' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    仲介での売却（市場相場）
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBuyoutMode(true)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isBuyoutMode 
                        ? 'bg-[#96723e] text-white border-[#96723e] shadow-xs' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    当社直接買取（仲介手数料0円）
                  </button>
                </div>
              </div>

              {/* Price Slider */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-bold">売却想定価格</span>
                  <span className="text-2xl font-extrabold text-amber-700 font-mono">
                    {price.toLocaleString()} <span className="text-xs font-normal text-slate-600">万円</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={8000}
                  step={50}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>500万円</span>
                  <span>4,000万円</span>
                  <span>8,000万円</span>
                </div>
              </div>

              {/* Loan Balance Slider */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-bold">住宅ローン残債</span>
                  <span className="text-xl font-bold text-slate-900 font-mono">
                    {loanBalance.toLocaleString()} <span className="text-xs font-normal text-slate-600">万円</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={50}
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(Number(e.target.value))}
                  className="w-full accent-slate-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>0万円（完済済）</span>
                  <span>2,500万円</span>
                  <span>5,000万円</span>
                </div>
              </div>

              {/* Options check */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={needDemolition}
                    onChange={(e) => setNeedDemolition(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600"
                  />
                  <div>
                    <div className="text-slate-900 font-bold">建物の解体費用を考慮</div>
                    <div className="text-[11px] text-slate-500">更地渡し想定 約150万円</div>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={applyTaxExemption}
                    onChange={(e) => setApplyTaxExemption(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600"
                  />
                  <div>
                    <div className="text-slate-900 font-bold">居住用財産の3,000万円特別控除</div>
                    <div className="text-[11px] text-slate-500">マイホーム売却特例（税金0円計算）</div>
                  </div>
                </label>
              </div>

            </div>

            {/* Simulation Result Column (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#1e2638] to-[#151c2a] text-white rounded-3xl p-6 sm:p-7 border border-slate-700 shadow-xl space-y-5">
              <div className="border-b border-slate-700/80 pb-4">
                <div className="text-xs text-[#c29d66] font-bold tracking-wider uppercase">
                  手元に残る現金（手残り概算）
                </div>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="font-mincho text-4xl sm:text-5xl font-extrabold text-[#c29d66] font-mono">
                    {netProceeds.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-slate-300">万円</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  ※ 売却価格 {price}万円 － 諸費用・残債合計 {totalDeductions}万円
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="space-y-2 text-xs divide-y divide-slate-800/80">
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>仲介手数料（税込）</span>
                  <span className="font-bold text-white">
                    {isBuyoutMode ? '0 万円 (買取時不要)' : `${brokerageFee} 万円`}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>印紙税</span>
                  <span className="font-bold text-white">{stampDuty} 万円</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>抵当権抹消・司法書士費用</span>
                  <span className="font-bold text-white">{registrationFee} 万円</span>
                </div>
                {loanBalance > 0 && (
                  <div className="flex justify-between py-1.5 text-slate-300">
                    <span>住宅ローン一括完済残代金</span>
                    <span className="font-bold text-amber-300">{loanBalance} 万円</span>
                  </div>
                )}
                {needDemolition && (
                  <div className="flex justify-between py-1.5 text-slate-300">
                    <span>解体・残置物処分費用概算</span>
                    <span className="font-bold text-white">{demolitionCost} 万円</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>譲渡所得税等（概算）</span>
                  <span className="font-bold text-white">
                    {applyTaxExemption ? '0 万円 (3000万控除適用想定)' : `${taxAmount} 万円`}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80 text-[11px] text-slate-300 leading-relaxed">
                ※ 実際の売却額や手残り額は、敷地境界確認・測量の有無、建物の劣化診断等によって変動します。現地確認の上で公図と照らし合わせて丁寧にご提示いたします。
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={onOpenEstimate}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>この条件でかんたん査定相談文を作る</span>
                </button>
                <button
                  onClick={() => onInquire(`【手残り資金の相談】想定価格${price}万円・ローン残債${loanBalance}万円での売却出口相談`)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 border border-amber-400/30 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>専門スタッフに直接手残りを精査してもらう</span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* HOW IT WORKS: 出口までの7ステップ・ロードマップ */}
        {/* ------------------------------------------------------------- */}
        <motion.div 
          id="flow" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="border-t border-slate-200 pt-16"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-widest uppercase mb-2 border border-slate-200">
              HOW IT WORKS
            </div>
            <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-slate-900">
              売却相談から、お引き渡し・確定申告まで。
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              初めて売却される方でも安心して進められるよう、段階ごとに明確な根拠と条件をご説明します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: 'STEP 01',
                title: 'ご相談・現状の整理',
                desc: '売却の目的、希望時期、住宅ローン残債の有無などをお伺いします。売るか未定の段階でもお気軽にご相談ください。'
              },
              {
                step: 'STEP 02',
                title: '現地調査・詳細査定',
                desc: '外壁診断士・自然災害調査士などの専門知識を活かし、建物の状態、境界、法令上の制限、周辺成約相場を総合調査。'
              },
              {
                step: 'STEP 03',
                title: '出口戦略・価格のご提案',
                desc: '「仲介」と「買取」の両面から価格と条件を提示。現況渡し・更地渡しの手残り比較など納得いくまで検討できます。'
              },
              {
                step: 'STEP 04',
                title: '媒介契約・販売開始',
                desc: '仲介の場合はポータルサイト（SUUMO等）や既存購入顧客へアプローチ。秘密裏に進めたい場合は水面下で売却。'
              },
              {
                step: 'STEP 05',
                title: '売買契約の締結',
                desc: '購入希望者との価格・引渡し条件を調整し、重要事項説明を実施。契約不適合責任の免責特約など売主様の権利を守ります。'
              },
              {
                step: 'STEP 06',
                title: '残代金決済・お引き渡し',
                desc: '買主様から残代金を受領し、住宅ローンを全額一括完済・抵当権抹消。鍵をお渡しして引き渡しが完了します。'
              },
              {
                step: 'STEP 07',
                title: '確定申告・税務サポート',
                desc: '居住用財産の3,000万円特別控除や相続空き家の特例など、顧問税理士と連携して税務アドバイスまでフォロー。'
              },
              {
                step: 'POINT',
                title: '先義先利の誠実サポート',
                desc: '「利益のために売らせる」のではなく、お客様にとって今売るべきかどうかも含めて誠実に寄り添います。'
              }
            ].map((s, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border transition-all ${
                  s.step === 'POINT' 
                    ? 'bg-amber-50/70 border-amber-300 shadow-sm' 
                    : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-xs font-mono font-bold text-amber-700 mb-1.5">
                  {s.step}
                </div>
                <div className="font-bold text-slate-900 text-sm mb-2">
                  {s.title}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
            ※ 査定額は売却価格・買取価格を保証するものではありません。取引に伴う諸費用は個別にご案内します。
          </div>
        </motion.div>

      </div>
    </section>
  );
};
