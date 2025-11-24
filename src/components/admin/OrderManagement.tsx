import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
// নিশ্চিত করুন যে path সঠিক আছে। যদি OrderManagement.tsx টি components/admin/ এ থাকে এবং Modal টি components/ এ থাকে, তবে "../OrderDetailsModal" ব্যবহার করুন।
import { OrderDetailsModal } from "./OrderDetailsModal"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // <--- ত্রুটি ২: Button Import করা হলো
import { toast } from "sonner";
import { format, startOfWeek, startOfMonth } from "date-fns";
import { Calendar, TrendingUp, Package, CheckCheck } from "lucide-react"; // <--- ত্রুটি ২: CheckCheck Icon Import করা হলো


// 👇👇👇 ত্রুটি ১: Order Interface আপডেট করা হয়েছে 👇👇👇
interface Order {
  id: string;
  order_number: string;
  full_name: string;
  email: string;
  phone: string;         // <--- নতুন যোগ করা হয়েছে
  address_line1: string; // <--- নতুন যোগ করা হয়েছে
  address_line2: string | null; // Nullable হিসেবে যোগ করা হয়েছে (যদি প্রয়োজন হয়)
  city: string;          // <--- নতুন যোগ করা হয়েছে
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
}
// 👆👆👆 Order Interface আপডেট করা হয়েছে 👆👆👆


export const OrderManagement = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [weeklyOrders, setWeeklyOrders] = useState<Order[]>([]);
  const [monthlyOrders, setMonthlyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // NOTE: RLS বাইপাস করে সকল অর্ডার Fetch করার জন্য এডমিন কনটেক্সট নিশ্চিত করুন।
      // সমস্ত কলাম সিলেক্ট করা হচ্ছে যাতে phone, address_line1 ইত্যাদি পাওয়া যায়।
      const { data, error } = await supabase
        .from("orders")
        .select("*") 
        .order("created_at", { ascending: false });

      if (error) throw error;

      const orders = data as Order[] || []; // Type Assertion ব্যবহার করা হলো
      setAllOrders(orders);

      // Filter weekly orders
      const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday as start of week
      const weekly = orders.filter((order) => 
        new Date(order.created_at) >= weekStart
      );
      setWeeklyOrders(weekly);

      // Filter monthly orders
      const monthStart = startOfMonth(new Date());
      const monthly = orders.filter((order) => 
        new Date(order.created_at) >= monthStart
      );
      setMonthlyOrders(monthly);
    } catch (error: any) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ order_status: newStatus as any })
        .eq("id", orderId);

      if (error) throw error;
      toast.success("Order status updated");
      fetchOrders();
    } catch (error: any) {
      toast.error("Failed to update order status");
      console.error(error);
    }
  };
// 👇👇👇 নতুন ফাংশন ঠিক আছে 👇👇👇
  const handlePaymentStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ payment_status: newStatus as any })
        .eq("id", orderId);

      if (error) throw error;
      toast.success("Payment status updated to Paid (Completed)");
      fetchOrders(); 
    } catch (error: any) {
      toast.error("Failed to update payment status");
      console.error(error);
    }
  };
// 👆👆👆 নতুন ফাংশন ঠিক আছে 👆👆👆

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800", 
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const calculateStats = (orders: Order[]) => {
    const total = orders.reduce((sum, order) => sum + Number(order.total), 0);
    const paid = orders.filter(o => o.payment_status === 'completed').length;
    return { count: orders.length, total, paid };
  };

  const OrderTable = ({ orders }: { orders: Order[] }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead> 
            <TableHead>Address</TableHead>
            <TableHead>Total (TK)</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center min-w-[250px]">Action</TableHead> {/* কলামের প্রস্থ বাড়ানো হলো */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-sm">{order.order_number}</TableCell>
              <TableCell className="font-medium">{order.full_name}</TableCell>
              <TableCell className="text-sm">{order.email}</TableCell>
              <TableCell className="text-sm font-medium whitespace-nowrap">{order.phone}</TableCell>
              <TableCell className="text-xs max-w-[150px] truncate" title={`${order.address_line1}, ${order.city}`}>
                {order.address_line1}, {order.city}
              </TableCell>
              <TableCell className="font-semibold">{Number(order.total).toFixed(2)}</TableCell>
              <TableCell>
                <Badge className={getPaymentStatusColor(order.payment_status)}>
                  {order.payment_status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.order_status)}>
                  {order.order_status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {format(new Date(order.created_at), "MMM dd, yyyy")}
              </TableCell>
              
              <TableCell className="flex items-center space-x-2"> 
                
                {/* পেমেন্ট স্ট্যাটাস পরিবর্তনের বাটন */}
                {order.payment_status !== 'completed' && (
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-8 flex-shrink-0 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handlePaymentStatusChange(order.id, 'completed')}
                    >
                        <CheckCheck className="h-4 w-4 mr-1" />
                        Mark Paid
                    </Button>
                )}

                {/* অর্ডার স্ট্যাটাস পরিবর্তনের Select ট্রিগার */}
                <Select
                  value={order.order_status}
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                >
                  <SelectTrigger className="w-32 flex-shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Order Details Modal */}
                <OrderDetailsModal 
                    orderId={order.id} 
                    orderNumber={order.order_number} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const stats = {
    all: calculateStats(allOrders),
    weekly: calculateStats(weeklyOrders),
    monthly: calculateStats(monthlyOrders),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Orders</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weekly.count}</div>
            <p className="text-xs text-muted-foreground">
              Total: TK {stats.weekly.total.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthly.count}</div>
            <p className="text-xs text-muted-foreground">
              Total: TK {stats.monthly.total.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">All Time Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.all.count}</div>
            <p className="text-xs text-muted-foreground">
              Total: TK {stats.all.total.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Orders ({allOrders.length})</TabsTrigger>
              <TabsTrigger value="weekly">This Week ({weeklyOrders.length})</TabsTrigger>
              <TabsTrigger value="monthly">This Month ({monthlyOrders.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {loading ? (
                <div className="text-center py-8">Loading orders...</div>
              ) : (
                <OrderTable orders={allOrders} />
              )}
            </TabsContent>

            <TabsContent value="weekly" className="mt-6">
              {loading ? (
                <div className="text-center py-8">Loading orders...</div>
              ) : (
                <OrderTable orders={weeklyOrders} />
              )}
            </TabsContent>

            <TabsContent value="monthly" className="mt-6">
              {loading ? (
                <div className="text-center py-8">Loading orders...</div>
              ) : (
                <OrderTable orders={monthlyOrders} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};