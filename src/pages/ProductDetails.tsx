
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useCart();
  const { isAuthenticated, showAuthDialog } = useAuth();

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showAuthDialog();
      return;
    }
    
    if (product) {
      addToCart({
        id: product.id.toString(),
        name: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {isLoading ? (
          <div className="container mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[500px] w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="container mx-auto py-16 text-center">
            <p className="text-red-500">Failed to load product details. Please try again later.</p>
            <Link to="/shop" className="text-primary hover:underline mt-4 inline-block">
              Return to Shop
            </Link>
          </div>
        ) : product ? (
          <>
            {/* Breadcrumb */}
            <div className="bg-muted py-4">
              <div className="container mx-auto">
                <nav className="flex">
                  <ol className="flex items-center space-x-2">
                    <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
                    <li><span className="text-sm text-muted-foreground mx-2">/</span></li>
                    <li><Link to="/shop" className="text-sm hover:text-primary transition-colors">Shop</Link></li>
                    <li><span className="text-sm text-muted-foreground mx-2">/</span></li>
                    <li><span className="text-sm text-muted-foreground">{product.title}</span></li>
                  </ol>
                </nav>
              </div>
            </div>
            
            {/* Product Details */}
            <section className="py-16">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Product Image */}
                  <div className="bg-secondary/20 rounded-lg p-8 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="max-h-[400px] object-contain"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-6">
                    <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating?.rate || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        ({product.rating?.count || 0} reviews)
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="text-2xl font-bold text-accent">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(product.price)}
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground">{product.description}</p>
                    
                    <div className="pt-4 border-t border-border">
                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className="flex items-center border border-input rounded-md">
                          <button 
                            onClick={handleDecreaseQuantity}
                            className="px-3 py-1 text-lg border-r border-input"
                          >
                            -
                          </button>
                          <span className="px-4 py-1">{quantity}</span>
                          <button 
                            onClick={handleIncreaseQuantity}
                            className="px-3 py-1 text-lg border-l border-input"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Add to Cart */}
                      <div className="flex flex-wrap gap-4">
                        <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart}>
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11">
                          <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11">
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Category */}
                    <div className="pt-4 text-sm">
                      <span className="font-medium">Category: </span>
                      <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="text-primary hover:underline">
                        {product.category}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
