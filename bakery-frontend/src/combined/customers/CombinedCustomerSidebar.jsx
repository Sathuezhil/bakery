import { Home, ShoppingBag, ClipboardList, Gift, Settings } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'promotions', label: 'Promotions', icon: Gift },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function CombinedCustomerSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-white border-r min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-bakery-brown font-serif">SE Bakers</h1>
        <p className="text-sm text-orange-600">Combined Customer</p>
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
  );
} 
