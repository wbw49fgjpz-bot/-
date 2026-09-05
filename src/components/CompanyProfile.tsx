import React from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, Phone, Mail, Clock, Calendar, ShieldCheck, Landmark, Users, Briefcase, ExternalLink, Award } from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

export const CompanyProfile: React.FC = () => {
  return (
    <section id="company" className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase mb-3 border border-amber-200">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            COMPANY PROFILE
          </div>
          <h2 className="font-mincho text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            会社概要
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            株式会社CTC 心誠不動産の企業情報・許認可・取引金融機関をご案内いたします。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info Table with Motion (8 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="bg-[#1e2638] px-6 py-4.5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c29d66]" />
                <span className="font-bold text-white text-sm">企業基本情報</span>
              </div>
              <span className="text-xs text-[#c29d66] font-mono">平成28年（2016年）創業</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {/* 社名 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>社名</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-semibold mt-1 sm:mt-0 text-base">
                  {COMPANY_DATA.name} <span className="text-amber-700 font-serif font-bold">（{COMPANY_DATA.brandName}）</span>
                </div>
              </div>

              {/* 代表取締役 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>代表者</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-semibold mt-1 sm:mt-0">
                  <span className="text-slate-500 mr-2 text-xs">{COMPANY_DATA.representativeRole}</span>
                  <span className="text-base font-bold text-slate-900">{COMPANY_DATA.representative}</span>
                </div>
              </div>

              {/* 所在地 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>所在地</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0">
                  <div>〒350-2205 {COMPANY_DATA.address}</div>
                  <a
                    href={COMPANY_DATA.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-bold mt-1"
                  >
                    <span>Googleマップで確認する</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* 連絡先 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>電話番号 / FAX</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0 space-y-1">
                  <div>
                    TEL: <a href={`tel:${COMPANY_DATA.phone}`} className="font-bold text-amber-700 hover:underline">{COMPANY_DATA.phone}</a>
                  </div>
                  <div className="text-slate-500 text-xs">FAX: {COMPANY_DATA.fax}</div>
                </div>
              </div>

              {/* メールアドレス */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>メールアドレス</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0">
                  <a href={`mailto:${COMPANY_DATA.email}`} className="text-amber-700 hover:underline">
                    {COMPANY_DATA.email}
                  </a>
                </div>
              </div>

              {/* 営業時間 / 定休日 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>営業時間 / 定休日</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0">
                  <div>{COMPANY_DATA.businessHours}</div>
                  <div className="text-xs text-slate-500 mt-0.5">定休日: {COMPANY_DATA.regularHolidays}</div>
                </div>
              </div>

              {/* 免許・許認可 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>保有免許・許認可</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0 space-y-2">
                  {COMPANY_DATA.licenses.map((lic) => (
                    <div key={lic.number}>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold mr-2">{lic.title}</span>
                      <span className="font-bold">{lic.authority} {lic.number}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 保有資格 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>保有専門資格</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {COMPANY_DATA.qualifications.map((q) => (
                      <span key={q} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 資本金 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>資本金</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-bold mt-1 sm:mt-0 text-base font-mono">
                  {COMPANY_DATA.capital}
                </div>
              </div>

              {/* 創業 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>創業</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0">
                  {COMPANY_DATA.established}
                </div>
              </div>

              {/* 従業員体制 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>従業員体制</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0">
                  正社員 {COMPANY_DATA.employees.regular}名 / 業務委託社員 {COMPANY_DATA.employees.contract}名 （計{COMPANY_DATA.employees.regular + COMPANY_DATA.employees.contract}名体制）
                </div>
              </div>

              {/* 顧問税理士 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>顧問税理士</span>
                </div>
                <div className="sm:col-span-2 text-slate-900 font-medium mt-1 sm:mt-0">
                  {COMPANY_DATA.taxAdvisor}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps & Banks list with Motion (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Location & Map Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-[#1e2638] px-5 py-3.5 border-b border-slate-700 flex items-center justify-between text-white">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c29d66]" />
                  アクセスマップ
                </span>
                <a
                  href={COMPANY_DATA.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#c29d66] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>拡大地図</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 space-y-3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                  {/* Embedded Google Maps iframe for Tsurugashima address */}
                  <iframe
                    title="CTC心誠不動産 所在地マップ"
                    src="https://maps.google.com/maps?q=埼玉県鶴ヶ島市松ヶ丘1丁目6-6&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <div className="font-bold text-slate-900">{COMPANY_DATA.fullName}</div>
                  <div>{COMPANY_DATA.address}</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    東武東上線「鶴ヶ島」駅・「若葉」駅エリア / 駐車場完備
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Banks Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase">取引銀行（全23行）</span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  多数提携
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                メガバンクから地元埼玉の地方銀行・信用金庫まで幅広い取引実績がございます。
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto pr-1">
                {COMPANY_DATA.banks.map((bank) => (
                  <span
                    key={bank}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 font-medium"
                  >
                    {bank}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
