import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"; 
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

// Define the shape of the bill data
interface BillSummary {
  subTotal: number;
  discount: number; 
  shippingCharge: number;
  total: number;
}

const Payment = () => {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("cod"); 
  const [billSummary, setBillSummary] = useState<BillSummary | null>(null); 

  useEffect(() => {
    const currentOrderId = sessionStorage.getItem('currentOrderId');
    const billData = sessionStorage.getItem('finalBillSummary'); // Fetch the bill summary

    if (!currentOrderId) {
      toast.error("No order found. Please start from checkout.");
      navigate("/checkout");
      return;
    }

    if (!billData) {
      // If data is missing, this is the correct place to return/redirect.
      toast.error("Billing summary not found. Returning to checkout.");
      navigate("/checkout");
      return;
    }

    setOrderId(currentOrderId);

    try {
      const parsedBill: BillSummary = JSON.parse(billData);
      setBillSummary(parsedBill);
    } catch (e) {
      console.error("Error parsing bill data from session storage:", e);
      toast.error("Invalid billing data format. Returning to checkout.");
      navigate("/checkout");
    }

    // FIX: A common anti-pattern is removing the item immediately after reading it. 
    // If you had a removal line here, ensure it is gone.
    // The data MUST persist until the transaction is successfully completed.
    
  }, [navigate]);

  // --- Payment Handling Functions ---

  const placeOrderCOD = async () => {
    if (!orderId || !billSummary) {
      toast.error("Order or billing details are missing.");
      return;
    }

    setLoading(true);

    try {
      // 1. Update the order status and payment method in the database
      const { data: updateData, error: updateError } = await supabase
  .from('orders')
  .update({ 
      payment_method: 'Cash On Delivery', 
      // 👇 CHANGE 'Processing' (Capital P) to 'processing' (lowercase p)
      order_status: 'processing' // <-- FIX APPLIED
  }) 
  .eq('id', orderId)
  .select()
  .single();

      if (updateError) {
        throw new Error(updateError.message || 'Failed to update order for COD');
      }

      const order = updateData;

      // 2. Fetch order items and send confirmation email (omitted for brevity)
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (itemsError) throw itemsError;

      await supabase.functions.invoke('send-order-confirmation', {
        body: {
          email: order.email,
          orderNumber: order.order_number,
          customerName: order.full_name,
          orderTotal: order.total,
          items: orderItems.map(item => ({
            name: item.product_name,
            quantity: item.quantity,
            price: item.price
          }))
        }
      });

      // 3. Clear session storage items (ONLY UPON SUCCESS)
      localStorage.removeItem("cart");
      sessionStorage.removeItem('currentOrderId');
      sessionStorage.removeItem('finalBillSummary'); // <--- Data is cleared here

      toast.success("Order placed successfully! Please pay cash on delivery.");

      setTimeout(() => {
        navigate(`/order-success/${order.order_number}`);
      }, 1500);

    } catch (error: any) {
      console.error('Error placing COD order:', error);
      // IMPORTANT: DO NOT clear session storage on failure so user can retry/check order
      toast.error(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleSslcommerzRedirect = () => {
    toast.info("Redirecting to SSLCOMMERZ gateway...");
    setLoading(true);
    // Real SSLCOMMERZ implementation would happen here
    setTimeout(() => {
        setLoading(false);
        toast.error("SSLCOMMERZ integration is pending.");
    }, 2000);
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    if (selectedMethod === "cod") {
      await placeOrderCOD();
    } else if (selectedMethod === "sslcommerz") {
      handleSslcommerzRedirect();
    } else {
      toast.error("Please select a payment method.");
    }
  };

  // Display loading/error state if data hasn't loaded
  if (!orderId || !billSummary) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading order details...</p>
        </div>
        <Footer />
      </>
    );
  }

  // --- JSX Rendering ---

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-120px)] bg-background flex items-start justify-center p-4 pt-10">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
          
          {/* Left Side: Select Payment Method */}
          <div className="lg:w-3/5 p-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
            
            <RadioGroup 
                value={selectedMethod} 
                onValueChange={setSelectedMethod} 
                className="space-y-4"
            >
              {/* Cash On Delivery Option */}
              <div className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all ${selectedMethod === 'cod' ? 'border-primary' : 'border-gray-200 hover:border-gray-400'}`}>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="cod" id="cod" className="w-5 h-5" />
                  <Label htmlFor="cod" className="flex items-center gap-3 text-base font-medium cursor-pointer">
                    <img src="/cod-logo.png" alt="Cash On Delivery" className="h-10" />
                    Cash On Delivery
                  </Label>
                </div>
              </div>

              {/* SSLCOMMERZ Option */}
              <div className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all ${selectedMethod === 'sslcommerz' ? 'border-primary' : 'border-gray-200 hover:border-gray-400'}`}>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="sslcommerz" id="sslcommerz" className="w-5 h-5" />
                  <Label htmlFor="sslcommerz" className="flex items-center gap-3 text-base font-medium cursor-pointer">
                    <img src="/sslcommerz-logo.png" alt="SSLCOMMERZ" className="h-10" />
                    SSLCOMMERZ
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center space-x-2 mt-6 p-4 border-t pt-4">
                <Checkbox 
                    id="terms" 
                    checked={termsAccepted} 
                    onCheckedChange={(checked) => setTermsAccepted(!!checked)} 
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                    I have read and agree to the <span className="text-primary hover:underline cursor-pointer">Terms and Conditions</span>
                </Label>
            </div>
          </div>
          
          {/* Right Side: Your Bill Summary */}
          <div className="lg:w-2/5 p-6 bg-white border rounded-lg shadow-md h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Your Bill</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span>Sub-Total</span>
                <span>৳ {billSummary.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base text-red-600"> 
                <span>Discount</span>
                <span>- ৳ {billSummary.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Shipping Charge</span>
                <span>৳ {billSummary.shippingCharge.toFixed(2)}</span>
              </div>
              
              <hr className="border-t border-gray-300 my-4" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>৳ {billSummary.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <Button 
                onClick={handleSubmit} 
                disabled={loading || !termsAccepted}
                className="w-full mt-6 py-3 text-lg bg-green-500 hover:bg-green-600"
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;