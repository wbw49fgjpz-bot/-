import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, SlidersHorizontal, Grid, List, MapPin, Building, JapaneseYen, Check, X, Tag } from 'lucide-react';
import { Property, PropertyFilter } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertySearchProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onSimulateLoan: (price: number) => void;
  initialFilter?: Partial<PropertyFilter>;
}

const PROPERTY_TYPES = ['すべて', '新築一戸建て', '中古一戸建て', '中古マンション', '土地・事業用'];
const CITIES = ['すべて', '鶴ヶ島市', '川越市', '坂戸市', '東松山市'];
const LAYOUTS = ['すべて', '3LDK', '4LDK', '5LDK以上'];
const PRICE_PRESETS = [
  { label: '上限なし', value: 0 },
  { label: '〜2,500万円', value: 2500 },
  { label: '〜3,500万円', value: 3500 },
  { label: '〜4,500万円', value: 4500 },
  { label: '〜6,000万円', value: 6000 },
];
const POPULAR_TAGS = ['南向き', '駐車場2台可', 'リノベーション済', '敷地40坪以上', '駅徒歩5分以内', '角地', '即入居可', 'ペット相談可'];

export const PropertySearch: React.FC<PropertySearchProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onSimulateLoan,
  initialFilter,
}) => {
  const [filters, setFilters] = useState<PropertyFilter>({
    type: initialFilter?.type || 'すべて',
    city: initialFilter?.city || 'すべて',
    minPrice: initialFilter?.minPrice || 0,
    maxPrice: initialFilter?.maxPrice || 0,
    layout: initialFilter?.layout || 'すべて',
    maxAge: 0,
    stationDistance: 0,
    tags: [],
    keyword: '',
    sortBy: 'recommended',
    ...initialFilter,
  });

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync when initialFilter props change (from QuickSearch)
  React.useEffect(() => {
    if (initialFilter) {
      setFilters((prev) => ({
        ...prev,
        ...initialFilter,
      }));
    }
  }, [initialFilter]);

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
      };
    });
  };

  const handleReset = () => {
    setFilters({
      type: 'すべて',
      city: 'すべて',
      minPrice: 0,
      maxPrice: 0,
      layout: 'すべて',
      maxAge: 0,
      stationDistance: 0,
      tags: [],
      keyword: '',
      sortBy: 'recommended',
    });
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.type !== 'すべて') count++;
    if (filters.city !== 'すべて') count++;
    if (filters.maxPrice > 0) count++;
    if (filters.layout !== 'すべて') count++;
    if (filters.maxAge > 0) count++;
    if (filters.stationDistance > 0) count++;
    if (filters.tags.length > 0) count += filters.tags.length;
    if (filters.keyword.trim().length > 0) count++;
    return count;
  }, [filters]);

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Type filter
        if (filters.type !== 'すべて' && p.type !== filters.type) return false;
        // City filter
        if (filters.city !== 'すべて' && p.city !== filters.city) return false;
        // Price filter
        if (filters.maxPrice > 0 && p.price > filters.maxPrice) return false;
        if (filters.minPrice > 0 && p.price < filters.minPrice) return false;
        // Layout filter
        if (filters.layout !== 'すべて') {
          if (filters.layout === '5LDK以上') {
            const match = p.layout.match(/^(\d+)LDK/);
            if (!match || parseInt(match[1], 10) < 5) return false;
          } else if (p.layout !== filters.layout) {
            return false;
          }
        }
        // Max Age filter
        if (filters.maxAge > 0) {
          const currentYear = 2026;
          const age = currentYear - p.yearBuilt;
          if (age > filters.maxAge) return false;
        }
        // Tags filter
        if (filters.tags.length > 0) {
          const hasAllTags = filters.tags.every((t) => p.tags.includes(t));
          if (!hasAllTags) return false;
        }
        // Keyword search
        if (filters.keyword.trim()) {
          const q = filters.keyword.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchAddress = p.address.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchStation = p.station.toLowerCase().includes(q);
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchAddress && !matchDesc && !matchStation && !matchTags) return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'priceAsc':
            return a.price - b.price;
          case 'priceDesc':
            return b.price - a.price;
          case 'newest':
            return b.yearBuilt - a.yearBuilt;
          case 'areaDesc':
            return (b.buildingArea || b.landArea || 0) - (a.buildingArea || a.landArea || 0);
          case 'recommended':
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [properties, filters]);

  return (
    <section id="search" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase mb-3">
            <Search className="w-3.5 h-3.5 text-amber-700" />
            PROPERTY SEARCH
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            モダン物件検索
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            鶴ヶ島市・川越市・東武東上線沿線の新築・中古住宅・土地を豊富な条件からスムーズにお探しいただけます。
          </p>
        </div>

        {/* Search Filter Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-5 sm:p-7 mb-10 transition-all">
          {/* Main Filter Row: Property Types Tabs */}
          <div className="mb-6">
            <div className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-2 flex items-center justify-between">
              <span>物件種別</span>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleReset}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  条件をクリア ({activeFilterCount})
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => {
                const isSelected = filters.type === type;
                return (
                  <button
                    key={type}
                    onClick={() => setFilters((prev) => ({ ...prev, type }))}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-amber-300 shadow-md shadow-slate-950/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4 border-t border-slate-100">
            {/* Area Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                エリア（埼玉県内）
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CITIES.map((city) => {
                  const isSelected = filters.city === city;
                  return (
                    <button
                      key={city}
                      onClick={() => setFilters((prev) => ({ ...prev, city }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-1">
                <JapaneseYen className="w-3.5 h-3.5 text-amber-600" />
                予算上限
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRICE_PRESETS.map((preset) => {
                  const isSelected = filters.maxPrice === preset.value;
                  return (
                    <button
                      key={preset.value}
                      onClick={() => setFilters((prev) => ({ ...prev, maxPrice: preset.value }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Layout filter */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-amber-600" />
                間取り
              </label>
              <div className="flex flex-wrap gap-1.5">
                {LAYOUTS.map((layout) => {
                  const isSelected = filters.layout === layout;
                  return (
                    <button
                      key={layout}
                      onClick={() => setFilters((prev) => ({ ...prev, layout }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {layout}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Keyword Search & Advanced Filter Toggle */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="駅名・住所・キーワード（例: 松ヶ丘, 若葉, ペット）"
                value={filters.keyword}
                onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800"
              />
              {filters.keyword && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, keyword: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
              <span>{showAdvanced ? 'こだわり条件を閉じる' : 'こだわり条件を開く'}</span>
            </button>
          </div>

          {/* Advanced Filter Panel: Tags & Age */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  こだわり条件（複数選択可）
                </label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => {
                    const isSelected = filters.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                            : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">築年数</label>
                  <select
                    value={filters.maxAge}
                    onChange={(e) => setFilters((prev) => ({ ...prev, maxAge: Number(e.target.value) }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value={0}>指定なし</option>
                    <option value={1}>新築（1年未満）</option>
                    <option value={5}>築5年以内</option>
                    <option value={10}>築10年以内</option>
                    <option value={20}>築20年以内</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Bar (Count, Sort, Layout Switch) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-sm font-medium">該当物件</span>
            <span className="text-2xl font-black text-slate-900">{filteredProperties.length}</span>
            <span className="text-slate-600 text-sm">件</span>
            {activeFilterCount > 0 && (
              <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium">
                絞り込み中
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="hidden sm:inline">並び替え:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="recommended">心誠おすすめ順</option>
                <option value="priceAsc">価格が安い順</option>
                <option value="priceDesc">価格が高い順</option>
                <option value="newest">築年が新しい順</option>
                <option value="areaDesc">面積が広い順</option>
              </select>
            </div>

            {/* Layout switch */}
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  layoutMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="グリッド表示"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  layoutMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="リスト表示"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Property Cards Container */}
        {filteredProperties.length > 0 ? (
          <div
            className={
              layoutMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
                onSimulateLoan={onSimulateLoan}
                layoutMode={layoutMode}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
              条件に一致する物件が見つかりませんでした
            </h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              ご希望の条件を少し広げていただくか、未公開物件・買取物件について心誠不動産まで直接お気軽にご相談ください。
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              検索条件をすべてリセット
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
