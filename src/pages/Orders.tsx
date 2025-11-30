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
import { Helmet } from "react-helmet-async";

interface Order {
  id: string;
  order_number: string | null;
  email: string | null;
  total_amount: number | null;
  subtotal: number | null;
  shipping_cost: number | null;
  tax: number | null;
  coupon_discount: number | null;
  created_at: string | null;
  order_status: string | null;
  payment_method: string | null;
  phone: string | null;
  address_line1: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  payment_status: string | null;
  tracking_number?: string | null;
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      navigate("/auth");
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const safeData = data?.map((o) => ({
        ...o,
        order_number: o.order_number ?? "N/A",
        email: o.email ?? "N/A",
        total_amount: o.total_amount ?? 0,
        subtotal: o.subtotal ?? 0,
        shipping_cost: o.shipping_cost ?? 0,
        tax: o.tax ?? 0,
        coupon_discount: o.coupon_discount ?? 0,
        created_at: o.created_at ?? new Date().toISOString(),
        order_status: o.order_status ?? "pending",
        payment_method: o.payment_method ?? "cod",
        phone: o.phone ?? "N/A",
        address_line1: o.address_line1 ?? "N/A",
        city: o.city ?? "N/A",
        state: o.state ?? "N/A",
        zip_code: o.zip_code ?? "N/A",
        payment_status: o.payment_status ?? "pending",
        tracking_number: o.tracking_number ?? null,
      }));

      setOrders(safeData || []);
      console.log("Orders Loaded:", safeData);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const formatStatus = (s?: string | null) => {
    return s ? s[0].toUpperCase() + s.slice(1) : "Unknown";
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "processing": return <Package className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "processing": return "bg-blue-500";
      case "shipped": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <>
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
                          Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString("en-US") : "N/A"}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">৳{order.total_amount?.toFixed(2) ?? "0.00"}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex gap-4">
                        <Badge className={`${getStatusColor(order.order_status)} text-white`}>
                          <span className="mr-1">{getStatusIcon(order.order_status)}</span>
                          {formatStatus(order.order_status)}
                        </Badge>

                        <Badge variant={order.payment_status === "completed" ? "default" : "secondary"}>
                          Payment: {formatStatus(order.payment_status)}
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
