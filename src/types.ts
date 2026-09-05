export interface Property {
  id: string;
  title: string;
  type: '新築一戸建て' | '中古一戸建て' | '中古マンション' | '土地・事業用';
  price: number; // in 万円 (e.g. 3480 = 3,480万円)
  priceNote?: string;
  address: string;
  city: string; // e.g. 鶴ヶ島市, 川越市, 坂戸市
  station: string; // e.g. 東武東上線「鶴ヶ島」駅 徒歩11分
  layout: string; // e.g. 4LDK, 3LDK
  landArea?: number; // m²
  buildingArea?: number; // m²
  yearBuilt: number; // e.g. 2024
  structure: string; // e.g. 木造2階建, RC造7階建
  tags: string[]; // e.g. ['南向き', '駐車場2台可', '角地', '即入居可']
  images: string[];
  floorPlanImage?: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  status: '販売中' | '商談中' | '新着';
}

export interface PropertyFilter {
  type: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  layout: string;
  maxAge: number; // 0 for any, 1, 5, 10, 20
  stationDistance: number; // 0 for any, 5, 10, 15
  tags: string[];
  keyword: string;
  sortBy: 'recommended' | 'priceAsc' | 'priceDesc' | 'newest' | 'areaDesc';
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  linkText?: string;
}
