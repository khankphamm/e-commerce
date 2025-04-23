import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">{t('account.title')}</h1>
        
        {isAuthenticated ? (
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={18} />
                  {t('account.profile')}
                </CardTitle>
                <CardDescription>
                  {t('account.profileDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">{t('account.email')}</span>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  {user?.name && (
                    <div>
                      <span className="text-sm text-muted-foreground">{t('account.name')}</span>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  )}
                  {user?.provider && (
                    <div>
                      <span className="text-sm text-muted-foreground">{t('account.signInMethod')}</span>
                      <p className="font-medium capitalize">{user.provider}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2" 
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  {t('account.signOut')}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('account.orders')}</CardTitle>
                <CardDescription>
                  {t('account.ordersDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('account.noOrders')}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/shop')}>
                  {t('account.startShopping')}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('account.wishlist')}</CardTitle>
                <CardDescription>
                  {t('account.wishlistDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('account.emptyWishlist')}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/shop')}>
                  {t('account.exploreProducts')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={24} />
            </div>
            <h2 className="text-xl font-semibold mb-2">{t('account.signInRequired')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('account.signInMessage')}
            </p>
            <Button onClick={() => navigate('/')}>
              {t('account.returnHome')}
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Account;
