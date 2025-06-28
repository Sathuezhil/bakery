import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Package, TrendingDown, Eye, Edit, Minus, Plus } from 'lucide-react';

// Jaffna inventory data
const jaffnaInventory = [
  { id: 1, name: 'All-Purpose Flour', category: 'Ingredients', currentStock: 5, minimumStock: 20, unit: 'kg', costPerUnit: 2.50, supplier: 'Golden Grain Co.', lastRestocked: '2024-01-10', status: 'critical', description: 'High-quality all-purpose flour for bread and pastries', branch: 'Jaffna' },
  { id: 2, name: 'Unsalted Butter', category: 'Ingredients', currentStock: 8, minimumStock: 15, unit: 'kg', costPerUnit: 6.75, supplier: 'Dairy Fresh Ltd.', lastRestocked: '2024-01-12', status: 'low', description: 'Premium unsalted butter for baking', branch: 'Jaffna' },
  { id: 3, name: 'Vanilla Extract', category: 'Ingredients', currentStock: 2, minimumStock: 10, unit: 'bottles', costPerUnit: 12.00, supplier: 'Flavor House', lastRestocked: '2024-01-05', status: 'critical', description: 'Pure vanilla extract, 500ml bottles', branch: 'Jaffna' },
  { id: 4, name: 'Granulated Sugar', category: 'Ingredients', currentStock: 45, minimumStock: 25, unit: 'kg', costPerUnit: 1.80, supplier: 'Sweet Supply Co.', lastRestocked: '2024-01-14', status: 'good', description: 'Fine granulated white sugar', branch: 'Jaffna' },
  { id: 5, name: 'Cake Boxes (Large)', category: 'Packaging', currentStock: 12, minimumStock: 50, unit: 'pieces', costPerUnit: 0.85, supplier: 'Pack Pro', lastRestocked: '2024-01-08', status: 'low', description: 'White cake boxes, 12-inch for large cakes', branch: 'Jaffna' },
  { id: 6, name: 'Baking Powder', category: 'Ingredients', currentStock: 1, minimumStock: 5, unit: 'boxes', costPerUnit: 3.25, supplier: 'Bake Essentials', lastRestocked: '2024-01-03', status: 'critical', description: 'Double-acting baking powder, 500g boxes', branch: 'Jaffna' },
  { id: 7, name: 'Parchment Paper', category: 'Supplies', currentStock: 25, minimumStock: 15, unit: 'rolls', costPerUnit: 4.50, supplier: 'Kitchen Supplies Inc.', lastRestocked: '2024-01-13', status: 'good', description: 'Non-stick parchment paper rolls', branch: 'Jaffna' },
  { id: 8, name: 'Food Coloring Set', category: 'Ingredients', currentStock: 3, minimumStock: 8, unit: 'sets', costPerUnit: 15.00, supplier: 'Color Craft', lastRestocked: '2024-01-07', status: 'low', description: 'Professional gel food coloring, 12-color set', branch: 'Jaffna' }
];

// Colombo inventory data
const colomboInventory = [
  { id: 101, name: 'Premium Wheat Flour', category: 'Ingredients', currentStock: 10, minimumStock: 25, unit: 'kg', costPerUnit: 3.00, supplier: 'Colombo Grains Ltd.', lastRestocked: '2024-01-12', status: 'low', description: 'High-quality wheat flour for Colombo bakery products', branch: 'Colombo' },
  { id: 102, name: 'Salted Butter', category: 'Ingredients', currentStock: 12, minimumStock: 20, unit: 'kg', costPerUnit: 7.00, supplier: 'Butter House Colombo', lastRestocked: '2024-01-14', status: 'low', description: 'Salted butter for baking and pastries', branch: 'Colombo' },
  { id: 103, name: 'Baking Soda', category: 'Ingredients', currentStock: 3, minimumStock: 8, unit: 'boxes', costPerUnit: 2.80, supplier: 'Colombo Baking Supplies', lastRestocked: '2024-01-10', status: 'critical', description: 'Baking soda for cakes and cookies', branch: 'Colombo' },
  { id: 104, name: 'Granulated Sugar', category: 'Ingredients', currentStock: 60, minimumStock: 30, unit: 'kg', costPerUnit: 2.00, supplier: 'Sweet Lanka Co.', lastRestocked: '2024-01-15', status: 'good', description: 'Fine granulated sugar for all bakery needs', branch: 'Colombo' },
  { id: 105, name: 'Cake Boxes (Medium)', category: 'Packaging', currentStock: 20, minimumStock: 60, unit: 'pieces', costPerUnit: 0.90, supplier: 'Pack Lanka', lastRestocked: '2024-01-09', status: 'low', description: 'Medium-sized cake boxes for Colombo branch', branch: 'Colombo' },
  { id: 106, name: 'Whipping Cream', category: 'Ingredients', currentStock: 2, minimumStock: 6, unit: 'liters', costPerUnit: 8.50, supplier: 'Dairy Best Colombo', lastRestocked: '2024-01-05', status: 'critical', description: 'Fresh whipping cream for cakes and desserts', branch: 'Colombo' },
  { id: 107, name: 'Baking Paper', category: 'Supplies', currentStock: 30, minimumStock: 20, unit: 'rolls', costPerUnit: 5.00, supplier: 'Colombo Kitchenware', lastRestocked: '2024-01-13', status: 'good', description: 'Non-stick baking paper rolls', branch: 'Colombo' },
  { id: 108, name: 'Food Coloring Gel', category: 'Ingredients', currentStock: 5, minimumStock: 10, unit: 'sets', costPerUnit: 16.00, supplier: 'Color Lanka', lastRestocked: '2024-01-08', status: 'low', description: 'Professional food coloring gel set for cakes', branch: 'Colombo' }
];

const combinedInventory = [...jaffnaInventory, ...colomboInventory];

export default function CombinedInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventory, setInventory] = useState(combinedInventory);

  const filteredInventory = combinedInventory.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || i.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'low':
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
      case 'out-of-stock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
      case 'active':
        return <Package className="w-3 h-3" />;
      case 'low':
      case 'low-stock':
        return <TrendingDown className="w-3 h-3" />;
      case 'critical':
      case 'out-of-stock':
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleStockChange = (itemId, amount) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        const newStock = Math.max(0, (item.currentStock ?? item.stock) + amount);
        let status = item.status;
        if (item.minimumStock) {
          const ratio = newStock / item.minimumStock;
          if (ratio <= 0.2) status = 'critical';
          else if (ratio <= 0.6) status = 'low';
          else status = 'good';
        }
        return { ...item, currentStock: newStock, stock: newStock, status };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-bakery-brown">Combined Inventory</h1>
        <p className="text-muted-foreground">View inventory from both Jaffna and Colombo branches</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
          <Input
            placeholder="Search inventory by name or category..."
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
                  <div className="text-xs text-gray-500">{item.description || ''}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleStockChange(item.id, -1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="text-center w-10">
                      <div className="font-medium">{item.currentStock ?? item.stock} {item.unit || ''}</div>
                      <Progress value={item.minimumStock ? ((item.currentStock ?? item.stock) / item.minimumStock) * 100 : 100} className="h-1 mt-1" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleStockChange(item.id, 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className={`${getStatusColor(item.status)}`}> 
                    {getStatusIcon(item.status)}
                    <span className="ml-1 capitalize">{item.status ? item.status.replace('-', ' ') : ''}</span>
                  </Badge>
                </td>
                <td className="p-4">LKR {item.costPerUnit ? item.costPerUnit.toFixed(2) : '-'}</td>
                <td className="p-4">{item.supplier || '-'}</td>
                <td className="p-4">{item.lastRestocked || '-'}</td>
                <td className="p-4">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
