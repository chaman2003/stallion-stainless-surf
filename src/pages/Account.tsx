import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  general?: string;
}

const Account = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    if (!token || !userJson) {
      navigate('/login');
      return;
    }

    try {
      // Load user data from localStorage
      const user = JSON.parse(userJson);
      
      // Get the complete user data from users array
      const usersJson = localStorage.getItem('users');
      if (usersJson) {
        const users = JSON.parse(usersJson);
        const fullUserData = users.find((u: UserData) => u.id === user.id);
        
        if (fullUserData) {
          setUserData({
            id: fullUserData.id,
            name: fullUserData.name,
            email: fullUserData.email,
            phone: fullUserData.phone || '',
            address: fullUserData.address || ''
          });
        } else {
          setUserData({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: '',
            address: ''
          });
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user data',
        variant: 'destructive',
      });
      
      // Redirect to login if data is invalid
      navigate('/login');
    }
  }, [navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate email format
      if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
        setErrors({ email: 'Please enter a valid email address' });
        setLoading(false);
        return;
      }
      
      // Get all users from localStorage
      const usersJson = localStorage.getItem('users');
      if (usersJson) {
        const users = JSON.parse(usersJson);
        
        // Update the current user's information
        const updatedUsers = users.map((user: UserData) => {
          if (user.id === userData.id) {
            return {
              ...user,
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              address: userData.address
            };
          }
          return user;
        });
        
        // Save updated users back to localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Update current user in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: userData.id,
          name: userData.name,
          email: userData.email
        }));
        
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      
      setErrors({ 
        general: 'Something went wrong. Please try again later.' 
      });
      
      toast({
        title: 'Update Failed',
        description: 'An error occurred while updating your profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-serif">My Account</CardTitle>
              <CardDescription>Manage your profile and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm mb-4">
                    {errors.general}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    type="text"
                    value={userData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={userData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    type="text"
                    value={userData.address}
                    onChange={handleChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                
                <div className="space-y-4">
                  <Button type="submit" className="w-full bg-[hsl(var(--theme))]" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      navigate('/login');
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account; 