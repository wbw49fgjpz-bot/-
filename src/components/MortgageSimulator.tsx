import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

interface MortgageSimulatorProps {
  initialPrice?: number;
  onConsultClick: () => void;
}

export const MortgageSimulator: React.FC<MortgageSimulatorProps> = ({ initialPrice = 3500, onConsultClick }) => {
  const [price, setPrice] = useState<number>(initialPrice);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [bonusAmount, setBonusAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0.55); // 0.55% variable rate typical in Saitama
  const [years, setYears] = useState<number>(35);

  // Sync if initialPrice changed externally
  React.useEffect(() => {
    if (initialPrice && initialPrice > 0) {
      setPrice(initialPrice);
    }
  }, [initialPrice]);

  const loanCalculation = useMemo(() => {
    const borrowAmount = Math.max(0, price - downPayment);
    if (borrowAmount <= 0) {
      return { monthlyPayment: 0, bonusPayment: 0, totalPayment: 0, totalInterest: 0, principal: 0 };
    }

    const principalYen = borrowAmount * 10000;
    const bonusPortionYen = (bonusAmount * 2 * years) * 10000;
    const monthlyPrincipalYen = Math.max(0, principalYen - bonusPortionYen);

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = (monthlyPrincipalYen * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPayment = monthlyPrincipalYen / totalMonths;
    }

    let bonusPayment = 0;
    if (bonusAmount > 0) {
      const bonusMonths = years * 2;
      const bonusRate = interestRate / 100 / 2;
      bonusPayment = (bonusPortionYen * bonusRate * Math.pow(1 + bonusRate, bonusMonths)) /
        (Math.pow(1 + bonusRate, bonusMonths) - 1);
    }

    const totalPayment = (monthlyPayment * totalMonths) + (bonusPayment * years * 2);
    const totalInterest = totalPayment - principalYen;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      bonusPayment: Math.round(bonusPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.max(0, Math.round(totalInterest)),
    };
  }, [price, downPayment, bonusAmount, interestRate, years]);

  return (
    <section id="loan" className="py-20 bg-slate-50 text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            MORTGAGE SIMULATOR
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            住宅ローンシミュレーション
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            借入希望額や返済期間を入力するだけで、毎月の目安返済額を即座にシミュレート。提携23行の中から最適な金利プランをご提案いたします。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form Panel with Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
          >
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span>シミュレーション条件の設定</span>
            </h3>

            {/* Price Slider & Input */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">物件価格（借入予定額）</label>
                <div className="flex items-center gap-1 text-amber-700 font-bold text-xl font-mono">
                  <span>{price.toLocaleString()}</span>
                  <span className="text-xs text-slate-600 font-normal">万円</span>
                </div>
              </div>
              <input
                type="range"
                min={1000}
                max={9000}
                step={50}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>1,000万円</span>
                <span>5,000万円</span>
                <span>9,000万円</span>
              </div>
            </div>

            {/* Down Payment & Interest Rate in 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Down Payment */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">頭金（自己資金）</label>
                  <span className="text-sm font-bold text-slate-900 font-mono">{downPayment} 万円</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={50}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">借入金利（想定）</label>
                  <span className="text-sm font-bold text-amber-700 font-mono">{interestRate.toFixed(2)} %</span>
                </div>
                <input
                  type="range"
                  min={0.3}
                  max={3.5}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex gap-1.5 pt-1">
                  {[0.45, 0.55, 0.75, 1.35].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setInterestRate(rate)}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                        interestRate === rate
                          ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Repayment Years */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">返済期間</label>
              <div className="grid grid-cols-4 gap-2">
                {[20, 25, 30, 35].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYears(y)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      years === y
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {y}年返済
                  </button>
                ))}
              </div>
            </div>

            {/* Note on Banks */}
            <div className="pt-2 text-xs text-slate-700 flex items-start gap-2 bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>
                心誠不動産は、<strong>埼玉りそな・武蔵野銀行・三菱UFJ・みずほ・三井住友</strong>をはじめ全23行の金融機関と取引がございます。事前審査から金利優遇交渉までお任せください。
              </span>
            </div>
          </motion.div>

          {/* Results Summary Card with Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-gradient-to-b from-sky-600 via-sky-700 to-cyan-800 text-white rounded-3xl p-6 sm:p-8 border border-sky-500 shadow-xl space-y-6"
          >
            <div className="text-xs font-bold text-sky-200 uppercase tracking-wider">
              返済額シミュレーション結果
            </div>

            {/* Monthly Highlight */}
            <div className="bg-sky-900/40 rounded-2xl p-5 border border-sky-400/30 text-center space-y-1 backdrop-blur-xs">
              <div className="text-xs text-sky-100 font-medium">毎月のお支払い目安</div>
              <div className="font-mincho text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                {loanCalculation.monthlyPayment.toLocaleString()}
                <span className="text-base font-normal text-sky-100 ml-1">円 / 月</span>
              </div>
              <div className="text-[11px] text-sky-200 mt-1">
                借入金額: {(price - downPayment).toLocaleString()}万円（返済年数: {years}年）
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 text-xs border-y border-sky-500/50 py-4">
              <div className="flex justify-between items-center text-sky-100">
                <span>お借入元金</span>
                <span className="font-bold text-white">{(price - downPayment).toLocaleString()} 万円</span>
              </div>
              <div className="flex justify-between items-center text-sky-100">
                <span>利息総額（概算）</span>
                <span className="font-bold text-sky-200">
                  {Math.round(loanCalculation.totalInterest / 10000).toLocaleString()} 万円
                </span>
              </div>
              <div className="flex justify-between items-center text-sky-100">
                <span>総返済予定額</span>
                <span className="font-bold text-white">
                  {Math.round(loanCalculation.totalPayment / 10000).toLocaleString()} 万円
                </span>
              </div>
            </div>

            {/* CTA to Consultation */}
            <div className="space-y-3">
              <button
                onClick={onConsultClick}
                className="w-full py-3.5 px-4 bg-white hover:bg-sky-50 active:scale-[0.99] text-sky-900 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>住宅ローン無料個別相談を予約</span>
                <ArrowRight className="w-4 h-4 text-sky-600" />
              </button>
              <p className="text-[11px] text-sky-100 text-center leading-relaxed">
                ※本シミュレーションは目安であり、実際の金利・借入条件等は金融機関の審査により異なります。
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
