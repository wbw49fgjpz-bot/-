import { Property, HeroSlide } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    title: '鶴ヶ島・川越の暮らしに、心から誠実なご提案を。',
    subtitle: '建築安全・外壁診断・自然災害調査の専門資格を持つ不動産プロフェッショナルが寄り添います。',
    tag: 'CONCEPT'
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
    title: '陽光あふれる邸宅と出会う。厳選した新築・中古戸建て',
    subtitle: '大手都市銀行から地方銀行・信用金庫まで23行と提携。最適な住宅ローンをご案内。',
    tag: 'NEW LISTINGS'
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    title: '不動産売却・直接買取。地元密着のスピード査定',
    subtitle: '相続・空き家相談・リノベーションまで、ワンストップで心誠にお応えいたします。',
    tag: 'PURCHASE & SALE'
  },
  {
    id: 'slide-4',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
    title: '心地よい上質な暮らしを、確かな安心と保証で。',
    subtitle: '古物商・石綿・足場管理の認可も保有。建物の隅々まで見極める心誠の技術力。',
    tag: 'SAFETY & TRUST'
  }
];

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'prop-1',
    title: '【新着新築】鶴ヶ島市松ヶ丘 南道路採光 デザイナーズ4LDK',
    type: '新築一戸建て',
    price: 3580,
    address: '埼玉県鶴ヶ島市松ヶ丘2丁目',
    city: '鶴ヶ島市',
    station: '東武東上線「鶴ヶ島」駅 徒歩9分',
    layout: '4LDK',
    landArea: 135.2,
    buildingArea: 104.8,
    yearBuilt: 2025,
    structure: '木造軸組工法 2階建',
    tags: ['新着', '南向き', '駐車場2台可', '即入居可', '食洗機標準', '制震ダンパー'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '閑静な松ヶ丘エリアの角地ライクな好立地。日当たり良好な20帖の広々LDKと充実の収納（パントリー・WIC）。耐震等級3取得、住宅ローン控除対象物件。',
    features: ['リビング20帖超', 'カウンターキッチン（人造大理石）', '浴室換気乾燥暖房機', '全居室複層ガラス', 'シューズインクローク'],
    isFeatured: true,
    status: '新着'
  },
  {
    id: 'prop-2',
    title: '【南道路・庭付き】川越市的場 自然素材が息づく邸宅 4LDK',
    type: '新築一戸建て',
    price: 3980,
    address: '埼玉県川越市的場',
    city: '川越市',
    station: '東武東上線「霞ヶ関」駅 徒歩12分 / JR川越線「的場」駅 徒歩7分',
    layout: '4LDK',
    landArea: 148.5,
    buildingArea: 108.2,
    yearBuilt: 2024,
    structure: '木造2階建',
    tags: ['南向き', '駐車場2台可', '敷地40坪以上', '庭付き', 'EV充電設備'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '2路線利用可能な快適アクセス。南向きワイドバルコニーとプライベートガーデンを完備したゆとりのある暮らし。駐車場並列2台対応。',
    features: ['並列駐車2台可能', '主寝室8帖+大型ウォークインクローゼット', '太陽光発電対応', 'エコキュート完備'],
    isFeatured: true,
    status: '販売中'
  },
  {
    id: 'prop-3',
    title: '【フルリノベーション】鶴ヶ島市富士見 若葉駅徒歩6分 パークフロントレジデンス',
    type: '中古マンション',
    price: 2480,
    address: '埼玉県鶴ヶ島市富士見1丁目',
    city: '鶴ヶ島市',
    station: '東武東上線「若葉」駅 徒歩6分',
    layout: '3LDK',
    buildingArea: 76.4,
    yearBuilt: 2011,
    structure: '鉄筋コンクリート造 9階建 5階部分',
    tags: ['リノベーション済', '駅徒歩10分以内', '南向き', 'オートロック', 'ペット相談可'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '水回りすべて新規交換済み（キッチン・浴室・洗面台・トイレ）。若葉駅前の大型商業施設「ワカバウォーク」まで徒歩圏内の抜群の生活利便性。',
    features: ['2024年12月内装全面リフォーム済', '食器洗い乾燥機付システムキッチン', '追い焚き機能付ユニットバス', '宅配ボックス完備'],
    isFeatured: true,
    status: '販売中'
  },
  {
    id: 'prop-4',
    title: '【敷地65坪・美邸】坂戸市千代田 ガレージ付き大型注文中古住宅 5LDK',
    type: '中古一戸建て',
    price: 3180,
    address: '埼玉県坂戸市千代田3丁目',
    city: '坂戸市',
    station: '東武東上線「若葉」駅 徒歩14分',
    layout: '5LDK',
    landArea: 215.3,
    buildingArea: 138.6,
    yearBuilt: 2017,
    structure: '木造2階建（大手ハウスメーカー施工）',
    tags: ['敷地40坪以上', '駐車場3台可', '角地', '二世帯対応可', '外壁診断済'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '当社外壁診断士による徹底診断済み。メンテナンスが行き届いた高品質注文住宅。車3台駐車可能なワイド敷地と、吹き抜けのある明るいエントランス。',
    features: ['敷地65坪超', '普通車3台駐車可能', '吹き抜けリビング', '屋根裏収納スペース有', '床暖房完備'],
    isFeatured: false,
    status: '販売中'
  },
  {
    id: 'prop-5',
    title: '【建築条件なし売地】鶴ヶ島市上広谷 自由設計が叶う整形地 45坪',
    type: '土地・事業用',
    price: 1880,
    address: '埼玉県鶴ヶ島市上広谷',
    city: '鶴ヶ島市',
    station: '東武東上線「鶴ヶ島」駅 徒歩8分',
    layout: '更地',
    landArea: 152.0,
    yearBuilt: 2024,
    structure: '更地（上下水道引込済）',
    tags: ['駅徒歩10分以内', '建築条件なし', '整形地', '都市ガス', '即引渡し可'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'お好きなハウスメーカーで建築いただけます。鶴ヶ島駅徒歩8分のフラットなアプローチ。小学校・買物施設も徒歩10分圏内で子育て世帯にも最適。',
    features: ['建築条件なし', '建ぺい率60% / 容積率200%', '道路幅員6.0m', '上下水道・都市ガス完備'],
    isFeatured: false,
    status: '商談中'
  },
  {
    id: 'prop-6',
    title: '【駅近タワーライフ】川越市脇田本町 ペントハウスライクな眺望 3LDK',
    type: '中古マンション',
    price: 5280,
    address: '埼玉県川越市脇田本町',
    city: '川越市',
    station: '東武東上線・JR川越線「川越」駅 徒歩4分',
    layout: '3LDK',
    buildingArea: 84.1,
    yearBuilt: 2018,
    structure: 'SRC造 15階建 13階部分',
    tags: ['駅徒歩5分以内', '高層階', '南向き', 'ペット相談可', 'コンシェルジュ'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '川越駅西口から徒歩4分のフラットアクセス。13階南向きにつき富士山を望むパノラマビュー。ホテルライクな内廊下設計と24時間ゴミ出し可能。',
    features: ['川越駅徒歩4分', '南向き13階につき眺望良好', 'ディスポーザー完備', 'トランクルーム付', '免震構造'],
    isFeatured: true,
    status: '販売中'
  },
  {
    id: 'prop-7',
    title: '【平屋スタイル可】東松山市高坂 自然と暮らす緑豊かな分譲地 50坪',
    type: '新築一戸建て',
    price: 2980,
    address: '埼玉県東松山市高坂',
    city: '東松山市',
    station: '東武東上線「高坂」駅 徒歩15分',
    layout: '3LDK',
    landArea: 168.0,
    buildingArea: 95.5,
    yearBuilt: 2025,
    structure: '木造平屋建風 2階建',
    tags: ['新着', '南向き', '駐車場2台可', '平屋テイスト', 'オール電化'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'ゆったりとした時間の流れる緑豊かな街並み。開放的な勾配天井とウッドデッキで家族の憩いを演出。ピオニウォーク東松山も車で快適アクセス。',
    features: ['ウッドデッキテラス', '勾配天井リビング', 'オール電化エコキュート', '駐車並列2台'],
    isFeatured: false,
    status: '新着'
  },
  {
    id: 'prop-8',
    title: '【収益・投資用】坂戸市日の出町 駅前一棟テナント・住居複合ビル',
    type: '土地・事業用',
    price: 8800,
    address: '埼玉県坂戸市日の出町',
    city: '坂戸市',
    station: '東武東上線「坂戸」駅 徒歩3分',
    layout: '事業用',
    landArea: 198.4,
    buildingArea: 480.0,
    yearBuilt: 2008,
    structure: '鉄骨造 4階建',
    tags: ['駅徒歩5分以内', '満室稼働中', '利回り7.2%', '角地'],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '坂戸駅前至近の好立地。1F店舗、2-4F住居の複合ビル。現在満室稼働中につき安定収入。CTC心誠不動産ならではの丁寧な賃貸管理引き継ぎ対応。',
    features: ['表面利回り7.2%', '坂戸駅徒歩3分の好立地', '満室稼働中', '定期点検記録あり'],
    isFeatured: false,
    status: '販売中'
  }
];
