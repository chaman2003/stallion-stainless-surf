import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{id?: string; password?: string; general?: string}>({});
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors: {id?: string; password?: string} = {};

    // ID validation
    if (!formData.id) {
      newErrors.id = 'Admin ID is required';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Check if ID and password match the expected admin credentials
      if (formData.id === "admin" && formData.password === "scs") {
        // Save admin token to localStorage
        localStorage.setItem('adminToken', 'admin-token-mock');
        localStorage.setItem('admin', JSON.stringify({ 
          id: 'admin',
          name: 'Administrator'
        }));
        
        toast({
          title: 'Admin Login Successful',
          description: 'Welcome to the admin dashboard',
        });
        
        // Navigate to admin dashboard
        navigate('/admin/dashboard');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      setErrors({ 
        general: 'Invalid admin credentials. Please try again.' 
      });
      
      toast({
        title: 'Login Failed',
        description: 'Invalid admin credentials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-serif">Admin Login</CardTitle>
              <CardDescription>Enter admin credentials to access the dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm mb-4">
                    {errors.general}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="id">Admin ID</Label>
                  <Input 
                    id="id"
                    name="id"
                    type="text"
                    placeholder="admin"
                    value={formData.id}
                    onChange={handleChange}
                    className={errors.id ? "border-red-500" : ""}
                  />
                  {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                
                <Button type="submit" className="w-full bg-[hsl(var(--theme))]" disabled={loading}>
                  {loading ? 'Logging in...' : 'Admin Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 