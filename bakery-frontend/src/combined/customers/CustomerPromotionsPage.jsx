import { useState, useEffect } from 'react';
import { Gift, BadgePercent, Sparkles, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';

function isActive(expiry) {
  return new Date(expiry) >= new Date();
}

const defaultPromo = {
  id: 'default',
  title: 'Welcome Offer!',
  description: 'Get 5% off on your first order!',
  code: 'WELCOME5',
  expires: '2099-12-31',
};

function getPromoIcon(title) {
  if (title.toLowerCase().includes('sweet')) return <Gift className="w-7 h-7" />;
  if (title.toLowerCase().includes('festival')) return <Sparkles className="w-7 h-7" />;
  return <BadgePercent className="w-7 h-7" />;
}

function getUsedPromos() {
  try {
    return JSON.parse(localStorage.getItem('usedPromos') || '[]');
  } catch {
    return [];
  }
}

function setUsedPromos(codes) {
  localStorage.setItem('usedPromos', JSON.stringify(codes));
}

export default function CustomerPromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [copied, setCopied] = useState(null);
  const [usedPromos, setUsedPromosState] = useState(getUsedPromos());

  useEffect(() => {
    fetch('http://localhost:5000/api/promotions')
      .then(res => res.json())
      .then(data => {
        setPromotions(data);
        // Only mark the first two real backend promos as used for demo, not the default promo
        const realPromos = data.filter(p => p.code !== defaultPromo.code);
        if (realPromos.length > 2 && getUsedPromos().length < 2) {
          const autoUsed = [realPromos[0].code, realPromos[1].code];
          setUsedPromos(autoUsed);
          setUsedPromosState(autoUsed);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch promotions, using default:', err);
        setPromotions([defaultPromo]);
      });
  }, []);

  // Update localStorage when usedPromos changes
  useEffect(() => {
    setUsedPromos(usedPromos);
    console.log('usedPromos updated:', usedPromos);
  }, [usedPromos]);

  // Show only 'Bakery Anniversary' and unused promos in main grid
  const bakeryAnniversaryPromo = promotions.find(
    p => p.title && p.title.toLowerCase().includes('anniversary') && isActive(p.expires) && p.code !== defaultPromo.code
  );
  const unusedPromos = promotions.filter(
    p => isActive(p.expires) && !usedPromos.includes(p.code) && p.code !== defaultPromo.code && (!p.title || !p.title.toLowerCase().includes('anniversary'))
  );
  const promosToShow = [];
  if (bakeryAnniversaryPromo) promosToShow.push(bakeryAnniversaryPromo);
  promosToShow.push(...unusedPromos);
  if (promosToShow.length === 0) promosToShow.push(defaultPromo);
  // Used promos (non-expired, not default)
  let usedPromoList = promotions.filter(
    p => isActive(p.expires) && usedPromos.includes(p.code) && p.code !== defaultPromo.code
  );
  // If only defaultPromo is present (backend down), check if it's used and show in used section
  if (
    promotions.length === 1 &&
    promotions[0].id === 'default' &&
    usedPromos.includes(defaultPromo.code)
  ) {
    usedPromoList = [defaultPromo];
  }

  const handleCopy = (promo) => {
    navigator.clipboard.writeText(promo.code);
    setCopied(promo.code);
    setTimeout(() => setCopied(null), 1500);
    if (!usedPromos.includes(promo.code)) {
      const newUsed = [...usedPromos, promo.code];
      setUsedPromosState(newUsed);
      console.log('Promotion marked as used:', promo.code, newUsed);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <h3 className="text-4xl font-extrabold text-orange-700 mb-12 text-center flex items-center justify-center gap-3 drop-shadow-sm">
        <BadgePercent className="w-10 h-10 text-amber-400" /> Promotions <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
      </h3>
      {/* Active Promotions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {promosToShow.length > 0 ? promosToShow.map((promo, idx) => (
          <Card
            key={promo._id || promo.id}
            className={`relative group shadow-2xl border-0 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-50 hover:from-orange-200 hover:to-amber-200 transition-all duration-300 rounded-3xl overflow-hidden animate-fade-in-up ${idx % 2 === 0 ? 'hover:scale-[1.04]' : 'hover:scale-[1.02]'}`}
          >
            <div className="absolute right-4 top-4 opacity-10 text-[3rem] pointer-events-none select-none">
              {getPromoIcon(promo.title)}
            </div>
            <CardHeader className="flex-row items-center gap-3 bg-white/60 rounded-2xl shadow p-4 mb-2">
              <span className="bg-white/80 rounded-full p-2 shadow">
                {getPromoIcon(promo.title)}
              </span>
              <CardTitle className="font-bold text-xl text-orange-700 group-hover:text-orange-900 transition drop-shadow-sm">{promo.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <CardDescription className="text-orange-600 text-base mb-1 font-medium min-h-[48px]">{promo.description}</CardDescription>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded text-xs font-mono font-semibold tracking-wider shadow">{promo.code}</span>
                <button
                  className="text-xs px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold shadow disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => handleCopy(promo)}
                  disabled={usedPromos.includes(promo.code)}
                >
                  {copied === promo.code ? 'Copied!' : usedPromos.includes(promo.code) ? <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Used</span> : 'Copy Code'}
                </button>
              </div>
              <div className="text-xs text-orange-500 mt-1 font-medium">Expires: {promo.expires}</div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <Gift className="w-16 h-16 text-orange-200 mb-4 animate-bounce" />
            <div className="text-2xl font-bold text-orange-400 mb-2">No Active Promotions</div>
            <div className="text-orange-500 text-base">Check back soon for exciting offers!</div>
          </div>
        )}
      </div>
      {/* Used Promotions Section */}
      {usedPromoList.length > 0 && (
        <div className="mt-20">
          <h4 className="text-2xl font-bold text-orange-700 mb-8 flex items-center gap-2 justify-center">
            <CheckCircle className="w-7 h-7 text-green-500" /> Used Promotions
            <span className="ml-2 text-base text-orange-500">({usedPromoList.length} used)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {usedPromoList.map((promo, idx) => (
              <Card
                key={promo._id || promo.id}
                className={`relative group shadow-xl border-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-50 rounded-3xl overflow-hidden opacity-80 animate-fade-in-up ${idx % 2 === 0 ? 'hover:scale-[1.01]' : 'hover:scale-[1.03]'}`}
              >
                <div className="absolute right-4 top-4 opacity-10 text-[3rem] pointer-events-none select-none">
                  {getPromoIcon(promo.title)}
                </div>
                <CardHeader className="flex-row items-center gap-3 bg-white/70 rounded-2xl shadow p-4 mb-2">
                  <span className="bg-white/90 rounded-full p-2 shadow">
                    {getPromoIcon(promo.title)}
                  </span>
                  <CardTitle className="font-bold text-xl text-gray-600 group-hover:text-gray-800 transition drop-shadow-sm">{promo.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <CardDescription className="text-gray-600 text-base mb-1 font-medium min-h-[48px]">{promo.description}</CardDescription>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-mono font-semibold tracking-wider shadow">{promo.code}</span>
                    <button
                      className="text-xs px-3 py-1 bg-gray-400 text-white rounded font-semibold shadow flex items-center gap-1 cursor-not-allowed"
                      disabled
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" /> Used
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">Expires: {promo.expires}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
