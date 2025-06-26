import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const jaffnaSalesData = {
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
const colomboSalesData = {
  daily: [
    { period: 'Mon', sales: 3200, orders: 30, customers: 22 },
    { period: 'Tue', sales: 2100, orders: 22, customers: 18 },
    { period: 'Wed', sales: 8700, orders: 38, customers: 31 },
    { period: 'Thu', sales: 4100, orders: 36, customers: 29 },
    { period: 'Fri', sales: 5200, orders: 52, customers: 44 },
    { period: 'Sat', sales: 4200, orders: 42, customers: 36 },
    { period: 'Sun', sales: 4900, orders: 49, customers: 40 }
  ],
  weekly: [
    { period: 'Week 1', sales: 18400, orders: 184, customers: 150 },
    { period: 'Week 2', sales: 20200, orders: 202, customers: 165 },
    { period: 'Week 3', sales: 24100, orders: 241, customers: 200 },
    { period: 'Week 4', sales: 21800, orders: 218, customers: 180 }
  ],
  monthly: [
    { period: 'Jan', sales: 75000, orders: 750, customers: 600 },
    { period: 'Feb', sales: 69000, orders: 690, customers: 560 },
    { period: 'Mar', sales: 90000, orders: 900, customers: 720 },
    { period: 'Apr', sales: 91000, orders: 910, customers: 730 },
    { period: 'May', sales: 66000, orders: 660, customers: 520 },
    { period: 'Jun', sales: 85500, orders: 855, customers: 700 }
  ]
};
const jaffnaSegments = [
  { name: 'Regular Customers', value: 45, color: '#f97316' },
  { name: 'VIP Customers', value: 25, color: '#eab308' },
  { name: 'New Customers', value: 20, color: '#ea580c' },
  { name: 'Occasional', value: 10, color: '#d97706' }
];
const colomboSegments = [
  { name: 'Regular Customers', value: 50, color: '#3b82f6' },
  { name: 'VIP Customers', value: 20, color: '#6366f1' },
  { name: 'New Customers', value: 20, color: '#0ea5e9' },
  { name: 'Occasional', value: 10, color: '#38bdf8' }
];

export default function CombinedReports() {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const branches = [
    { name: 'Jaffna', color: 'text-orange-700' },
    { name: 'Colombo', color: 'text-blue-700' }
  ];

  const getData = (branch) => {
    if (branch === 'Jaffna') return jaffnaSalesData[selectedPeriod];
    if (branch === 'Colombo') return colomboSalesData[selectedPeriod];
    // Combine both
    const j = jaffnaSalesData[selectedPeriod];
    const c = colomboSalesData[selectedPeriod];
    return j.map((item, idx) => ({
      period: item.period,
      sales: item.sales + (c[idx]?.sales || 0),
      orders: item.orders + (c[idx]?.orders || 0),
      customers: item.customers + (c[idx]?.customers || 0)
    }));
  };
  const getSegments = (branch) => {
    if (branch === 'Jaffna') return jaffnaSegments;
    if (branch === 'Colombo') return colomboSegments;
    // Combine both
    const segs = {};
    [...jaffnaSegments, ...colomboSegments].forEach(s => {
      segs[s.name] = (segs[s.name] || 0) + s.value;
    });
    return Object.entries(segs).map(([name, value], i) => ({
      name,
      value,
      color: i % 2 === 0 ? '#f97316' : '#3b82f6'
    }));
  };
  const currentBranches = selectedBranch === 'all' ? branches : branches.filter(b => b.name === selectedBranch);

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

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bakery-brown">Combined Reports & Analytics</h1>
          <p className="text-gray-500">Business insights and performance metrics for both branches</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="Jaffna">Jaffna</SelectItem>
              <SelectItem value="Colombo">Colombo</SelectItem>
            </SelectContent>
          </Select>
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
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentBranches.map((b) => {
          const data = getData(b.name);
          const segments = getSegments(b.name);
          return (
            <div key={b.name} className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Sales</p>
                        <p className={`text-2xl font-bold ${b.color === 'text-orange-700' ? 'text-green-600' : 'text-green-600'}`}>
                          LKR {data.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm mt-1">
                          {getTrendIcon(data.at(-1)?.sales ?? 0, data.at(-2)?.sales ?? 0)}
                          <span className={getTrendColor(data.at(-1)?.sales ?? 0, data.at(-2)?.sales ?? 0)}>
                            {calculateTrend(data, 'sales')}%
                          </span>
                        </div>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-500 opacity-30" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className={`text-2xl font-bold ${b.color === 'text-orange-700' ? 'text-blue-600' : 'text-blue-600'}`}>
                          {data.reduce((sum, item) => sum + item.orders, 0)}
                        </p>
                        <div className="flex items-center gap-1 text-sm mt-1">
                          {getTrendIcon(data.at(-1)?.orders ?? 0, data.at(-2)?.orders ?? 0)}
                          <span className={getTrendColor(data.at(-1)?.orders ?? 0, data.at(-2)?.orders ?? 0)}>
                            {calculateTrend(data, 'orders')}%
                          </span>
                        </div>
                      </div>
                      <ShoppingCart className="w-8 h-8 text-blue-500 opacity-30" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Customers</p>
                        <p className={`text-2xl font-bold ${b.color}`}>
                          {data.reduce((sum, item) => sum + item.customers, 0)}
                        </p>
                        <div className="flex items-center gap-1 text-sm mt-1">
                          {getTrendIcon(data.at(-1)?.customers ?? 0, data.at(-2)?.customers ?? 0)}
                          <span className={getTrendColor(data.at(-1)?.customers ?? 0, data.at(-2)?.customers ?? 0)}>
                            {calculateTrend(data, 'customers')}%
                          </span>
                        </div>
                      </div>
                      <Users className={`w-8 h-8 ${b.color} opacity-30`} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={`text-lg ${b.color}`}>Sales Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="sales" stroke={b.color === 'text-orange-700' ? '#f97316' : '#3b82f6'} fill={b.color === 'text-orange-700' ? '#f97316' : '#3b82f6'} fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className={`text-lg ${b.color}`}>Customer Segments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={segments}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {segments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 