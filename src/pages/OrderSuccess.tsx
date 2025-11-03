import { CheckCircle, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Order {
  id: string;
  order_number: string;
  full_name: string;
  email: string;
  total: number;
  created_at: string;
  order_status: string;
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
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase, {order.full_name}!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              A confirmation email has been sent to {order.email}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Number:</span>
                  <span className="font-semibold">{order.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span className="font-semibold">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold capitalize">{order.order_status}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-primary">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Package className="w-5 h-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-semibold">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">3-5 Business Days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="w-5 h-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-semibold">Tracking</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive tracking info via email once shipped
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/orders")} size="lg">
              <Package className="w-4 h-4 mr-2" />
              View All Orders
            </Button>
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
