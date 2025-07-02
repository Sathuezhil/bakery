import { useState, useEffect } from 'react';
import { Menu, Bell, Search, User, LogOut, Crown, Building2, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import NotificationBell from './NotificationBell';

export default function Header({ setSidebarOpen, user, onLogout, activeBranch }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);
  // Remove order modal state and effect

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
          <div className="flex items-center gap-2">
            <NotificationBell branch={activeBranch} />
          </div>
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
