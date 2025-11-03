import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  email: string;
  orderNumber: string;
  customerName: string;
  orderTotal: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, orderNumber, customerName, orderTotal, items }: OrderConfirmationRequest = await req.json();

    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Shop <onboarding@resend.dev>',
        to: [email],
        subject: `Order Confirmation - ${orderNumber}`,
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Order Confirmed!</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi ${customerName},</p>
              
              <p style="font-size: 16px; margin-bottom: 30px;">
                Thank you for your order! We've received your order and will process it shortly.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 20px;">Order Details</h2>
                <p style="margin: 10px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
                <p style="margin: 10px 0;"><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 20px;">Order Items</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #f5f5f5;">
                      <th style="padding: 10px; text-align: left;">Item</th>
                      <th style="padding: 10px; text-align: center;">Qty</th>
                      <th style="padding: 10px; text-align: right;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" style="padding: 15px 8px 8px; text-align: right; font-weight: bold; font-size: 18px;">Total:</td>
                      <td style="padding: 15px 8px 8px; text-align: right; font-weight: bold; font-size: 18px; color: #667eea;">$${orderTotal.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                <p style="margin: 0; color: #856404;">
                  <strong>📦 What's Next?</strong><br>
                  We'll send you another email with tracking information once your order ships.
                </p>
              </div>
              
              <p style="color: #666; font-size: 14px; margin-top: 30px; text-align: center;">
                If you have any questions, please contact our support team.<br>
                Thank you for shopping with us!
              </p>
            </div>
          </body>
        </html>
      `,
      }),
    });

    const responseData = await emailResponse.json();
    console.log("Order confirmation email sent successfully:", responseData);

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
