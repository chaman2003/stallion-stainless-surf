import { useState, useEffect, useRef } from 'react';
import { Menu, Search, User, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Add click outside listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation data
  const navItems = [
    { title: 'HERITAGE', items: [
      { name: 'History', path: '/history' },
      { name: 'Artisans', path: '/artisans' }
    ]},
    { title: 'PROCESS', items: [
      { name: 'Process Craftsmanship', path: '/process' },
      { name: 'Materials', path: '/materials' },
      { name: 'Sustainability', path: '/sustainability' }
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
    { title: 'CONTACT US', path: '/contact' }
  ];

  // Handle mobile submenu rendering
  const renderMobileSubmenu = (items, level = 0) => {
    if (!items) return null;
    return items.map((item, subIndex) => (
      <div key={item.name} className="ml-4">
        <Link
          to={item.path}
          className="block py-2 text-gray-600 hover:text-[#001F3F] transition-all duration-300 flex items-center space-x-2 group relative"
          onClick={() => setIsOpen(false)}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
            transition: `all 500ms ${(level * 100) + (subIndex * 50)}ms`
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#001F3F] transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          <span className="transform group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
          <span className="absolute -bottom-1 left-7 w-0 h-[0.5px] bg-[#001F3F]/30 group-hover:w-[calc(100%-28px)] transition-all duration-300"></span>
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
        id="main-navigation"
        ref={navRef}
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="rounded-lg bg-white/30 p-2 backdrop-blur-sm">
                <div className="flex items-center">
                  <img 
                    src="https://stallionstainless.com/static/img/home/logo.png" 
                    alt="Stallion" 
                    className="h-14 md:h-16"
                  />
                  <span 
                    className="ml-2 text-[hsl(var(--theme))]"
                    style={{ 
                      fontFamily: '"Young Serif", serif',
                      fontSize: '30px',
                      fontWeight: 600,
                      letterSpacing: '-0.5px',
                      transitionProperty: 'all',
                      transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
                      transitionDuration: '0.5s',
                      animationDuration: '0.5s'
                    }}
                  >STALLION</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Completely new implementation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div 
                  key={item.title} 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setTimeout(() => {
                    if (activeSubmenu === null) {
                      setActiveDropdown(null);
                    }
                  }, 100)}
                >
                  {item.items ? (
                    <>
                      <button 
                        className={`font-medium tracking-wide transition-all duration-300 py-2 px-3 flex items-center ${
                          scrolled 
                            ? 'text-[#001F3F]' 
                            : isHomePage 
                              ? 'text-white' 
                              : 'text-[#001F3F]'
                        } ${activeDropdown === index ? 'bg-white/10 backdrop-blur-sm rounded-t-md border-b-2 border-white/40' : 'hover:bg-white/5 rounded-md'}`}
                      >
                        {item.title}
                      </button>
                      
                      {/* Primary dropdown */}
                      {activeDropdown === index && (
                        <div className="dropdown-container">
                          <div 
                            className="fixed inset-0 bg-transparent"
                            onClick={() => {
                              setActiveDropdown(null);
                              setActiveSubmenu(null);
                            }}
                          ></div>
                          
                          {/* Main dropdown content */}
                          <div 
                            className="absolute left-0 top-full min-w-[240px] mt-0 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                          >
                            <div className="bg-white shadow-lg rounded-b-md py-2 border border-gray-200/50">
                              {item.items.map((subItem, subIdx) => (
                                <div 
                                  key={subItem.name} 
                                  className="relative dropdown-item"
                                  onMouseEnter={() => {
                                    setActiveSubmenu(subIdx);
                                  }}
                                  onMouseLeave={() => {
                                    setTimeout(() => {
                                      // Only close if not moused over the submenu
                                      if (document.querySelector(`.submenu-${index}-${subIdx}:hover`) === null) {
                                        setActiveSubmenu(null);
                                      }
                                    }, 100);
                                  }}
                                >
                                  <Link
                                    to={subItem.path}
                                    className="flex items-center justify-between px-4 py-3 text-sm hover:bg-blue-50 text-[#001F3F] font-medium transition-all duration-200 group"
                                    onClick={() => {
                                      if (!subItem.submenu) {
                                        setActiveDropdown(null);
                                        setActiveSubmenu(null);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <span className="w-2 h-2 rounded-full bg-[#001F3F]/70 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                      <span className="transform group-hover:translate-x-1 transition-transform duration-200">{subItem.name}</span>
                                    </div>
                                    {subItem.submenu && (
                                      <ChevronRight className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                                    )}
                                  </Link>
                                  
                                  {/* Secondary dropdown */}
                                  {subItem.submenu && activeSubmenu === subIdx && (
                                    <div 
                                      className={`submenu-${index}-${subIdx} absolute top-0 left-full min-w-[240px] z-50 ml-1 animate-in fade-in slide-in-from-left-2 duration-200`}
                                      onMouseEnter={() => {
                                        setActiveSubmenu(subIdx);
                                      }}
                                      onMouseLeave={() => {
                                        setActiveSubmenu(null);
                                      }}
                                    >
                                      <div className="bg-white shadow-lg rounded-md py-2 border border-gray-200/50">
                                        {subItem.submenu.map((childItem, childIdx) => (
                                          <div key={childItem.name} className="relative">
                                            <Link
                                              to={childItem.path}
                                              className="flex items-center px-4 py-3 text-sm hover:bg-blue-50 text-[#001F3F] font-medium transition-all duration-200 group"
                                              onClick={() => {
                                                setActiveDropdown(null);
                                                setActiveSubmenu(null);
                                              }}
                                            >
                                              <div className="flex items-center space-x-2">
                                                <span className="w-2 h-2 rounded-full bg-[#001F3F]/70 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                <span className="transform group-hover:translate-x-1 transition-transform duration-200">{childItem.name}</span>
                                              </div>
                                            </Link>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`font-medium tracking-wide transition-all duration-300 py-2 px-2 rounded-md ${
                        scrolled 
                          ? 'text-[#001F3F] hover:bg-[#001F3F]/10' 
                          : isHomePage 
                            ? 'text-white hover:bg-white/20' 
                            : 'text-[#001F3F] hover:bg-[#001F3F]/10'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full hover:bg-white/20 ${
                  scrolled 
                    ? 'text-[#001F3F]' 
                    : isHomePage 
                      ? 'text-white' 
                      : 'text-[#001F3F]'
                }`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Link to="/account">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full hover:bg-white/20 ${
                    scrolled 
                      ? 'text-[#001F3F]' 
                      : isHomePage 
                        ? 'text-white' 
                        : 'text-[#001F3F]'
                  }`}
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden rounded-full hover:bg-white/20 ${
                  scrolled 
                    ? 'text-[#001F3F]' 
                    : isHomePage 
                      ? 'text-white' 
                      : 'text-[#001F3F]'
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Panel */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 transition-all duration-300 transform shadow-lg ${
          isSearchOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto p-6 pt-20 relative">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001F3F] focus:border-transparent pl-10"
            autoFocus
          />
          <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <button 
            className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#001F3F] hover:rotate-90 transition-transform duration-300"
            onClick={() => setIsSearchOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white/95 backdrop-blur-md z-50 lg:hidden transition-transform duration-500 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-4 py-8 mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#001F3F]">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#001F3F]"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
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
                {item.items ? (
                  <>
                    <h3 className="font-medium mb-3 text-lg border-b pb-2" 
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                    <div className="space-y-3 pl-2">
                      {item.items.map((subItem, subIndex) => (
                        <div key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className="block py-2 text-gray-600 hover:text-[#001F3F] transition-all duration-300 flex items-center space-x-2 group relative"
                            onClick={() => !subItem.submenu && setIsOpen(false)}
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              opacity: isOpen ? 1 : 0,
                              transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                              transition: `all 500ms ${(index * 100) + (subIndex * 50)}ms`
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#001F3F] transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                            <span className="transform group-hover:translate-x-2 transition-transform duration-300">{subItem.name}</span>
                            <span className="absolute -bottom-1 left-7 w-0 h-[0.5px] bg-[#001F3F]/30 group-hover:w-[calc(100%-28px)] transition-all duration-300"></span>
                          </Link>
                          {subItem.submenu && (
                            <div className="ml-4 mt-2">
                              {renderMobileSubmenu(subItem.submenu)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="block py-2 text-gray-700 hover:text-[#001F3F] transition-all duration-300 font-medium text-lg border-b pb-2 relative group"
                    onClick={() => setIsOpen(false)}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#001F3F] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-in {
            animation-duration: 0.2s;
            animation-timing-function: ease-out;
            animation-fill-mode: both;
          }

          .fade-in {
            animation-name: fadeIn;
          }

          .slide-in-from-top-2 {
            animation-name: slideInFromTop;
          }

          .slide-in-from-left-2 {
            animation-name: slideInFromLeft;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideInFromTop {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes slideInFromLeft {
            from { transform: translateX(-10px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          .dropdown-container {
            position: relative;
          }

          .dropdown-item:hover {
            background-color: #f0f9ff;
          }
        `}
      </style>
    </>
  );
};

export default Navigation;