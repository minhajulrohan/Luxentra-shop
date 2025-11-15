import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format, subDays, subMonths, startOfWeek, startOfMonth } from "date-fns";
import { Calendar, TrendingUp, Package } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  full_name: string;
  email: string;
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
}

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
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const orders = data || [];
      setAllOrders(orders);

      // Filter weekly orders
      const weekStart = startOfWeek(new Date());
      const weekly = orders.filter((order: Order) => 
        new Date(order.created_at) >= weekStart
      );
      setWeeklyOrders(weekly);

      // Filter monthly orders
      const monthStart = startOfMonth(new Date());
      const monthly = orders.filter((order: Order) => 
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
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const calculateStats = (orders: Order[]) => {
    const total = orders.reduce((sum, order) => sum + Number(order.total), 0);
    const paid = orders.filter(o => o.payment_status === 'paid').length;
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
            <TableHead>Total (TK)</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-sm">{order.order_number}</TableCell>
              <TableCell className="font-medium">{order.full_name}</TableCell>
              <TableCell className="text-sm">{order.email}</TableCell>
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
              <TableCell>
                <Select
                  value={order.order_status}
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                >
                  <SelectTrigger className="w-32">
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