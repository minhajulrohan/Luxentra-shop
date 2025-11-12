import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import { DollarSign, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface Payment {
  id: string;
  order_number: string;
  full_name: string;
  email: string;
  total: number;
  payment_status: string;
  payment_method: string | null;
  created_at: string;
}

export const PaymentTracking = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, full_name, email, total, payment_status, payment_method, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error: any) {
      toast.error("Failed to load payment data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const total = payments.reduce((sum, p) => sum + Number(p.total), 0);
    const paid = payments.filter(p => p.payment_status === 'paid');
    const pending = payments.filter(p => p.payment_status === 'pending');
    const failed = payments.filter(p => p.payment_status === 'failed');

    return {
      total,
      paid: {
        count: paid.length,
        amount: paid.reduce((sum, p) => sum + Number(p.total), 0),
      },
      pending: {
        count: pending.length,
        amount: pending.reduce((sum, p) => sum + Number(p.total), 0),
      },
      failed: {
        count: failed.length,
        amount: failed.reduce((sum, p) => sum + Number(p.total), 0),
      },
    };
  };

  const stats = calculateStats();

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">TK {stats.total.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              All transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.paid.count}</div>
            <p className="text-xs text-muted-foreground">
              TK {stats.paid.amount.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending.count}</div>
            <p className="text-xs text-muted-foreground">
              TK {stats.pending.amount.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.failed.count}</div>
            <p className="text-xs text-muted-foreground">
              TK {stats.failed.amount.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading payments...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Amount (TK)</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-sm">{payment.order_number}</TableCell>
                      <TableCell className="font-medium">{payment.full_name}</TableCell>
                      <TableCell className="text-sm">{payment.email}</TableCell>
                      <TableCell className="font-semibold">
                        {Number(payment.total).toFixed(2)}
                      </TableCell>
                      <TableCell className="capitalize">
                        {payment.payment_method || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusColor(payment.payment_status)}>
                          {payment.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(payment.created_at), "MMM dd, yyyy HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};