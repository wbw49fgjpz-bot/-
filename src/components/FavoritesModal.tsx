import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { Property } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  properties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onInquireAll: (titles: string[]) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  properties,
  onRemoveFavorite,
  onSelectProperty,
  onInquireAll,
}) => {
  if (!isOpen) return null;

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="font-serif text-lg font-bold text-slate-900">
              お気に入り物件一覧 ({favoriteProperties.length}件)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto divide-y divide-slate-100 space-y-3">
          {favoriteProperties.length > 0 ? (
            favoriteProperties.map((prop) => (
              <div key={prop.id} className="pt-3 first:pt-0 flex gap-4 items-center justify-between">
                <div 
                  className="flex gap-3 items-center cursor-pointer group flex-1"
                  onClick={() => {
                    onSelectProperty(prop);
                    onClose();
                  }}
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <div className="text-xs text-slate-500">{prop.type} • {prop.city}</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                      {prop.title}
                    </div>
                    <div className="text-sm font-extrabold text-rose-700">
                      {prop.price.toLocaleString()}万円
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemoveFavorite(prop.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="お気に入りから削除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 text-sm">
              お気に入りに登録された物件はありません。
              <div className="text-xs text-slate-400 mt-1">
                物件カードの「ハートマーク」をクリックするとこちらに保存されます。
              </div>
            </div>
          )}
        </div>

        {favoriteProperties.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                onInquireAll(favoriteProperties.map((p) => p.title));
                onClose();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 hover:brightness-105"
            >
              <span>お気に入り物件をまとめて相談する</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
