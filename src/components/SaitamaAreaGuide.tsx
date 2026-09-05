import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Train, 
  MapPin, 
  Compass, 
  ArrowRight, 
  Car
} from 'lucide-react';

interface SaitamaAreaGuideProps {
  onSelectArea: (cityName: string) => void;
}

export const SaitamaAreaGuide: React.FC<SaitamaAreaGuideProps> = ({ onSelectArea }) => {
  const [selectedStationId, setSelectedStationId] = useState<string>('tsurugashima');

  const stations = [
    {
      id: 'tsurugashima',
      name: '鶴ヶ島駅',
      line: '東武東上線',
      city: '鶴ヶ島市',
      features: '心誠不動産の拠点エリア。閑静な住宅街と公園が多く、池袋まで直通約42分の好アクセス。',
      priceRange: '新築戸建 2,700万〜3,500万円 / 土地坪単価 35万〜55万円',
      recommendFor: '子育てファミリー、都内通勤者',
      highlight: '圏央道鶴ヶ島IC・関越道鶴ヶ島JCTも至近で車の遠出も極めてスムーズ。'
    },
    {
      id: 'wakaba',
      name: '若葉駅',
      line: '東武東上線',
      city: '鶴ヶ島市・坂戸市',
      features: '駅直結の「ワカバウォーク」をはじめ、シネコン・スーパー・飲食店が充実した利便性抜群の人気駅。',
      priceRange: '新築戸建 3,000万〜3,900万円 / マンション 2,000万〜3,200万円',
      recommendFor: '買い物利便性重視の共働き世帯・ファミリー',
      highlight: '東武東上線快速・急行停車駅。フラットな街並みで自転車移動も快適。'
    },
    {
      id: 'kawagoe',
      name: '川越駅',
      line: 'JR川越線・東武東上線',
      city: '川越市',
      features: '埼玉屈指のビッグターミナル。ルミネ・アトレ・商店街「クレアモール」が賑わう中心都市。',
      priceRange: '新築戸建 3,800万〜5,500万円 / 駅近マンション 3,500万〜6,000万円',
      recommendFor: '商業利便性・複数路線アクセスを最優先したい方',
      highlight: '池袋・新宿・渋谷・横浜・大宮へ乗り換えなしで直通。'
    },
    {
      id: 'sakado',
      name: '坂戸駅',
      line: '東武東上線・越生線',
      city: '坂戸市',
      features: '越生線との分岐駅で始発電車も多数。区画整理された住宅地が広がり、教育環境・公園も整備。',
      priceRange: '新築戸建 2,500万〜3,300万円 / 土地坪単価 30万〜48万円',
      recommendFor: '広めの敷地（40坪〜50坪以上）でゆったり暮らしたい方',
      highlight: '坂戸ICも近く、自然豊かな越生・毛呂山方面へのアクセスも良好。'
    },
    {
      id: 'honkawagoe',
      name: '本川越駅',
      line: '西武新宿線',
      city: '川越市',
      features: '小江戸川越の蔵造りの町並みに最も近い駅。西武新宿線始発駅で座って新宿方面へアクセス可能。',
      priceRange: '新築戸建 3,500万〜4,800万円 / マンション 2,800万〜4,500万円',
      recommendFor: '歴史ある情緒ある街並みで落ち着いて暮らしたい方',
      highlight: '特急小江戸号で高田馬場・西武新宿までゆったり直通。'
    },
    {
      id: 'higashimatsuyama',
      name: '東松山駅',
      line: '東武東上線',
      city: '東松山市',
      features: '自然豊かな比企丘陵の玄関口。森林公園や広大な公園が多く、広々とした邸宅や平屋の建築にも適した環境。',
      priceRange: '新築戸建 2,200万〜2,900万円 / 土地坪単価 20万〜35万円',
      recommendFor: 'のびのび子育てをしたい方、庭付き広々一戸建て希望者',
      highlight: '東武東上線の始発電車もあり、着席通勤のチャンスも豊富。'
    }
  ];

  const currentStation = stations.find((s) => s.id === selectedStationId) || stations[0];

  return (
    <section id="local-guide" className="py-20 sm:py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-widest uppercase mb-3 border border-amber-200">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            SAITAMA LOCAL GUIDE
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            住まい探しに、<br />
            <span className="text-amber-700">街を知る楽しさを。</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            駅から始まる、わたしの暮らし。<br className="hidden sm:inline" />
            鶴ヶ島・川越・坂戸・東松山など、東武東上線・川越線・西武線の街の特徴と相場情報をご案内します。
          </p>
        </motion.div>

        {/* Station Navigation Chips with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-8"
        >
          {stations.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStationId(st.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all border cursor-pointer ${
                selectedStationId === st.id
                  ? 'bg-[#1e2638] text-white border-[#1e2638] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Train className="w-3.5 h-3.5 text-[#96723e]" />
                <span>{st.name}</span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Selected Station Card Details with Motion */}
        <motion.div 
          key={selectedStationId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{currentStation.city} • {currentStation.line}</span>
              </div>

              <h3 className="font-mincho text-2xl sm:text-3xl font-bold text-slate-900">
                {currentStation.name} エリアガイド
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed">
                {currentStation.features}
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 shrink-0">相場目安:</span>
                  <span className="font-semibold text-amber-800">{currentStation.priceRange}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 shrink-0">おすすめ:</span>
                  <span>{currentStation.recommendFor}</span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-200 text-slate-600">
                  <Car className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{currentStation.highlight}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#1e2638] to-[#29344c] text-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-lg border border-slate-700">
              <div className="text-xs font-bold text-[#c29d66] uppercase tracking-wider">
                このエリアの物件を探す
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentStation.name}周辺（{currentStation.city}）の新築・中古戸建、土地、マンションを一覧でチェックできます。
              </p>
              <button
                onClick={() => onSelectArea(currentStation.city)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#96723e] hover:bg-[#a88248] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <span>{currentStation.city}の取り扱い物件を見る</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
