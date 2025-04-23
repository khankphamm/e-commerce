import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

// Define the structure of a cart item
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  color?: string;
  size?: string;
}

// Define the cart context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, saveUserCart, getUserCart } = useAuth();
  const { toast } = useToast(); // Correctly initialize toast at component level
  
  // Initialize cart from user's saved cart or empty array
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // If user is authenticated, get their cart from "database"
    if (user) {
      const userCart = getUserCart();
      if (userCart && userCart.length > 0) {
        return userCart;
      }
    }
    
    // Otherwise, check if there's a cart in localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage and user's data whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cartItems));
    
  //   // If user is authenticated, save cart to their data in "database"
  //   if (isAuthenticated) {
  //     saveUserCart(cartItems);
  //   }
  // }, [cartItems, isAuthenticated, saveUserCart]);

  // Load user's cart when user changes
  // useEffect(() => {
  //   if (user) {
  //     const userCart = getUserCart();
  //     if (userCart) {
  //       setCartItems(userCart);
  //       console.log('User cart loaded:', userCart);
  //     }
  //   } else {
  //     setCartItems([]);
  //     console.log('User logged out, cart cleared');
  //   }
  // }, [user, getUserCart]);

  // Add or update item in cart
  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        
        toast({
          title: "Product updated",
          description: `${newItem.name} quantity updated in your cart`,
        });
        
        return updatedItems;
      } else {
        // Add new item to cart
        toast({
          title: "Product added",
          description: `${newItem.name} added to your cart`,
        });
        
        return [...prevItems, newItem];
      }
    });
  };

  // Update quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Product removed",
          description: `${itemToRemove.name} removed from your cart`,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  // Calculate total price of all items in cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total number of items in cart
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Value object to be provided by the context
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
