import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, ArrowLeft, X, Plus, Minus, ChevronRight, Mail } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { user, isAuthenticated, showAuthDialog } = useAuth();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  
  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = cartItems.length > 0 ? 15.00 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  // Handle checkout with email notification
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      showAuthDialog();
      return;
    }
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some products first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsEmailSending(true);
    
    try {
      // Simulate sending email notification
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a detailed order summary
      const orderSummary = cartItems.map(item => 
        `${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');
      
      toast({
        title: "Order Confirmation",
        description: (
          <div className="space-y-2">
            <p><strong>Order Details:</strong></p>
            <p className="whitespace-pre-line">{orderSummary}</p>
            <p><strong>Customer:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        ),
        duration: 5000, // Show for 5 seconds
      });
      
      console.log("Email notification sent to:", user?.email);
      console.log("Order details:", {
        items: cartItems,
        total: total,
        shipping: shipping,
        tax: tax
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Notification Failed",
        description: "Could not send order confirmation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEmailSending(false);
    }
  };
  
  // Handle empty cart
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCart className="h-24 w-24 text-muted-foreground mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
              </p>
              <Button asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Shopping Cart</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">Shopping Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-medium">Product</span>
                <div className="flex space-x-12 md:space-x-24">
                  <span className="font-medium hidden md:block">Quantity</span>
                  <span className="font-medium">Total</span>
                </div>
              </div>
              
              <div className="space-y-6 my-6">
                {cartItems.map((item) => (
                  <CartItem 
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeFromCart}
                  />
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  asChild
                  className="gap-2"
                >
                  <Link to="/shop">
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-background border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (7%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Promo Code</h3>
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-grow"
                    />
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <Button 
                  className="w-full flex items-center justify-center gap-2" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isEmailSending}
                >
                  {isEmailSending ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Proceed to Checkout
                    </>
                  )}
                </Button>
                
                {/* Payment Icons */}
                <div className="mt-6 flex justify-center gap-2">
                  <span className="text-sm text-muted-foreground">We accept:</span>
                  <div className="flex gap-2">
                    {['visa', 'mastercard', 'paypal', 'apple'].map((method) => (
                      <div key={method} className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

// Cart Item Component
interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
    color?: string;
    size?: string;
  };
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartItem = ({ item, updateQuantity, removeItem }: CartItemProps) => {
  return (
    <div className="flex items-start md:items-center border-b pb-6">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              <span>{item.category}</span>
              {item.size && (
                <>
                  <span className="mx-2">•</span>
                  <span>Size: {item.size}</span>
                </>
              )}
            </div>
            <div className="text-sm font-semibold md:hidden mt-1">
              ${item.price.toFixed(2)}
            </div>
          </div>
          
          <button
            onClick={() => removeItem(item.id)}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Remove item"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="hidden md:flex items-center ml-8">
        <span className="hidden md:block text-muted-foreground mr-6">
          ${item.price.toFixed(2)}
        </span>
        
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 text-muted-foreground hover:text-foreground"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="px-4 py-1 font-medium text-center w-10">
            {item.quantity}
          </span>
          
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 text-muted-foreground hover:text-foreground"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <span className="ml-20 font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
      
      {/* Mobile Quantity Controls */}
      <div className="md:hidden flex flex-col items-end mt-4 w-full">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 text-muted-foreground hover:text-foreground"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="px-4 py-1 font-medium text-center w-10">
            {item.quantity}
          </span>
          
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 text-muted-foreground hover:text-foreground"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <span className="font-semibold mt-2">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Cart;
