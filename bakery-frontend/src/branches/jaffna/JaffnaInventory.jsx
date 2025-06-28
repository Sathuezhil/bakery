'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Progress } from '../../components/ui/progress';
import { 
  Plus, 
  Search, 
  Edit, 
  AlertTriangle, 
  Package, 
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react';

const categories = ['Ingredients', 'Packaging', 'Equipment', 'Supplies'];

const initialInventory = [
  {
    id: 1,
    name: 'All-Purpose Flour',
    category: 'Ingredients',
    currentStock: 5,
    minimumStock: 20,
    unit: 'kg',
    costPerUnit: 2.50,
    supplier: 'Golden Grain Co.',
    lastRestocked: '2024-01-10',
    status: 'critical',
    description: 'High-quality all-purpose flour for bread and pastries'
  },
  {
    id: 2,
    name: 'Unsalted Butter',
    category: 'Ingredients',
    currentStock: 8,
    minimumStock: 15,
    unit: 'kg',
    costPerUnit: 6.75,
    supplier: 'Dairy Fresh Ltd.',
    lastRestocked: '2024-01-12',
    status: 'low',
    description: 'Premium unsalted butter for baking'
  },
  {
    id: 3,
    name: 'Vanilla Extract',
    category: 'Ingredients',
    currentStock: 2,
    minimumStock: 10,
    unit: 'bottles',
    costPerUnit: 12.00,
    supplier: 'Flavor House',
    lastRestocked: '2024-01-05',
    status: 'critical',
    description: 'Pure vanilla extract, 500ml bottles'
  },
  {
    id: 4,
    name: 'Granulated Sugar',
    category: 'Ingredients',
    currentStock: 45,
    minimumStock: 25,
    unit: 'kg',
    costPerUnit: 1.80,
    supplier: 'Sweet Supply Co.',
    lastRestocked: '2024-01-14',
    status: 'good',
    description: 'Fine granulated white sugar'
  },
  {
    id: 5,
    name: 'Cake Boxes (Large)',
    category: 'Packaging',
    currentStock: 12,
    minimumStock: 50,
    unit: 'pieces',
    costPerUnit: 0.85,
    supplier: 'Pack Pro',
    lastRestocked: '2024-01-08',
    status: 'low',
    description: 'White cake boxes, 12-inch for large cakes'
  },
  {
    id: 6,
    name: 'Baking Powder',
    category: 'Ingredients',
    currentStock: 1,
    minimumStock: 5,
    unit: 'boxes',
    costPerUnit: 3.25,
    supplier: 'Bake Essentials',
    lastRestocked: '2024-01-03',
    status: 'critical',
    description: 'Double-acting baking powder, 500g boxes'
  },
  {
    id: 7,
    name: 'Parchment Paper',
    category: 'Supplies',
    currentStock: 25,
    minimumStock: 15,
    unit: 'rolls',
    costPerUnit: 4.50,
    supplier: 'Kitchen Supplies Inc.',
    lastRestocked: '2024-01-13',
    status: 'good',
    description: 'Non-stick parchment paper rolls'
  },
  {
    id: 8,
    name: 'Food Coloring Set',
    category: 'Ingredients',
    currentStock: 3,
    minimumStock: 8,
    unit: 'sets',
    costPerUnit: 15.00,
    supplier: 'Color Craft',
    lastRestocked: '2024-01-07',
    status: 'low',
    description: 'Professional gel food coloring, 12-color set'
  }
];

export default function JaffnaInventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    currentStock: '',
    minimumStock: '',
    unit: '',
    costPerUnit: '',
    supplier: '',
    description: ''
  });

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return <Package className="w-3 h-3" />;
      case 'low': return <TrendingDown className="w-3 h-3" />;
      case 'critical': return <AlertTriangle className="w-3 h-3" />;
      default: return null;
    }
  };

  const determineStatus = (current, minimum) => {
    const ratio = current / minimum;
    if (ratio <= 0.2) return 'critical';
    if (ratio <= 0.6) return 'low';
    return 'good';
  };

  const handleAddItem = () => {
    const current = parseInt(newItem.currentStock);
    const minimum = parseInt(newItem.minimumStock);
    const status = determineStatus(current, minimum);
    
    const itemToAdd = {
      id: Date.now(),
      ...newItem,
      currentStock: current,
      minimumStock: minimum,
      costPerUnit: parseFloat(newItem.costPerUnit),
      status,
      lastRestocked: new Date().toISOString().split('T')[0]
    };
    
    setInventory([...inventory, itemToAdd]);
    resetForm();
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      category: item.category,
      currentStock: item.currentStock.toString(),
      minimumStock: item.minimumStock.toString(),
      unit: item.unit,
      costPerUnit: item.costPerUnit.toString(),
      supplier: item.supplier,
      description: item.description
    });
    setIsAddModalOpen(true);
  };

  const handleUpdateItem = () => {
    const current = parseInt(newItem.currentStock);
    const minimum = parseInt(newItem.minimumStock);
    const status = determineStatus(current, minimum);
    
    const updatedItem = {
      ...editingItem,
      ...newItem,
      currentStock: current,
      minimumStock: minimum,
      costPerUnit: parseFloat(newItem.costPerUnit),
      status
    };
    
    setInventory(inventory.map(item => item.id === editingItem.id ? updatedItem : item));
    resetForm();
  };

  const resetForm = () => {
    setNewItem({
      name: '',
      category: '',
      currentStock: '',
      minimumStock: '',
      unit: '',
      costPerUnit: '',
      supplier: '',
      description: ''
    });
    setEditingItem(null);
    setIsAddModalOpen(false);
  };

  const getInventoryStats = () => {
    const totalItems = inventory.length;
    const lowStockItems = inventory.filter(item => item.status === 'low' || item.status === 'critical').length;
    const criticalItems = inventory.filter(item => item.status === 'critical').length;
    const totalValue = inventory.reduce((acc, item) => acc + (item.currentStock * item.costPerUnit), 0);
    return { totalItems, lowStockItems, criticalItems, totalValue };
  };
  const stats = getInventoryStats();

  const handleStockChange = (itemId, amount) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        const newStock = Math.max(0, item.currentStock + amount);
        const status = determineStatus(newStock, item.minimumStock);
        return { ...item, currentStock: newStock, status };
      }
      return item;
    }));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Inventory Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{stats.lowStockItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">Critical Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{stats.criticalItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">LKR {stats.totalValue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <CardTitle>Inventory List</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Manage your bakery's stock and supplies.
              </p>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to {editingItem ? 'update the' : 'add a new'} item in your inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="current-stock" className="text-right">Current Stock</Label>
                    <Input id="current-stock" type="number" value={newItem.currentStock} onChange={(e) => setNewItem({...newItem, currentStock: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="minimum-stock" className="text-right">Minimum Stock</Label>
                    <Input id="minimum-stock" type="number" value={newItem.minimumStock} onChange={(e) => setNewItem({...newItem, minimumStock: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="unit" className="text-right">Unit</Label>
                    <Input id="unit" value={newItem.unit} onChange={(e) => setNewItem({...newItem, unit: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price-per-unit" className="text-right">Price/Unit</Label>
                    <Input id="price-per-unit" type="number" value={newItem.costPerUnit} onChange={(e) => setNewItem({...newItem, costPerUnit: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supplier" className="text-right">Supplier</Label>
                    <Input id="supplier" value={newItem.supplier} onChange={(e) => setNewItem({...newItem, supplier: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Textarea id="description" value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => resetForm()}>Cancel</Button>
                  <Button onClick={editingItem ? handleUpdateItem : handleAddItem}>{editingItem ? 'Update Item' : 'Add Item'}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 mt-4">
            <div className="relative w-full md:w-auto flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by name or supplier..."
                className="pl-8 sm:w-[300px] w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="p-4 font-normal">Item</th>
                  <th className="p-4 font-normal">Stock Level</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">Price/Unit</th>
                  <th className="p-4 font-normal">Supplier</th>
                  <th className="p-4 font-normal">Last Restocked</th>
                  <th className="p-4 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredInventory.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleStockChange(item.id, -1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="text-center w-10">
                          <div className="font-medium">{item.currentStock} {item.unit}</div>
                          <Progress value={(item.currentStock / item.minimumStock) * 100} className="h-1 mt-1" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleStockChange(item.id, 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={`${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status}</span>
                      </Badge>
                    </td>
                    <td className="p-4">LKR {item.costPerUnit.toFixed(2)}</td>
                    <td className="p-4">{item.supplier}</td>
                    <td className="p-4">{item.lastRestocked}</td>
                    <td className="p-4">
                      <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
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