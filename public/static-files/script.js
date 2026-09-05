// 心誠不動産 (SHINSEI REAL ESTATE) JavaScript

// 1. ヒーロースライダー
const heroImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=2000&q=80'
];
let currentHeroIndex = 0;

function updateHero() {
  const el = document.getElementById('hero-bg');
  if (el) {
    el.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
  }
  const num = document.getElementById('slide-number');
  if (num) {
    num.innerText = `${currentHeroIndex + 1} / ${heroImages.length}`;
  }
}

function nextHeroSlide() {
  currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
  updateHero();
}

function prevHeroSlide() {
  currentHeroIndex = (currentHeroIndex - 1 + heroImages.length) % heroImages.length;
  updateHero();
}

// 5.5秒ごとに自動切替
setInterval(nextHeroSlide, 5500);

// 2. 出口戦略タブ
const strategyData = {
  brokerage: {
    title: '仲介売却（一般市場で最高値を追求）',
    speed: '売却期間の目安: 1〜3ヶ月',
    desc: 'ポータルサイト（SUUMO・at home等）や当社の顧客ネットワークを活用し、一般市場から最も条件の良い購入希望者を広く募る王道の売却手法です。',
    merit: '相場の最高価格・高値売却が期待できる。条件交渉の幅が広い。',
    demerit: '内覧対応が必要。売却までの期間に余裕があり、少しでも高く手残りを残したい方に最適。'
  },
  buyout: {
    title: '直接買取（即時現金化・スピード引き渡し）',
    speed: '売却期間の目安: 最短3日〜1週間',
    desc: '当社が直接買主となり買い取ります。一般への広告・内覧対応・周囲への周知が一切不要です。',
    merit: '契約不適合責任免除。仲介手数料0円。周囲に知られず即座に決済可能。',
    demerit: '価格は仲介相場の約70〜80%程度。早期現金化を優先する方に最適。'
  },
  leaseback: {
    title: 'リースバック（売却後も家賃で住み続ける）',
    speed: '売却期間の目安: 2週間〜1ヶ月',
    desc: '自宅を売却してまとまった現金を一括で手に入れた後、賃貸契約を結んでそのまま住み続けられます。',
    merit: '引越し不要。周囲には売却したことが分からない。将来の買い戻しも相談可能。',
    demerit: '売却後に毎月の家賃が発生する。老後資金確保や住宅ローン整理に最適。'
  },
  current: {
    title: '現況有姿引き渡し（荷物・家具・古家そのまま）',
    speed: '売却期間の目安: 相談に応じて即応',
    desc: '古家の解体や家財道具・残置物の片付けを一切せず、現在の状態のまま引き渡せる業者や買主ルートをご案内します。',
    merit: '解体費用（150万〜300万）や片付けの手間がゼロ。手出し自己資金なし。',
    demerit: '価格から撤去費用分が勘案される。空き家放置・相続不動産に最適。'
  }
};

function setStrategyTab(key) {
  const data = strategyData[key];
  if (!data) return;
  document.getElementById('strat-title').innerText = data.title;
  document.getElementById('strat-speed').innerText = data.speed;
  document.getElementById('strat-desc').innerText = data.desc;
  document.getElementById('strat-merit').innerText = data.merit;
  document.getElementById('strat-demerit').innerText = data.demerit;

  document.querySelectorAll('.strategy-tab').forEach(b => {
    b.className = 'strategy-tab py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all text-left bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700';
  });
  const activeTab = document.getElementById('tab-' + key);
  if (activeTab) {
    activeTab.className = 'strategy-tab py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all text-left bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-400 shadow-md';
  }
}

// 3. 手残り資金シミュレーター
function calcProceeds() {
  const priceInput = document.getElementById('input-price');
  const loanInput = document.getElementById('input-loan');
  const demoInput = document.getElementById('input-demolition');
  const taxInput = document.getElementById('input-tax');

  if (!priceInput) return;

  const price = parseInt(priceInput.value) || 0;
  const loan = parseInt(loanInput ? loanInput.value : '0') || 0;
  const demo = parseInt(demoInput ? demoInput.value : '0') || 0;
  const tax = parseInt(taxInput ? taxInput.value : '0') || 0;

  document.getElementById('label-price').innerText = price.toLocaleString() + '万円';
  document.getElementById('label-loan').innerText = loan.toLocaleString() + '万円';

  // 仲介手数料概算: price * 3% + 6万 + 消費税10%
  const brokerageFee = Math.round((price * 0.03 + 6) * 1.1);
  document.getElementById('calc-brokerage').innerText = '約' + brokerageFee.toLocaleString() + '万円';

  const net = price - loan - brokerageFee - demo - tax;
  const netEl = document.getElementById('result-net');
  if (netEl) {
    if (net >= 0) {
      netEl.innerText = '+' + net.toLocaleString() + '万円';
      netEl.className = 'font-mincho text-4xl sm:text-5xl font-bold text-amber-400 font-mono';
    } else {
      netEl.innerText = net.toLocaleString() + '万円';
      netEl.className = 'font-mincho text-4xl sm:text-5xl font-bold text-rose-500 font-mono';
    }
  }
}

// 4. かんたん査定相談文生成
let currentKind = '戸建';
function setEstKind(k) {
  currentKind = k;
  document.querySelectorAll('.est-kind-btn').forEach(b => {
    b.className = 'est-kind-btn py-2.5 px-3 rounded-xl text-xs font-bold border bg-white text-slate-700 border-slate-200';
  });
  if (k === '戸建') document.getElementById('est-kind-kodate').className = 'est-kind-btn py-2.5 px-3 rounded-xl text-xs font-bold border bg-slate-900 text-white border-slate-900 shadow';
  if (k === '土地') document.getElementById('est-kind-tochi').className = 'est-kind-btn py-2.5 px-3 rounded-xl text-xs font-bold border bg-slate-900 text-white border-slate-900 shadow';
  if (k === 'マンション') document.getElementById('est-kind-mansion').className = 'est-kind-btn py-2.5 px-3 rounded-xl text-xs font-bold border bg-slate-900 text-white border-slate-900 shadow';
  generateConsultText();
}

function generateConsultText() {
  const cityEl = document.getElementById('est-city');
  const townEl = document.getElementById('est-town');
  const areaEl = document.getElementById('est-area');
  if (!cityEl) return;

  const city = cityEl.value;
  const town = townEl.value || '（町名未定）';
  const area = areaEl.value || '0';
  const areaTsubo = Math.round((parseFloat(area) || 0) * 0.3025);

  const concerns = [];
  document.querySelectorAll('.est-concern:checked').forEach(c => {
    concerns.push('・' + c.value);
  });

  const txt = `【心誠不動産 かんたん査定相談】
-----------------------------
■ 物件種別: ${currentKind}
■ 所在地: 埼玉県${city} ${town}
■ 敷地・専有面積: ${area}㎡（約${areaTsubo}坪）
■ 気になる事情・ご要望:
${concerns.length > 0 ? concerns.join('\n') : '・特になし'}
-----------------------------
上記物件について、売却・買取の可能性や査定価格、手残り資金について相談したいです。よろしくお願いいたします。`;

  const resEl = document.getElementById('est-result-text');
  if (resEl) resEl.value = txt;
}

function copyConsultText() {
  const resEl = document.getElementById('est-result-text');
  if (resEl) {
    navigator.clipboard.writeText(resEl.value);
    alert('相談文をクリップボードにコピーしました！LINEやメールに貼り付けてご利用ください。');
  }
}

// 5. 物件データ & 絞り込みレンダリング
const propertiesData = [
  {
    title: '鶴ヶ島市松ヶ丘 邸宅仕様の美築中古戸建',
    type: '中古戸建',
    price: 3480,
    city: '鶴ヶ島市',
    station: '東武東上線 鶴ヶ島駅 徒歩14分',
    layout: '4LDK+S',
    land: '135.50㎡',
    building: '108.20㎡',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    badge: '即入居可'
  },
  {
    title: '川越市新宿町 南道路の陽だまり新築一戸建て',
    type: '新築戸建',
    price: 4280,
    city: '川越市',
    station: 'JR・東武 川越駅 徒歩12分',
    layout: '4LDK',
    land: '120.40㎡',
    building: '99.50㎡',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badge: '仲介手数料優遇'
  },
  {
    title: '坂戸市千代田 建築条件なし ゆとりの整形地45坪',
    type: '売地',
    price: 1880,
    city: '坂戸市',
    station: '東武東上線 若葉駅 徒歩16分',
    layout: '建築条件なし',
    land: '150.25㎡ (45.45坪)',
    building: '-',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    badge: '自由設計可'
  },
  {
    title: '東松山市松葉町 リノベーション済み駅近マンション',
    type: 'マンション',
    price: 2180,
    city: '東松山市',
    station: '東武東上線 東松山駅 徒歩6分',
    layout: '3LDK',
    land: '-',
    building: '72.40㎡',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    badge: '家具付き'
  }
];

function renderProperties() {
  const typeEl = document.getElementById('filter-type');
  const cityEl = document.getElementById('filter-city');
  const priceEl = document.getElementById('filter-price');
  if (!typeEl || !cityEl || !priceEl) return;

  const type = typeEl.value;
  const city = cityEl.value;
  const price = parseInt(priceEl.value) || 0;

  const filtered = propertiesData.filter(p => {
    if (type !== 'すべて' && p.type !== type) return false;
    if (city !== 'すべて' && p.city !== city) return false;
    if (price > 0 && p.price > price) return false;
    return true;
  });

  const container = document.getElementById('property-grid');
  if (!container) return;
  container.innerHTML = filtered.map(p => `
    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
      <div>
        <div class="relative h-48 bg-cover bg-center" style="background-image: url('${p.image}')">
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-xs">${p.type}</span>
          <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px]">${p.badge}</span>
        </div>
        <div class="p-5 space-y-2">
          <div class="font-mincho text-2xl font-bold text-amber-700 font-mono">${p.price.toLocaleString()}万円</div>
          <h4 class="font-bold text-slate-900 text-sm">${p.title}</h4>
          <div class="text-xs text-slate-600">${p.station}</div>
          <div class="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            <span>間取り: ${p.layout}</span>
            <span>敷地: ${p.land}</span>
          </div>
        </div>
      </div>
      <div class="p-5 pt-0">
        <a href="#contact" onclick="inquireProp('${p.title}')" class="block w-full text-center py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors">
          この物件のお問い合わせ・内覧希望
        </a>
      </div>
    </div>
  `).join('');
}

function inquireProp(title) {
  const msgEl = document.getElementById('contact-msg');
  if (msgEl) {
    msgEl.value = `【物件内覧希望】\n物件名: ${title}\n詳しい資料や現地案内を希望します。`;
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  alert('お問い合わせありがとうございます。担当者より24時間以内にご連絡いたします。');
}

// 初期化実行
window.addEventListener('DOMContentLoaded', () => {
  calcProceeds();
  generateConsultText();
  renderProperties();
});
