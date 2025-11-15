import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Updated Order Interface to include all required fields for the invoice
interface Order {
  id: string;
  order_number: string;
  full_name: string;
  email: string;
  total: number;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  coupon_discount: number;
  created_at: string;
  order_status: string;
  payment_method: string;
  phone: string;
  address_line1: string;
  city: string;
  state: string;
  zip_code: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
}

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderNumber } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) {
      navigate("/");
      return;
    }

    fetchOrderDetails();
  }, [orderNumber, navigate]);

  const fetchOrderDetails = async () => {
    try {
      // Fetch all necessary fields including address and payment method
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          phone, 
          address_line1, 
          city, 
          state, 
          zip_code,
          payment_method,
          subtotal,
          shipping_cost,
          tax,
          coupon_discount
        `)
        .eq('order_number', orderNumber)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderData.id);

      if (itemsError) throw itemsError;
      setOrderItems(itemsData || []);
    } catch (error: any) {
      console.error('Error fetching order:', error);
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading order details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Order not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const orderDate = new Date(order.created_at);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = orderDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const deliveryAddress = `${order.address_line1}, ${order.city}, ${order.state}, ${order.zip_code}, Bangladesh`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
            
            {/* Left Column: Success Message & Action Button */}
            <div className="md:w-3/5 p-8 flex flex-col justify-start items-start">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h1 className="text-3xl font-bold mb-2">Order Placed Successful</h1>
              <p className="text-lg text-gray-600 mb-6">
                Thank You, Your order has been successfully placed
              </p>

              <Button 
                onClick={() => navigate("/orders")} 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded"
              >
                Go to Orders
              </Button>
            </div>

            {/* Right Column: Invoice Details (Matching the image) */}
            <div className="md:w-2/5 p-8 bg-gray-50 border-l border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Invoice Details</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Invoice:</span>
                  <span className="font-semibold">{order.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date and Time:</span>
                  <span className="font-semibold">{formattedDate}, {formattedTime} AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold text-blue-600 uppercase">{order.payment_method}</span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-3">
                  <span className="text-lg font-bold">Total Order Amount:</span>
                  <span className="text-lg font-bold">৳ {order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Shipping Address:</h3>
                <p className="font-medium text-sm">{order.full_name}</p>
                <p className="text-sm">{order.phone}</p>
                <p className="text-sm text-gray-600">{deliveryAddress}</p>
              </div>
            </div>
          </div>

          {/* Optional: Order Items List (Kept from your original code) */}
          {orderItems.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <img
                        src={item.product_image || 'https://via.placeholder.com/80x80?text=No+Image'}
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product_name}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">৳ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="outline" onClick={() => navigate("/shop")} size="lg">
              Continue Shopping
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderSuccess;