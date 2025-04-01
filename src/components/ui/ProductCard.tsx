
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  discount?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  isNew = false,
  discount,
  className,
  style,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated, showAuthDialog } = useAuth();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  const formattedOldPrice = oldPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(oldPrice)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      showAuthDialog();
      return;
    }
    
    addToCart({
      id,
      name,
      price,
      image,
      category,
      quantity: 1,
    });
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-white transition-all duration-300 animate-scale',
        'hover:shadow-lg',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded">
              NEW
            </span>
          )}
          {discount && (
            <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={cn(
            'absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 transition-all duration-300 hover:bg-white',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Product Image */}
        <Link to={`/products/${id}`}>
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain p-4 transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Quick Add Button */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 flex justify-center p-3 bg-white/90 transition-all duration-300',
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          )}
        >
          <button
            className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-colors hover:bg-primary/90"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-medium text-base truncate">
          <Link
            to={`/products/${id}`}
            className="hover:text-accent transition-colors"
          >
            {name}
          </Link>
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{category}</p>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-accent">{formattedPrice}</span>
          {formattedOldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formattedOldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
