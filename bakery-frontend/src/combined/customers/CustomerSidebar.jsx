import { Home, ShoppingBag, ClipboardList, Gift, Settings, LogOut, Crown, Users } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'promotions', label: 'Promotions', icon: Gift },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function CustomerSidebar({ activeTab, setActiveTab, onSignOut, activeBranch, setActiveBranch, activeCustomerBranch, setActiveCustomerBranch }) {
  return (
    <div className="w-64 bg-white border-r min-h-screen p-6 flex flex-col justify-between">
      <div>
        {/* Branch Selector for customer login */}
        {activeCustomerBranch && setActiveCustomerBranch && (
          <div className="mb-6">
            <div className="text-xs font-medium text-gray-600 mb-2">Branch Selection:</div>
            <div className="flex space-x-2 justify-center">
              <button
                onClick={() => setActiveCustomerBranch('jaffna')}
                className={`px-3 py-1 rounded-full font-semibold text-xs ${activeCustomerBranch === 'jaffna' ? 'bg-orange-500 text-white shadow' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
              >
                Jaffna
              </button>
              <button
                onClick={() => setActiveCustomerBranch('colombo')}
                className={`px-3 py-1 rounded-full font-semibold text-xs ${activeCustomerBranch === 'colombo' ? 'bg-orange-500 text-white shadow' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
              >
                Colombo
              </button>
            </div>
          </div>
        )}
        {/* Branch Selector for super admin/combined mode */}
        {activeBranch && setActiveBranch && (
          <div className="mb-6">
            <div className="text-xs font-medium text-gray-600 mb-2">Branch Selection:</div>
            <div className="flex space-x-2 justify-center">
              <button
                onClick={() => setActiveBranch('combined')}
                className={`px-3 py-1 rounded-full font-semibold text-xs flex items-center space-x-1 ${activeBranch === 'combined' ? 'bg-orange-500 text-white shadow' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
              >
                <Crown className="w-3 h-3" />
                <span>Combined</span>
              </button>
              <button
                onClick={() => setActiveBranch('customer')}
                className={`px-3 py-1 rounded-full font-semibold text-xs flex items-center space-x-1 ${activeBranch === 'customer' ? 'bg-orange-500 text-white shadow' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
              >
                <Users className="w-3 h-3" />
                <span>Customer</span>
              </button>
            </div>
            <div className="flex space-x-2 justify-center mt-2">
              <button
                onClick={() => setActiveBranch('jaffna')}
                className={`px-3 py-1 rounded-full font-semibold text-xs ${activeBranch === 'jaffna' ? 'bg-orange-500 text-white shadow' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
              >
                Jaffna
              </button>
              <button
                onClick={() => setActiveBranch('colombo')}
                className={`px-3 py-1 rounded-full font-semibold text-xs ${activeBranch === 'colombo' ? 'bg-orange-500 text-white shadow' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
              >
                Colombo
              </button>
            </div>
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-bakery-brown font-serif">SE Bakers</h1>
          <p className="text-sm text-orange-600">Customer</p>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${activeTab === item.id ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg' : 'text-orange-800 hover:bg-orange-100/70 hover:text-orange-900'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <button
        onClick={onSignOut}
        className="mt-8 flex items-center space-x-2 px-4 py-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 font-semibold"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
} 
