import { useState } from 'react';

const initialPromotions = [
  { id: 1, title: '10% Off on Cakes', desc: 'Get 10% off on all cakes this week!', code: 'CAKE10', expires: '2024-07-31' },
  { id: 2, title: 'Buy 2 Get 1 Free', desc: 'On all buns and rolls.', code: 'BUNS3', expires: '2024-07-15' },
  { id: 3, title: 'Expired Offer', desc: 'This offer has expired.', code: 'EXPIRED', expires: '2024-06-01' },
];

function isActive(expiry) {
  return new Date(expiry) >= new Date();
}

const defaultPromo = {
  id: 'default',
  title: 'Welcome Offer!',
  desc: 'Get 5% off on your first order!',
  code: 'WELCOME5',
  expires: '2099-12-31',
};

export default function CustomerPromotionsPage() {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [copied, setCopied] = useState(null);
  const [form, setForm] = useState({ title: '', desc: '', code: '', expires: '' });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPromotion = (e) => {
    e.preventDefault();
    if (!form.title || !form.desc || !form.code || !form.expires) return;
    setPromotions([
      { id: Date.now(), ...form },
      ...promotions,
    ]);
    setForm({ title: '', desc: '', code: '', expires: '' });
  };

  const activePromos = promotions.filter(p => isActive(p.expires));
  const expiredPromos = promotions.filter(p => !isActive(p.expires));
  const promosToShow = activePromos.length > 0 ? activePromos : [defaultPromo];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Promotions</h3>
      <ul className="space-y-4">
        {promosToShow.map((promo) => (
          <li key={promo.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="font-semibold text-green-700">{promo.title}</div>
            <div className="mb-2">{promo.desc}</div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">{promo.code}</span>
              <button
                className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleCopy(promo.code)}
              >
                {copied === promo.code ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">Expires: {promo.expires}</div>
          </li>
        ))}
        {expiredPromos.length > 0 && (
          <li className="mt-6 text-sm text-gray-400">Expired Promotions</li>
        )}
        {expiredPromos.map((promo) => (
          <li key={promo.id} className="p-4 bg-gray-100 rounded-lg border border-gray-200 opacity-60">
            <div className="font-semibold">{promo.title}</div>
            <div>{promo.desc}</div>
            <div className="text-xs text-gray-500 mt-1">Expired: {promo.expires}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 
