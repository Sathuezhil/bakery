'use client';

import { cn } from '@/lib/utils';
import { 
  Home, 
  ShoppingBag, 
  ClipboardList, 
  Users, 
  Package, 
  UserCheck, 
  BarChart3,
  X,
  Cake
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'products', label: 'Products', icon: Cake },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'staff', label: 'Staff', icon: UserCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md border-r border-orange-200/50 shadow-xl shadow-orange-100/20 transform transition-transform duration-300 ease-in-out lg:transform-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-orange-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-bakery-brown font-serif">Sweet Dreams</h1>
                  <p className="text-sm text-orange-600">Bakery</p>
                </div>
              </div>
              
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <X className="w-5 h-5 text-orange-600" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                    activeTab === item.id
                      ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-200/50"
                      : "text-orange-800 hover:bg-orange-100/70 hover:text-orange-900"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    activeTab === item.id ? "scale-110" : "group-hover:scale-105"
                  )} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-orange-200/50">
            <div className="text-center text-sm text-orange-600">
              <p className="font-medium">© 2024 Sweet Dreams Bakery</p>
              <p className="text-xs mt-1">Admin Dashboard v1.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}