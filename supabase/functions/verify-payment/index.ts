import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  orderId: string;
  paymentMethod: string;
  paymentDetails: {
    cardNumber?: string;
    cvv?: string;
    expiryDate?: string;
    cardholderName?: string;
    email?: string;
    password?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { orderId, paymentMethod, paymentDetails }: PaymentRequest = await req.json();

    console.log('Payment verification request:', { orderId, paymentMethod });

    // Verify order exists and is pending
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', orderError);
      return new Response(
        JSON.stringify({ success: false, error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (order.payment_status !== 'pending') {
      console.error('Order already processed:', order.payment_status);
      return new Response(
        JSON.stringify({ success: false, error: 'Order already processed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Payment validation logic
    let paymentValid = false;
    let errorMessage = '';

    if (paymentMethod === 'card') {
      // Validate card details
      const { cardNumber, cvv, expiryDate, cardholderName } = paymentDetails;
      
      if (!cardNumber || !cvv || !expiryDate || !cardholderName) {
        errorMessage = 'Missing card details';
      } else if (cardNumber.replace(/\s/g, '').length < 13) {
        errorMessage = 'Invalid card number';
      } else if (cvv.length !== 3) {
        errorMessage = 'Invalid CVV';
      } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        errorMessage = 'Invalid expiry date format';
      } else {
        // Check expiry date is in the future
        const [month, year] = expiryDate.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          errorMessage = 'Card has expired';
        } else {
          paymentValid = true;
        }
      }
    } else if (paymentMethod === 'paypal') {
      // Validate PayPal credentials
      const { email, password } = paymentDetails;
      
      if (!email || !password) {
        errorMessage = 'Missing PayPal credentials';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage = 'Invalid email format';
      } else if (password.length < 6) {
        errorMessage = 'Invalid password';
      } else {
        paymentValid = true;
      }
    } else if (paymentMethod === 'banking') {
      // For demo purposes, online banking is always valid
      paymentValid = true;
    }

    if (!paymentValid) {
      console.error('Payment validation failed:', errorMessage);
      
      // Update order to failed status
      await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          order_status: 'cancelled'
        })
        .eq('id', orderId);

      return new Response(
        JSON.stringify({ success: false, error: errorMessage || 'Payment validation failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Payment validated - update order
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'completed',
        order_status: 'processing',
        payment_method: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'banking' ? 'Online Banking' : 'PayPal'
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to update order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Payment verified successfully for order:', orderId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment verified successfully',
        orderId: orderId
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in verify-payment function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
