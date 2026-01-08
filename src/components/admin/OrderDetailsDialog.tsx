import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, CreditCard, FileText } from 'lucide-react';

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
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_emirate: string;
  shipping_city: string | null;
  payment_method: string;
  notes: string | null;
  created_at: string;
  order_items: OrderItem[];
}

interface OrderDetailsDialogProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsDialog = ({ order, onClose }: OrderDetailsDialogProps) => {
  if (!order) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'processing':
        return 'bg-blue-500/20 text-blue-500';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-500';
      case 'delivered':
        return 'bg-green-500/20 text-green-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order {order.order_number}</span>
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Date */}
          <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>

          <Separator />

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-lg">{order.shipping_name}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{order.shipping_email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{order.shipping_phone}</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  {order.shipping_address}
                  {order.shipping_city && `, ${order.shipping_city}`}, {order.shipping_emirate}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gold" />
            <span className="font-medium">Payment:</span>
            <span>{order.payment_method}</span>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gold mt-0.5" />
              <div>
                <span className="font-medium">Notes:</span>
                <p className="text-muted-foreground">{order.notes}</p>
              </div>
            </div>
          )}

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-muted/50 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl text-gold">
              {formatPrice(Number(order.total))}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
