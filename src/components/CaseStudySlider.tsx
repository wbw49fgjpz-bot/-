import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Building, 
  Home, 
  HelpCircle,
  Quote,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CaseStudy {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  area: string;
  customerProfile: string;
  situation: string;
  solution: string;
  result: string;
  proceeds: string;
  image: string;
  voice: string;
  timeTaken: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    category: '空き家・古家解体不要',
    categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    title: '家具や残置物もそのまま！解体費用300万円をかけずに直接買取成約',
    area: '埼玉県鶴ヶ島市松ヶ丘',
    customerProfile: '60代 ご夫婦（ご実家相続）',
    situation: 'ご両親が他界後、3年間空き家状態。大型タンスや生活用品が大量に残り、他社では「まず300万かけて解体・更地にしてから」と言われ困り果てていました。',
    solution: '当社の「現況有姿ルート」をご案内。家具の処分や解体を手出しゼロで当社引取先に手配し、そのままの状態での査定・直接買取を実行。',
    result: '手出し自己資金0円でスピーディーに現金化。周囲に売却を知られることなく、固定資産税の負担からも解放されました。',
    proceeds: '売却金額: 1,680万円（残置物処分費用相殺）',
    timeTaken: '相談から決済まで: 約10日間',
    voice: '「荷物もそのままでいいと言われた時は本当に肩の荷が下りました。親身に対応してくださり感謝しかありません。」',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-2',
    category: '高値売却・住み替え',
    categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
    title: '築18年の一戸建てを、相場より220万円高い最高値で仲介成約',
    area: '埼玉県川越市新宿町',
    customerProfile: '40代 ファミリー（お子様の進学に伴う住み替え）',
    situation: 'お子様の高校進学に合わせ駅近へ住み替え希望。住宅ローン残債が1,800万円あり、売却資金で完済して新居の頭金を作りたいというご相談でした。',
    solution: '外壁診断士の資格を持つ代表自ら建物の健全性を証明するレポートを作成。購入希望者に安心感を与えるオープンハウスとプロカメラ撮影でアピール。',
    result: '販売開始からわずか28日で成約。想定相場より220万円高く成約し、ローン完済後に約1,400万円の手残り資金を確保できました。',
    proceeds: '成約金額: 3,480万円（ローン完済・手残り約1,420万円）',
    timeTaken: '販売期間: 28日間',
    voice: '「建物の良いところをプロの視点で買主さんに熱心に伝えてくれました。次の新居探しまでワンストップでお世話になりました。」',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-3',
    category: 'リースバック・老後資金',
    categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
    title: '売却後も引っ越し不要！自宅に住み続けながらまとまった老後資金を確保',
    area: '埼玉県坂戸市千代田',
    customerProfile: '70代 単身女性',
    situation: '年金暮らしの中でリフォームや生活予備資金に不安がありましたが、長年住み慣れた地域やご近所付き合いから離れたくないとお悩みでした。',
    solution: 'ご自宅を提携パートナーに売却し、同時に賃貸借契約を締結する「リースバック」を提案。月々の賃料をご年金の範囲内に収まるよう交渉。',
    result: '売却代金の一括受取で将来の資金不安が解消。外見上も売却したことは近所に一切分からず、これまで通り安心して暮らされています。',
    proceeds: '売却金額: 2,100万円（一括入金・賃貸契約へ移行）',
    timeTaken: '相談から契約まで: 約3週間',
    voice: '「引越しをせずにまとまったお金ができて、毎日不安だった夜もぐっすり眠れるようになりました。」',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-4',
    category: '不整形地・狭小地',
    categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
    title: '他社で断られた旗竿地（通路奥の敷地）を隣地交渉＆分筆で無事成約',
    area: '埼玉県東松山市松葉町',
    customerProfile: '50代 男性（相続した土地の整理）',
    situation: '間口が2メートルぎりぎりで車が入らず、大手不動産会社に「売却は非常に困難」と匙を投げられていた土地でした。',
    solution: '接道要件の徹底調査と、隣地所有者様への丁寧な意向確認を実施。隣地の駐車場拡張ニーズとマッチングさせ、隣地への一部売却＋新築用地として再構成。',
    result: '諦めかけていた土地が適正価格で売却でき、無駄な固定資産税の支払いもストップしました。',
    proceeds: '売却金額: 1,350万円',
    timeTaken: '相談から成約まで: 約2ヶ月',
    voice: '「断られて途方に暮れていたところ、心誠不動産さんだけが足を運んで親身に動いてくれました。本当に感謝しています。」',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
  }
];

interface CaseStudySliderProps {
  onInquire: (topic: string) => void;
}

export const CaseStudySlider: React.FC<CaseStudySliderProps> = ({ onInquire }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentCase = CASE_STUDIES[currentIndex];

  useEffect(() => {
    if (isAutoPlay) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-amber-50/20 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>REAL STORIES & RESULTS</span>
            </div>
            <h2 className="font-mincho text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              売却・相談の成約事例スライド
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              「売れるか不安」「荷物が片付かない」実際のお客様がどう解決されたか、事例をご覧ください。
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="text-xs font-bold text-slate-500 font-mono">
              <span className="text-amber-600 font-bold text-base">{currentIndex + 1}</span> / {CASE_STUDIES.length}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer"
                aria-label="前へ"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer"
                aria-label="次へ"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Interactive Story Showcase (Slide with Motion) */}
        <div 
          className="relative bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Photo & Highlights (5 cols) */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[500px]">
                <img
                  src={currentCase.image}
                  alt={currentCase.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                
                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md border ${currentCase.categoryColor}`}>
                    {currentCase.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {currentCase.area}
                  </span>
                </div>

                {/* Bottom Highlight */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-white">
                  <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">成果・手残り実績</div>
                  <div className="font-mincho text-xl sm:text-2xl font-bold text-amber-400 mt-0.5">
                    {currentCase.proceeds}
                  </div>
                  <div className="text-xs text-slate-300 flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentCase.timeTaken}</span>
                  </div>
                </div>
              </div>

              {/* Right Story Details (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Customer Tag */}
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>ご相談者様:</span>
                    <span className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">{currentCase.customerProfile}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-mincho text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {currentCase.title}
                  </h3>

                  {/* 3 Step Story (Situation -> Solution -> Result) */}
                  <div className="space-y-3 pt-2">
                    {/* 1. Situation */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-rose-600 flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        【ご相談当初のお悩み・状況】
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {currentCase.situation}
                      </p>
                    </div>

                    {/* 2. Solution */}
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                      <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        【心誠不動産の解決アプローチ】
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {currentCase.solution}
                      </p>
                    </div>

                    {/* 3. Voice */}
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                      <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                        <Quote className="w-3.5 h-3.5 text-emerald-600" />
                        【お客様からの声】
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                        {currentCase.voice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action for similar case */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    似たような物件・お困りごともお気軽にご相談ください
                  </span>
                  <button
                    onClick={() => onInquire(`【成約事例の相談】「${currentCase.title}」のような条件で相談したい`)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>この事例に似た相談をする</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {CASE_STUDIES.map((c, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={c.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-400/20'
                    : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
                }`}
              >
                <div className="text-[10px] font-bold text-amber-700 mb-0.5 font-mono">CASE 0{idx + 1}</div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{c.category}</div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{c.area}</div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
