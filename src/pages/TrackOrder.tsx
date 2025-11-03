import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  order_status: string;
  tracking_number?: string;
  tracking_url?: string;
  created_at: string;
  updated_at: string;
}

const TrackOrder = () => {
  const { orderNumber } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchOrder();
  }, [user, orderNumber, navigate]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error: any) {
      console.error('Error fetching order:', error);
      toast.error("Failed to load order details");
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  const trackingSteps = [
    { status: 'pending', label: 'Order Placed', icon: Clock },
    { status: 'processing', label: 'Processing', icon: Package },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const getStepStatus = (stepStatus: string) => {
    if (!order) return 'upcoming';
    
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(order.order_status);
    const stepIndex = statuses.indexOf(stepStatus);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading tracking information...</p>
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
          <Button
            variant="ghost"
            onClick={() => navigate("/orders")}
            className="mb-6"
          >
            ← Back to Orders
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Track Order: {order.order_number}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">{order.full_name}</p>
                    <p className="text-sm text-muted-foreground">{order.address_line1}</p>
                    {order.address_line2 && (
                      <p className="text-sm text-muted-foreground">{order.address_line2}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {order.city}, {order.state} {order.zip_code}
                    </p>
                  </div>
                </div>

                {order.tracking_number && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-mono font-semibold">{order.tracking_number}</p>
                    {order.tracking_url && (
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => window.open(order.tracking_url, '_blank')}
                      >
                        View on carrier website →
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {trackingSteps.map((step, index) => {
                  const status = getStepStatus(step.status);
                  const Icon = step.icon;
                  
                  return (
                    <div key={step.status} className="relative pb-8 last:pb-0">
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`absolute left-5 top-10 w-0.5 h-full ${
                            status === 'completed' ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      )}
                      
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            status === 'completed'
                              ? 'bg-primary text-primary-foreground'
                              : status === 'current'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <p
                            className={`font-semibold ${
                              status === 'upcoming' ? 'text-muted-foreground' : ''
                            }`}
                          >
                            {step.label}
                          </p>
                          {status === 'current' && (
                            <p className="text-sm text-muted-foreground">
                              Updated {new Date(order.updated_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TrackOrder;
