import { Gift, ShoppingBag, Phone, Trophy, Star, Loader2, CheckCircle, Clock } from 'lucide-react';

const mockOrders = [
  { id: 101, date: '2024-06-10', total: 1200, status: 'Delivered' },
  { id: 100, date: '2024-06-05', total: 800, status: 'Pending' },
];
const nextRewardPoints = 200;
const mockPromos = [
  { id: 1, title: '10% OFF on Cakes', desc: 'All cakes this week!', icon: <Gift className="w-7 h-7" /> },
  { id: 2, title: 'Buy 2 Get 1 Free', desc: 'On all buns and rolls.', icon: <ShoppingBag className="w-7 h-7" /> },
];

export default function CustomerDashboardPage({ customer, activeCustomerBranch, setActiveTab }) {
  const branchStats = {
    jaffna: { totalOrders: 12, loyaltyPoints: 340 },
    colombo: { totalOrders: 7, loyaltyPoints: 210 },
  };
  const isBranchSelected = activeCustomerBranch === 'jaffna' || activeCustomerBranch === 'colombo';
  const totalOrders = isBranchSelected ? branchStats[activeCustomerBranch].totalOrders : 12;
  const currentPoints = isBranchSelected ? branchStats[activeCustomerBranch].loyaltyPoints : 150;

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
      <div className="mb-8 overflow-x-auto flex gap-6 pb-2 hide-scrollbar">
        {mockPromos.map((promo) => (
          <div key={promo.id} className="min-w-[240px] bg-gradient-to-br from-orange-400 to-amber-300 text-white rounded-2xl shadow-xl p-5 flex items-center gap-4 hover:scale-105 transition-transform duration-200">
            <div className="bg-white/30 rounded-full p-3 flex items-center justify-center">{promo.icon}</div>
            <div>
              <div className="font-bold text-lg">{promo.title}</div>
              <div className="text-sm opacity-90">{promo.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button onClick={() => setActiveTab && setActiveTab('orders')} className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-700 font-semibold py-4 rounded-2xl shadow hover:bg-orange-100 transition text-lg"><ShoppingBag className="w-6 h-6" />Order Again</button>
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
          <Star className="w-6 h-6 text-amber-400 absolute -right-3 -top-2 animate-pulse" style={{ left: `calc(${Math.min((currentPoints / nextRewardPoints) * 100, 100)}% - 12px)` }} />
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
          {mockOrders.map((order) => (
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
