import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCart();

  const lowestPrice = product.sizes.length > 0 ? Math.min(...product.sizes.map((s) => s.price)) : 0;
  const defaultSize = product.sizes[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultSize) return;
    addItem(product.id, defaultSize.size, defaultSize.price);
    openCart();
  };

  const categoryLabel = {
    men: "Men's",
    women: "Women's",
    unisex: 'Unisex',
  }[product.category];

  return (
    <div
      className="group animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={product.nameEn}
            className={cn(
              'w-full h-full object-cover transition-all duration-700',
              isHovered && 'scale-105'
            )}
          />

          {/* Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-black/30 transition-opacity duration-500',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gold text-primary text-[10px] px-3 py-1 tracking-widest uppercase font-medium">
              {categoryLabel}
            </span>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-primary text-primary-foreground text-[10px] px-3 py-1 tracking-widest uppercase font-medium">
                Featured
              </span>
            </div>
          )}

          {/* Quick Actions */}
          {defaultSize && (
            <div
              className={cn(
                'absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-500',
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <button
                onClick={handleQuickAdd}
                className="flex-1 bg-background/95 backdrop-blur-sm text-foreground py-3 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 hover:bg-gold hover:text-primary transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <Link
                to={`/product/${product.slug}`}
                className="bg-background/95 backdrop-blur-sm text-foreground p-3 hover:bg-gold hover:text-primary transition-all duration-300"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="text-center space-y-2">
          <p className="font-arabic text-sm text-gold">{product.nameAr}</p>
          <h3 className="font-display text-lg tracking-wide group-hover:text-gold transition-colors duration-300">
            {product.nameEn}
          </h3>
          <p className="text-sm text-muted-foreground">
            {lowestPrice > 0 ? `From ${formatPrice(lowestPrice)}` : 'Price on request'}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
