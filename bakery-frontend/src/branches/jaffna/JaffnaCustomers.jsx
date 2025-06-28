import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+94 71 123 4567',
    address: '123 Oak Street, Downtown, CA 90210',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    status: 'vip',
    joinDate: '2023-01-10',
    totalOrders: 15,
    totalSpent: 48750,
    lastOrder: '2023-06-01',
    favoriteProducts: ['Kimbula Bun', 'Fish Bun', 'Pol Roti'],
    notes: 'Loves spicy buns. Prefers morning delivery.'
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+94 72 234 5678',
    address: '456 Pine Avenue, Westside, CA 90211',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    status: 'regular',
    joinDate: '2023-02-15',
    totalOrders: 8,
    totalSpent: 24575,
    lastOrder: '2023-06-02',
    favoriteProducts: ['Bread', 'Pol Roti'],
    notes: 'Enjoys fresh bread. Sometimes orders for office.'
  },
  {
    id: 3,
    name: 'Sarah Davis',
    email: 'sarah.davis@email.com',
    phone: '+94 75 345 6789',
    address: '789 Maple Drive, Eastside, CA 90212',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    status: 'vip',
    joinDate: '2023-03-20',
    totalOrders: 25,
    totalSpent: 125000,
    lastOrder: '2023-06-03',
    favoriteProducts: ['Red Velvet Cupcake', 'Strawberry Tart', 'Almond Cookies'],
    notes: 'VIP customer. Birthday orders every month.'
  },
  {
    id: 4,
    name: 'Ayesha Fernando',
    email: 'ayesha.fernando@email.com',
    phone: '+94 76 456 7890',
    address: '321 Palm Street, Colombo 00500',
    avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
    status: 'regular',
    joinDate: '2023-04-05',
    totalOrders: 7,
    totalSpent: 18750,
    lastOrder: '2023-06-04',
    favoriteProducts: ['Chocolate Croissant', 'Egg Roti'],
    notes: 'Prefers eggless products.'
  },
  {
    id: 5,
    name: 'Nimal Perera',
    email: 'nimal.perera@email.com',
    phone: '+94 77 567 8901',
    address: '654 Cedar Lane, Galle 80000',
    avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
    status: 'regular',
    joinDate: '2023-05-12',
    totalOrders: 6,
    totalSpent: 16230,
    lastOrder: '2023-06-05',
    favoriteProducts: ['Vadai', 'Fish Bun'],
    notes: 'Bulk orders for family events.'
  },
  {
    id: 6,
    name: 'Lakshmi Raj',
    email: 'lakshmi.raj@email.com',
    phone: '+94 78 678 9012',
    address: '987 Lotus Road, Jaffna 40000',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    status: 'new',
    joinDate: '2023-06-01',
    totalOrders: 1,
    totalSpent: 2500,
    lastOrder: '2023-06-06',
    favoriteProducts: ['Pol Roti'],
    notes: 'First-time customer. Requested gluten-free options.'
  }
];

export default function JaffnaCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // ...rest of your original logic for add/edit/delete/search, using setCustomers

  const getStatusColor = (status) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-bakery-brown">Customers</h1>
        <p className="text-muted-foreground">
          {/* ... (keep the existing userRole-based text) */}
        </p>
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
              <div className="text-2xl font-bold text-purple-600">{stats.vip}</div>
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

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-orange-50/50 border-orange-200 focus:border-orange-400 focus:ring-orange-200"
          />
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
          Add New Customer
        </Button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id} className="bakery-card hover-lift group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-600">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-bakery-brown group-hover:text-orange-600 transition-colors">
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

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>Joined {formatDate(customer.joinDate)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                  <span>{customer.totalOrders} orders</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-orange-500" />
                  <span>LKR {customer.totalSpent.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-orange-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Order</span>
                  <span className="text-sm font-medium text-bakery-brown">
                    {formatDate(customer.lastOrder)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl text-bakery-brown">Customer Details</DialogTitle>
                      <DialogDescription>
                        Complete information about {selectedCustomer?.name}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedCustomer && (
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                            <AvatarFallback className="bg-orange-100 text-orange-600 text-lg">
                              {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold text-bakery-brown">{selectedCustomer.name}</h3>
                            <p className="text-gray-600">{selectedCustomer.email}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-orange-500" />
                              <span className="text-sm">{selectedCustomer.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-orange-500" />
                              <span className="text-sm">{selectedCustomer.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <span className="text-sm">Joined {formatDate(selectedCustomer.joinDate)}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <ShoppingBag className="w-4 h-4 text-orange-500" />
                              <span className="text-sm">{selectedCustomer.totalOrders} total orders</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-orange-500" />
                              <span className="text-sm">LKR {selectedCustomer.totalSpent.toLocaleString()} spent</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <span className="text-sm">Last order: {formatDate(selectedCustomer.lastOrder)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-bakery-brown mb-2">Favorite Products</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCustomer.favoriteProducts.map((product, index) => (
                              <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-bakery-brown mb-2">Notes</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {selectedCustomer.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {customers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-bakery-brown mb-2">No customers found</h3>
          <p className="text-gray-500">Try adjusting your search terms or add a new customer.</p>
        </div>
      )}
    </div>
  );
}
