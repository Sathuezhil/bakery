import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Search, Star, Edit, Trash2 } from 'lucide-react';

const categories = ['Bread', 'Cakes', 'Pastries', 'Cookies', 'Seasonal'];

export default function ProductsPage() {
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
    image: '',
    rating: 0
  });

  // Fetch products from backend on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Filter only Colombo branch products
  const filteredProducts = products.filter(product => {
    const matchesBranch = Array.isArray(product.branches) && product.branches.some(b => b && b.toLowerCase() === "colombo")
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesBranch && matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out-of-stock': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddProduct = async () => {
    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: parseInt(newProduct.stock) > 10 ? 'active' : parseInt(newProduct.stock) > 0 ? 'low-stock' : 'out-of-stock',
      rating: newProduct.rating ? parseFloat(newProduct.rating) : 0, // <-- Use the value from the form
      sales: 0,
      branches: ["jaffna", "colombo"] 
    };
  try {
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToAdd)
    });
    if (!response.ok) throw new Error('Failed to add product');
    const savedProduct = await response.json();
    setProducts([...products, ...savedProduct.added]);
    alert('Product added successfully!');
  } catch (error) {
    alert('Error adding product: ' + error.message);
  }
  setNewProduct({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    rating: ''
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
      image: product.image,
      rating: product.rating
    });
    setIsAddModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    const updatedProduct = {
      ...editingProduct,
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: parseInt(newProduct.stock) > 10 ? 'active' : parseInt(newProduct.stock) > 0 ? 'low-stock' : 'out-of-stock',
      branch: "Colombo"
    };
    try {
      const response = await fetch(`http://localhost:5000/api/products/${editingProduct._id || editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
      if (!response.ok) throw new Error('Failed to update product');
      const productsRes = await fetch('http://localhost:5000/api/products');
      const allProducts = await productsRes.json();
      setProducts(allProducts);
      alert('Product updated successfully!');
    } catch (error) {
      alert('Error updating product: ' + error.message);
    }
    setEditingProduct(null);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      image: '',
      rating: 0
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete product');
      const productsRes = await fetch('http://localhost:5000/api/products');
      const allProducts = await productsRes.json();
      setProducts(allProducts);
      alert('Product deleted successfully!');
    } catch (error) {
      alert('Error deleting product: ' + error.message);
    }
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
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[375px] max-h-[90vh] overflow-y-auto">
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
                <Label htmlFor="status">Status</Label>
                <Select value={newProduct.status} onValueChange={value => setNewProduct({ ...newProduct, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={newProduct.rating}
                  onChange={e => setNewProduct({ ...newProduct, rating: e.target.value })}
                  placeholder="e.g., 4.5"
                />
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
                    image: '',
                    rating: 0
                  });
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  className="bg-gradient-to-r from-orange-400 to-amber-500"
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
      {/* Product List */}
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
                  {(product.status || '').replace('-', ' ')}
                </Badge>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-2xl font-bold text-white">
                    LKR {product.price ? Number(product.price).toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <CardTitle className="text-lg font-semibold text-bakery-brown mb-2 truncate">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                <div className="flex items-center justify-between text-sm mt-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">{product.rating ? Number(product.rating).toFixed(1) : 'N/A'}</span>
                  </div>
                  <div className="text-muted-foreground">{product.sales !== undefined ? product.sales : 0} sold</div>
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
    </div>
  );
}