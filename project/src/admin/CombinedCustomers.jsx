import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { 
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

// Jaffna customers with avatars
const jaffnaCustomers = [
  { id: 1, name: 'Emma Wilson', email: 'emma.wilson@email.com', phone: '+94 71 123 4567', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', status: 'vip', joinDate: '2023-01-10', totalOrders: 15, totalSpent: 48750, lastOrder: '2023-06-01', favoriteProducts: ['Kimbula Bun', 'Fish Bun', 'Pol Roti'], notes: 'Loves spicy buns. Prefers morning delivery.' },
  { id: 2, name: 'Michael Brown', email: 'michael.brown@email.com', phone: '+94 72 234 5678', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', status: 'regular', joinDate: '2023-02-15', totalOrders: 8, totalSpent: 24575, lastOrder: '2023-06-02', favoriteProducts: ['Bread', 'Pol Roti'], notes: 'Enjoys fresh bread. Sometimes orders for office.' },
  { id: 3, name: 'Sarah Davis', email: 'sarah.davis@email.com', phone: '+94 75 345 6789', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', status: 'vip', joinDate: '2023-03-20', totalOrders: 25, totalSpent: 125000, lastOrder: '2023-06-03', favoriteProducts: ['Red Velvet Cupcake', 'Strawberry Tart', 'Almond Cookies'], notes: 'VIP customer. Birthday orders every month.' },
  { id: 4, name: 'Ayesha Fernando', email: 'ayesha.fernando@email.com', phone: '+94 76 456 7890', avatar: 'https://randomuser.me/api/portraits/women/66.jpg', status: 'regular', joinDate: '2023-04-05', totalOrders: 7, totalSpent: 18750, lastOrder: '2023-06-04', favoriteProducts: ['Chocolate Croissant', 'Egg Roti'], notes: 'Prefers eggless products.' },
  { id: 5, name: 'Nimal Perera', email: 'nimal.perera@email.com', phone: '+94 77 567 8901', avatar: 'https://randomuser.me/api/portraits/men/66.jpg', status: 'regular', joinDate: '2023-05-12', totalOrders: 6, totalSpent: 16230, lastOrder: '2023-06-05', favoriteProducts: ['Vadai', 'Fish Bun'], notes: 'Bulk orders for family events.' },
  { id: 6, name: 'Lakshmi Raj', email: 'lakshmi.raj@email.com', phone: '+94 78 678 9012', avatar: 'https://randomuser.me/api/portraits/women/67.jpg', status: 'new', joinDate: '2023-06-01', totalOrders: 1, totalSpent: 2500, lastOrder: '2023-06-06', favoriteProducts: ['Pol Roti'], notes: 'First-time customer. Requested gluten-free options.' }
].map(c => ({ ...c, branch: 'Jaffna' }));

// Colombo customers with avatars
const colomboCustomers = [
  { id: 7, name: 'Nimal Perera', email: 'nimal.perera@colombobakery.com', phone: '+94 11 234 5678', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'vip', joinDate: '2023-02-10', totalOrders: 22, totalSpent: 98500, lastOrder: '2024-01-10', favoriteProducts: ['Chocolate Croissant', 'Red Velvet Cupcake'], notes: 'Prefers chocolate items. Orders for office events.' },
  { id: 8, name: 'Dilani Fernando', email: 'dilani.fernando@colombobakery.com', phone: '+94 11 876 5432', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'regular', joinDate: '2023-03-15', totalOrders: 12, totalSpent: 42500, lastOrder: '2024-01-12', favoriteProducts: ['Bread', 'Pol Roti'], notes: 'Buys bread every week.' },
  { id: 9, name: 'Suresh De Silva', email: 'suresh.desilva@colombobakery.com', phone: '+94 11 345 6789', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', status: 'vip', joinDate: '2023-01-20', totalOrders: 30, totalSpent: 150000, lastOrder: '2024-01-14', favoriteProducts: ['Almond Cookies', 'Strawberry Tart'], notes: 'VIP customer. Large birthday orders.' },
  { id: 10, name: 'Harini Jayasuriya', email: 'harini.jaya@colombobakery.com', phone: '+94 11 456 7890', avatar: 'https://randomuser.me/api/portraits/women/46.jpg', status: 'regular', joinDate: '2023-04-05', totalOrders: 8, totalSpent: 28750, lastOrder: '2024-01-15', favoriteProducts: ['Egg Roti', 'Fish Bun'], notes: 'Prefers spicy food.' },
  { id: 11, name: 'Ruwan Abeysekara', email: 'ruwan.abey@colombobakery.com', phone: '+94 11 567 8901', avatar: 'https://randomuser.me/api/portraits/men/47.jpg', status: 'regular', joinDate: '2023-05-12', totalOrders: 6, totalSpent: 16230, lastOrder: '2024-01-13', favoriteProducts: ['Vadai', 'Fish Bun'], notes: 'Orders for family gatherings.' },
  { id: 12, name: 'Anjali Peris', email: 'anjali.peris@colombobakery.com', phone: '+94 11 678 9012', avatar: 'https://randomuser.me/api/portraits/women/48.jpg', status: 'new', joinDate: '2024-01-01', totalOrders: 1, totalSpent: 3500, lastOrder: '2024-01-15', favoriteProducts: ['Pol Roti'], notes: 'First-time customer. Loves coconut-based products.' }
].map(c => ({ ...c, branch: 'Colombo' }));

const combinedCustomers = [...jaffnaCustomers, ...colomboCustomers];

// Helper to get avatar URL or fallback
function getAvatarUrl(customer) {
  if (customer.avatar) return customer.avatar;
  // Use randomuser.me with gender and branch for variety, fallback to a default
  const gender = customer.name && customer.name.split(' ')[0].endsWith('a') ? 'women' : 'men';
  // Use id or hash for variety
  const id = customer.id ? customer.id % 100 : Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
}

export default function CombinedCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = combinedCustomers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);
    const matchesBranch = selectedBranch === 'all' || c.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-bakery-brown">Combined Customers</h1>
        <p className="text-muted-foreground">View customers from both Jaffna and Colombo branches</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
          <Input
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-orange-50/50 border-orange-200 focus:border-orange-400 focus:ring-orange-200"
          />
        </div>
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="Jaffna">Jaffna</SelectItem>
            <SelectItem value="Colombo">Colombo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-bakery-brown mb-2">No customers found</h3>
            <p className="text-gray-500">Try adjusting your search terms or branch filter.</p>
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <Card key={customer.id} className="bakery-card hover-lift group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={getAvatarUrl(customer)} alt={customer.name} />
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
                  <Badge className={`text-xs ${customer.status === 'vip' ? 'bg-purple-100 text-purple-800 border-purple-200' : customer.status === 'regular' ? 'bg-orange-100 text-orange-800 border-orange-200' : customer.status === 'new' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                    <span className="flex items-center space-x-1">
                      {customer.status === 'vip' ? <Star className="w-3 h-3" /> : customer.status === 'regular' ? <Heart className="w-3 h-3" /> : customer.status === 'new' ? <Star className="w-3 h-3" /> : null}
                      <span className="capitalize">{customer.status || customer.branch}</span>
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
                    <span>Joined {customer.joinDate || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ShoppingBag className="w-4 h-4 text-orange-500" />
                    <span>{customer.totalOrders} orders</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-orange-500" />
                    <span>LKR {customer.totalSpent ? customer.totalSpent.toLocaleString() : 'N/A'}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-orange-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last Order</span>
                    <span className="text-sm font-medium text-bakery-brown">
                      {customer.lastOrder || 'N/A'}
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
                              <AvatarImage src={getAvatarUrl(selectedCustomer)} alt={selectedCustomer.name} />
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
                                <span className="text-sm">{selectedCustomer.address || 'N/A'}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">Joined {selectedCustomer.joinDate || 'N/A'}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <ShoppingBag className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">{selectedCustomer.totalOrders} total orders</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">LKR {selectedCustomer.totalSpent ? selectedCustomer.totalSpent.toLocaleString() : 'N/A'} spent</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">Last order: {selectedCustomer.lastOrder || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          {selectedCustomer.favoriteProducts && (
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
                          )}
                          {selectedCustomer.notes && (
                            <div>
                              <h4 className="font-semibold text-bakery-brown mb-2">Notes</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {selectedCustomer.notes}
                              </p>
                            </div>
                          )}
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
          ))
        )}
      </div>
    </div>
  );
} 