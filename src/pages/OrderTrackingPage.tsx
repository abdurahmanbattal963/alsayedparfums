import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OrderItem {
  id: string;
  product_name: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  created_at: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_emirate: string;
  shipping_city: string | null;
}

const OrderTrackingPage = () => {
  const { t, isRTL } = useLanguage();
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const stages = [
    { key: 'pending', icon: Clock, label: t('tracking.stage.pending'), desc: t('tracking.stage.pending.desc') },
    { key: 'processing', icon: Package, label: t('tracking.stage.processing'), desc: t('tracking.stage.processing.desc') },
    { key: 'shipped', icon: Truck, label: t('tracking.stage.shipped'), desc: t('tracking.stage.shipped.desc') },
    { key: 'delivered', icon: CheckCircle, label: t('tracking.stage.delivered'), desc: t('tracking.stage.delivered.desc') },
  ];

  const getStatusIndex = (status: string) => {
    const index = stages.findIndex(s => s.key === status);
    return index >= 0 ? index : 0;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setSearched(true);
    setNotFound(false);

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber.trim().toUpperCase())
      .maybeSingle();

    if (orderError || !orderData) {
      setOrder(null);
      setOrderItems([]);
      setNotFound(true);
      setLoading(false);
      return;
    }

    setOrder(orderData);

    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderData.id);

    setOrderItems(items || []);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const currentStatusIndex = order ? getStatusIndex(order.status) : -1;

  return (
    <main className="min-h-screen pt-24 lg:pt-32 pb-20 bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24 mb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
            {t('tracking.label')}
          </span>
          <h1 className="text-4xl lg:text-6xl font-display font-semibold mb-4">
            {t('tracking.title')}
          </h1>
          <p className="font-arabic text-xl text-gold">{t('tracking.subtitle')}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className={cn(
                "absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground",
                isRTL ? "right-4" : "left-4"
              )} />
              <Input
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder={t('tracking.search')}
                className={cn("h-12", isRTL ? "pr-12" : "pl-12")}
              />
            </div>
            <Button type="submit" className="btn-gold h-12 px-8" disabled={loading}>
              {loading ? '...' : t('tracking.searchBtn')}
            </Button>
          </div>
        </form>

        {/* Results */}
        {!searched && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">{t('tracking.noOrder')}</p>
          </div>
        )}

        {searched && notFound && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-destructive/50 mx-auto mb-4" />
            <h3 className="font-display text-xl mb-2">{t('tracking.notFound')}</h3>
            <p className="text-muted-foreground">{t('tracking.notFoundDesc')}</p>
          </div>
        )}

        {order && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Order Summary */}
            <div className="bg-card border border-border p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('tracking.orderNumber')}</p>
                  <p className="font-medium">{order.order_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('tracking.orderDate')}</p>
                  <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('tracking.status')}</p>
                  <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getStatusBadge(order.status))}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('tracking.total')}</p>
                  <p className="font-medium text-gold">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Shipping Stages */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-display text-lg mb-6">{t('tracking.stages')}</h3>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-border">
                  <div 
                    className="h-full bg-gold transition-all duration-500"
                    style={{ width: `${(currentStatusIndex / (stages.length - 1)) * 100}%` }}
                  />
                </div>

                <div className="relative grid grid-cols-4 gap-4">
                  {stages.map((stage, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    
                    return (
                      <div key={stage.key} className="text-center">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 border-2 transition-all",
                          isCompleted 
                            ? "bg-gold border-gold text-primary" 
                            : "bg-background border-border text-muted-foreground",
                          isCurrent && "ring-4 ring-gold/20"
                        )}>
                          <stage.icon className="w-5 h-5" />
                        </div>
                        <p className={cn(
                          "font-medium text-sm mb-1",
                          isCompleted ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {stage.label}
                        </p>
                        <p className="text-xs text-muted-foreground hidden md:block">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-display text-lg mb-4">{t('tracking.items')}</h3>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-muted-foreground">{item.size} × {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-display text-lg mb-4">{t('tracking.shippingInfo')}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium">{order.shipping_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium">{order.shipping_phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium">{order.shipping_address}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.shipping_city && `${order.shipping_city}, `}
                      {order.shipping_emirate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderTrackingPage;
