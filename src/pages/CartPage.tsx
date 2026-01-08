import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { state, removeItem, updateQuantity, getCartTotal, getItemDetails } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (state.items.length === 0) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground/30 mb-6" />
            <h1 className="text-3xl font-display mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Discover our exquisite collection of luxury fragrances and find your perfect scent.
            </p>
            <Link to="/shop" className="btn-gold inline-flex items-center gap-3">
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 300 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-semibold mb-2">Shopping Cart</h1>
          <p className="font-arabic text-lg text-gold">سلة التسوق</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => {
              const product = getItemDetails(item.productId);
              if (!product) return null;

              return (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-6 p-6 bg-card border border-border"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${product.slug}`}
                    className="w-28 h-36 bg-muted flex-shrink-0 overflow-hidden"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.nameEn}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <Link
                        to={`/product/${product.slug}`}
                        className="font-display text-lg hover:text-gold transition-colors"
                      >
                        {product.nameEn}
                      </Link>
                      <p className="font-arabic text-sm text-gold mt-1">{product.nameAr}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Size: {item.size}
                      </p>
                      <p className="text-lg font-display text-gold mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity - 1)
                          }
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity + 1)
                          }
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-6 sticky top-32">
              <h2 className="font-display text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 border-b border-border pb-6 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-gold">
                    ✓ Free shipping on orders over $300
                  </p>
                )}
              </div>

              <div className="flex justify-between text-lg font-display mb-6">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>

              <Link
                to="/checkout"
                className="btn-gold w-full text-center block mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="btn-outline-gold w-full text-center block text-xs"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout with encrypted payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
