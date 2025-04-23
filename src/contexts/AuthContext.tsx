import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './CartContext';

interface User {
  email: string;
  name?: string;
  provider?: string;
  cart?: CartItem[];
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  showAuthDialog: () => void;
  saveUserCart: (cartItems: CartItem[]) => void;
  getUserCart: () => CartItem[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Simulate a database of users
const saveUserToDatabase = (user: User) => {
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '{}');
  allUsers[user.email] = user;
  localStorage.setItem('all_users', JSON.stringify(allUsers));
};

const getUserFromDatabase = (email: string): User | null => {
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '{}');
  return allUsers[email] || null;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for saved user on mount
  // useEffect(() => {
  //   const savedUser = localStorage.getItem('user');
  //   if (savedUser) {
  //     try {
  //       const parsedUser = JSON.parse(savedUser);
  //       // Fetch the latest user data from our "database"
  //       const latestUserData = getUserFromDatabase(parsedUser.email);
  //       if (latestUserData) {
  //         setUser(latestUserData);
  //       } else {
  //         setUser(parsedUser);
  //         // Also save to "database" if not already there
  //         saveUserToDatabase(parsedUser);
  //       }
  //     } catch (error) {
  //       console.error('Failed to parse saved user:', error);
  //       localStorage.removeItem('user');
  //     }
  //   }
  // }, []);

  const login = (userData: User) => {
    // Check if user exists in "database"
    const existingUser = getUserFromDatabase(userData.email);
    
    const updatedUser = existingUser || userData;
    
    // Update local state
    setUser(updatedUser);
    
    // Save to localStorage for session persistence
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Save/update user in our "database"
    saveUserToDatabase(updatedUser);
    
    toast({
      title: existingUser ? "Welcome back!" : "Account created",
      description: existingUser ? `Logged in as ${userData.email}` : `Account created with ${userData.email}`,
    });
  };

  const logout = () => {
    // Save current cart to user's data before logout
    if (user) {
      const currentCart = localStorage.getItem('cart');
      if (currentCart) {
        // Update user in "database" with current cart
        saveUserCart(JSON.parse(currentCart));
      }
      
      // Clear current cart
      localStorage.removeItem('cart');
    }
    
    setUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Navigate to home page
    navigate('/');
  };

  const saveUserCart = (cartItems: CartItem[]) => {
    if (!user) return;
    
    // Update user in our state
    const updatedUser = { ...user, cart: cartItems };
    setUser(updatedUser);
    
    // Update user in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update user in "database"
    saveUserToDatabase(updatedUser);
    
    console.log(`Saved cart with ${cartItems.length} items to user ${user.email}`);
  };

  const getUserCart = (): CartItem[] => {
    if (!user) return [];
    
    // Get latest user data from "database"
    const latestUser = getUserFromDatabase(user.email);
    return latestUser?.cart || [];
  };

  const showAuthDialog = () => {
    setAuthDialogOpen(true);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      showAuthDialog, 
      saveUserCart, 
      getUserCart 
    }}>
      {children}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </AuthContext.Provider>
  );
};
