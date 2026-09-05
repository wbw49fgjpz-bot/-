import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  MapPin, 
  Maximize2, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  Info, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

interface EasyEstimateProps {
  onDirectMailConsult: (text: string) => void;
}

export const EasyEstimate: React.FC<EasyEstimateProps> = ({ onDirectMailConsult }) => {
  const [kind, setKind] = useState<'戸建' | '土地' | 'マンション'>('戸建');
  const [city, setCity] = useState<string>('鶴ヶ島市');
  const [town, setTown] = useState<string>('松ヶ丘');
  const [areaValue, setAreaValue] = useState<string>('120');
  const [areaUnit, setAreaUnit] = useState<'m2' | 'tsubo'>('m2');
  const [floorArea, setFloorArea] = useState<string>('95');
  const [buildingAge, setBuildingAge] = useState<string>('20');
  const [landAssessment, setLandAssessment] = useState<string>('');
  const [buildingAssessment, setBuildingAssessment] = useState<string>('');
  const [concerns, setConcerns] = useState<string[]>(['荷物・家具が残っている']);
  const [customNote, setCustomNote] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const availableConcerns = [
    '荷物・家具が残っている',
    '相続したまま放置している',
    '古い家でリフォームが必要',
    '住宅ローンの残債がある',
    '近所に知られずに売却したい',
    '急ぎで現金化したい',
    '接道や境界が不明確',
    '他社で売却を断られた',
  ];

  const handleToggleConcern = (item: string) => {
    setConcerns((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  // Convert area display
  const areaNumber = parseFloat(areaValue) || 0;
  const areaSummary = areaUnit === 'm2' 
    ? `${areaValue}㎡（約${Math.round(areaNumber * 0.3025)}坪）` 
    : `${areaValue}坪（約${Math.round(areaNumber * 3.30578)}㎡）`;

  // Generate consultation text
  const generatedText = `【心誠不動産 かんたん査定相談】
-----------------------------
■ 物件種別: ${kind}
■ 所在地: 埼玉県${city} ${town ? town : '（町名未定）'}
■ 敷地・専有面積: ${areaSummary}
${kind === '戸建' ? `■ 建物延床面積: ${floorArea ? floorArea + '㎡' : '未定'}\n■ 築年数: 約${buildingAge}年` : ''}
${landAssessment ? `■ 土地固定資産税評価額: ${landAssessment}万円` : ''}
${buildingAssessment ? `■ 建物固定資産税評価額: ${buildingAssessment}万円` : ''}
■ 気になる事情・ご相談:
${concerns.length > 0 ? concerns.map((c) => `・${c}`).join('\n') : '・特になし'}
${customNote ? `・備考: ${customNote}` : ''}
-----------------------------
上記物件について、売却・買取の可能性や査定価格、手残り資金について相談したいです。よろしくお願いいたします。`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleLineClick = () => {
    // Open LINE official account
    window.open(COMPANY_DATA.lineUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="estimate" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-widest uppercase mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            02 / EASY ESTIMATE & LINE
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            おうちの面積、分かりますか？<br />
            <span className="text-amber-700">まずはかんたん査定相談。</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            最初は「物件の種類・市区町村・面積」の3項目で大丈夫です。<br className="hidden sm:inline" />
            分かる情報をまとめて、公式LINEやお電話でスムーズにご相談いただけます。
          </p>

          {/* Honest Notice */}
          <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>現在、自動での金額表示は行っていません</span>
            </div>
            <p className="text-slate-600">
              面積や評価額の数字だけで機械的に弾き出した価格は、実際の接道・境界・建物状態を反映できず誤解を招くためです。入力すると<strong>相談文が自動生成</strong>され、専門資格者が現地と相場を検証したうえで正直な査定根拠をお届けします。
            </p>
          </div>
        </motion.div>

        {/* 2-Column Grid: Form (Left) & Live Consultation Text (Right) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          
          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
            
            {/* 1. Property Kind */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                物件の種類 <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-white font-normal ml-1">必須</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['戸建', '土地', 'マンション'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setKind(item)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      kind === item
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. City & Town */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  市区町村 <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-white font-normal ml-1">必須</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  <option value="鶴ヶ島市">鶴ヶ島市</option>
                  <option value="川越市">川越市</option>
                  <option value="坂戸市">坂戸市</option>
                  <option value="東松山市">東松山市</option>
                  <option value="日高市">日高市</option>
                  <option value="毛呂山町">入間郡毛呂山町</option>
                  <option value="越生町">入間郡越生町</option>
                  <option value="鳩山町">比企郡鳩山町</option>
                  <option value="川島町">比企郡川島町</option>
                  <option value="狭山市">狭山市</option>
                  <option value="所沢市">所沢市</option>
                  <option value="ふじみ野市">ふじみ野市</option>
                  <option value="富士見市">富士見市</option>
                  <option value="その他埼玉県内">その他埼玉県内</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  町名 <span className="text-[10px] text-slate-400 font-normal ml-1">（番地は不要です）</span>
                </label>
                <input
                  type="text"
                  placeholder="例: 松ヶ丘、新宿町など"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* 3. Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {kind === 'マンション' ? '専有面積' : '敷地面積（土地面積）'}{' '}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-white font-normal ml-1">必須</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="例: 120"
                  value={areaValue}
                  onChange={(e) => setAreaValue(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
                <div className="flex rounded-xl overflow-hidden border border-slate-300">
                  <button
                    type="button"
                    onClick={() => setAreaUnit('m2')}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${
                      areaUnit === 'm2' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    ㎡
                  </button>
                  <button
                    type="button"
                    onClick={() => setAreaUnit('tsubo')}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${
                      areaUnit === 'tsubo' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    坪
                  </button>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                約換算: {areaSummary}
              </div>
            </div>

            {/* 4. Optional Details (Accordion-like) */}
            <div className="border-t border-slate-200 pt-4 space-y-4">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                詳しい情報（分かる範囲で構いません）
              </div>

              {kind === '戸建' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">建物延床面積 (㎡)</label>
                    <input
                      type="number"
                      placeholder="例: 95"
                      value={floorArea}
                      onChange={(e) => setFloorArea(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">築年数 (年)</label>
                    <input
                      type="number"
                      placeholder="例: 25"
                      value={buildingAge}
                      onChange={(e) => setBuildingAge(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Assessment */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">土地固定資産税評価額 (万円)</label>
                  <input
                    type="number"
                    placeholder="納税通知書の価格"
                    value={landAssessment}
                    onChange={(e) => setLandAssessment(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">建物固定資産税評価額 (万円)</label>
                  <input
                    type="number"
                    placeholder="納税通知書の価格"
                    value={buildingAssessment}
                    onChange={(e) => setBuildingAssessment(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 5. Concerns & Situations */}
            <div className="border-t border-slate-200 pt-4">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                気になる事情・ご要望（複数選択可）
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableConcerns.map((c) => {
                  const checked = concerns.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleToggleConcern(c)}
                      className={`p-2 rounded-lg text-[11px] text-left border transition-all ${
                        checked
                          ? 'bg-amber-100 border-amber-500 font-bold text-amber-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {checked ? '✓ ' : '+ '}{c}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="その他の事情があればご自由にご記入ください"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                />
              </div>
            </div>

          </div>

          {/* Consultation Text Preview & Actions (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                相談文ができました
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                LINE・メールに貼り付けて送信
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                入力いただいた情報から相談用テキストを作成しました。自動送信はされませんのでご安心ください。
              </p>
            </div>

            {/* Live Text Area Preview */}
            <div className="relative">
              <textarea
                readOnly
                value={generatedText}
                rows={12}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 leading-relaxed outline-none resize-none selection:bg-amber-400 selection:text-slate-950"
              />
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">コピーしました</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>文面をコピー</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleLineClick}
                className="w-full py-3.5 px-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>公式LINEを開いて相談する ↗</span>
              </button>

              <button
                onClick={() => onDirectMailConsult(generatedText)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <span>メールフォームでこの内容を送信</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div>お電話での直接相談: <a href="tel:0492775294" className="text-amber-300 font-bold hover:underline">049-277-5294</a></div>
              <div>受付時間: 10:00〜20:00（火・水定休）</div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
