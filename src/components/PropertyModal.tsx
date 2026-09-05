import React, { useState } from 'react';
import { X, MapPin, Train, Calendar, Ruler, Phone, Mail, ExternalLink, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Property } from '../types';
import { COMPANY_DATA } from '../data/company';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onInquire: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onInquire,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  // Calculate monthly repayment estimate
  const calculateMonthly = (priceInMan: number) => {
    const principal = priceInMan * 10000;
    const monthlyRate = 0.005 / 12; // 0.5%
    const months = 35 * 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(monthlyPayment).toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900">
              {property.type}
            </span>
            <span className="text-xs text-slate-500 font-medium">物件番号: #{property.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-full border transition-all ${
                isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-rose-600'
              }`}
              title="お気に入りに追加"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="閉じる"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Title & Price */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{property.address}</span>
              <span className="mx-1">•</span>
              <Train className="w-3.5 h-3.5 text-amber-600" />
              <span>{property.station}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              {property.title}
            </h2>

            <div className="mt-3 flex flex-wrap items-baseline gap-4">
              <div className="text-3xl sm:text-4xl font-black text-rose-700">
                {property.price.toLocaleString()}
                <span className="text-base font-normal text-slate-600 ml-1">万円</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg text-xs font-medium text-amber-900">
                住宅ローン目安: <span className="font-bold text-slate-900">月々約 {calculateMonthly(property.price)} 円</span>（頭金0円・35年返済・金利0.5%の場合）
              </div>
            </div>
          </div>

          {/* Photo Gallery Viewer */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950">
              <img
                src={property.images[activeImageIndex]}
                alt={`${property.title} - 写真 ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails row */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeImageIndex ? 'border-amber-500 ring-2 ring-amber-400/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {property.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Description & Features */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">おすすめポイント・物件解説</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {property.description}
            </p>
            {property.features.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">設備・特徴</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-800">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Specifications Table */}
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-3">物件詳細スペック</h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full divide-y divide-slate-200">
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="w-1/3 bg-slate-50 px-4 py-2.5 font-bold text-slate-700">物件所在地</td>
                    <td className="px-4 py-2.5 text-slate-800">{property.address}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">最寄り駅交通</td>
                    <td className="px-4 py-2.5 text-slate-800">{property.station}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">販売価格</td>
                    <td className="px-4 py-2.5 text-slate-800 font-bold text-rose-700 text-sm">{property.price.toLocaleString()}万円</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">間取り</td>
                    <td className="px-4 py-2.5 text-slate-800 font-bold">{property.layout}</td>
                  </tr>
                  {property.buildingArea && (
                    <tr className="bg-white">
                      <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">建物（専有）面積</td>
                      <td className="px-4 py-2.5 text-slate-800">{property.buildingArea}㎡</td>
                    </tr>
                  )}
                  {property.landArea && (
                    <tr className="bg-white">
                      <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">土地面積</td>
                      <td className="px-4 py-2.5 text-slate-800">{property.landArea}㎡</td>
                    </tr>
                  )}
                  <tr className="bg-white">
                    <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">築年月</td>
                    <td className="px-4 py-2.5 text-slate-800">{property.yearBuilt}年</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">建物構造</td>
                    <td className="px-4 py-2.5 text-slate-800">{property.structure}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">現況 / 引渡時期</td>
                    <td className="px-4 py-2.5 text-slate-800">空家（即時・相談）</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700">取引態様 / 免許番号</td>
                    <td className="px-4 py-2.5 text-slate-800">
                      仲介（株式会社CTC 心誠不動産 / 埼玉県知事（1）第25475号）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sticky Footer Inquiry Bar */}
        <div className="sticky bottom-0 z-20 bg-slate-900 text-white p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <div className="hidden sm:block text-xs">
            <div className="text-amber-400 font-bold">{COMPANY_DATA.fullName}</div>
            <div className="text-slate-400">お電話でもすぐにご案内可能です（10:00〜20:00）</div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{COMPANY_DATA.phone}</span>
            </a>

            <button
              onClick={() => {
                onInquire(property);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>この物件を内覧・問い合わせる</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
