import { useState } from 'react';
import { Menu, Bell, Search, User, LogOut, Crown, Building2 } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

export default function Header({ setSidebarOpen, user, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);

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
  const getCombinedLowStock = () => {
    // Try to get from localStorage (if you later persist inventory), else use hardcoded
    const jaffnaInventory = [
      { id: 1, name: 'All-Purpose Flour', currentStock: 5, minimumStock: 20, unit: 'kg', branch: 'Jaffna' },
      { id: 2, name: 'Unsalted Butter', currentStock: 8, minimumStock: 15, unit: 'kg', branch: 'Jaffna' },
      { id: 3, name: 'Vanilla Extract', currentStock: 2, minimumStock: 10, unit: 'bottles', branch: 'Jaffna' },
      { id: 5, name: 'Cake Boxes (Large)', currentStock: 12, minimumStock: 50, unit: 'pieces', branch: 'Jaffna' },
      { id: 6, name: 'Baking Powder', currentStock: 1, minimumStock: 5, unit: 'boxes', branch: 'Jaffna' },
      { id: 8, name: 'Food Coloring Set', currentStock: 3, minimumStock: 8, unit: 'sets', branch: 'Jaffna' }
    ];
    const colomboInventory = [
      { id: 101, name: 'Premium Wheat Flour', currentStock: 10, minimumStock: 25, unit: 'kg', branch: 'Colombo' },
      { id: 102, name: 'Salted Butter', currentStock: 12, minimumStock: 20, unit: 'kg', branch: 'Colombo' },
      { id: 103, name: 'Baking Soda', currentStock: 3, minimumStock: 8, unit: 'boxes', branch: 'Colombo' },
      { id: 105, name: 'Cake Boxes (Medium)', currentStock: 20, minimumStock: 60, unit: 'pieces', branch: 'Colombo' },
      { id: 106, name: 'Whipping Cream', currentStock: 2, minimumStock: 6, unit: 'liters', branch: 'Colombo' },
      { id: 108, name: 'Food Coloring Gel', currentStock: 5, minimumStock: 10, unit: 'sets', branch: 'Colombo' }
    ];
    return [...jaffnaInventory, ...colomboInventory].filter(item => item.currentStock <= item.minimumStock);
  };

  // Replace getLowStockProducts with getCombinedLowStock
  const lowStockProducts = getCombinedLowStock();

  // Close dropdowns on outside click
  const handleBackdropClick = () => {
    setShowUserMenu(false);
    setShowLowStock(false);
  };

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
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-orange-100 relative"
              >
                <Bell className="w-5 h-5 text-orange-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-500 text-xs">
                  {lowStockProducts.length}
                </Badge>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg w-full">
              <DialogHeader>
                <DialogTitle>Low Stock Alerts</DialogTitle>
              </DialogHeader>
              {lowStockProducts.length === 0 ? (
                <div className="p-4 text-gray-500">No low stock products.</div>
              ) : (
                <ul className="max-h-80 overflow-y-auto divide-y">
                  {lowStockProducts.map((item, idx) => (
                    <li
                      key={item.id + item.branch}
                      className="flex justify-between items-center px-2 py-3"
                      style={{ minHeight: 48 }}
                    >
                      <div className="flex-1">
                        <span className="font-medium block" title={item.name}>{item.name}</span>
                        <span className={`inline-block mt-1 text-xs font-semibold rounded px-2 py-0.5 ${item.branch === 'Jaffna' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{item.branch}</span>
                      </div>
                      <div className="flex items-baseline gap-1 ml-2">
                        <span className="text-lg font-bold text-red-600">{item.currentStock}</span>
                        <span className="text-xs text-gray-500 font-medium">{item.unit}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </DialogContent>
          </Dialog>
          {/* User profile */}
          <div className="relative">
          <div className="flex items-center space-x-3 pl-4 border-l border-orange-200">
            <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-bakery-brown">{user?.name || 'Admin'}</p>
                <div className="flex items-center space-x-1">
                  <roleInfo.icon className="w-3 h-3" />
                  <p className={`text-xs ${roleInfo.color}`}>{roleInfo.label}</p>
                </div>
            </div>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowLowStock(false);
                }}
                className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              >
              <User className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.username}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <roleInfo.icon className="w-3 h-3" />
                    <p className={`text-xs ${roleInfo.color}`}>{roleInfo.label}</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Backdrop to close dropdowns */}
      {(showUserMenu || showLowStock) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={handleBackdropClick}
        />
      )}
    </header>
  );
}