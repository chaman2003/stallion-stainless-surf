
import { useState } from 'react';
import { Menu, Search, User, X, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { title: 'LEGACY', items: [
      { name: 'History', path: '/history' },
      { name: 'Vision', path: '/vision' },
      { name: 'Craftsmanship', path: '/craftsmanship' }
    ]},
    { title: 'MAKERS', items: [
      { name: 'Our Artisans', path: '/artisans' },
      { name: 'Process', path: '/process' },
      { name: 'Materials', path: '/materials' }
    ]},
    { title: 'RETAIL', items: [
      { name: 'Showrooms', path: '/showrooms' },
      { name: 'Dealers', path: '/dealers' },
      { name: 'Contact', path: '/contact' }
    ]},
    { title: 'PRODUCTS', items: [
      { name: 'Living Room', path: '/category/living-room' },
      { name: 'Dining Room', path: '/category/dining-room' },
      { name: 'Bedroom', path: '/category/bedroom' }
    ]},
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <Link to="/" className="flex-1 flex justify-center">
            <span className="text-2xl font-serif tracking-wider hover:text-gold transition-colors">
              STALLION STAINLESS
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 bg-white p-4 border-b shadow-lg animate-fade-down">
            <div className="container mx-auto">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                autoFocus
              />
            </div>
          </div>
        )}

        <div className="hidden lg:flex justify-center space-x-12 py-4">
          {navItems.map((item) => (
            <div key={item.title} className="group relative">
              <button className="font-medium tracking-wide hover:text-gold transition-colors">
                {item.title}
              </button>
              <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="bg-white shadow-lg rounded-md py-2">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-gold transition-colors"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-50 animate-fade-up">
          <div className="container mx-auto px-4 py-8">
            {navItems.map((item) => (
              <div key={item.title} className="mb-6">
                <h3 className="font-medium mb-2">{item.title}</h3>
                <div className="space-y-2">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className="block py-2 text-gray-600 hover:text-gold transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
