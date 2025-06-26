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
  { name: 'Milk Bread', value: 30, color: '#60a5fa' },
  { name: 'Butter Cake', value: 22, color: '#2563eb' },
  { name: 'Fish Bun', value: 18, color: '#f59e42' },
  { name: 'Chocolate Eclair', value: 15, color: '#6366f1' },
  { name: 'Pineapple Gateau', value: 12, color: '#0ea5e9' },
  { name: 'Chicken Roll', value: 10, color: '#38bdf8' },
  { name: 'Egg Puff', value: 8, color: '#fbbf24' },
  { name: 'Coconut Bun', value: 7, color: '#fcd34d' },
  { name: 'Sausage Pastry', value: 6, color: '#fde68a' },
  { name: 'Fruit Tart', value: 5, color: '#eab308' },
  { name: 'Cheese Stick', value: 4, color: '#fca311' },
  { name: 'Marble Cake', value: 3, color: '#eab308' }
];

const lowStockItems = [
  { name: 'Premium Wheat Flour', current: 10, minimum: 25, unit: 'kg' },
  { name: 'Salted Butter', current: 12, minimum: 20, unit: 'kg' },
  { name: 'Baking Soda', current: 3, minimum: 8, unit: 'boxes' },
  { name: 'Whipping Cream', current: 2, minimum: 6, unit: 'liters' },
];

const salesData = [
  { date: 'Mon', sales: 1500, orders: 55 },
  { date: 'Tue', sales: 1800, orders: 60 },
  { date: 'Wed', sales: 2100, orders: 70 },
  { date: 'Thu', sales: 1700, orders: 65 },
  { date: 'Fri', sales: 2500, orders: 90 },
  { date: 'Sat', sales: 3200, orders: 120 },
  { date: 'Sun', sales: 2800, orders: 110 },
];

const customers = [
  { name: 'Nimal Perera', joined: '2023-04-10' },
  { name: 'Dilani Fernando', joined: '2023-05-12' },
  { name: 'Suresh De Silva', joined: '2023-06-01' },
  { name: 'Harsha Jayawardena', joined: '2023-07-15' },
  { name: 'Rashmi Gunasekara', joined: '2023-08-20' },
];

const orders = [
  { id: 101, customer: 'Nimal Perera', status: 'completed', total: 2200, date: '2023-06-10' },
  { id: 102, customer: 'Dilani Fernando', status: 'pending', total: 1800, date: '2023-06-11' },
  { id: 103, customer: 'Suresh De Silva', status: 'in-progress', total: 1950, date: '2023-06-12' },
  { id: 104, customer: 'Harsha Jayawardena', status: 'completed', total: 2500, date: '2023-06-13' },
  { id: 105, customer: 'Rashmi Gunasekara', status: 'pending', total: 1600, date: '2023-06-14' },
];

export default function ColomboDashboard() {
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
      <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Good Morning, Colombo Manager! <span role="img" aria-label="sun">☀️</span>
            </h1>
            <p className="text-blue-100 text-lg">Welcome back to SE Bakers - Colombo</p>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-blue-200 text-sm">
                Store Manager: <span className="font-semibold">Nimal Perera</span>
              </p>
            </div>
            <p className="text-blue-200 text-sm mt-1">
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
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#2563eb" />
                <YAxis stroke="#2563eb" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#2563eb" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Sales Pie Chart */}
        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl text-bakery-brown">Top Products</CardTitle>
            <CardDescription>Best selling products this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#2563eb"
                  label
                >
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
          <CardDescription>Ingredients that need restocking</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {lowStockItems.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between py-2">
                <span>{item.name}</span>
                <span className="text-red-600 font-semibold">
                  {item.current} {item.unit} <span className="text-xs text-gray-400">(min {item.minimum})</span>
                </span>
              </li>
            ))}
          </ul>
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