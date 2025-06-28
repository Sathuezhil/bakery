import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Package,
  Building2,
  BarChart3,
  Target,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Combined data from both branches
const combinedSalesData = [
  { date: 'Mon', jaffna: 800, colombo: 1500, total: 2300 },
  { date: 'Tue', jaffna: 1200, colombo: 1800, total: 3000 },
  { date: 'Wed', jaffna: 900, colombo: 2100, total: 3000 },
  { date: 'Thu', jaffna: 1500, colombo: 1700, total: 3200 },
  { date: 'Fri', jaffna: 1100, colombo: 2500, total: 3600 },
  { date: 'Sat', jaffna: 1700, colombo: 3200, total: 4900 },
  { date: 'Sun', jaffna: 1300, colombo: 2800, total: 4100 },
];

const branchPerformance = [
  { name: 'Jaffna', sales: 8500, orders: 335, customers: 1234, color: '#f97316' },
  { name: 'Colombo', sales: 15600, orders: 570, customers: 1890, color: '#2563eb' },
];

const topProducts = [
  { name: 'Milk Bread', jaffna: 25, colombo: 30, total: 55, color: '#60a5fa' },
  { name: 'Chocolate Croissant', jaffna: 20, colombo: 22, total: 42, color: '#f97316' },
  { name: 'Butter Cake', jaffna: 15, colombo: 22, total: 37, color: '#eab308' },
  { name: 'Fish Bun', jaffna: 5, colombo: 18, total: 23, color: '#f59e42' },
  { name: 'Red Velvet Cupcake', jaffna: 15, colombo: 0, total: 15, color: '#ea580c' },
];

const lowStockAlerts = [
  { name: 'All-Purpose Flour', branch: 'Jaffna', current: 5, minimum: 20, unit: 'kg' },
  { name: 'Premium Wheat Flour', branch: 'Colombo', current: 10, minimum: 25, unit: 'kg' },
  { name: 'Butter', branch: 'Jaffna', current: 8, minimum: 15, unit: 'kg' },
  { name: 'Salted Butter', branch: 'Colombo', current: 12, minimum: 20, unit: 'kg' },
  { name: 'Vanilla Extract', branch: 'Jaffna', current: 2, minimum: 10, unit: 'bottles' },
  { name: 'Baking Soda', branch: 'Colombo', current: 3, minimum: 8, unit: 'boxes' },
];

const recentOrders = [
  { id: 1, customer: 'John Doe', branch: 'Jaffna', status: 'completed', total: 1200, date: '2023-06-01' },
  { id: 101, customer: 'Nimal Perera', branch: 'Colombo', status: 'completed', total: 2200, date: '2023-06-10' },
  { id: 2, customer: 'Jane Smith', branch: 'Jaffna', status: 'pending', total: 800, date: '2023-06-02' },
  { id: 102, customer: 'Dilani Fernando', branch: 'Colombo', status: 'pending', total: 1800, date: '2023-06-11' },
  { id: 3, customer: 'Alice Johnson', branch: 'Jaffna', status: 'in-progress', total: 950, date: '2023-06-03' },
  { id: 103, customer: 'Suresh De Silva', branch: 'Colombo', status: 'in-progress', total: 1950, date: '2023-06-12' },
];

export default function SuperAdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'in-progress': return <Package className="w-3 h-3" />;
      default: return null;
    }
  };

  const getBranchColor = (branch) => {
    return branch === 'Jaffna' ? 'text-orange-600' : 'text-blue-600';
  };

  const totalSales = combinedSalesData.reduce((sum, day) => sum + day.total, 0);
  const totalOrders = branchPerformance.reduce((sum, branch) => sum + branch.orders, 0);
  const totalCustomers = branchPerformance.reduce((sum, branch) => sum + branch.customers, 0);
  const totalLowStock = lowStockAlerts.length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome, Super Admin! <span role="img" aria-label="crown">👑</span>
            </h1>
            <p className="text-purple-100 text-lg">SE Bakers - Multi-Branch Overview</p>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-purple-200 text-sm">
                Role: <span className="font-semibold">Super Administrator</span>
              </p>
              <p className="text-purple-200 text-sm">
                Branches: <span className="font-semibold">Jaffna & Colombo</span>
              </p>
            </div>
            <p className="text-purple-200 text-sm mt-1">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <div className="hidden md:block text-6xl opacity-20">🏢</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bakery-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales (All Branches)
            </CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              LKR {totalSales.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              Combined from both branches
            </p>
          </CardContent>
        </Card>

        <Card className="bakery-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {totalOrders}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-orange-600" />
              Across all branches
            </p>
          </CardContent>
        </Card>

        <Card className="bakery-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            <Users className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {totalCustomers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-purple-600" />
              Combined customer base
            </p>
          </CardContent>
        </Card>

        <Card className="bakery-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalLowStock}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Branch Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-purple-600" />
              Branch Performance
            </CardTitle>
            <CardDescription>
              Sales comparison between branches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`LKR ${value.toLocaleString()}`, 'Sales']} />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              Weekly Sales Trend
            </CardTitle>
            <CardDescription>
              Combined sales performance over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={combinedSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`LKR ${value.toLocaleString()}`, 'Sales']} />
                <Area type="monotone" dataKey="jaffna" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                <Area type="monotone" dataKey="colombo" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Top Products (Combined)
            </CardTitle>
            <CardDescription>
              Best-selling products across all branches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" 
                         style={{ backgroundColor: product.color }}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        Jaffna: {product.jaffna} | Colombo: {product.colombo}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{product.total}</p>
                    <p className="text-xs text-gray-500">Total Sales</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>
              Items requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockAlerts.map((item, index) => (
                <div key={`${item.branch}-${item.name}`} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className={`text-sm font-medium ${getBranchColor(item.branch)}`}>
                      {item.branch} Branch
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {item.current} / {item.minimum} {item.unit}
                    </p>
                    <Progress 
                      value={(item.current / item.minimum) * 100} 
                      className="w-20 h-2 mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bakery-card">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            Recent Orders (All Branches)
          </CardTitle>
          <CardDescription>
            Latest orders from both branches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    #{order.id}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className={`text-sm font-medium ${getBranchColor(order.branch)}`}>
                      {order.branch} Branch
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">LKR {order.total.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
