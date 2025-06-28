import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Separator } from '../../components/ui/separator';
import { 
  Search, 
  Eye, 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  Phone, 
  Mail, 
  Calendar
} from 'lucide-react';

const orderStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'];

// Jaffna orders
const jaffnaOrders = [
  {
    id: 'ORD-001',
    customer: { name: 'Emma Wilson', email: 'emma.wilson@email.com', phone: '+94 77 123 4567', address: '123 Oak Street, Colombo 00300' },
    items: [ { name: 'Kimbula Bun', quantity: 2, price: 100 }, { name: 'Fish Bun', quantity: 4, price: 70 } ],
    total: 2*100 + 4*70,
    status: 'preparing',
    orderDate: '2024-01-15T10:30:00',
    deliveryDate: '2024-01-15T15:30:00',
    paymentMethod: 'Credit Card',
    notes: 'Please pack buns separately.'
  },
  {
    id: 'ORD-002',
    customer: { name: 'Michael Brown', email: 'michael.brown@email.com', phone: '+94 76 234 5678', address: '456 Galle Road, Dehiwala 10350' },
    items: [ { name: 'Bread', quantity: 1, price: 200 }, { name: 'Pol Roti', quantity: 5, price: 150 } ],
    total: 1*200 + 5*150,
    status: 'ready',
    orderDate: '2024-01-15T09:15:00',
    deliveryDate: '2024-01-15T14:00:00',
    paymentMethod: 'Cash',
    notes: ''
  },
  {
    id: 'ORD-003',
    customer: { name: 'Sarah Davis', email: 'sarah.davis@email.com', phone: '+94 71 345 6789', address: '789 Maple Drive, Kandy 20000' },
    items: [ { name: 'Red Velvet Cupcake', quantity: 6, price: 300 } ],
    total: 6*300,
    status: 'confirmed',
    orderDate: '2024-01-14T16:45:00',
    deliveryDate: '2024-01-18T12:00:00',
    paymentMethod: 'Bank Transfer',
    notes: 'Birthday cupcakes, please add candles.'
  },
  {
    id: 'ORD-004',
    customer: { name: 'James Miller', email: 'james.miller@email.com', phone: '+94 72 456 7890', address: '321 Elm Street, Negombo 11500' },
    items: [ { name: 'Vadai', quantity: 10, price: 80 }, { name: 'Egg Roti', quantity: 3, price: 70 } ],
    total: 10*80 + 3*70,
    status: 'delivered',
    orderDate: '2024-01-14T11:20:00',
    deliveryDate: '2024-01-14T17:30:00',
    paymentMethod: 'Credit Card',
    notes: ''
  },
  {
    id: 'ORD-005',
    customer: { name: 'Lisa Johnson', email: 'lisa.johnson@email.com', phone: '+94 75 567 8901', address: '654 Cedar Lane, Galle 80000' },
    items: [ { name: 'Strawberry Tart', quantity: 2, price: 180 }, { name: 'Almond Cookies', quantity: 1, price: 120 } ],
    total: 2*180 + 1*120,
    status: 'out-for-delivery',
    orderDate: '2024-01-15T08:00:00',
    deliveryDate: '2024-01-15T13:00:00',
    paymentMethod: 'Credit Card',
    notes: 'Tarts for tea party.'
  }
].map(o => ({ ...o, branch: 'Jaffna' }));

// Colombo orders
const colomboOrders = [
  {
    id: 'CMB-101',
    customer: { name: 'Nimal Perera', email: 'nimal.perera@colombobakery.com', phone: '+94 11 234 5678', address: '123 Galle Road, Colombo 03' },
    items: [ { name: 'Chocolate Croissant', quantity: 3, price: 180 }, { name: 'Red Velvet Cupcake', quantity: 2, price: 300 } ],
    total: 3*180 + 2*300,
    status: 'preparing',
    orderDate: '2024-02-10T09:00:00',
    deliveryDate: '2024-02-10T13:00:00',
    paymentMethod: 'Credit Card',
    notes: 'Deliver to office reception.'
  },
  {
    id: 'CMB-102',
    customer: { name: 'Dilani Fernando', email: 'dilani.fernando@colombobakery.com', phone: '+94 11 876 5432', address: '45 Marine Drive, Colombo 04' },
    items: [ { name: 'Bread', quantity: 2, price: 200 }, { name: 'Pol Roti', quantity: 4, price: 150 } ],
    total: 2*200 + 4*150,
    status: 'ready',
    orderDate: '2024-02-11T10:15:00',
    deliveryDate: '2024-02-11T15:00:00',
    paymentMethod: 'Cash',
    notes: 'Leave at security desk.'
  },
  {
    id: 'CMB-103',
    customer: { name: 'Suresh De Silva', email: 'suresh.desilva@colombobakery.com', phone: '+94 11 345 6789', address: '78 Flower Road, Colombo 07' },
    items: [ { name: 'Almond Cookies', quantity: 5, price: 120 }, { name: 'Strawberry Tart', quantity: 2, price: 180 } ],
    total: 5*120 + 2*180,
    status: 'confirmed',
    orderDate: '2024-02-12T14:30:00',
    deliveryDate: '2024-02-13T12:00:00',
    paymentMethod: 'Bank Transfer',
    notes: 'Birthday order for daughter.'
  },
  {
    id: 'CMB-104',
    customer: { name: 'Harini Jayasuriya', email: 'harini.jaya@colombobakery.com', phone: '+94 11 456 7890', address: '99 Lotus Lane, Colombo 05' },
    items: [ { name: 'Egg Roti', quantity: 6, price: 70 }, { name: 'Fish Bun', quantity: 3, price: 90 } ],
    total: 6*70 + 3*90,
    status: 'delivered',
    orderDate: '2024-02-13T08:45:00',
    deliveryDate: '2024-02-13T13:30:00',
    paymentMethod: 'Credit Card',
    notes: ''
  },
  {
    id: 'CMB-105',
    customer: { name: 'Anjali Peris', email: 'anjali.peris@colombobakery.com', phone: '+94 11 678 9012', address: '34 Temple Road, Colombo 06' },
    items: [ { name: 'Pol Roti', quantity: 2, price: 150 }, { name: 'Vadai', quantity: 10, price: 80 } ],
    total: 2*150 + 10*80,
    status: 'out-for-delivery',
    orderDate: '2024-02-14T07:30:00',
    deliveryDate: '2024-02-14T12:00:00',
    paymentMethod: 'Credit Card',
    notes: 'Call before delivery.'
  }
].map(o => ({ ...o, branch: 'Colombo' }));

const combinedOrders = [...jaffnaOrders, ...colomboOrders];

export default function CombinedOrders() {
  const [orders] = useState(combinedOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesBranch = selectedBranch === 'all' || order.branch === selectedBranch;
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'out-for-delivery': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'confirmed': return <CheckCircle className="w-3 h-3" />;
      case 'preparing': return <Package className="w-3 h-3" />;
      case 'ready': return <CheckCircle className="w-3 h-3" />;
      case 'out-for-delivery': return <Truck className="w-3 h-3" />;
      case 'delivered': return <CheckCircle className="w-3 h-3" />;
      case 'cancelled': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStats = () => {
    const stats = {
      total: filteredOrders.length,
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      preparing: filteredOrders.filter(o => o.status === 'preparing').length,
      ready: filteredOrders.filter(o => o.status === 'ready').length,
      delivered: filteredOrders.filter(o => o.status === 'delivered').length
    };
    return stats;
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-bakery-brown">Combined Orders</h1>
        <p className="text-muted-foreground">View and manage orders from both Jaffna and Colombo branches</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.preparing}</div>
              <p className="text-sm text-muted-foreground">Preparing</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.ready}</div>
              <p className="text-sm text-muted-foreground">Ready</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{stats.delivered}</div>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
          <Input
            placeholder="Search orders, customers..."
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
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {orderStatuses.map(status => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card className="bakery-card">
            <CardContent className="pt-6 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-bakery-brown mb-2">No orders found</h3>
              <p className="text-muted-foreground">There are no orders for this filter. Try changing the filter or search.</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="bakery-card hover-lift">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-bakery-brown">{order.id}</h3>
                        <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 capitalize`}>
                          {getStatusIcon(order.status)}
                          {order.status.replace('-', ' ')}
                        </Badge>
                        <Badge className={`ml-2 ${order.branch === 'Jaffna' ? 'bg-orange-100 text-orange-700' : 'bg-orange-100 text-orange-700'}`}>{order.branch}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">LKR {order.total.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{order.paymentMethod}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Ordered: {formatDate(order.orderDate)}</span>
                      <span className="mx-2">•</span>
                      <Truck className="w-4 h-4" />
                      <span>Delivery: {formatDate(order.deliveryDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{order.customer.email}</span>
                      <Phone className="w-4 h-4 ml-4" />
                      <span>{order.customer.phone}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                      <Eye className="w-4 h-4 mr-1" /> View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-bakery-brown">{selectedOrder.id}</h3>
                <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1 capitalize`}>
                  {getStatusIcon(selectedOrder.status)}
                  {selectedOrder.status.replace('-', ' ')}
                </Badge>
                <Badge className={`ml-2 ${selectedOrder.branch === 'Jaffna' ? 'bg-orange-100 text-orange-700' : 'bg-orange-100 text-orange-700'}`}>{selectedOrder.branch}</Badge>
              </div>
              <Separator />
              <div>
                <p className="font-medium text-bakery-brown">Customer:</p>
                <p>{selectedOrder.customer.name}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer.email} | {selectedOrder.customer.phone}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer.address}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium text-bakery-brown mb-1">Items:</p>
                <ul className="list-disc pl-5">
                  {selectedOrder.items.map((item, idx) => (
                    <li key={idx} className="text-sm">
                      {item.name} x {item.quantity} @ LKR {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-medium text-bakery-brown">Total:</span>
                <span className="text-lg font-bold text-green-600">LKR {selectedOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Ordered: {formatDate(selectedOrder.orderDate)}</span>
                <span className="mx-2">•</span>
                <Truck className="w-4 h-4" />
                <span>Delivery: {formatDate(selectedOrder.deliveryDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{selectedOrder.customer.email}</span>
                <Phone className="w-4 h-4 ml-4" />
                <span>{selectedOrder.customer.phone}</span>
              </div>
              {selectedOrder.notes && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mt-2 text-sm text-orange-800">
                  <span className="font-semibold">Notes:</span> {selectedOrder.notes}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}