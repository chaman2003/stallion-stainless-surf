
import { useState } from 'react';
import { Menu, Search, User, X } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'LEGACY', items: ['History', 'Vision', 'Craftsmanship'] },
    { title: 'MAKERS', items: ['Our Artisans', 'Process', 'Materials'] },
    { title: 'RETAIL', items: ['Showrooms', 'Dealers', 'Contact'] },
    { title: 'PRODUCTS', items: ['Living Room', 'Dining Room', 'Bedroom'] },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 flex justify-center">
            <a href="/" className="text-2xl font-serif tracking-wider">
              STALLION STAINLESS
            </a>
          </div>

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

        <div className="hidden lg:flex justify-center space-x-12 py-4">
          {navItems.map((item) => (
            <div key={item.title} className="group relative">
              <button className="font-medium tracking-wide hover:text-gold transition-colors">
                {item.title}
              </button>
              <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="bg-white shadow-lg rounded-md py-2">
                  {item.items.map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-gold transition-colors"
                    >
                      {subItem}
                    </a>
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
                    <a
                      key={subItem}
                      href="#"
                      className="block py-2 text-gray-600 hover:text-gold transition-colors"
                    >
                      {subItem}
                    </a>
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
