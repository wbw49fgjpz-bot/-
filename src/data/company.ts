export interface CompanyInfo {
  name: string;
  brandName: string;
  fullName: string;
  representative: string;
  representativeRole: string;
  postalCode: string;
  address: string;
  mapUrl: string;
  phone: string;
  fax?: string;
  email: string;
  businessHours: string;
  regularHolidays: string;
  licenses: {
    title: string;
    authority: string;
    number: string;
  }[];
  qualifications: string[];
  capital: string;
  established: string;
  establishedYear: number;
  employees: {
    regular: number;
    contract: number;
  };
  banks: string[];
  taxAdvisor: string;
  businessDescription: string[];
  lineUrl: string;
  instagramUrl: string;
  philosophy: {
    mission: {
      title: string;
      lead: string;
      detail: string;
    };
    vision: {
      title: string;
      lead: string;
      detail: string;
    };
    values: {
      keyword: string;
      lead: string;
      detail: string;
    }[];
  };
}

export const COMPANY_DATA: CompanyInfo = {
  name: '株式会社CTC',
  brandName: '心誠不動産',
  fullName: '株式会社CTC 心誠不動産',
  representative: '千原 徹心',
  representativeRole: '代表取締役',
  postalCode: '〒350-2205',
  address: '埼玉県鶴ヶ島市松ヶ丘1丁目6-6',
  mapUrl: 'https://maps.google.com/?q=埼玉県鶴ヶ島市松ヶ丘1丁目6-6',
  phone: '049-277-5294',
  fax: '049-277-5295',
  email: '0000ctcctc@gmail.com',
  businessHours: '10:00〜20:00',
  regularHolidays: '火曜日・水曜日',
  licenses: [
    {
      title: '宅地建物取引業免許',
      authority: '埼玉県知事',
      number: '（1）第25475号',
    },
    {
      title: '古物商許可',
      authority: '埼玉県公安委員会許可',
      number: '第431010056039号',
    },
  ],
  qualifications: [
    '自然災害調査士',
    '外壁診断士',
    '石綿作業主任者',
    '有機溶剤作業主任者',
    'フルハーネス型墜落制止用器具',
    'ゴンドラ、足場の組立て等',
  ],
  capital: '900万円',
  established: '平成28年（2016年）',
  establishedYear: 2016,
  employees: {
    regular: 8,
    contract: 3,
  },
  banks: [
    'みずほ銀行',
    '三菱UFJ銀行',
    '三井住友銀行',
    'りそな銀行',
    '埼玉りそな銀行',
    '群馬銀行',
    '足利銀行',
    '常陽銀行',
    '筑波銀行',
    '武蔵野銀行',
    '千葉銀行',
    '横浜銀行',
    '東和銀行',
    '栃木銀行',
    '京葉銀行',
    'きらぼし銀行',
    '東日本銀行',
    '東京スター銀行',
    '神奈川銀行',
    '川口信用金庫',
    '青木信用金庫',
    '飯能信用金庫',
    '埼玉縣信用金庫',
  ],
  taxAdvisor: 'ベンチャーサポート税理士法人',
  businessDescription: [
    '不動産売買',
    '不動産仲介',
    '不動産買取',
    '不動産相談（相続・任意売却・リフォーム含む）',
  ],
  lineUrl: 'https://lin.ee/9HqoExa',
  instagramUrl: 'https://www.instagram.com/ctc_shinnsei_/',
  philosophy: {
    mission: {
      title: '私達の使命',
      lead: '「正直」な業界を構築し、「働く」の常識を新しく創る。',
      detail: '不透明さが残りやすい不動産業界において、誠実さと透明性を徹底。関わるすべての人々が安心して取引できる社会を目指します。',
    },
    vision: {
      title: '私達が目指す姿',
      lead: '不動産業界の古い仕組みや悪いしきたりを本気で変える。',
      detail: '弊社に関わる全ての方々が『正直』に取引きできる環境を整え、非効率な働き方をやめ、効率性・生産性・幸福度の高い『次世代の働き方』を本気で創ります。',
    },
    values: [
      {
        keyword: 'ありがとう',
        lead: '過去には感謝を。現在には信頼。未来には希望を。',
        detail: '出会えたご縁への感謝を胸に、今目の前のお客様に誠心誠意向き合い、明るい未来の暮らしをともに描きます。',
      },
      {
        keyword: '挑戦',
        lead: '変化を恐れない。',
        detail: '旧態依然とした業界の常識にとらわれず、新しい技術や分かりやすい情報開示、迅速な行動で常により良い選択肢に挑戦します。',
      },
      {
        keyword: '先義先義',
        lead: '顧客を優先して、なお、お客様を優先する。ギブアンドギブの精神。',
        detail: '「先義後利」を少し変えた私達のオリジナル言葉です。利益のために顧客を優先するのではなく、まず何よりもお客様の安心と利益を第一に考え尽くす姿勢を貫きます。',
      },
    ],
  },
};
