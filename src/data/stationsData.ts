export interface StationInfo {
  id: string;
  name: string;
  nameReading: string;
  line: string;
  city: string;
  expressStop: string; // "急行・快速・準急・各停"
  travelTimes: { destination: string; time: string }[];
  overview: string;
  highlights: string[];
  priceMarket: {
    newHouse: string; // e.g. "2,800万〜3,600万円"
    usedHouse: string; // e.g. "1,800万〜2,800万円"
    landTsubo: string; // e.g. "38万〜55万円 / 坪"
    condo: string; // e.g. "2,000万〜3,200万円"
  };
  liveabilityScores: {
    transport: number; // 1-5
    shopping: number;
    childcare: number;
    nature: number;
  };
  facilities: {
    supermarkets: string[];
    schools: string[];
    parks: string[];
    hospitals: string[];
  };
  advice: {
    buying: string;
    selling: string;
  };
}

export const STATIONS_DATA: StationInfo[] = [
  {
    id: 'tsurugashima',
    name: '鶴ヶ島駅',
    nameReading: 'つるがしまえき',
    line: '東武東上線',
    city: '埼玉県鶴ヶ島市・川越市境',
    expressStop: '急行・快速・準急・普通',
    travelTimes: [
      { destination: '池袋駅', time: '直通 約42分（急行）' },
      { destination: '川越駅', time: '直通 約8分' },
      { destination: '大宮駅', time: '約35分（川越乗換）' },
      { destination: '新宿・渋谷駅', time: '直通 約55〜60分（Fライナー副都心線直通）' }
    ],
    overview: '株式会社CTC 心誠不動産の地元拠点。駅西口・東口ともに閑静な住宅街が広がり、区画の整った美しい街並みと手厚い子育て支援がファミリー層に根強い人気を誇ります。圏央道「鶴ヶ島IC」や関越自動車道「鶴ヶ島JCT」が至近で、車でのレジャー・通勤にも極めて優れています。',
    highlights: [
      '池袋まで直通急行約42分。副都心線・有楽町線直通で都心主要駅へダイレクト',
      '区画整理された落ち着いた住宅街「松ヶ丘」「富士見」が隣接',
      '圏央道・関越道のジャンクション至近でマイカー派の移動も極めてスムーズ'
    ],
    priceMarket: {
      newHouse: '2,700万円 〜 3,500万円',
      usedHouse: '1,600万円 〜 2,600万円',
      landTsubo: '35万円 〜 52万円 / 坪',
      condo: '1,800万円 〜 2,900万円'
    },
    liveabilityScores: {
      transport: 4,
      shopping: 4,
      childcare: 5,
      nature: 4
    },
    facilities: {
      supermarkets: ['コモディイイダ 鶴ヶ島店', 'ベルク すねおり店', 'マミーマート 松ヶ丘店'],
      schools: ['鶴ヶ島市立南小学校', '鶴ヶ島市立南中学校', '松ヶ丘小学校'],
      parks: ['鶴ヶ島市運動公園', '松ヶ丘中央公園', '雷電池（かんだちがいけ）緑地'],
      hospitals: ['鶴ヶ島池井クリニック', '埼玉医科大学総合医療センター（車15分）']
    },
    advice: {
      buying: '松ヶ丘・富士見エリアは40坪〜50坪の整形地が多く、日当たり良好な新築・築浅中古戸建が3,000万円前後で見つかる非常にコストパフォーマンスの高い駅です。',
      selling: '敷地が広く庭付きの戸建て需要が高く、築30年超の建物でも「更地渡し」または「リフォームベース」として安定した買い手がつきやすい地域です。心誠不動産なら即日直接買取も対応いたします。'
    }
  },
  {
    id: 'wakaba',
    name: '若葉駅',
    nameReading: 'わかばえき',
    line: '東武東上線',
    city: '埼玉県鶴ヶ島市・坂戸市',
    expressStop: '急行・快速・準急・普通',
    travelTimes: [
      { destination: '池袋駅', time: '直通 約39分（急行）' },
      { destination: '川越駅', time: '直通 約5分' },
      { destination: '大宮駅', time: '約32分（川越乗換）' },
      { destination: '新宿三丁目駅', time: '直通 約53分（副都心線直通）' }
    ],
    overview: '駅東口にペデストリアンデッキ直結の大型複合ショッピングモール「ワカバウォーク」が広がる、東武東上線屈指の生活利便駅。シネコン・ヤオコー・専門店・飲食店が揃い、駅前広場も美しくフラットで、共働き世帯や子育て世代から圧倒的な支持を集めています。',
    highlights: [
      '駅直結ショッピングモール「ワカバウォーク」で買い物・映画・外食が完結',
      '東武東上線急行停車駅。川越駅までわずか5分の圧倒的スピード',
      '駅周辺の歩道が広く平坦。夜間も明るく防犯面でも女性やお子様に安心'
    ],
    priceMarket: {
      newHouse: '3,100万円 〜 3,980万円',
      usedHouse: '2,100万円 〜 3,200万円',
      landTsubo: '42万円 〜 60万円 / 坪',
      condo: '2,200万円 〜 3,600万円'
    },
    liveabilityScores: {
      transport: 5,
      shopping: 5,
      childcare: 5,
      nature: 3
    },
    facilities: {
      supermarkets: ['ヤオコー ワカバウォーク店', '業務スーパー 若葉店', 'ベイシアフードセンター 坂戸店'],
      schools: ['鶴ヶ島市立富士見小学校', '坂戸市立千代田小学校', '富士見中学校'],
      parks: ['富士見中央公園', '千代田公園', '若葉緑地'],
      hospitals: ['若葉駅前クリニック', '関口病院']
    },
    advice: {
      buying: 'ワカバウォーク周辺の駅徒歩10分圏内マンションや新築戸建ては資産価値が下がりにくく、賃貸需要も高いため、将来的な売却・住み替えを見据える方にも最適です。',
      selling: '駅徒歩圏の物件は常に探しているお客様がウェイティング状態です。中古マンション・分譲戸建ての早期高額売却が狙えるエリアです。'
    }
  },
  {
    id: 'kawagoe',
    name: '川越駅・本川越駅',
    nameReading: 'かわごええき / ほんかわごええき',
    line: 'JR川越線（埼京線直通）・東武東上線・西武新宿線',
    city: '埼玉県川越市',
    expressStop: '特急・TJライナー・快速急行・急行・普通',
    travelTimes: [
      { destination: '池袋駅', time: '直通 約30分（東武快速急行）' },
      { destination: '新宿駅', time: '直通 約45分（JR埼京線直通）/ 約48分（西武特急）' },
      { destination: '大宮駅', time: '直通 約22分（JR川越線）' },
      { destination: '渋谷・横浜駅', time: '直通 約50〜75分（東急東横・みなとみらい直通）' }
    ],
    overview: '埼玉県西部最大の商業拠点都市。アトレマルヒロ、ルミネ川越、東武宇都宮百貨店跡地、埼玉屈指の賑わいを見せる商店街「クレアモール」が連なり、買い物・飲食・医療が全て集約。蔵造りの町並みや歴史情緒も豊かで、都心直通の複数路線が乗り入れる資産価値トップクラスの街です。',
    highlights: [
      'JR埼京線・東武東上線・西武線の3駅3路線利用可能で大宮・池袋・新宿・横浜直通',
      'クレアモール・アトレ・ルミネなど埼玉屈指の商業集積地',
      '歴史文化と現代利便性が共存し、資産価値・リセールバリューが極めて強固'
    ],
    priceMarket: {
      newHouse: '3,800万円 〜 5,800万円',
      usedHouse: '2,600万円 〜 4,200万円',
      landTsubo: '55万円 〜 110万円 / 坪',
      condo: '3,200万円 〜 5,500万円'
    },
    liveabilityScores: {
      transport: 5,
      shopping: 5,
      childcare: 4,
      nature: 3
    },
    facilities: {
      supermarkets: ['ルミネ川越食品フロア', 'ヤオコー 川越的場店 / 川越藤間店', '成城石井 アトレ川越店'],
      schools: ['川越市立川越小学校', '初雁中学校', '埼玉県立川越高等学校'],
      parks: ['初雁公園', '川越水上公園', '喜多院境内'],
      hospitals: ['川越胃腸病院', '赤心堂病院', '三井病院']
    },
    advice: {
      buying: '駅徒歩15分圏内の土地・中古戸建ては出物が出るとすぐに成約する激戦区。未公開物件情報や売却予定物件をいち早くキャッチすることが鍵となります。',
      selling: '購入希望者の分母が埼玉県内でも圧倒的に多いため、適正価格で出せば早期売却が可能です。相続した古い戸建ても解体更地化や建売用地として高価買取の引き合いが活発です。'
    }
  },
  {
    id: 'sakado',
    name: '坂戸駅',
    nameReading: 'さかどえき',
    line: '東武東上線・東武越生線',
    city: '埼玉県坂戸市',
    expressStop: 'TJライナー・快速急行・急行・準急・普通',
    travelTimes: [
      { destination: '池袋駅', time: '直通 約44分（急行）' },
      { destination: '川越駅', time: '直通 約10分' },
      { destination: '大宮駅', time: '約37分（川越乗換）' },
      { destination: '越生方面', time: '東武越生線始発駅' }
    ],
    overview: '東武東上線と越生線のターミナル駅であり、池袋方面への当駅始発電車も多数設定されているため「座って通勤できる駅」として通勤者に大人気。駅南口・北口ともに再開発が進み、整然とした住宅街と豊かな公園が広がり、50坪以上の広い敷地でゆったりとした一戸建てを構えたい方に絶大な支持を得ています。',
    highlights: [
      '東武東上線・越生線の分岐駅。始発電車で池袋・都心へ座席着席通勤が可能',
      '敷地45坪〜60坪以上の広々とした区画が多く、駐車2台〜3台並列や広い庭が実現可能',
      '圏央道「坂戸IC」が近く、週末のアウトドアや帰省もストレスフリー'
    ],
    priceMarket: {
      newHouse: '2,500万円 〜 3,300万円',
      usedHouse: '1,400万円 〜 2,400万円',
      landTsubo: '30万円 〜 48万円 / 坪',
      condo: '1,600万円 〜 2,700万円'
    },
    liveabilityScores: {
      transport: 4,
      shopping: 4,
      childcare: 4,
      nature: 5
    },
    facilities: {
      supermarkets: ['イトーヨーカドー 坂戸店（現丸広周辺）', 'ヤオコー 坂戸泉店', 'ベルク 坂戸八幡店'],
      schools: ['坂戸市立坂戸小学校', '千代田中学校', '住吉中学校'],
      parks: ['芦山公園', '高麗川ふるさと遊歩道', '溝端公園'],
      hospitals: ['坂戸中央病院', '西入間医師会休日診療所']
    },
    advice: {
      buying: '2,000万円台後半で敷地50坪・建物4LDK・並列駐車2台付きの新築戸建てが手に入る、ファミリー層にとって最もゆとりある暮らしが叶う注目エリアです。',
      selling: '敷地が広い物件が多く、近年は平屋建てや二世帯住宅用地としての需要が急増しています。農地転用や分筆が必要な土地の売却も心誠不動産にお任せください。'
    }
  },
  {
    id: 'kasumigaseki',
    name: '霞ヶ関駅',
    nameReading: 'かすみがせきえき',
    line: '東武東上線',
    city: '埼玉県川越市',
    expressStop: '準急・普通',
    travelTimes: [
      { destination: '川越駅', time: '直通 約5分' },
      { destination: '池袋駅', time: '約36分（川越で快速急行乗換）' },
      { destination: '大宮駅', time: '約30分（川越乗換）' }
    ],
    overview: '東京国際大学のキャンパスをはじめ学生街の活気と、古くから広がる落ち着いた住宅街「霞ヶ関北」「笠幡」エリアが共存する川越西部の駅。小畔川や入間川の自然に囲まれ、平坦な地形が続くため自転車での移動も軽快。川越駅への近さとリーズナブルな住居費用のバランスが抜群です。',
    highlights: [
      '川越駅までわずか2駅5分。ビッグターミナルの恩恵を手軽に享受',
      '地形がフラットで坂道が少なく、スーパー・ドラッグストア・学校が徒歩圏に集約',
      '川越市内でありながら、土地・戸建て価格が手頃でマイホーム取得がしやすい'
    ],
    priceMarket: {
      newHouse: '2,600万円 〜 3,400万円',
      usedHouse: '1,400万円 〜 2,300万円',
      landTsubo: '32万円 〜 46万円 / 坪',
      condo: '1,500万円 〜 2,500万円'
    },
    liveabilityScores: {
      transport: 4,
      shopping: 4,
      childcare: 4,
      nature: 4
    },
    facilities: {
      supermarkets: ['サミットストア 霞ヶ関店', 'ヤオコー 的場店', 'TAIRAYA 霞ヶ関店'],
      schools: ['川越市立霞ヶ関東小学校', '霞ヶ関中学校', '東京国際大学'],
      parks: ['小畔水鳥の郷公園', '御伊勢塚公園', '安比奈親水公園'],
      hospitals: ['霞ヶ関南病院', '大久保医院']
    },
    advice: {
      buying: '川越駅周辺よりも800万〜1,200万円ほど割安に戸建てが購入可能。川越市内勤務の方や東上線沿線通勤者にとって、穴場の高コスパ駅としておすすめです。',
      selling: '学生向けアパート用地や、築年数の経った戸建ての建て替え用地としての需要が堅調。古家付き土地の売却相談が非常に多いエリアです。'
    }
  },
  {
    id: 'higashimatsuyama',
    name: '東松山駅・高坂駅',
    nameReading: 'ひがしまつやま / たかさか',
    line: '東武東上線',
    city: '埼玉県東松山市',
    expressStop: 'TJライナー・快速急行・急行・準急・普通',
    travelTimes: [
      { destination: '池袋駅', time: '直通 約50分（快速急行）' },
      { destination: '川越駅', time: '直通 約18分' },
      { destination: '大宮駅', time: '約45分（川越乗換）' }
    ],
    overview: '国営武蔵丘陵森林公園や比企丘陵の雄大な緑に囲まれた自然環境豊かなエリア。高坂駅前には「ピオニウォーク東松山」大型ショッピングモールがあり休日の買い物も快適。60坪〜80坪超のゆったりとした敷地や、ウッドデッキ・平屋・家庭菜園を楽しむライフスタイルに最適です。',
    highlights: [
      '国営武蔵丘陵森林公園やこども動物自然公園など埼玉屈指の大型自然レジャーが近接',
      '高坂駅近くに大型商業施設「ピオニウォーク東松山」があり買い物環境抜群',
      '60坪超のゆったり敷地や平屋住宅の建築に最適な割安な土地価格帯'
    ],
    priceMarket: {
      newHouse: '2,200万円 〜 2,980万円',
      usedHouse: '1,100万円 〜 2,000万円',
      landTsubo: '20万円 〜 38万円 / 坪',
      condo: '1,200万円 〜 2,200万円'
    },
    liveabilityScores: {
      transport: 3,
      shopping: 4,
      childcare: 4,
      nature: 5
    },
    facilities: {
      supermarkets: ['ピオニウォーク東松山（アピタ）', 'ベルク 砂田店', 'ヤオコー 東松山シルピア店'],
      schools: ['東松山市立松山第一小学校', '東松山東中学校', '東京電機大学 埼玉鳩山キャンパス'],
      parks: ['国営武蔵丘陵森林公園', '埼玉県こども動物自然公園', '岩鼻運動公園'],
      hospitals: ['東松山医師会病院', '埼玉医科大学総合医療センター']
    },
    advice: {
      buying: 'ゆとりある敷地でのびのび暮らしたい方や、テレワーク中心で都心通勤が週数回の方に絶大な人気。新築2,000万円台前半で理想のマイホームが手に入ります。',
      selling: '市街化調整区域や広大な山林・農地が混在する地域のため、売却には法令調査や行政手続きのノウハウが不可欠です。心誠不動産は東松山市の不動産実績も豊富です。'
    }
  }
];
