import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationRequest {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerName,
      customerEmail,
      orderNumber,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
    }: OrderConfirmationRequest = await req.json();

    console.log("Sending order confirmation to:", customerEmail);

    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${item.productName}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${item.size}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f1eb;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <div style="background-color: #000000; padding: 30px; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 28px;">ALSAYED PERFUMES</h1>
            <p style="color: #D4AF37; margin: 5px 0 0; font-size: 14px;">عطورات السيد</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #000; margin: 0 0 10px; font-size: 24px;">Order Confirmed</h2>
            <p style="color: #D4AF37; margin: 0 0 20px; font-size: 18px;">تم تأكيد طلبك بنجاح</p>
            
            <p style="color: #666; line-height: 1.6;">
              Dear ${customerName},<br><br>
              Thank you for your order! We have received your order and will begin processing it shortly.
            </p>
            
            <div style="background-color: #f5f1eb; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="color: #666; margin: 0 0 5px; font-size: 12px;">Order Number</p>
              <p style="color: #D4AF37; margin: 0; font-size: 24px; font-weight: bold;">${orderNumber}</p>
            </div>
            
            <h3 style="color: #000; margin: 30px 0 15px; font-size: 18px;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f5f1eb;">
                  <th style="padding: 12px; text-align: left; font-weight: 600;">Product</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600;">Size</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600;">Qty</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #D4AF37;">
              <table style="width: 100%;">
                <tr>
                  <td style="color: #666; padding: 5px 0;">Subtotal:</td>
                  <td style="color: #000; text-align: right; padding: 5px 0;">$${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="color: #666; padding: 5px 0;">Shipping:</td>
                  <td style="color: #000; text-align: right; padding: 5px 0;">${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</td>
                </tr>
                <tr>
                  <td style="color: #000; font-size: 20px; font-weight: bold; padding: 10px 0;">Total:</td>
                  <td style="color: #D4AF37; font-size: 20px; font-weight: bold; text-align: right; padding: 10px 0;">$${total.toFixed(2)}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f5f1eb;">
              <h4 style="margin: 0 0 10px; color: #000;">Shipping Address</h4>
              <p style="margin: 0; color: #666; line-height: 1.6;">${shippingAddress}</p>
              <p style="margin: 10px 0 0; color: #666;"><strong>Payment:</strong> ${paymentMethod}</p>
            </div>
          </div>
          
          <div style="background-color: #000000; padding: 20px; text-align: center;">
            <p style="color: #D4AF37; margin: 0; font-size: 12px;">Thank you for choosing ALSAYED PERFUMES</p>
            <p style="color: #666; margin: 10px 0 0; font-size: 11px;">شكراً لاختيارك عطورات السيد</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ALSAYED PERFUMES <onboarding@resend.dev>",
        to: [customerEmail],
        subject: `Order Confirmed - ${orderNumber} | تأكيد الطلب`,
        html,
      }),
    });

    const data = await res.json();
    console.log("Email response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
