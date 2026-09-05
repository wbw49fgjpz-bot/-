import React, { useState } from 'react';
import { MapPin, Train, Maximize2, Heart, Calculator, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onSimulateLoan: (price: number) => void;
  layoutMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onSimulateLoan,
  layoutMode = 'grid',
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Estimate 35-year loan at 0.5% variable interest rate with 0 down
  const calculateApproxMonthly = (priceInMan: number) => {
    const principal = priceInMan * 10000;
    const monthlyRate = 0.005 / 12;
    const months = 35 * 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return (monthlyPayment / 10000).toFixed(1);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case '新着':
        return 'bg-emerald-600 text-white';
      case '商談中':
        return 'bg-amber-600 text-white';
      case '販売中':
      default:
        return 'bg-slate-900/85 text-amber-300 border border-amber-400/30';
    }
  };

  if (layoutMode === 'list') {
    return (
      <div className="group bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
        {/* Image side */}
        <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-slate-900">
          <img
            src={property.images[currentImgIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm ${getStatusColor(property.status)}`}>
              {property.status}
            </span>
            <span className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-950/80 text-white backdrop-blur-sm">
              {property.type}
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorite ? 'bg-rose-500 text-white' : 'bg-slate-900/60 text-white hover:bg-rose-500 hover:text-white'
            }`}
            aria-label="お気に入り"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {/* Gallery navigation */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-slate-950/70 text-white text-[10px] px-2 py-0.5 rounded-full">
              <span>{currentImgIndex + 1}/{property.images.length}</span>
            </div>
          )}
        </div>

        {/* Info side */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-semibold text-slate-700">{property.city}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Train className="w-3.5 h-3.5 text-amber-600" />
                {property.station}
              </span>
            </div>

            <h3 
              onClick={() => onSelectProperty(property)}
              className="font-serif text-lg font-bold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer line-clamp-1 mb-2"
            >
              {property.title}
            </h3>

            {/* Price section */}
            <div className="flex flex-wrap items-baseline gap-3 mb-3">
              <div className="text-2xl font-bold text-rose-700 tracking-tight">
                {property.price.toLocaleString()}
                <span className="text-sm font-normal text-slate-600 ml-1">万円</span>
              </div>
              <div className="text-xs text-slate-600 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                目安返済: <span className="font-semibold text-amber-900">月々約{calculateApproxMonthly(property.price)}万円〜</span>
              </div>
            </div>

            {/* Specs chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
              <div><span className="text-slate-400">間取り:</span> <span className="font-semibold text-slate-800">{property.layout}</span></div>
              {property.buildingArea && <div><span className="text-slate-400">建物面積:</span> <span className="font-semibold text-slate-800">{property.buildingArea}㎡</span></div>}
              {property.landArea && <div><span className="text-slate-400">土地面積:</span> <span className="font-semibold text-slate-800">{property.landArea}㎡</span></div>}
              <div><span className="text-slate-400">築年:</span> <span className="font-semibold text-slate-800">{property.yearBuilt}年</span></div>
              <div className="col-span-2"><span className="text-slate-400">構造:</span> <span className="font-semibold text-slate-800">{property.structure}</span></div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {property.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => onSimulateLoan(property.price)}
              className="text-xs font-medium text-slate-600 hover:text-amber-700 flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              ローンシミュレーション
            </button>
            <button
              onClick={() => onSelectProperty(property)}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              詳細・内覧予約
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image thumbnail + carousel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded shadow-sm ${getStatusColor(property.status)}`}>
            {property.status}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-950/80 text-white backdrop-blur-sm">
            {property.type}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
            isFavorite ? 'bg-rose-500 text-white' : 'bg-slate-900/60 text-white hover:bg-rose-500 hover:text-white'
          }`}
          aria-label="お気に入り"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Controls when multiple images */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="前の写真"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="次の写真"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2.5 right-2.5 bg-slate-950/70 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
              {currentImgIndex + 1} / {property.images.length}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Station and area */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 truncate">
            <Train className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{property.station}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProperty(property)}
            className="font-serif text-base font-bold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer line-clamp-2 min-h-[3rem] mb-2 leading-snug"
          >
            {property.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
            <div>
              <span className="text-2xl font-extrabold text-rose-700 tracking-tight">
                {property.price.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-slate-600 ml-0.5">万円</span>
            </div>
            <div className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded font-medium">
              月々約{calculateApproxMonthly(property.price)}万円〜
            </div>
          </div>

          {/* Property highlights */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-600 mb-3 bg-slate-50/80 p-2 rounded-lg">
            <div><span className="text-slate-400">間取り:</span> <span className="font-bold text-slate-800">{property.layout}</span></div>
            <div>
              <span className="text-slate-400">面積:</span>{' '}
              <span className="font-bold text-slate-800">
                {property.buildingArea ? `${property.buildingArea}㎡` : property.landArea ? `${property.landArea}㎡` : '-'}
              </span>
            </div>
            <div className="col-span-2 truncate"><span className="text-slate-400">所在地:</span> <span className="text-slate-700">{property.address}</span></div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {property.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <button
            onClick={() => onSimulateLoan(property.price)}
            className="text-xs text-slate-600 hover:text-amber-700 flex items-center gap-1 font-medium transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            ローン試算
          </button>
          <button
            onClick={() => onSelectProperty(property)}
            className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            詳細を見る
          </button>
        </div>
      </div>
    </div>
  );
};
