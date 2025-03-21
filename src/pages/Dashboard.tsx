import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Import kept for future API implementation - currently using localStorage
import api from '@/services/api';

interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  sofaType?: string;
  image: string;
  dimensions?: string;
  material?: string;
  color?: string;
}

interface ChatResponse {
  _id?: string;
  id?: string;
  question: string;
  answer: string;
}

const categories = [
  { value: 'living-room', label: 'Living Room' },
  { value: 'dining-room', label: 'Dining Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'office', label: 'Office' },
  { value: 'outdoor', label: 'Outdoor' }
];

const subcategories: Record<string, Array<{value: string, label: string}>> = {
  'living-room': [
    { value: 'sofas', label: 'Sofas' },
    { value: 'chairs', label: 'Chairs' },
    { value: 'tables', label: 'Tables' },
    { value: 'storage', label: 'Storage' }
  ],
  'dining-room': [
    { value: 'tables', label: 'Tables' },
    { value: 'chairs', label: 'Chairs' },
    { value: 'sideboards', label: 'Sideboards' }
  ],
  'bedroom': [
    { value: 'beds', label: 'Beds' },
    { value: 'wardrobes', label: 'Wardrobes' },
    { value: 'dressers', label: 'Dressers' }
  ],
  'office': [
    { value: 'desks', label: 'Desks' },
    { value: 'chairs', label: 'Chairs' },
    { value: 'storage', label: 'Storage' }
  ],
  'outdoor': [
    { value: 'seating', label: 'Seating' },
    { value: 'tables', label: 'Tables' },
    { value: 'loungers', label: 'Loungers' }
  ]
};

// Sofa types for the third level of categorization
const sofaTypes = [
  { value: 'sectional', label: 'Sectional Sofas' },
  { value: 'loveseat', label: 'Loveseats' },
  { value: 'sleeper', label: 'Sleeper Sofas' },
  { value: 'recliner', label: 'Recliner Sofas' },
  { value: 'chaise', label: 'Chaise Lounges' },
  { value: 'futon', label: 'Futons' }
];

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [chatResponses, setChatResponses] = useState<ChatResponse[]>([]);
  const [activeTab, setActiveTab] = useState('products');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentResponse, setCurrentResponse] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedSofaType, setSelectedSofaType] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [activeSofaType, setActiveSofaType] = useState<string>('');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }

    // Load data using the API
    fetchData();
  }, [navigate]);

  // Filter products when category or subcategory changes
  useEffect(() => {
    let filtered = [...products];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
      
      if (activeSubcategory) {
        filtered = filtered.filter(product => product.subcategory === activeSubcategory);
        
        if (activeSubcategory === 'sofas' && activeSofaType) {
          filtered = filtered.filter(product => product.sofaType === activeSofaType);
        }
      }
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, activeSubcategory, activeSofaType, products]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch products
      const productsRes = await api.get('/products');
      setProducts(productsRes.data);
      setFilteredProducts(productsRes.data);

      // Fetch chat responses
      const responsesRes = await api.get('/chat-responses');
      setChatResponses(responsesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data from server',
        variant: 'destructive',
      });
      
      // Fallback to localStorage if API fails
      const storedProducts = localStorage.getItem('furnitureProducts');
      const storedResponses = localStorage.getItem('chatResponses');
      
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
        setFilteredProducts(parsedProducts);
      }
      
      if (storedResponses) {
        setChatResponses(JSON.parse(storedResponses));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (currentProduct) {
      if (name === 'category' && value !== currentProduct.category) {
        setSelectedCategory(value);
        setSelectedSubcategory('');
        setSelectedSofaType('');
        setCurrentProduct({
          ...currentProduct,
          [name]: value,
          subcategory: '',
          sofaType: ''
        });
      } else if (name === 'subcategory' && value !== currentProduct.subcategory) {
        setSelectedSubcategory(value);
        setSelectedSofaType('');
        setCurrentProduct({
          ...currentProduct,
          [name]: value,
          sofaType: ''
        });
      } else {
        setCurrentProduct({
          ...currentProduct,
          [name]: name === 'price' ? (value ? parseFloat(value) : 0) : value
        });
      }
    }
  };

  const handleCategoryChange = (value: string) => {
    if (currentProduct) {
      setSelectedCategory(value);
      setSelectedSubcategory('');
      setSelectedSofaType('');
      setCurrentProduct({
        ...currentProduct,
        category: value,
        subcategory: '',
        sofaType: ''
      });
    }
  };

  const handleSubcategoryChange = (value: string) => {
    if (currentProduct) {
      setSelectedSubcategory(value);
      setSelectedSofaType('');
      setCurrentProduct({
        ...currentProduct,
        subcategory: value,
        sofaType: value === 'sofas' ? currentProduct.sofaType : ''
      });
    }
  };

  const handleSofaTypeChange = (value: string) => {
    if (currentProduct) {
      setSelectedSofaType(value);
      setCurrentProduct({
        ...currentProduct,
        sofaType: value
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        
        if (currentProduct) {
          setCurrentProduct({
            ...currentProduct,
            image: result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentResponse) {
      setCurrentResponse({
        ...currentResponse,
        [name]: value
      });
    }
  };

  const handleProductSave = async () => {
    if (!currentProduct) return;
    
    // Validate required fields
    if (!currentProduct.name || !currentProduct.category || !currentProduct.price) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate sofa type if subcategory is sofas
    if (currentProduct.subcategory === 'sofas' && !currentProduct.sofaType) {
      toast({
        title: 'Validation Error',
        description: 'Please select a sofa type',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    try {
      let savedProduct;
      const productData = { ...currentProduct };
      
      // Remove client-side ID if using MongoDB _id
      if (productData.id && !productData._id) {
        delete productData.id;
      }
      
      if (currentProduct._id) {
        // Update existing product
        const response = await api.put(`/products/${currentProduct._id}`, productData);
        savedProduct = response.data;
        
        // Update local state
        setProducts(products.map(product => 
          product._id === savedProduct._id ? savedProduct : product
        ));
        
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        // Create new product
        const response = await api.post('/products', productData);
        savedProduct = response.data;
        
        // Update local state
        setProducts([...products, savedProduct]);
        
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
      }
      
      // Save to localStorage as backup
      localStorage.setItem('furnitureProducts', JSON.stringify([...products.filter(p => p._id !== savedProduct._id), savedProduct]));
      
      setCurrentProduct(null);
      setPreviewUrl('');
      setImageFile(null);
      setSelectedCategory('');
      setSelectedSubcategory('');
      setSelectedSofaType('');
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: 'Error',
        description: 'Failed to save product to server',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResponseSave = async () => {
    if (!currentResponse) return;
    
    // Validate required fields
    if (!currentResponse.question || !currentResponse.answer) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in both question and answer fields',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    try {
      let savedResponse;
      const responseData = { ...currentResponse };
      
      // Remove client-side ID if using MongoDB _id
      if (responseData.id && !responseData._id) {
        delete responseData.id;
      }
      
      if (currentResponse._id) {
        // Update existing response
        const response = await api.put(`/chat-responses/${currentResponse._id}`, responseData);
        savedResponse = response.data;
        
        // Update local state
        setChatResponses(chatResponses.map(cr => 
          cr._id === savedResponse._id ? savedResponse : cr
        ));
        
        toast({
          title: 'Success',
          description: 'Chat response updated successfully',
        });
      } else {
        // Create new response
        const response = await api.post('/chat-responses', responseData);
        savedResponse = response.data;
        
        // Update local state
        setChatResponses([...chatResponses, savedResponse]);
        
        toast({
          title: 'Success',
          description: 'Chat response created successfully',
        });
      }
      
      // Save to localStorage as backup
      localStorage.setItem('chatResponses', JSON.stringify([...chatResponses.filter(r => r._id !== savedResponse._id), savedResponse]));
      
      setCurrentResponse(null);
    } catch (error) {
      console.error('Error saving response:', error);
      toast({
        title: 'Error',
        description: 'Failed to save chat response to server',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setSelectedCategory(product.category);
    setSelectedSubcategory(product.subcategory || '');
    setSelectedSofaType(product.sofaType || '');
    setPreviewUrl(product.image || '');
  };

  const handleEditResponse = (response: ChatResponse) => {
    setCurrentResponse(response);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    try {
      await api.delete(`/products/${id}`);
      
      // Update local state
      setProducts(products.filter(product => product._id !== id));
      
      // Update localStorage backup
      localStorage.setItem('furnitureProducts', JSON.stringify(products.filter(product => product._id !== id)));
      
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product from server',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResponse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chat response?')) return;
    
    setLoading(true);
    try {
      await api.delete(`/chat-responses/${id}`);
      
      // Update local state
      setChatResponses(chatResponses.filter(response => response._id !== id));
      
      // Update localStorage backup
      localStorage.setItem('chatResponses', JSON.stringify(chatResponses.filter(response => response._id !== id)));
      
      toast({
        title: 'Success',
        description: 'Chat response deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting response:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete chat response',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory('');
    setActiveSofaType('');
  };

  const handleSelectSubcategory = (subcategory: string) => {
    setActiveSubcategory(subcategory);
    setActiveSofaType('');
  };

  const handleSelectSofaType = (type: string) => {
    setActiveSofaType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen pt-16 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        <Tabs defaultValue="products" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="products">Manage Products</TabsTrigger>
            <TabsTrigger value="responses">Chat Responses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            {/* Category Navigation */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                <Button 
                  variant={activeCategory === 'all' ? 'default' : 'outline'} 
                  onClick={() => handleSelectCategory('all')}
                >
                  All Products
                </Button>
                {categories.map(category => (
                  <Button
                    key={category.value}
                    variant={activeCategory === category.value ? 'default' : 'outline'}
                    onClick={() => handleSelectCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Subcategory Navigation - Only show if a category is selected */}
            {activeCategory !== 'all' && (
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  <Button 
                    variant={activeSubcategory === '' ? 'default' : 'outline'} 
                    onClick={() => handleSelectSubcategory('')}
                  >
                    All {categories.find(c => c.value === activeCategory)?.label} Items
                  </Button>
                  {subcategories[activeCategory]?.map(subcategory => (
                    <Button
                      key={subcategory.value}
                      variant={activeSubcategory === subcategory.value ? 'default' : 'outline'}
                      onClick={() => handleSelectSubcategory(subcategory.value)}
                    >
                      {subcategory.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sofa Types Navigation - Only show if sofas subcategory is selected */}
            {activeCategory === 'living-room' && activeSubcategory === 'sofas' && (
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  <Button 
                    variant={activeSofaType === '' ? 'default' : 'outline'} 
                    onClick={() => handleSelectSofaType('')}
                  >
                    All Sofas
                  </Button>
                  {sofaTypes.map(type => (
                    <Button
                      key={type.value}
                      variant={activeSofaType === type.value ? 'default' : 'outline'}
                      onClick={() => handleSelectSofaType(type.value)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>
                      {activeCategory === 'all' ? 'All Products' : 
                       activeSubcategory === '' ? categories.find(c => c.value === activeCategory)?.label + ' Products' :
                       activeSubcategory === 'sofas' && activeSofaType === '' ? 'All Sofas' :
                       activeSubcategory === 'sofas' && activeSofaType ? sofaTypes.find(t => t.value === activeSofaType)?.label :
                       subcategories[activeCategory]?.find(s => s.value === activeSubcategory)?.label}
                    </CardTitle>
                    <CardDescription>Manage your furniture products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button onClick={() => setCurrentProduct({
                        name: '',
                        description: '',
                        price: 0,
                        category: activeCategory !== 'all' ? activeCategory : '',
                        subcategory: activeSubcategory || '',
                        sofaType: activeSofaType || '',
                        image: '',
                        dimensions: '',
                        material: '',
                        color: ''
                      })}>
                        Add New Product
                      </Button>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Image</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredProducts.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center">No products found</TableCell>
                              </TableRow>
                            ) : (
                              filteredProducts.map(product => (
                                <TableRow key={product._id || product.id}>
                                  <TableCell>
                                    {product.image ? (
                                      <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-16 h-16 object-cover rounded-md"
                                      />
                                    ) : (
                                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                        No image
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell>{product.name}</TableCell>
                                  <TableCell>
                                    {product.category}
                                    {product.subcategory && ` > ${product.subcategory}`}
                                    {product.sofaType && ` > ${product.sofaType}`}
                                  </TableCell>
                                  <TableCell>${product.price.toFixed(2)}</TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                        Edit
                                      </Button>
                                      <Button 
                                        variant="destructive" 
                                        size="sm" 
                                        onClick={() => handleDeleteProduct(product._id || product.id || '')}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {currentProduct && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>{currentProduct._id ? 'Edit Product' : 'Add Product'}</CardTitle>
                    <CardDescription>Fill in the product details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={currentProduct.name}
                          onChange={handleProductChange}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select 
                            value={selectedCategory} 
                            onValueChange={handleCategoryChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {selectedCategory && (
                          <div className="space-y-2">
                            <Label htmlFor="subcategory">Subcategory</Label>
                            <Select 
                              value={selectedSubcategory} 
                              onValueChange={handleSubcategoryChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                              <SelectContent>
                                {subcategories[selectedCategory as keyof typeof subcategories]?.map(subcategory => (
                                  <SelectItem key={subcategory.value} value={subcategory.value}>
                                    {subcategory.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                      
                      {/* Show sofa type dropdown if sofas is selected */}
                      {selectedCategory === 'living-room' && selectedSubcategory === 'sofas' && (
                        <div className="space-y-2">
                          <Label htmlFor="sofaType">Sofa Type *</Label>
                          <Select 
                            value={selectedSofaType} 
                            onValueChange={handleSofaTypeChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select sofa type" />
                            </SelectTrigger>
                            <SelectContent>
                              {sofaTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($) *</Label>
                        <Input 
                          id="price"
                          name="price"
                          type="number"
                          value={currentProduct.price}
                          onChange={handleProductChange}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea 
                          id="description"
                          name="description"
                          value={currentProduct.description}
                          onChange={handleProductChange}
                          rows={4}
                          placeholder="Enter product description"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dimensions">Dimensions</Label>
                          <Input 
                            id="dimensions"
                            name="dimensions"
                            value={currentProduct.dimensions || ''}
                            onChange={handleProductChange}
                            placeholder="e.g., 80 x 35 x 45 cm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="material">Material</Label>
                          <Input 
                            id="material"
                            name="material"
                            value={currentProduct.material || ''}
                            onChange={handleProductChange}
                            placeholder="e.g., Oak, Leather"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="color">Color</Label>
                          <Input 
                            id="color"
                            name="color"
                            value={currentProduct.color || ''}
                            onChange={handleProductChange}
                            placeholder="e.g., Natural, Black"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="image">Product Image</Label>
                        <Input 
                          id="image"
                          name="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mb-2"
                        />
                        
                        {previewUrl && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="max-h-40 rounded-md border border-gray-200"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-4 flex space-x-2">
                        <Button onClick={handleProductSave} disabled={loading}>
                          {loading ? 'Saving...' : 'Save Product'}
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setCurrentProduct(null);
                          setPreviewUrl('');
                          setImageFile(null);
                          setSelectedCategory('');
                          setSelectedSubcategory('');
                          setSelectedSofaType('');
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="responses">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Chat Responses</CardTitle>
                    <CardDescription>Manage predefined chat responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button onClick={() => setCurrentResponse({
                        question: '',
                        answer: ''
                      })}>
                        Add New Response
                      </Button>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Question</TableHead>
                              <TableHead>Answer (Preview)</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {chatResponses.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={3} className="text-center">No responses found</TableCell>
                              </TableRow>
                            ) : (
                              chatResponses.map(response => (
                                <TableRow key={response._id || response.id}>
                                  <TableCell>{response.question}</TableCell>
                                  <TableCell>{response.answer.length > 50 ? `${response.answer.substring(0, 50)}...` : response.answer}</TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      <Button variant="outline" size="sm" onClick={() => handleEditResponse(response)}>
                                        Edit
                                      </Button>
                                      <Button 
                                        variant="destructive" 
                                        size="sm" 
                                        onClick={() => handleDeleteResponse(response._id || response.id || '')}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {currentResponse && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>{currentResponse._id ? 'Edit Response' : 'Add Response'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="question">Question *</Label>
                        <Input 
                          id="question"
                          name="question"
                          value={currentResponse.question}
                          onChange={handleResponseChange}
                          placeholder="Enter a common customer question"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="answer">Answer *</Label>
                        <Textarea 
                          id="answer"
                          name="answer"
                          value={currentResponse.answer}
                          onChange={handleResponseChange}
                          rows={6}
                          placeholder="Enter the response to this question"
                          required
                        />
                      </div>
                      
                      <div className="pt-4 flex space-x-2">
                        <Button onClick={handleResponseSave} disabled={loading}>
                          {loading ? 'Saving...' : 'Save Response'}
                        </Button>
                        <Button variant="outline" onClick={() => setCurrentResponse(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard; 