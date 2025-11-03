import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
  tracking_number?: string;
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading orders...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-4">No orders yet</p>
                <Button onClick={() => navigate("/shop")}>Start Shopping</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                        <CardDescription>
                          Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex gap-4">
                        <Badge className={`${getStatusColor(order.order_status)} text-white`}>
                          <span className="mr-1">{getStatusIcon(order.order_status)}</span>
                          {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                        </Badge>
                        <Badge variant={order.payment_status === 'completed' ? 'default' : 'secondary'}>
                          Payment: {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {order.tracking_number && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/track-order/${order.order_number}`)}
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Track Order
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/order-success/${order.order_number}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
