
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        
        {isAuthenticated ? (
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={18} />
                  Profile
                </CardTitle>
                <CardDescription>
                  Manage your account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Email</span>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  {user?.name && (
                    <div>
                      <span className="text-sm text-muted-foreground">Name</span>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  )}
                  {user?.provider && (
                    <div>
                      <span className="text-sm text-muted-foreground">Sign-in method</span>
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
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  View your order history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You haven't placed any orders yet.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/shop')}>
                  Start Shopping
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>
                  Products you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your wishlist is empty.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/shop')}>
                  Explore Products
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={24} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Sign in to your account</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view your account details, orders, and more.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Home
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Account;
