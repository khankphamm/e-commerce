import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Send, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  // Thêm state để lưu giá trị email
  const [email, setEmail] = React.useState('');

  // Hàm xử lý khi submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:support@novashop.com?subject=Newsletter Subscription&body=I would like to subscribe with email: ${email}`;
    }
  };

  return (
    <footer className="bg-secondary pt-16 pb-8 border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6 animate-fade-in">
            <Link to="/" className="text-xl font-heading font-bold">
              NOVASHOP
            </Link>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            
            <div className="flex items-center border-b border-muted-foreground/30 pb-2">
              <form onSubmit={handleSubmit} className="w-full flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent w-full focus:outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit"
                  aria-label="Subscribe" 
                  className="ml-2 text-accent hover:text-accent/80 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" className="hover:text-accent transition-colors" aria-label="Facebook" target='_blank'>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.twitter.com/" className="hover:text-accent transition-colors" aria-label="Twitter" target='_blank'>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/" className="hover:text-accent transition-colors" aria-label="Instagram" target='_blank'>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3">
              {[
                { name: 'New Arrivals', path: '/shop' },
                { name: 'Best Sellers', path: '/shop' },
                { name: 'Trending', path: '/shop' },
                { name: 'Sale & Special Offers', path: '/shop' },
                { name: 'All Collections', path: '/shop' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Account Links */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Account</h3>
            <ul className="space-y-3">
              {[
                { name: 'My Account', path: '/account' },
                { name: 'Order History', path: '/cart' },
                
                { name: 'Returns', path: '/' },
                { name: 'Help & Support', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Hoang Mai, Hanoi
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +84 987 654 321
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                <a 
                  href="mailto:support@novashop.com" 
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  support@novashop.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-muted/50 mt-16 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NOVASHOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
