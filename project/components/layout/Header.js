'use client';

import { Menu, Bell, Search, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header({ setSidebarOpen }) {
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
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-orange-100 relative"
            >
              <Bell className="w-5 h-5 text-orange-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-500 text-xs">
                3
              </Badge>
            </Button>
          </div>

          {/* User profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-orange-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-bakery-brown">Sarah Johnson</p>
              <p className="text-xs text-orange-600">Store Manager</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}