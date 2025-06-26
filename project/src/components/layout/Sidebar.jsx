import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Home, ShoppingBag, ClipboardList, Users, Package, UserCheck, BarChart3, X, Cake, Settings, Building2, Crown } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'products', label: 'Products', icon: Cake },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'staff', label: 'Staff', icon: UserCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const superAdminItems = [
  { id: 'dashboard', label: 'Combined Dashboard', icon: Crown },
  { id: 'products', label: 'Products', icon: Cake },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'staff', label: 'Staff', icon: UserCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'System Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, activeBranch, setActiveBranch, userRole = 'branch-admin' }) {
  const allMenuItems = userRole === 'super-admin' ? superAdminItems : menuItems;

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
                  <h1 className="text-xl font-bold text-bakery-brown font-serif">SE Bakers</h1>
                  <p className="text-sm text-orange-600">
                    {userRole === 'super-admin' ? 'Super Admin' : 'Bakery'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <X className="w-5 h-5 text-orange-600" />
              </button>
            </div>
            
            {/* Branch Selector - Only show for Super Admin */}
            {userRole === 'super-admin' && (
              <div className="mt-4 space-y-2">
                <div className="text-xs font-medium text-gray-600 mb-2">Branch Selection:</div>
                <div className="flex space-x-2 justify-center">
                  <button
                    onClick={() => setActiveBranch('combined')}
                    className={cn(
                      'px-3 py-1 rounded-full font-semibold text-xs flex items-center space-x-1',
                      activeBranch === 'combined'
                        ? 'bg-purple-500 text-white shadow'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    )}
                  >
                    <Crown className="w-3 h-3" />
                    <span>Combined</span>
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    onClick={() => setActiveBranch('jaffna')}
                    className={cn(
                      'px-3 py-1 rounded-full font-semibold text-xs',
                      activeBranch === 'jaffna'
                        ? 'bg-orange-500 text-white shadow'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    )}
                  >
                    Jaffna
                  </button>
                  <button
                    onClick={() => setActiveBranch('colombo')}
                    className={cn(
                      'px-3 py-1 rounded-full font-semibold text-xs',
                      activeBranch === 'colombo'
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    )}
                  >
                    Colombo
                  </button>
                </div>
              </div>
            )}
            
            {/* Branch Selector - For Branch Admin */}
            {userRole === 'branch-admin' && (
            <div className="mt-4 flex space-x-2 justify-center">
              <button
                onClick={() => setActiveBranch('jaffna')}
                className={cn(
                  'px-4 py-1 rounded-full font-semibold text-sm',
                  activeBranch === 'jaffna'
                    ? 'bg-orange-500 text-white shadow'
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                )}
              >
                Jaffna
              </button>
              <button
                onClick={() => setActiveBranch('colombo')}
                className={cn(
                  'px-4 py-1 rounded-full font-semibold text-sm',
                  activeBranch === 'colombo'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                )}
              >
                Colombo
              </button>
            </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {allMenuItems.map((item) => {
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
                      ? userRole === 'super-admin' 
                        ? "bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg shadow-purple-200/50"
                        : "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-200/50"
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
              <p className="font-medium">© 2024 SE Bakers</p>
              <p className="text-xs mt-1">
                {userRole === 'super-admin' ? 'Super Admin Dashboard v2.0' : 'Admin Dashboard v1.0'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}