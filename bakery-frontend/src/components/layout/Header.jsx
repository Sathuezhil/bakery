import { useState } from 'react';
import { Menu, Bell, Search, User, LogOut, Crown, Building2, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '../../../components/ui/popover';

export default function Header({ setSidebarOpen, user, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);

  // Sample low stock products
  const lowStockProducts = [
    { name: 'Chocolate Cake', stock: 2 },
    { name: 'Bread Loaf', stock: 1 },
    { name: 'Croissant', stock: 3 },
  ];

  const getUserRoleDisplay = (role) => {
    switch (role) {
      case 'super-admin':
        return { label: 'Super Admin', icon: Crown, color: 'text-purple-600' };
      case 'branch-admin':
        return { label: 'Branch Admin', icon: Building2, color: 'text-orange-600' };
      default:
        return { label: 'Admin', icon: User, color: 'text-gray-600' };
    }
  };

  const roleInfo = getUserRoleDisplay(user?.role);

  // Add this helper to get low stock from combined inventory (hardcoded for now, or from localStorage if available):

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-orange-200/50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-orange-100"
          >
            <Menu className="w-5 h-5 text-orange-600" />
          </Button>
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
              <Input
                placeholder="Search products, orders..."
                className="pl-10 w-80 bg-orange-50/50 border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <div className="relative">
            <button onClick={() => setShowLowStock(true)} className="focus:outline-none">
              <Bell className="w-6 h-6 text-orange-500" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border-2 border-white">{lowStockProducts.length}</span>
            </button>
          </div>
          {/* Low Stock Dialog */}
          <Dialog open={showLowStock} onOpenChange={setShowLowStock}>
            <DialogContent className="max-w-md">
              <DialogHeader className="flex flex-row items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <DialogTitle className="text-lg">Low Stock Products</DialogTitle>
              </DialogHeader>
              <div className="mt-4 max-h-72 overflow-y-auto">
                {lowStockProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
                    <span className="text-green-700 font-semibold">All stocks are healthy!</span>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {lowStockProducts.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg shadow border border-orange-100 hover:shadow-md transition">
                        <div className="flex items-center gap-3">
                          <Package className="w-6 h-6 text-orange-400" />
                          <span className="font-semibold text-orange-900 text-base">{item.name}</span>
                        </div>
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Stock: {item.stock}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </DialogContent>
          </Dialog>
          {/* User Info */}
          <div className="flex flex-col items-end mr-2">
            <span className="text-sm font-semibold text-gray-800">admin</span>
            <span className="flex items-center text-xs font-medium text-purple-600">
              <Crown className="w-4 h-4 mr-1" />
              Super Admin
            </span>
          </div>
          {/* Avatar with Sign Out Popover */}
          <Popover>
            <PopoverTrigger>
              <button type="button" className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center shadow-lg focus:outline-none">
                <User className="w-6 h-6 text-white" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-36 p-2">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-orange-100 text-orange-700 font-semibold text-sm focus:outline-none"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
} 