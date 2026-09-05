import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Instagram, 
  Send,
  Train,
  BookOpen,
  HelpCircle,
  Building2
} from 'lucide-react';
import { COMPANY_DATA } from '../data/company';
import { CtcLogo } from './CtcLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacyModal }) => {
  return (
    <footer className="bg-[#131926] text-slate-400 text-xs border-t border-slate-800">
      {/* Upper Footer: Brand & Quick Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Company Brand Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <CtcLogo size="md" color="text-slate-100" />
            </div>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              埼玉県鶴ヶ島市松ヶ丘を拠点に、鶴ヶ島・川越・坂戸・東武東上線エリアの不動産売却・出口戦略・仲介・スピード直接買取を専門にサポート。自然災害調査士や外壁診断士など建築安全の専門資格者が在籍し、利益よりもお客様を優先する『先義先義』の心をお届けします。
            </p>

            <div className="pt-2 space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c29d66] shrink-0" />
                <span>{COMPANY_DATA.postalCode} {COMPANY_DATA.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c29d66] shrink-0" />
                <a href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`} className="hover:text-white font-bold text-slate-100">
                  {COMPANY_DATA.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c29d66] shrink-0" />
                <a href={`mailto:${COMPANY_DATA.email}`} className="hover:text-white">
                  {COMPANY_DATA.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c29d66] shrink-0" />
                <span>営業時間 {COMPANY_DATA.businessHours}（定休日: {COMPANY_DATA.regularHolidays}）</span>
              </div>
            </div>

            {/* Social Links (LINE & Instagram) */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_DATA.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>公式LINE ↗</span>
              </a>
              <a
                href={COMPANY_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-rose-400" />
                <span>公式Instagram ↗</span>
              </a>
            </div>
          </div>

          {/* Service Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mincho text-sm font-bold text-white border-b border-slate-800 pb-2">
              不動産・地域コンテンツ
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('stations-guide')}
                  className="hover:text-[#c29d66] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300"
                >
                  <Train className="w-3.5 h-3.5 text-[#c29d66]" />
                  <span className="font-bold text-white">東武東上線 駅紹介・街ガイド</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('columns')}
                  className="hover:text-[#c29d66] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#c29d66]" />
                  <span className="font-bold text-white">売却・相続お役立ちコラム</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#c29d66] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#c29d66]" />
                  <span>よくある質問（FAQ）</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('search')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>物件を探す・特選物件</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sale')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>売却・出口戦略（4つの選択肢）</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estimate')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>かんたん査定相談（文章作成）</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('difficult')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>空き家・相続・難あり相談</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mortgage')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>住宅ローン返済シミュレーター</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Links & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-mincho text-sm font-bold text-white border-b border-slate-800 pb-2">
              企業情報・理念
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('philosophy')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>経営理念（先義先義の精神）</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>選ばれる理由・建築専門資格</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partner')}
                  className="hover:text-[#c29d66] transition-colors flex items-center gap-1.5 cursor-pointer font-bold text-slate-200"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#c29d66]" />
                  <span>法人様へ・業務提携（士業・同業者様）</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('company')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>会社概要・取引銀行・保有免許</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>無料相談・査定依頼フォーム</span>
                </button>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div>代表取締役: {COMPANY_DATA.representative}</div>
              <div>資本金: {COMPANY_DATA.capital} / 創業: {COMPANY_DATA.established}</div>
              <div>宅地建物取引業: {COMPANY_DATA.licenses[0].authority} {COMPANY_DATA.licenses[0].number}</div>
              <div>古物商許可: {COMPANY_DATA.licenses[1].authority} {COMPANY_DATA.licenses[1].number}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950/90 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div>
            © 2016-{new Date().getFullYear()} 株式会社CTC 心誠不動産 (Shinsei Real Estate). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                alert('【プライバシーポリシー】\n株式会社CTC 心誠不動産は、お客様からお預かりした個人情報（お名前、ご連絡先、物件情報など）を適切に保護・管理し、物件調査・査定結果のご連絡、およびご相談対応の目的以外には利用いたしません。第三者への無断提供は一切行いません。');
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              プライバシーポリシー
            </button>
            <span>•</span>
            <button 
              onClick={() => {
                alert('【サイトの免責事項・掲載情報について】\n掲載されている物件情報および各種シミュレーターの計算結果（売却手残り試算、住宅ローン返済試算）は概算の目安であり、実際の契約条件・金利・税務・現地測量結果によって変動する場合があります。正確な金額や条件につきましては、個別のお見積り・査定時に詳しくご案内いたします。');
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              免責事項
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
