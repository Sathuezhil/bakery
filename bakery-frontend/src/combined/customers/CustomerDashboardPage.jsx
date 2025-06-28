import { Gift, ShoppingBag, Phone, Trophy, Star, Loader2, CheckCircle, Clock } from 'lucide-react';

const mockOrders = [
  { id: 101, date: '2024-06-10', total: 1200, status: 'Delivered' },
  { id: 100, date: '2024-06-05', total: 800, status: 'Pending' },
];
const nextRewardPoints = 200;
const mockPromos = [
  { id: 1, title: '10% OFF on Cakes', desc: 'All cakes this week!', icon: <Gift className="w-6 h-6" /> },
  { id: 2, title: 'Buy 2 Get 1 Free', desc: 'On all buns and rolls.', icon: <ShoppingBag className="w-6 h-6" /> },
];

export default function CustomerDashboardPage({ customer, activeCustomerBranch }) {
  // Mock data for demo
  const branchStats = {
    jaffna: { totalOrders: 12, loyaltyPoints: 340 },
    colombo: { totalOrders: 7, loyaltyPoints: 210 },
  };
  const isBranchSelected = activeCustomerBranch === 'jaffna' || activeCustomerBranch === 'colombo';
  const totalOrders = isBranchSelected ? branchStats[activeCustomerBranch].totalOrders : 12;
  const currentPoints = isBranchSelected ? branchStats[activeCustomerBranch].loyaltyPoints : 150;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Profile Card */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl shadow p-6 mb-8">
        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=FFB347&color=fff`} alt="avatar" className="w-16 h-16 rounded-full border-4 border-orange-300 shadow" />
        <div>
          <h2 className="text-2xl font-bold text-orange-700 mb-1 flex items-center gap-2">
            <span>Welcome, {customer.name}!</span>
            <span className="animate-bounce"><Star className="w-5 h-5 text-amber-400" /></span>
          </h2>
          <p className="text-orange-500 text-sm">{customer.email || 'customer@email.com'}</p>
        </div>
      </div>
      {/* Promotions Carousel */}
      <div className="mb-6 overflow-x-auto flex gap-4 pb-2 hide-scrollbar">
        {mockPromos.map((promo) => (
          <div key={promo.id} className="min-w-[220px] bg-gradient-to-br from-orange-400 to-amber-300 text-white rounded-xl shadow-lg p-4 flex items-center gap-3 animate-fade-in-up">
            <div className="bg-white/20 rounded-full p-2">{promo.icon}</div>
            <div>
              <div className="font-bold">{promo.title}</div>
              <div className="text-sm">{promo.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="flex gap-4 mb-6">
        <button className="flex-1 flex items-center justify-center gap-2 bg-orange-100 text-orange-700 font-semibold py-3 rounded-xl shadow hover:bg-orange-200 transition"><ShoppingBag className="w-5 h-5" />Order Again</button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-orange-100 text-orange-700 font-semibold py-3 rounded-xl shadow hover:bg-orange-200 transition"><Clock className="w-5 h-5" />View All Orders</button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-orange-100 text-orange-700 font-semibold py-3 rounded-xl shadow hover:bg-orange-200 transition"><Phone className="w-5 h-5" />Contact Support</button>
      </div>
      {/* Loyalty Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-orange-700 flex items-center gap-1"><Trophy className="w-5 h-5 text-amber-400" />Loyalty Progress</span>
          <span className="text-sm text-orange-500">{currentPoints} / {nextRewardPoints} points</span>
        </div>
        <div className="w-full h-4 bg-orange-100 rounded-full overflow-hidden relative">
          <div className="h-4 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-700" style={{ width: `${Math.min((currentPoints / nextRewardPoints) * 100, 100)}%` }}></div>
          <Star className="w-5 h-5 text-amber-400 absolute -right-3 -top-2 animate-pulse" style={{ left: `calc(${Math.min((currentPoints / nextRewardPoints) * 100, 100)}% - 10px)` }} />
        </div>
        <div className="text-xs text-orange-600 mt-1">{nextRewardPoints - currentPoints} points to next reward!</div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-400 to-amber-300 rounded-2xl shadow-lg p-6 flex flex-col items-center animate-fade-in-up">
          <div className="text-4xl font-bold text-white mb-2">{totalOrders}</div>
          <div className="text-lg font-semibold text-white">Total Orders</div>
        </div>
        <div className="bg-gradient-to-br from-orange-300 to-orange-500 rounded-2xl shadow-lg p-6 flex flex-col items-center animate-fade-in-up">
          <div className="text-4xl font-bold text-white mb-2">{currentPoints}</div>
          <div className="text-lg font-semibold text-white">Loyalty Points</div>
        </div>
      </div>
      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 animate-fade-in-up">
        <h3 className="text-lg font-bold text-orange-700 mb-4 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-orange-400" />Recent Orders</h3>
        <ul className="divide-y divide-orange-100">
          {mockOrders.map((order) => (
            <li key={order.id} className="py-3 flex justify-between items-center hover:bg-orange-50 rounded transition">
              <div>
                <div className="font-semibold text-orange-800 flex items-center gap-1">Order #{order.id} {order.status === 'Delivered' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />}</div>
                <div className="text-sm text-orange-500">{order.date}</div>
              </div>
              <div className="text-orange-700 font-bold">Rs.{order.total}</div>
              <div className={`text-xs px-3 py-1 rounded-full font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{order.status}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* Quick Tips */}
      <div className="bg-orange-50 rounded-xl p-6 shadow text-orange-700 animate-fade-in-up">
        <h3 className="text-xl font-bold mb-2">Quick Tips</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Check out our latest <span className="font-semibold text-orange-600">promotions</span>!</li>
          <li>Order your favorite products with just a few clicks.</li>
          <li>Track your order status and history easily.</li>
        </ul>
      </div>
    </div>
  );
} 
