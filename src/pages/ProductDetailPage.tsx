import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { getProductBySlug, getFeaturedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl font-display mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The fragrance you're looking for doesn't exist.
          </p>
          <Link to="/shop" className="btn-gold">
            Return to Shop
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = getFeaturedProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) return;
    setIsAddingToCart(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 500));

    addItem(product.id, selectedSize.size, selectedSize.price, quantity);
    setIsAddingToCart(false);
    openCart();
  };

  const categoryLabel = {
    men: "Men's Fragrance",
    women: "Women's Fragrance",
    unisex: 'Unisex Fragrance',
  }[product.category];

  const guarantees = [
    { icon: Truck, text: 'Free luxury delivery over $300' },
    { icon: Shield, text: '100% authentic guarantee' },
    { icon: RotateCcw, text: '14-day return policy' },
  ];

  return (
    <main className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.nameEn}</span>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted overflow-hidden group">
              <img
                src={product.images[activeImageIndex]}
                alt={product.nameEn}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setActiveImageIndex((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveImageIndex((prev) =>
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    'aspect-square bg-muted overflow-hidden border-2 transition-colors',
                    activeImageIndex === index ? 'border-gold' : 'border-transparent'
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.nameEn} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Category & Title */}
            <div>
              <span className="text-xs tracking-ultra-wide text-gold uppercase mb-3 block">
                {categoryLabel}
              </span>
              <p className="font-arabic text-xl text-gold mb-2">{product.nameAr}</p>
              <h1 className="text-4xl lg:text-5xl font-display font-semibold tracking-wide">
                {product.nameEn}
              </h1>
            </div>

            {/* Price */}
            <div>
              <p className="text-3xl font-display text-gold">
                {selectedSize ? formatPrice(selectedSize.price) : formatPrice(product.sizes[0].price)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Tax included</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Fragrance Notes */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-widest uppercase">
                Fragrance Profile
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Top Notes
                  </p>
                  <p className="text-sm font-medium">
                    {product.topNotes.join(', ')}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Heart Notes
                  </p>
                  <p className="text-sm font-medium">
                    {product.heartNotes.join(', ')}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Base Notes
                  </p>
                  <p className="text-sm font-medium">
                    {product.baseNotes.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-widest uppercase">
                Select Size
              </h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    disabled={size.stock === 0}
                    className={cn(
                      'px-6 py-3 border text-sm font-medium transition-all duration-300',
                      selectedSize?.size === size.size
                        ? 'border-gold bg-gold text-primary'
                        : 'border-border hover:border-gold',
                      size.stock === 0 && 'opacity-50 cursor-not-allowed line-through'
                    )}
                  >
                    {size.size}
                    <span className="block text-xs mt-1">
                      {formatPrice(size.price)}
                    </span>
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-xs text-muted-foreground">
                  {selectedSize.stock > 0
                    ? `${selectedSize.stock} in stock`
                    : 'Out of stock'}
                </p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-4 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      selectedSize ? Math.min(selectedSize.stock, q + 1) : q + 1
                    )
                  }
                  className="p-4 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || selectedSize.stock === 0 || isAddingToCart}
                className="flex-1 btn-gold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? (
                  <span className="animate-pulse">Adding...</span>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button className="p-4 border border-border hover:border-gold hover:text-gold transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {guarantees.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-semibold mb-2">
                You May Also Like
              </h2>
              <p className="font-arabic text-lg text-gold">عطور مقترحة لك</p>
              <div className="luxury-divider mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetailPage;
