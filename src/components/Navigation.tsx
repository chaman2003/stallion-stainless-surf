import { useState, useEffect, useRef } from 'react';
import { Menu, Search, User, X, ChevronRight, ChevronDown, LogOut, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Add user dropdown state
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  // New dropdown state management
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [openThirdLevel, setOpenThirdLevel] = useState<number | null>(null);
  
  // Refs for tracking navigation and dropdown elements
  const navRef = useRef<HTMLElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || '');
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [location]); // Re-check when location changes

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    // Redirect to home page
    window.location.href = '/';
  };

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
    setIsUserDropdownOpen(false);
    // Reset all dropdown states on navigation
    resetAllDropdowns();
  }, [location]);

  // Add click outside listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        resetAllDropdowns();
      }
      
      // Close user dropdown when clicking outside
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper function to reset all dropdown states
  const resetAllDropdowns = () => {
    setOpenDropdown(null);
    setOpenSubmenu(null);
    setOpenThirdLevel(null);
    
    // Clear any pending timeouts
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

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
          { name: 'Coffee Table', path: '/category/living-room/coffee-table',
            submenu: [
              { name: 'Round Table', path: '/category/living-room/coffee-table/round-table' },
              { name: 'Square Table', path: '/category/living-room/coffee-table/square-table' },
              { name: 'Rectanglular Table', path: '/category/living-room/coffee-table/rectanglular-table'},
              { name: 'Shaped Table', path: '/category/living-room/coffee-table/shaped-table'},
              { name: 'Nesting Table', path: '/category/living-room/coffee-table/nesting-table'},
            ]
           },
          { name: 'Console Table', path: '/category/living-room/console-table' },
          { name: 'Corner Table', path: '/category/living-room/corner-table' }
        ]
      },
      { name: 'Dining Room', path: '/category/dining-room' },
      { name: 'Bedroom', path: '/category/bedroom' }
    ]},
    { title: 'ABOUT US', path: '/about' },
    { title: 'CONTACT US', path: '/contact' }
  ];

  // Animation variants for dropdown menus
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
      transition: { duration: 0.15, ease: "easeOut" }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  };

  // Handle hover events for desktop dropdown
  const handleDropdownHover = (index: number | null) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    
    setOpenDropdown(index);
    
    // Reset submenu and third level when main dropdown changes
    if (openDropdown !== index) {
      setOpenSubmenu(null);
      setOpenThirdLevel(null);
    }
  };
  
  // Handle hover events for submenu
  const handleSubmenuHover = (index: number | null) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    
    setOpenSubmenu(index);
    
    // Reset third level when submenu changes
    if (openSubmenu !== index) {
      setOpenThirdLevel(null);
    }
  };
  
  // Handle hover events for third level menu
  const handleThirdLevelHover = (index: number | null) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    
    setOpenThirdLevel(index);
  };
  
  // Handle mouse leave with delay to prevent flickering
  const handleMenuLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      resetAllDropdowns();
    }, 150);
  };

  // Define interface for navigation items
  interface NavItem {
    title: string;
    path?: string;
    items?: SubItem[];
  }

  interface SubItem {
    name: string;
    path: string;
    submenu?: SubItem[];
  }

  // Render mobile submenu recursively
  const renderMobileSubmenu = (items: SubItem[], level = 0) => {
    if (!items) return null;
    return items.map((item, index) => (
      <div key={`${item.name}-${index}`} className={`ml-${level + 4}`}>
        <Link
          to={item.path}
          className="block py-2 text-gray-600 hover:text-[#001F3F] transition-all duration-300 flex items-center space-x-2 group relative"
          onClick={() => setIsOpen(false)}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
            transition: `all 500ms ${(level * 100) + (index * 50)}ms`
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#001F3F] transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          <span className="transform group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
          <span className="absolute -bottom-1 left-7 w-0 h-[0.5px] bg-[#001F3F]/30 group-hover:w-[calc(100%-28px)] transition-all duration-300"></span>
        </Link>
        {item.submenu && (
          <div className={`ml-${level + 4} mt-2`}>
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
          scrolled || !isHomePage 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <div className="rounded-lg bg-white/30 p-2 backdrop-blur-sm">
                <div className="flex items-center">
                  <img 
                    src="https://stallionstainless.com/static/img/home/logo.png" 
                    alt="Stallion" 
                    className="h-10 md:h-12"
                  />
                  <span 
                    className="ml-2 text-[hsl(var(--theme))]"
                    style={{ 
                      fontFamily: '"Young Serif", serif',
                      fontSize: '24px',
                      fontWeight: 600,
                      letterSpacing: '-0.5px'
                    }}
                  >STALLION</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - single line centered */}
            <div className="hidden lg:flex items-center justify-center flex-grow">
              <div className="flex items-center justify-center space-x-3">
                {navItems.map((item, index) => (
                  <div 
                    key={`nav-item-${index}`} 
                    className="relative"
                    onMouseEnter={() => handleDropdownHover(index)}
                    onMouseLeave={handleMenuLeave}
                  >
                    {item.path ? (
                      <Link 
                        to={item.path}
                        className={`font-medium tracking-wide transition-all duration-300 py-2 px-2 flex items-center ${
                          scrolled || !isHomePage 
                            ? 'text-[#001F3F]' 
                            : 'text-white'
                        } hover:bg-white/10 rounded-md`}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <div 
                        className={`font-medium tracking-wide transition-all duration-300 py-2 px-2 flex items-center cursor-pointer ${
                          scrolled || !isHomePage 
                            ? 'text-[#001F3F]' 
                            : 'text-white'
                        } ${openDropdown === index ? 'bg-white/10 backdrop-blur-sm rounded-t-md border-b-2 border-white/40' : 'hover:bg-white/5 rounded-md'}`}
                      >
                        {item.title}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </div>
                    )}
                    
                    {/* First level dropdown */}
                    <AnimatePresence>
                      {item.items && openDropdown === index && (
                        <motion.div 
                          className="absolute left-1/2 -translate-x-1/2 top-full min-w-[200px] mt-0 z-50"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                        >
                          <div className="bg-white shadow-lg rounded-b-md py-2 border border-gray-200/50">
                            {item.items.map((subItem, subIdx) => (
                              <div 
                                key={`dropdown-item-${subIdx}`} 
                                className={`relative ${
                                  subIdx !== item.items.length - 1 ? 'border-b border-gray-200' : ''
                                }`}
                                onMouseEnter={() => handleSubmenuHover(subIdx)}
                                onMouseLeave={handleMenuLeave}
                              >
                                {subItem.submenu ? (
                                  <div className="px-4 py-2 hover:bg-gray-50 text-gray-700 flex justify-between items-center cursor-pointer">
                                    <span>{subItem.name}</span>
                                    <ChevronRight className="h-4 w-4" />
                                  </div>
                                ) : (
                                  <Link 
                                    to={subItem.path}
                                    className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                                  >
                                    {subItem.name}
                                  </Link>
                                )}
                                
                                {/* Second level dropdown */}
                                <AnimatePresence>
                                  {subItem.submenu && openSubmenu === subIdx && (
                                    <motion.div 
                                      className="absolute left-full top-0 min-w-[200px] ml-0"
                                      initial="hidden"
                                      animate="visible"
                                      exit="exit"
                                      variants={dropdownVariants}
                                    >
                                      <div className="bg-white shadow-lg rounded-md py-2 border border-gray-200/50">
                                        {subItem.submenu.map((thirdItem, thirdIdx) => (
                                          <div 
                                            key={`submenu-item-${thirdIdx}`} 
                                            className={`relative ${
                                              thirdIdx !== subItem.submenu.length - 1 ? 'border-b border-gray-200' : ''
                                            }`}
                                            onMouseEnter={() => handleThirdLevelHover(thirdIdx)}
                                            onMouseLeave={handleMenuLeave}
                                          >
                                            {thirdItem.submenu ? (
                                              <div className="px-4 py-2 hover:bg-gray-50 text-gray-700 flex justify-between items-center">
                                                <span>{thirdItem.name}</span>
                                                <ChevronRight className="h-4 w-4" />
                                              </div>
                                            ) : (
                                              <Link 
                                                to={thirdItem.path}
                                                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                                              >
                                                {thirdItem.name}
                                              </Link>
                                            )}
                                            
                                            {/* Third level dropdown if needed */}
                                            <AnimatePresence>
                                              {thirdItem.submenu && openThirdLevel === thirdIdx && (
                                                <motion.div 
                                                  className="absolute left-full top-0 min-w-[200px] ml-0"
                                                  initial="hidden"
                                                  animate="visible"
                                                  exit="exit"
                                                  variants={dropdownVariants}
                                                >
                                                  <div className="bg-white shadow-lg rounded-md py-2 border border-gray-200/50">
                                                    {thirdItem.submenu.map((fourthItem, fourthIdx) => (
                                                      <div 
                                                        key={`third-level-${fourthIdx}`}
                                                        className={`${
                                                          fourthIdx !== thirdItem.submenu.length - 1 ? 'border-b border-gray-200' : ''
                                                        }`}
                                                      >
                                                        <Link 
                                                          to={fourthItem.path}
                                                          className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                                                        >
                                                          {fourthItem.name}
                                                        </Link>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </motion.div>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side navigation items */}
            <div className="flex items-center space-x-4 shrink-0">
              {/* Search icon */}
              <div 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`h-9 w-9 flex items-center justify-center rounded-full cursor-pointer transition-all ${
                  scrolled || !isHomePage || isSearchOpen
                    ? 'text-[#001F3F] hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </div>
              
              {/* User profile/account */}
              {isLoggedIn ? (
                <div className="relative" ref={userDropdownRef}>
                  <div 
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  >
                    <Avatar className="h-9 w-9 bg-gold">
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-50"
                      >
                        <Link 
                          to="/account" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link 
                          to="/orders" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className={`rounded-full px-4 ${
                      scrolled || !isHomePage 
                        ? 'text-[#001F3F] hover:bg-gray-100' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <User size={18} className="mr-2" />
                    Login
                  </Button>
                </Link>
              )}
              
              {/* Mobile menu toggle */}
              <div 
                className="lg:hidden h-9 w-9 flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu size={24} className={scrolled || !isHomePage ? 'text-[#001F3F]' : 'text-white'} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Search overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              className="absolute top-full left-0 w-full bg-white shadow-lg z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto py-4 px-4">
                <div className="relative">
          <input
                    type="text" 
                    placeholder="Search products, collections, and more..." 
                    className="w-full py-3 px-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
                  />
                  <Search className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Sofas', 'Dining Sets', 'Beds', 'Wardrobes', 'Coffee Tables'].map((term) => (
                      <Link 
                        key={term}
                        to={`/search?q=${term.toLowerCase()}`}
                        className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-[#001F3F] hover:text-white transition-colors"
                      >
                        {term}
                      </Link>
                    ))}
                  </div>
        </div>
      </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white z-50 overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-serif">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-gray-100"
              >
                  <X size={24} />
              </Button>
            </div>
            
              <div className="p-4">
                {navItems.map((item, idx) => (
                  <div key={`mobile-nav-${idx}`} className="mb-6">
                    {item.path ? (
                      <Link 
                        to={item.path}
                        className="block text-lg font-medium text-[#001F3F] mb-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <h3 className="text-lg font-medium text-[#001F3F] mb-2">{item.title}</h3>
                    )}
                    
                    {item.items && (
                      <div className="mt-2">
                        {item.items.map((subItem, subIdx) => (
                          <div key={`mobile-subnav-${subIdx}`}>
                            {!subItem.submenu ? (
                          <Link
                            to={subItem.path}
                                className="block py-2 pl-4 text-gray-600 hover:text-[#001F3F] border-l-2 border-gray-200 hover:border-[#001F3F] transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            style={{
                              opacity: isOpen ? 1 : 0,
                              transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                                  transition: `all 500ms ${(subIdx * 50) + 100}ms`
                            }}
                          >
                                {subItem.name}
                          </Link>
                            ) : (
                              <>
                                <div className="block py-2 pl-4 text-gray-800 font-medium border-l-2 border-gray-300">
                                  {subItem.name}
                                </div>
                                {renderMobileSubmenu(subItem.submenu, 1)}
                              </>
                            )}
                          </div>
                        ))}
                            </div>
                          )}
                        </div>
                      ))}
                
                {/* Mobile authentication links */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10 bg-gold">
                          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{userName}</p>
                          <p className="text-sm text-gray-500">Member</p>
                        </div>
                      </div>
                      <Link 
                        to="/account" 
                        className="block py-2 text-[#001F3F] hover:underline"
                        onClick={() => setIsOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block py-2 text-[#001F3F] hover:underline"
                        onClick={() => setIsOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center py-2 text-red-600 hover:underline"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link 
                        to="/login" 
                        className="inline-flex justify-center items-center py-2 px-4 border border-[#001F3F] rounded-md text-[#001F3F] hover:bg-[#001F3F] hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <User size={18} className="mr-2" />
                        Login / Register
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Contact info in mobile menu */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-[#001F3F] mb-4">Contact Us</h3>
                  <p className="text-gray-600 mb-2">Have questions? Reach out to us!</p>
                  <Link
                    to="/contact" 
                    className="flex items-center text-gold hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;