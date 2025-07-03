import { useEffect, useState } from 'react';
import { Gift, ShoppingBag, Phone, Trophy, Star, Loader2, CheckCircle, Clock } from 'lucide-react';
import { useOrders } from '../../context/OrdersContext';

const mockOrders = [
  { id: 101, date: '2024-06-10', total: 1200, status: 'Delivered', branch: 'jaffna' },
  { id: 100, date: '2024-06-05', total: 800, status: 'Pending', branch: 'colombo' },
];
const nextRewardPoints = 200;

const defaultPromo = {
  id: 'default',
  title: 'Welcome Offer!',
  description: 'Get 5% off on your first order!',
  code: 'WELCOME5',
  expires: '2099-12-31',
};

function getPromoIcon(title) {
  if (title.toLowerCase().includes('cake')) return <Gift className="w-7 h-7" />;
  if (title.toLowerCase().includes('bun')) return <ShoppingBag className="w-7 h-7" />;
  return <Gift className="w-7 h-7" />;
}

function getPromoIconSmall(title) {
  if (title.toLowerCase().includes('cake')) return <Gift className="w-4 h-4" />;
  if (title.toLowerCase().includes('bun')) return <ShoppingBag className="w-4 h-4" />;
  return <Gift className="w-4 h-4" />;
}

function getPromoIconMedium(title) {
  if (title.toLowerCase().includes('cake')) return <Gift className="w-6 h-6" />;
  if (title.toLowerCase().includes('bun')) return <ShoppingBag className="w-6 h-6" />;
  return <Gift className="w-6 h-6" />;
}

function getUsedPromos() {
  try {
    return JSON.parse(localStorage.getItem('usedPromos') || '[]');
  } catch {
    return [];
  }
}

export default function CustomerDashboardPage({ customer, activeCustomerBranch, setActiveTab }) {
  const { orders } = useOrders();
  // Combine mockOrders and new orders
  const allOrders = [...orders, ...mockOrders];
  // Filter by branch if selected
  const filteredOrders = activeCustomerBranch
    ? allOrders.filter(order => order.branch === activeCustomerBranch)
    : allOrders;
  const totalOrders = filteredOrders.length;
  // Loyalty points logic can be updated similarly if needed
  const currentPoints = 150;

  const [promos, setPromos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/promotions')
      .then(res => res.json())
      .then(data => {
        const usedPromos = getUsedPromos();
        const activePromos = data.filter(p => new Date(p.expires) >= new Date() && !usedPromos.includes(p.code));
        setPromos(activePromos.length > 0 ? activePromos : [defaultPromo]);
      });
  }, []);

  // Sort orders by date descending (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl shadow-xl p-8 mb-10 border border-orange-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 text-[8rem] pointer-events-none select-none"><Star className="w-32 h-32 text-amber-200" /></div>
        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=FFB347&color=fff`} alt="avatar" className="w-20 h-20 rounded-full border-4 border-orange-300 shadow-lg" />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 mb-2 flex items-center gap-2 justify-center md:justify-start">
            <span>Welcome, {customer.name}!</span>
            <span className="animate-bounce"><Star className="w-6 h-6 text-amber-400" /></span>
          </h2>
          <p className="text-orange-500 text-base md:text-lg">{customer.email || 'customer@email.com'}</p>
        </div>
      </div>
      {/* Promotions Carousel */}
      <div className="mb-7 overflow-x-auto flex gap-5 pb-3 hide-scrollbar">
        {promos.map((promo) => (
          <div
            key={promo._id || promo.id}
            className="relative min-w-[265px] bg-gradient-to-br from-orange-400 to-amber-300 text-white rounded-2xl shadow-xl p-5 flex items-center gap-5 border-2 border-orange-200 hover:border-amber-400 hover:shadow-[0_0_20px_3px_rgba(255,191,71,0.22)] transition-all duration-300 group overflow-hidden"
            style={{ boxShadow: '0 0 16px 0 rgba(255,191,71,0.13), 0 3px 16px 0 rgba(255,140,0,0.09)' }}
          >
            {/* NEW badge */}
            <span className="absolute top-2.5 left-2.5 bg-white text-orange-500 font-bold text-[12px] px-2.5 py-1 rounded-full shadow z-10 animate-pulse">NEW</span>
            {/* Decorative SVG confetti */}
            <svg className="absolute right-0 bottom-0 opacity-20 w-14 h-14 pointer-events-none" viewBox="0 0 100 100"><circle cx="20" cy="20" r="6" fill="#fff" /><circle cx="80" cy="40" r="4" fill="#fff" /><circle cx="60" cy="80" r="3" fill="#fff" /></svg>
            <div className="bg-white/30 rounded-full p-3 flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300">{getPromoIconMedium(promo.title)}</div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="font-extrabold text-lg md:text-xl">{promo.title}</div>
                {/* visually distinct expiry */}
                <span className="ml-1.5 bg-white/80 text-orange-500 font-semibold text-[12px] px-2 py-0.5 rounded-full border border-orange-200 shadow-sm">{promo.expires?.slice(5, 10)}</span>
              </div>
              <div className="text-sm md:text-base opacity-90 font-medium mb-2">{promo.description || promo.desc}</div>
              {/* Copy Code button */}
              <PromoCodeButtonMedium code={promo.code} />
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button onClick={() => setActiveTab && setActiveTab('products')} className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-700 font-semibold py-4 rounded-2xl shadow hover:bg-orange-100 transition text-lg"><ShoppingBag className="w-6 h-6" />Order Again</button>
        <button onClick={() => setActiveTab && setActiveTab('orders')} className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-700 font-semibold py-4 rounded-2xl shadow hover:bg-orange-100 transition text-lg"><Clock className="w-6 h-6" />View All Orders</button>
        <button onClick={() => setActiveTab && setActiveTab('settings')} className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-700 font-semibold py-4 rounded-2xl shadow hover:bg-orange-100 transition text-lg"><Phone className="w-6 h-6" />Contact Support</button>
      </div>
      {/* Loyalty Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-orange-700 flex items-center gap-2 text-lg"><Trophy className="w-6 h-6 text-amber-400" />Loyalty Progress</span>
          <span className="text-base text-orange-500 font-medium">{currentPoints} / {nextRewardPoints} points</span>
        </div>
        <div className="w-full h-5 bg-orange-100 rounded-full overflow-hidden relative">
          <div className="h-5 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-700" style={{ width: `${Math.min((currentPoints / nextRewardPoints) * 100, 100)}%` }}></div>
        </div>
        <div className="text-sm text-orange-600 mt-1 font-medium">{nextRewardPoints - currentPoints} points to next reward!</div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-gradient-to-br from-orange-400 to-amber-300 rounded-3xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform animate-fade-in-up">
          <div className="text-5xl font-extrabold text-white mb-2 drop-shadow">{totalOrders}</div>
          <div className="text-xl font-semibold text-white tracking-wide">Total Orders</div>
        </div>
        <div className="bg-gradient-to-br from-orange-300 to-orange-500 rounded-3xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform animate-fade-in-up">
          <div className="text-5xl font-extrabold text-white mb-2 drop-shadow">{currentPoints}</div>
          <div className="text-xl font-semibold text-white tracking-wide">Loyalty Points</div>
        </div>
      </div>
      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 animate-fade-in-up border border-orange-100">
        <h3 className="text-2xl font-bold text-orange-700 mb-6 flex items-center gap-3"><ShoppingBag className="w-7 h-7 text-orange-400" />Recent Orders</h3>
        <ul className="divide-y divide-orange-100">
          {sortedOrders.map((order) => (
            <li key={order.id} className="py-4 flex justify-between items-center hover:bg-orange-50 rounded-xl transition">
              <div>
                <div className="font-semibold text-orange-800 flex items-center gap-2 text-lg">Order #{order.id} {order.status === 'Delivered' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />}</div>
                <div className="text-sm text-orange-500">{order.date}</div>
              </div>
              <div className="text-orange-700 font-bold text-lg">Rs.{order.total}</div>
              <div className={`text-xs px-4 py-1 rounded-full font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{order.status}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* Quick Tips */}
      <div className="bg-orange-50 rounded-2xl p-8 shadow-lg text-orange-700 animate-fade-in-up border border-orange-100">
        <h3 className="text-xl font-bold mb-3">Quick Tips</h3>
        <ul className="list-disc pl-7 space-y-2 text-base">
          <li>Check out our latest <span className="font-semibold text-orange-600">promotions</span>!</li>
          <li>Order your favorite products with just a few clicks.</li>
          <li>Track your order status and history easily.</li>
        </ul>
      </div>
    </div>
  );
}

function PromoCodeButton({ code }) {
  const [copied, setCopied] = useState(false);
  if (!code) return null;
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-orange-600 bg-white shadow hover:bg-orange-100 border-2 border-orange-200 transition-all duration-200 ${copied ? 'ring-2 ring-amber-400' : ''}`}
      title="Copy promo code"
    >
      <span>{code}</span>
      {copied ? (
        <span className="text-green-500 font-semibold">Copied!</span>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
      )}
    </button>
  );
}

function PromoCodeButtonSmall({ code }) {
  const [copied, setCopied] = useState(false);
  if (!code) return null;
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-bold text-orange-600 bg-white shadow hover:bg-orange-100 border border-orange-200 transition-all duration-200 text-xs ${copied ? 'ring-1 ring-amber-400' : ''}`}
      title="Copy promo code"
    >
      <span>{code}</span>
      {copied ? (
        <span className="text-green-500 font-semibold">✓</span>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
      )}
    </button>
  );
}

function PromoCodeButtonMedium({ code }) {
  const [copied, setCopied] = useState(false);
  if (!code) return null;
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-orange-600 bg-white shadow hover:bg-orange-100 border border-orange-200 transition-all duration-200 text-sm ${copied ? 'ring-1 ring-amber-400' : ''}`}
      title="Copy promo code"
    >
      <span>{code}</span>
      {copied ? (
        <span className="text-green-500 font-semibold">✓</span>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
      )}
    </button>
  );
} 
