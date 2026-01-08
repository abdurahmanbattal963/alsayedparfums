import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const CartDrawer = () => {
  const { state, closeCart, removeItem, updateQuantity, getCartTotal, getItemDetails } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300',
          state.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl transition-transform duration-500 ease-out',
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-display text-lg tracking-wide">Your Cart</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="font-display text-lg mb-2">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Discover our exquisite collection of luxury fragrances
                </p>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="btn-gold text-xs"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <ul className="space-y-6">
                {state.items.map((item) => {
                  const product = getItemDetails(item.productId);
                  if (!product) return null;

                  return (
                    <li
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4 pb-6 border-b border-border last:border-0"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.nameEn}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm hover:text-gold transition-colors line-clamp-1"
                        >
                          {product.nameEn}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          Size: {item.size}
                        </p>
                        <p className="text-sm font-medium text-gold mt-1">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.quantity - 1)
                              }
                              className="p-2 hover:bg-muted transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-4 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.quantity + 1)
                              }
                              className="p-2 hover:bg-muted transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.productId, item.size)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg">{formatPrice(getCartTotal())}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Shipping calculated at checkout
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-gold w-full text-center block text-xs"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/cart"
                onClick={closeCart}
                className="btn-outline-gold w-full text-center block text-xs"
              >
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
