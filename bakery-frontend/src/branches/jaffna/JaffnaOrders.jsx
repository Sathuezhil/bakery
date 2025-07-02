import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Eye, 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useOrders } from '../../context/OrdersContext';
import { useNotifications } from '../../context/NotificationContext';

const orderStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'];

const jaffnaOrders = [ {
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
}];

export default function JaffnaOrders() {
  const { orders } = useOrders();
  const branchOrders = orders.filter(order => order.branch === 'jaffna');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { addNotification } = useNotifications();

  const filteredOrders = branchOrders.filter(order => {
    const matchesSearch = (order.id?.toString() || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer?.name || order.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
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

  const updateOrderStatus = (orderId, newStatus) => {
    const order = branchOrders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      addNotification({
        title: 'Order Confirmed',
        customer: order.customer?.id || order.customer?.email || order.customer,
        message: 'Your order has been confirmed.'
      });
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
      total: branchOrders.length,
      pending: branchOrders.filter(o => o.status === 'pending').length,
      preparing: branchOrders.filter(o => o.status === 'preparing').length,
      ready: branchOrders.filter(o => o.status === 'ready').length,
      delivered: branchOrders.filter(o => o.status === 'delivered').length
    };
    return stats;
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-bakery-brown">Orders</h1>
        <p className="text-muted-foreground">Track and manage SE Bakers customer orders</p>
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
              <p className="text-muted-foreground">There are no orders for this status. Try changing the filter or search.</p>
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
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">LKR {order.total.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{order.paymentMethod}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-bakery-brown mb-2">Customer</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">{order.customer.name}</p>
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {order.customer.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {order.customer.phone}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-bakery-brown mb-2">Order Details</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Ordered: {formatDate(order.orderDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            Delivery: {formatDate(order.deliveryDate)}
                          </div>
                          <div className="text-xs">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                        <p className="text-sm text-orange-800">
                          <strong>Note:</strong> {order.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 lg:ml-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                          <DialogDescription>
                            Complete order information and customer details
                          </DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-6">
                            {/* Order Items */}
                            <div>
                              <h4 className="font-semibold mb-3">Order Items</h4>
                              <div className="space-y-2 border rounded-lg p-4">
                                {selectedOrder.items.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <div>
                                      <span className="font-medium">{item.name}</span>
                                      <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                                    </div>
                                    <span className="font-semibold text-green-600">LKR {item.price.toFixed(2)}</span>
                                  </div>
                                ))}
                                <Separator />
                                <div className="flex justify-between items-center font-bold text-lg">
                                  <span>Total</span>
                                  <span className="text-green-600">LKR {selectedOrder.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                              <h4 className="font-semibold mb-3">Customer Information</h4>
                              <div className="space-y-3 border rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                  <strong>Name:</strong> {selectedOrder.customer.name}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  <strong>Email:</strong> {selectedOrder.customer.email}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  <strong>Phone:</strong> {selectedOrder.customer.phone}
                                </div>
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 mt-0.5" />
                                  <div>
                                    <strong>Address:</strong>
                                    <p className="text-muted-foreground">{selectedOrder.customer.address}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Update Status */}
                            <div>
                              <h4 className="font-semibold mb-3">Update Status</h4>
                              <Select 
                                value={selectedOrder.status} 
                                onValueChange={(newStatus) => {
                                  updateOrderStatus(selectedOrder.id, newStatus);
                                  setSelectedOrder({...selectedOrder, status: newStatus});
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {orderStatuses.map(status => (
                                    <SelectItem key={status} value={status}>
                                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Select 
                      value={order.status} 
                      onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatuses.map(status => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 
