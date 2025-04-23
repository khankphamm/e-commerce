import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Send, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
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
              {t('footer.subscribeDesc')}
            </p>
            
            <div className="flex items-center border-b border-muted-foreground/30 pb-2">
              <input
                type="email"
                placeholder={t('footer.enterEmail')}
                className="bg-transparent w-full focus:outline-none text-sm"
              />
              <button aria-label="Subscribe" className="ml-2 text-accent hover:text-accent/80 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider">{t('nav.shop')}</h3>
            <ul className="space-y-3">
              {[
                { key: 'footer.newArrivals', href: '/shop' },
                { key: 'footer.bestSellers', href: '/shop' },
                { key: 'footer.trending', href: '/shop' },
                { key: 'footer.specialOffers', href: '/shop' },
                { key: 'footer.allCollections', href: '/shop' }
              ].map((item) => (
                <li key={item.key}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Account Links */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider">{t('nav.account')}</h3>
            <ul className="space-y-3">
              {[
                { key: 'footer.myAccount', href: '/account' },
                { key: 'footer.wishList', href: '/cart' },
                { key: 'footer.returns', href: '/' },
                { key: 'footer.support', href: '/contact' }
              ].map((item) => (
                <li key={item.key}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(item.key)}
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
