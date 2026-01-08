import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Check, CreditCard, Banknote, Truck, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { createOrder, generateOrderNumber } from '@/lib/orders';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { countries } from '@/data/countries';

type PaymentMethod = 'cod' | 'bank';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state, getCartTotal, getItemDetails, clearCart } = useCart();
  const { user } = useAuth();

  const defaultCountry = countries[0]; // Syria is first in the list
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: defaultCountry.code,
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderNumber = generateOrderNumber();
      
      const orderItems = state.items.map(item => {
        const product = getItemDetails(item.productId);
        return {
          productId: item.productId,
          productName: product?.nameEn || 'Unknown Product',
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        };
      });

      const selectedCountry = countries.find(c => c.code === formData.country);
      
      await createOrder({
        userId: user?.id,
        orderNumber,
        subtotal,
        shipping,
        total,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer',
        shippingName: `${formData.firstName} ${formData.lastName}`,
        shippingPhone: formData.phone,
        shippingEmail: formData.email,
        shippingAddress: formData.address,
        shippingEmirate: selectedCountry?.nameEn || formData.country,
        shippingCity: formData.city,
        notes: formData.notes,
        items: orderItems,
      });

      // Send order confirmation email
      try {
        const shippingAddress = `${formData.address}, ${formData.city}, ${selectedCountry?.nameEn || formData.country}`;
        await supabase.functions.invoke('send-order-confirmation', {
          body: {
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerEmail: formData.email,
            orderNumber,
            items: orderItems.map(item => ({
              productName: item.productName,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            })),
            subtotal,
            shipping,
            total,
            shippingAddress,
            paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer',
          },
        });
        console.log('Order confirmation email sent');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the order if email fails
      }

      setOrderId(orderNumber);
      setOrderComplete(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 300 ? 0 : 25;
  const total = subtotal + shipping;

  if (state.items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-display font-semibold mb-4">Order Confirmed</h1>
            <p className="font-arabic text-xl text-gold mb-6">تم تأكيد طلبك بنجاح</p>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. We have received your order and will begin processing it shortly.
            </p>

            <div className="bg-card border border-border p-6 mb-8 text-left">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="font-display text-2xl text-gold mb-4">{orderId}</p>
              <p className="text-sm text-muted-foreground">
                A confirmation email will be sent to {formData.email}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop" className="btn-gold">
                Continue Shopping
              </Link>
              <Link to="/" className="btn-outline-gold">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const selectedCountry = countries.find(c => c.code === formData.country);

  return (
    <main className="min-h-screen pt-24 lg:pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Back Link */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Return to Cart
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-semibold mb-2">Checkout</h1>
          <p className="font-arabic text-lg text-gold">إتمام الطلب</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-card border border-border p-6">
                <h2 className="font-display text-xl mb-6">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+971"
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-card border border-border p-6">
                <h2 className="font-display text-xl mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Building name, street, area"
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Special delivery instructions..."
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border p-6">
                <h2 className="font-display text-xl mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 border transition-all',
                      paymentMethod === 'cod'
                        ? 'border-gold bg-gold/5'
                        : 'border-border hover:border-gold/50'
                    )}
                  >
                    <Banknote className="w-6 h-6 text-gold" />
                    <div className="text-left flex-1">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when you receive your order
                      </p>
                    </div>
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                        paymentMethod === 'cod' ? 'border-gold' : 'border-muted-foreground'
                      )}
                    >
                      {paymentMethod === 'cod' && (
                        <div className="w-3 h-3 rounded-full bg-gold" />
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 border transition-all',
                      paymentMethod === 'bank'
                        ? 'border-gold bg-gold/5'
                        : 'border-border hover:border-gold/50'
                    )}
                  >
                    <CreditCard className="w-6 h-6 text-gold" />
                    <div className="text-left flex-1">
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">
                        Transfer to our bank account
                      </p>
                    </div>
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                        paymentMethod === 'bank' ? 'border-gold' : 'border-muted-foreground'
                      )}
                    >
                      {paymentMethod === 'bank' && (
                        <div className="w-3 h-3 rounded-full bg-gold" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border p-6 sticky top-32">
                <h2 className="font-display text-xl mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 border-b border-border pb-6 mb-6">
                  {state.items.map((item) => {
                    const product = getItemDetails(item.productId);
                    if (!product) return null;

                    return (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex gap-4"
                      >
                        <div className="w-16 h-20 bg-muted overflow-hidden flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.nameEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.nameEn}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.size} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-b border-border pb-6 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-display mb-6">
                  <span>Total</span>
                  <span className="text-gold">{formatPrice(total)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-gold w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-gold" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4 text-gold" />
                    <span>Free shipping over $300</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
