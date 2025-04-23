
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';
import { AuthDialog } from '@/components/auth/AuthDialog';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const cartItemsCount = getCartCount();

  // Fetch products for search suggestions
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return false;
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  }).slice(0, 5); // Limit to 5 suggestions

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleProductSelect = (productId: string) => {
    navigate(`/products/${productId}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      setAuthDialogOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.shop'), href: '/shop' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-effect py-2 shadow-sm' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-heading font-bold animate-fade-in"
        >
          NOVASHOP
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 animate-fade-in">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="hover-link text-sm font-medium py-2"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-4 animate-fade-in">
          {/* Search Toggle */}
          <LanguageSwitcher />
          <button 
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-secondary button-transition"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {/* Account Button/Dropdown */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-secondary button-transition" aria-label="Account">
                  <UserRound className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button 
              onClick={handleAccountClick} 
              className="p-2 rounded-full hover:bg-secondary button-transition"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
          )}
          
          {/* Cart Link */}
          <Link 
            to="/cart" 
            className="p-2 rounded-full hover:bg-secondary button-transition relative"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className={cn(
              "absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center rounded-full bg-accent text-white",
              cartItemsCount > 0 ? 'opacity-100' : 'opacity-0'
            )}>
              {cartItemsCount}
            </span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary button-transition"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <div 
        className={cn(
          'absolute top-full left-0 w-full bg-background py-4 px-4 shadow-md transition-all duration-300',
          searchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="container mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full py-3 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchQuery}
              onChange={handleSearchInput}
              autoComplete="off"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Search Suggestions */}
            {searchQuery && (
              <div className="absolute w-full bg-background mt-1 rounded-md shadow-lg z-10 border">
                <Command>
                  <CommandList>
                    {filteredProducts.length === 0 ? (
                      <CommandEmpty>No products found.</CommandEmpty>
                    ) : (
                      <CommandGroup heading="Products">
                        {filteredProducts.map((product) => (
                          <CommandItem
                            key={product.id}
                            onSelect={() => handleProductSelect(product.id.toString())}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-3 py-1">
                              <div className="h-10 w-10 overflow-hidden rounded border">
                                <img 
                                  src={product.image} 
                                  alt={product.title} 
                                  className="h-full w-full object-contain"
                                />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm">{product.title}</p>
                                <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'fixed inset-0 bg-background pt-20 z-40 md:hidden transition-all duration-300 ease-in-out',
        mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      )}>
        <nav className="container flex flex-col space-y-6 p-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-lg font-medium py-2 border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </header>
  );
};

export default Header;
