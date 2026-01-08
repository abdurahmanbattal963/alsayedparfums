import { supabase } from '@/integrations/supabase/client';

interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

interface CreateOrderParams {
  userId?: string;
  orderNumber: string;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  shippingEmirate: string;
  shippingCity?: string;
  notes?: string;
  items: OrderItem[];
}

export const createOrder = async (params: CreateOrderParams) => {
  const { items, ...orderData } = params;

  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.userId || null,
      order_number: orderData.orderNumber,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
      payment_method: orderData.paymentMethod,
      shipping_name: orderData.shippingName,
      shipping_phone: orderData.shippingPhone,
      shipping_email: orderData.shippingEmail,
      shipping_address: orderData.shippingAddress,
      shipping_emirate: orderData.shippingEmirate,
      shipping_city: orderData.shippingCity || null,
      notes: orderData.notes || null,
    })
    .select()
    .single();

  if (orderError) {
    throw orderError;
  }

  // Insert order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    throw itemsError;
  }

  return order;
};

export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const generateOrderNumber = () => {
  return `ALS-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase()}`;
};
