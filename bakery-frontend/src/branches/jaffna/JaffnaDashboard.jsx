import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Package
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const productData = [
  { name: 'Bread', value: 25, color: '#eab308' },
  { name: 'Chocolate Croissant', value: 20, color: '#f97316' },
  { name: 'Red Velvet Cupcake', value: 15, color: '#ea580c' },
  { name: 'Almond Cookies', value: 10, color: '#92400e' },
  { name: 'Strawberry Tart', value: 8, color: '#d97706' },
  { name: 'Roll', value: 7, color: '#fbbf24' },
  { name: 'Kimbula Bun', value: 6, color: '#fde68a' },
  { name: 'Fish Bun', value: 5, color: '#f59e42' },
  { name: 'Seeni Sambol Bun', value: 4, color: '#fcd34d' },
  { name: 'Egg Roti', value: 3, color: '#fbbf24' },
  { name: 'Vadai', value: 2, color: '#fca311' },
  { name: 'Pol Roti', value: 1, color: '#eab308' }
];

const lowStockItems = [
  { name: 'All-Purpose Flour', current: 5, minimum: 20, unit: 'kg' },
  { name: 'Butter', current: 8, minimum: 15, unit: 'kg' },
  { name: 'Vanilla Extract', current: 2, minimum: 10, unit: 'bottles' },
  { name: 'Baking Powder', current: 1, minimum: 5, unit: 'boxes' },
];

const salesData = [
  { date: 'Mon', sales: 800, orders: 30 },
  { date: 'Tue', sales: 1200, orders: 45 },
  { date: 'Wed', sales: 900, orders: 38 },
  { date: 'Thu', sales: 1500, orders: 60 },
  { date: 'Fri', sales: 1100, orders: 42 },
  { date: 'Sat', sales: 1700, orders: 70 },
  { date: 'Sun', sales: 1300, orders: 50 },
];

const customers = [
  { name: 'John Doe', joined: '2023-01-15' },
  { name: 'Jane Smith', joined: '2023-02-10' },
  { name: 'Alice Johnson', joined: '2023-03-05' },
];

const orders = [
  { id: 1, customer: 'John Doe', status: 'completed', total: 1200, date: '2023-06-01' },
  { id: 2, customer: 'Jane Smith', status: 'pending', total: 800, date: '2023-06-02' },
  { id: 3, customer: 'Alice Johnson', status: 'in-progress', total: 950, date: '2023-06-03' },
];

export default function JaffnaDashboard() {
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

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const totalCustomers = customers.length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Good Morning, Ezhil! <span role="img" aria-label="sun">☀️</span>
            </h1>
            <p className="text-orange-100 text-lg">Welcome back to SE Bakers</p>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-orange-200 text-sm">
                Store Manager: <span className="font-semibold">Ezhil</span>
              </p>
            </div>
            <p className="text-orange-200 text-sm mt-1">
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
          <div className="hidden md:block text-6xl opacity-20">🧁</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bakery-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Sales
            </CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              LKR 4,235
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bakery-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders Today
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              127
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-blue-600" />
              +8% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bakery-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customers</CardTitle>
            <Users className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              1,234
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-orange-600" />
              +3 new today
            </p>
          </CardContent>
        </Card>

        <Card className="bakery-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alert</CardTitle>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">4</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl text-bakery-brown">
              Weekly Sales Trend
            </CardTitle>
            <CardDescription>
              Sales performance over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#b45309" />
                <YAxis stroke="#b45309" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#fbbf24" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Sales Pie Chart */}
        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl text-bakery-brown">Product Sales Distribution</CardTitle>
            <CardDescription>Top selling products this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={productData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Items */}
      <Card className="bakery-card">
        <CardHeader>
          <CardTitle className="text-xl text-bakery-brown">Low Stock Items</CardTitle>
          <CardDescription>Ingredients running low</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockItems.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4 flex flex-col items-center">
                <span className="font-semibold text-bakery-brown">{item.name}</span>
                <span className="text-red-600 font-bold text-lg">{item.current} {item.unit}</span>
                <span className="text-xs text-gray-500">Min: {item.minimum} {item.unit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Latest Orders */}
      <Card className="bakery-card">
        <CardHeader>
          <CardTitle className="text-xl text-bakery-brown">Latest Orders</CardTitle>
          <CardDescription>Recent orders from customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (LKR)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">{order.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{order.customer}</td>
                    <td className={`px-4 py-2 whitespace-nowrap border ${getStatusColor(order.status)}`}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{order.total}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 