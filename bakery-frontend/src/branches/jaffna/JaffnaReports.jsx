'use client';

import { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
  Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, FileText
} from 'lucide-react';

const salesData = {
  daily: [
    { period: 'Mon', sales: 2400, orders: 24, customers: 18 },
    { period: 'Tue', sales: 1398, orders: 18, customers: 15 },
    { period: 'Wed', sales: 9800, orders: 42, customers: 35 },
    { period: 'Thu', sales: 3908, orders: 35, customers: 28 },
    { period: 'Fri', sales: 4800, orders: 48, customers: 40 },
    { period: 'Sat', sales: 3800, orders: 38, customers: 32 },
    { period: 'Sun', sales: 4300, orders: 43, customers: 36 }
  ],
  weekly: [
    { period: 'Week 1', sales: 15400, orders: 154, customers: 120 },
    { period: 'Week 2', sales: 18200, orders: 182, customers: 145 },
    { period: 'Week 3', sales: 22100, orders: 221, customers: 180 },
    { period: 'Week 4', sales: 19800, orders: 198, customers: 165 }
  ],
  monthly: [
    { period: 'Jan', sales: 65000, orders: 650, customers: 520 },
    { period: 'Feb', sales: 59000, orders: 590, customers: 480 },
    { period: 'Mar', sales: 80000, orders: 800, customers: 640 },
    { period: 'Apr', sales: 81000, orders: 810, customers: 650 },
    { period: 'May', sales: 56000, orders: 560, customers: 450 },
    { period: 'Jun', sales: 75500, orders: 755, customers: 600 }
  ]
};

const customerSegments = [
  { name: 'Regular Customers', value: 45, color: '#f97316' },
  { name: 'VIP Customers', value: 25, color: '#eab308' },
  { name: 'New Customers', value: 20, color: '#ea580c' },
  { name: 'Occasional', value: 10, color: '#d97706' }
];

export default function JaffnaReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const currentData = salesData[selectedPeriod] || [];

  const getTrendIcon = (current, previous) => {
    return current > previous
      ? <TrendingUp className="w-4 h-4 text-green-600" />
      : <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const getTrendColor = (current, previous) => {
    return current > previous ? 'text-green-600' : 'text-red-600';
  };

  const calculateTrend = (data, key) => {
    if (data.length < 2) return '0';
    const current = data[data.length - 1][key];
    const previous = data[data.length - 2][key];
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const exportReport = (type) => {
    console.log(`Exporting ${type} report for ${selectedPeriod}`);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-700">Reports & Analytics</h1>
          <p className="text-gray-500">Business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport('pdf')} className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold text-green-600">
                  LKR {currentData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  {getTrendIcon(currentData.at(-1)?.sales ?? 0, currentData.at(-2)?.sales ?? 0)}
                  <span className={getTrendColor(currentData.at(-1)?.sales ?? 0, currentData.at(-2)?.sales ?? 0)}>
                    {calculateTrend(currentData, 'sales')}%
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500 opacity-30" />
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">
                  {currentData.reduce((sum, item) => sum + item.orders, 0)}
                </p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  {getTrendIcon(currentData.at(-1)?.orders ?? 0, currentData.at(-2)?.orders ?? 0)}
                  <span className={getTrendColor(currentData.at(-1)?.orders ?? 0, currentData.at(-2)?.orders ?? 0)}>
                    {calculateTrend(currentData, 'orders')}%
                  </span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-500 opacity-30" />
            </div>
          </CardContent>
        </Card>

        {/* Customers */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Customers</p>
                <p className="text-2xl font-bold text-orange-600">
                  {currentData.reduce((sum, item) => sum + item.customers, 0)}
                </p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  {getTrendIcon(currentData.at(-1)?.customers ?? 0, currentData.at(-2)?.customers ?? 0)}
                  <span className={getTrendColor(currentData.at(-1)?.customers ?? 0, currentData.at(-2)?.customers ?? 0)}>
                    {calculateTrend(currentData, 'customers')}%
                  </span>
                </div>
              </div>
              <Users className="w-8 h-8 text-orange-500 opacity-30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-orange-700">Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#f97316" fill="#f97316" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-orange-700">Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {customerSegments.map((segment, index) => (
                <Badge key={index} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color }} />
                  {segment.name} ({segment.value}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
