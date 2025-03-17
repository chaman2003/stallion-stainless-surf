import { useState, useEffect } from 'react';
import { Menu, Search, User, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Determine scroll direction and visibility
      setVisible(
        (prevScrollPos > currentScrollPos) || // Scrolling up
        currentScrollPos < 10 // At top
      );
      setPrevScrollPos(currentScrollPos);

      // Handle background opacity
      if (currentScrollPos > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const navItems = [
    { title: 'HERITAGE', items: [
      { name: 'History', path: '/history' },
      { name: 'Vision', path: '/vision' },
      { name: 'Craftsmanship', path: '/craftsmanship' }
    ]},
    { title: 'ARTISANS', items: [
      { name: 'Our Artisans', path: '/artisans' },
      { name: 'Process', path: '/process' },
      { name: 'Materials', path: '/materials' }
    ]},
    { title: 'PRODUCTS', items: [
      { 
        name: 'Living Room', 
        path: '/category/living-room',
        submenu: [
          { name: 'Sofas', path: '/category/living-room/sofas', 
            submenu: [
              { name: 'Straight Sofas', path: '/category/living-room/sofas/straight' },
              { name: 'Corner Sofas', path: '/category/living-room/sofas/corner' },
              { name: 'Curved Sofas', path: '/category/living-room/sofas/curved' },
              { name: 'U-Shaped Sofas', path: '/category/living-room/sofas/u-shaped' },
              { name: 'Recliner Sofas', path: '/category/living-room/sofas/recliner' },
              { name: 'Sofa Cum Bed', path: '/category/living-room/sofas/sofa-cum-bed' }
            ]
          },
          { name: 'Pouffe', path: '/category/living-room/pouffe' },
          { name: 'Coffee Table', path: '/category/living-room/coffee-table' },
          { name: 'Console Table', path: '/category/living-room/console-table' },
          { name: 'Corner Table', path: '/category/living-room/corner-table' }
        ]
      },
      { name: 'Dining Room', path: '/category/dining-room' },
      { name: 'Bedroom', path: '/category/bedroom' }
    ]},
    { title: 'CONTACT US', items: [
      { name: 'Showrooms', path: '/showrooms' },
      { name: 'Dealers', path: '/dealers' },
      { name: 'Contact', path: '/contact' }
    ]}
  ];

  // Function to render submenu for desktop
  const renderSubmenu = (submenuItems, parentPath, level = 0) => {
    if (!submenuItems) return null;
    
    return (
      <div className={`absolute ${level === 0 ? 'left-full -mt-2' : 'left-full -mt-2'} top-0 w-56`}>
        <div className="bg-white shadow-xl rounded-md py-2 border border-gray-100">
          {submenuItems.map((subItem) => (
            <div key={subItem.name} className="relative group/submenu">
              <Link
                to={subItem.path}
                className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[hsl(var(--theme))] transition-all duration-300 flex items-center justify-between space-x-2 group"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--theme))] transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">{subItem.name}</span>
                </div>
                {subItem.submenu && <ChevronDown className="h-4 w-4 rotate-[-90deg]" />}
              </Link>
              {subItem.submenu && (
                <div className="hidden group-hover/submenu:block">
                  {renderSubmenu(subItem.submenu, subItem.path, level + 1)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to render submenu items for mobile
  const renderMobileSubmenu = (items, level = 0) => {
    if (!items) return null;
    return items.map((item, subIndex) => (
      <div key={item.name} className="ml-4">
        <Link
          to={item.path}
          className="block py-2 text-gray-600 hover:text-[hsl(var(--theme))] transition-all duration-300 flex items-center space-x-2 group"
          onClick={() => setIsOpen(false)}
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
            transition: `all 500ms ${(level * 100) + (subIndex * 50)}ms`
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--theme))] transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          <span className="transform group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
        </Link>
        {item.submenu && (
          <div className="ml-4 mt-2">
            {renderMobileSubmenu(item.submenu, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {/* Main Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out transform ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm border-b'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left side icons */}
            <div className="flex items-center space-x-2">
              <Link to="/account">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-100 hover:scale-110 transition-transform duration-200"
                >
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-gray-100 hover:scale-110 transition-transform duration-200"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
            
            {/* Logo */}
            <Link 
              to="/" 
              className="absolute left-1/2 transform -translate-x-1/2 hover:scale-105 transition-transform duration-300"
            >
              <span 
                className={`text-[30px] tracking-[-0.5px] font-[600] transition-all duration-500 relative group text-[hsl(var(--theme))] ${
                  scrolled ? 'scale-90' : 'scale-100'
                }`}
                style={{ fontFamily: "'Young Serif', serif" }}
              >
                STALLION
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[hsl(var(--theme))] transform -translate-x-1/2 transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>

            {/* Mobile menu button */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full hover:bg-gray-100 hover:scale-110 transition-transform duration-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="relative w-6 h-6">
                  <span 
                    className={`absolute left-0 block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${
                      isOpen ? 'rotate-45 top-3' : 'top-2'
                    }`}
                  ></span>
                  <span 
                    className={`absolute left-0 block w-full h-0.5 bg-gray-700 top-3 transition-all duration-300 ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span 
                    className={`absolute left-0 block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${
                      isOpen ? '-rotate-45 top-3' : 'top-4'
                    }`}
                  ></span>
                </div>
              </Button>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:block border-t">
            <div className="flex justify-center space-x-12 py-4">
              {navItems.map((item, index) => (
                <div 
                  key={item.title} 
                  className="group relative"
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <button className="font-medium tracking-wide hover:text-[hsl(var(--theme))] transition-colors flex items-center space-x-1 py-2">
                    <span>{item.title}</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-300 ${
                        activeItem === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  <div 
                    className={`absolute left-0 mt-2 w-56 transition-all duration-300 ease-in-out transform ${
                      activeItem === index 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-4'
                    }`}
                  >
                    <div className="bg-white shadow-xl rounded-md py-2 border border-gray-100">
                      {item.items.map((subItem) => (
                        <div key={subItem.name} className="relative group/item">
                          <Link
                            to={subItem.path}
                            className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[hsl(var(--theme))] transition-all duration-300 flex items-center justify-between space-x-2 group"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--theme))] transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                              <span className="transform group-hover:translate-x-2 transition-transform duration-300">{subItem.name}</span>
                            </div>
                            {subItem.submenu && <ChevronDown className="h-4 w-4 rotate-[-90deg]" />}
                          </Link>
                          {subItem.submenu && (
                            <div className="hidden group-hover/item:block">
                              {renderSubmenu(subItem.submenu, subItem.path)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Panel */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 transform shadow-lg ${
          isSearchOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto p-4 relative">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--theme))] focus:border-transparent pl-10"
            autoFocus
          />
          <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <button 
            className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:rotate-90 transition-transform duration-300"
            onClick={() => setIsSearchOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 lg:hidden transition-transform duration-500 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-4 py-8">
            {navItems.map((item, index) => (
              <div 
                key={item.title} 
                className="mb-8"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
                  transition: `all 500ms ${index * 100}ms`
                }}
              >
                <h3 className="font-medium mb-3 text-lg border-b pb-2">{item.title}</h3>
                <div className="space-y-3 pl-2">
                  {item.items.map((subItem, subIndex) => (
                    <div key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className="block py-2 text-gray-600 hover:text-[hsl(var(--theme))] transition-all duration-300 flex items-center space-x-2 group"
                        onClick={() => !subItem.submenu && setIsOpen(false)}
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                          transition: `all 500ms ${(index * 100) + (subIndex * 50)}ms`
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--theme))] transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300">{subItem.name}</span>
                      </Link>
                      {subItem.submenu && (
                        <div className="ml-4 mt-2">
                          {renderMobileSubmenu(subItem.submenu)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
