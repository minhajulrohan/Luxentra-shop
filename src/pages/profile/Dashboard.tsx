import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Package,
  Truck,
  Star,
  Heart,
  Ticket,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { user } = useAuth();

  const [orderStats, setOrderStats] = useState({
    processing: 0,
    ready_to_ship: 0,
    shipped: 0,
    review: 0,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      loadOrderStats();
      loadRecentOrders();
    }
  }, [user]);

  const loadOrderStats = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("status")
        .eq("user_id", user.id);

      if (error) throw error;

      const stats = {
        processing: data?.filter((o) => o.status === "processing").length || 0,
        ready_to_ship: data?.filter((o) => o.status === "ready_to_ship").length || 0,
        shipped: data?.filter((o) => o.status === "shipped").length || 0,
        review: data?.filter((o) => o.status === "delivered").length || 0,
      };

      setOrderStats(stats);
    } catch (err) {
      console.error("Error loading order stats:", err);
    }
  };

  const loadRecentOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`id, order_number, status, payment_status, payment_method,
                 total_amount, created_at, order_items(*)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setRecentOrders(data || []);

      console.log("Recent Orders Loaded:", data);
    } catch (err) {
      console.error("Error loading recent orders:", err);
    }
  };

  const featureCards = [
    {
      title: "My Orders",
      description: "All of your orders in here",
      icon: Package,
      link: "/profile/orders",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Wishlist",
      description: "All of your wishlist items in here",
      icon: Heart,
      link: "/profile/wishlist",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Coupon",
      description: "All of your coupons in here",
      icon: Ticket,
      link: "/profile/coupons",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const quickActions = [
    { title: "Order Tracking", icon: Truck, link: "/profile/tracking" },
    { title: "Address Book", icon: MapPin, link: "/profile/addresses" },
  ];

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Dashboard - Luxentra</title>
        <meta name="description" content="Your Luxentra dashboard" />
      </Helmet>

      {/* Order Status Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">My Orders</h2>
          <Button variant="outline" asChild>
            <Link to="/profile/orders">
              See More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Processing", count: orderStats.processing, icon: Gift, color: "text-purple-500" },
            { label: "Ready To Ship", count: orderStats.ready_to_ship, icon: Package, color: "text-blue-500" },
            { label: "Shipped", count: orderStats.shipped, icon: Truck, color: "text-green-500" },
            { label: "Review", count: orderStats.review, icon: Star, color: "text-yellow-500" },
          ].map((status) => (
            <Card key={status.label}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <status.icon className={`h-12 w-12 mb-3 ${status.color}`} />
                  <p className="text-sm text-muted-foreground mb-1">{status.label}</p>
                  <p className="text-2xl font-bold">{status.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featureCards.map((card) => (
          <Link key={card.title} to={card.link}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-48">
              <div className={`h-32 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                <card.icon className="h-16 w-16 text-white" />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-1">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Link key={action.title} to={action.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <action.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-semibold">{action.title}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <p className="font-semibold">Invoice No: {order.order_number || "N/A"}</p>
                      <Badge variant={order.status === "processing" ? "secondary" : "default"}>
                        {order.status || "Unknown"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Date not available"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">
                      Payment Status: <span className="font-semibold">{order.payment_status || "Unpaid"}</span>
                    </p>
                    <p className="text-lg font-bold">
                      TK ৳{order.total_amount?.toFixed(2) ?? "0.00"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
