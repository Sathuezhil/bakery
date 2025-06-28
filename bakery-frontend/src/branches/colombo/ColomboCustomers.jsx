import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  Search, 
  Eye, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  Star,
  Heart
} from 'lucide-react';

const initialCustomers = [
  {
    id: 1,
    name: 'Nimal Perera',
    email: 'nimal.perera@colombobakery.com',
    phone: '+94 11 234 5678',
    address: '123 Galle Road, Colombo 03',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'vip',
    joinDate: '2023-02-10',
    totalOrders: 22,
    totalSpent: 98500,
    lastOrder: '2024-01-10',
    favoriteProducts: ['Chocolate Croissant', 'Red Velvet Cupcake'],
    notes: 'Prefers chocolate items. Orders for office events.'
  },
  {
    id: 2,
    name: 'Dilani Fernando',
    email: 'dilani.fernando@colombobakery.com',
    phone: '+94 11 876 5432',
    address: '45 Marine Drive, Colombo 04',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'regular',
    joinDate: '2023-03-15',
    totalOrders: 12,
    totalSpent: 42500,
    lastOrder: '2024-01-12',
    favoriteProducts: ['Bread', 'Pol Roti'],
    notes: 'Buys bread every week.'
  },
  {
    id: 3,
    name: 'Suresh De Silva',
    email: 'suresh.desilva@colombobakery.com',
    phone: '+94 11 345 6789',
    address: '78 Flower Road, Colombo 07',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'vip',
    joinDate: '2023-01-20',
    totalOrders: 30,
    totalSpent: 150000,
    lastOrder: '2024-01-14',
    favoriteProducts: ['Almond Cookies', 'Strawberry Tart'],
    notes: 'VIP customer. Large birthday orders.'
  },
  {
    id: 4,
    name: 'Harini Jayasuriya',
    email: 'harini.jaya@colombobakery.com',
    phone: '+94 11 456 7890',
    address: '99 Lotus Lane, Colombo 05',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    status: 'regular',
    joinDate: '2023-04-05',
    totalOrders: 8,
    totalSpent: 28750,
    lastOrder: '2024-01-15',
    favoriteProducts: ['Egg Roti', 'Fish Bun'],
    notes: 'Prefers spicy food.'
  },
  {
    id: 5,
    name: 'Ruwan Abeysekara',
    email: 'ruwan.abey@colombobakery.com',
    phone: '+94 11 567 8901',
    address: '12 Park Street, Colombo 02',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    status: 'regular',
    joinDate: '2023-05-12',
    totalOrders: 6,
    totalSpent: 16230,
    lastOrder: '2024-01-13',
    favoriteProducts: ['Vadai', 'Fish Bun'],
    notes: 'Orders for family gatherings.'
  },
  {
    id: 6,
    name: 'Anjali Peris',
    email: 'anjali.peris@colombobakery.com',
    phone: '+94 11 678 9012',
    address: '34 Temple Road, Colombo 06',
    avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    status: 'new',
    joinDate: '2024-01-01',
    totalOrders: 1,
    totalSpent: 3500,
    lastOrder: '2024-01-15',
    favoriteProducts: ['Pol Roti'],
    notes: 'First-time customer. Loves coconut-based products.'
  }
];

export default function ColomboCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'vip': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'regular': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'new': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'vip': return <Star className="w-3 h-3" />;
      case 'regular': return <Heart className="w-3 h-3" />;
      case 'new': return <Star className="w-3 h-3" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCustomerStats = () => {
    const stats = {
      total: customers.length,
      vip: customers.filter(c => c.status === 'vip').length,
      regular: customers.filter(c => c.status === 'regular').length,
      new: customers.filter(c => c.status === 'new').length,
      totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
    };
    return stats;
  };

  const stats = getCustomerStats();

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">Colombo Customers</h1>
        <p className="text-gray-500">Manage your Colombo branch customers here.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.vip}</div>
              <p className="text-sm text-muted-foreground">VIP</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.regular}</div>
              <p className="text-sm text-muted-foreground">Regular</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.new}</div>
              <p className="text-sm text-muted-foreground">New</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">LKR {stats.totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-80"
        />
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover-lift group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                      {customer.name}
                    </h3>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(customer.status)}`}>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(customer.status)}
                    <span className="capitalize">{customer.status}</span>
                  </span>
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Phone className="w-4 h-4 text-blue-400" /> {customer.phone}
                <Mail className="w-4 h-4 text-blue-400 ml-4" /> {customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 text-blue-400" /> {customer.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 text-blue-400" /> Joined: {formatDate(customer.joinDate)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <ShoppingBag className="w-4 h-4 text-blue-400" /> {customer.totalOrders} orders
                <DollarSign className="w-4 h-4 text-blue-400 ml-4" /> LKR {customer.totalSpent.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Eye className="w-4 h-4 text-blue-400" /> Last order: {formatDate(customer.lastOrder)}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{customer.name}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <div className="space-y-2">
                      <div><strong>Email:</strong> {customer.email}</div>
                      <div><strong>Phone:</strong> {customer.phone}</div>
                      <div><strong>Address:</strong> {customer.address}</div>
                      <div><strong>Status:</strong> {customer.status}</div>
                      <div><strong>Notes:</strong> {customer.notes}</div>
                      <div><strong>Favorite Products:</strong> {customer.favoriteProducts.join(', ')}</div>
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 