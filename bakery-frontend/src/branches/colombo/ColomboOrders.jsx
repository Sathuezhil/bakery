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

const orderStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'];

export default function ColomboOrders() {
  const { orders } = useOrders();
  const branchOrders = orders.filter(order => order.branch === 'colombo');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = branchOrders.filter(order => {
    const matchesSearch = (order.id?.toString() || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer?.name || order.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-orange-800 border-orange-200';
      case 'confirmed': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready': return 'bg-green-100 text-orange-800 border-orange-200';
      case 'out-for-delivery': return 'bg-purple-100 text-orange-800 border-orange-200';
      case 'delivered': return 'bg-emerald-100 text-orange-800 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-orange-800 border-orange-200';
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
    // Implementation of updateOrderStatus function
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
              <div className="text-2xl font-bold text-orange-600">{stats.total}</div>
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
