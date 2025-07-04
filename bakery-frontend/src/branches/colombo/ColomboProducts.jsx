import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Search, Edit, Trash2, Eye, Star } from 'lucide-react';

const categories = ['Bread', 'Cakes', 'Pastries', 'Cookies', 'Seasonal'];

const initialProducts = [
  {
    id: 1,
    name: 'Colombo Special Bread',
    category: 'Bread',
    price: 220,
    stock: 30,
    description: 'Soft Colombo-style bread with a golden crust',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa8GyUjvKtUU-BN0mVfBNvvrgBTIzwJGd6BA&s',
    status: 'active',
    rating: 4.7,
    sales: 180,
  },
  {
    id: 2,
    name: 'Mango Mousse Cake',
    category: 'Cakes',
    price: 350,
    stock: 15,
    description: 'Light and creamy mango mousse cake, a Colombo favorite',
    image: 'data:image/jpeg;base64,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',
    status: 'active',
    rating: 4.6,
    sales: 95,
  },
  {
    id: 4,
    name: 'Chocolate Chip Cookies',
    category: 'Cookies',
    price: 160,
    stock: 20,
    description: 'Classic cookies with rich chocolate chips',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    rating: 4.9,
    sales: 210,
  },
  {
    id: 5,
    name: 'Seasonal Fruit Tart',
    category: 'Seasonal',
    price: 280,
    stock: 10,
    description: 'Tart with fresh seasonal fruits, available in Colombo',
    image: 'data:image/jpeg;base64,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',
    status: 'active',
    rating: 4.7,
    sales: 60,
  }
];

export default function ColomboProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  // Load products from localStorage or use initialProducts
  useEffect(() => {
    const storedProducts = localStorage.getItem('colomboProducts');
    if (storedProducts) {
      const parsed = JSON.parse(storedProducts);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProducts(parsed);
      } else {
        setProducts(initialProducts.map(p => ({ ...p, branch: 'Colombo' })));
      }
    } else {
      setProducts(initialProducts.map(p => ({ ...p, branch: 'Colombo' })));
    }
  }, []);

  // Save products to localStorage on change
  useEffect(() => {
    localStorage.setItem('colomboProducts', JSON.stringify(products));
  }, [products]);

  const colomboProducts = products.filter(p => p.branch === 'Colombo');

  const filteredProducts = colomboProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out-of-stock': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddProduct = () => {
    const productToAdd = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: parseInt(newProduct.stock) > 10 ? 'active' : parseInt(newProduct.stock) > 0 ? 'low-stock' : 'out-of-stock',
      rating: 0,
      sales: 0
    };
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      image: ''
    });
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: product.image
    });
    setIsAddModalOpen(true);
  };

  const handleUpdateProduct = () => {
    const updatedProduct = {
      ...editingProduct,
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: parseInt(newProduct.stock) > 10 ? 'active' : parseInt(newProduct.stock) > 0 ? 'low-stock' : 'out-of-stock'
    };
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      image: ''
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bakery-brown">Products</h1>
          <p className="text-muted-foreground">Manage your bakery's delicious offerings</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Update product information' : 'Create a new product for your bakery'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (LKR)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="e.g., 8.50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="e.g., 25"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    placeholder="Paste image URL or leave blank for default"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Product description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                  setNewProduct({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    description: '',
                    image: ''
                  });
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  className="bg-gradient-to-r from-orange-400"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Filters */}
      <Card className="bakery-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bakery-card group overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={product.image && product.image.trim() !== '' ? product.image : 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-2 right-2 text-xs ${getStatusColor(product.status)}`}>
                  {product.status.replace('-', ' ')}
                </Badge>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-2xl font-bold text-white">LKR {product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="p-4">
                <CardTitle className="text-lg font-semibold text-bakery-brown mb-2 truncate">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                <div className="flex items-center justify-between text-sm mt-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-muted-foreground">{product.sales} sold</div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit className="w-4 h-4" /> Edit
                  </Button>
                  <Button
     variant="destructive"
     size="sm"
     className="flex items-center gap-1"
     onClick={() => handleDeleteProduct(product.id)}
   >
     <Trash2 className="w-4 h-4" /> Delete
   </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <Card className="bakery-card">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🍞</div>
            <h3 className="text-lg font-semibold text-bakery-brown mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
