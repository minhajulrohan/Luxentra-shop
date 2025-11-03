import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paypalCredentials, setPaypalCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const currentOrderId = sessionStorage.getItem('currentOrderId');
    if (!currentOrderId) {
      toast.error("No order found. Please start from checkout.");
      navigate("/checkout");
      return;
    }
    setOrderId(currentOrderId);
  }, [navigate]);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleSubmit = async () => {
    if (!orderId) {
      toast.error("Order not found");
      return;
    }

    setLoading(true);

    try {
      const { data: order, error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'completed',
          order_status: 'processing',
          payment_method: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'banking' ? 'Online Banking' : 'PayPal'
        })
        .eq('id', orderId)
        .select()
        .single();

      if (updateError) throw updateError;

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

      localStorage.removeItem("cart");
      sessionStorage.removeItem('currentOrderId');

      toast.success("Payment successful!");
      
      setTimeout(() => {
        navigate(`/order-success/${order.order_number}`);
      }, 1500);
    } catch (error: any) {
      console.error('Error processing payment:', error);
      toast.error(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = () => {
    sessionStorage.removeItem('currentOrderId');
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Select Payment Method</h1>
          <div className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className="bg-card border-2 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="card" id="card" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="card" className="text-base font-semibold cursor-pointer">
                      Credit & Debit cards
                    </Label>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input
                            id="cardholderName"
                            value={cardDetails.cardholderName}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="mt-1.5"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={cardDetails.expiryDate}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                              className="mt-1.5"
                            />
                          </div>

                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              maxLength={3}
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                              className="mt-1.5"
                            />
                          </div>
                        </div>

                        <div className="flex items-start gap-2 pt-2">
                          <Checkbox
                            id="terms"
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                            className="mt-0.5"
                          />
                          <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                            I accept the terms of use and privacy policy
                          </Label>
                        </div>

                        <div className="space-y-2">
                          <Button
                            type="button"
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={
                              loading ||
                              !cardDetails.cardholderName ||
                              !cardDetails.cardNumber ||
                              !cardDetails.expiryDate ||
                              !cardDetails.cvv ||
                              !termsAccepted
                            }
                          >
                            {loading ? "Processing..." : "Pay Now"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleDecline}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-card border-2 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="banking" id="banking" />
                  <Label htmlFor="banking" className="text-base font-semibold cursor-pointer">
                    Online Banking
                  </Label>
                </div>
              </div>

              <div className="bg-card border-2 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="paypal" className="text-base font-semibold cursor-pointer">
                      PayPal
                    </Label>

                    {paymentMethod === "paypal" && (
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="paypalEmail">Email</Label>
                          <Input
                            id="paypalEmail"
                            type="email"
                            value={paypalCredentials.email}
                            onChange={(e) => setPaypalCredentials(prev => ({ ...prev, email: e.target.value }))}
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="paypalPassword">Password</Label>
                          <Input
                            id="paypalPassword"
                            type="password"
                            value={paypalCredentials.password}
                            onChange={(e) => setPaypalCredentials(prev => ({ ...prev, password: e.target.value }))}
                            className="mt-1.5"
                          />
                        </div>

                        <div className="space-y-2">
                          <Button
                            type="button"
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={
                              loading ||
                              !paypalCredentials.email ||
                              !paypalCredentials.password
                            }
                          >
                            {loading ? "Processing..." : "Pay Now"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleDecline}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
