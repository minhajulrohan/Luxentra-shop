import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Eye } from "lucide-react";

interface OrderItem {
    id: string;
    product_name: string;
    product_image: string | null;
    quantity: number;
    price: number;
    selected_size: string | null;
    selected_color: string | null;
}

interface OrderDetailsProps {
    orderId: string;
    orderNumber: string;
}

export const OrderDetailsModal: React.FC<OrderDetailsProps> = ({ orderId, orderNumber }) => {
    const [items, setItems] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const fetchOrderItems = async () => {
        setLoading(true);
        try {
            // RLS বাইপাস করে order_items টেবিল থেকে ডেটা ফেচ করা হচ্ছে
            const { data, error } = await supabase
                .from("order_items")
                .select("*")
                .eq("order_id", orderId);

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error("Failed to load order items:", error);
            // toast.error("Failed to load items");
        } finally {
            setLoading(false);
        }
    };

    // Modal খোলার সাথে সাথে ডেটা ফেচ শুরু
    useEffect(() => {
        if (isOpen) {
            fetchOrderItems();
        }
    }, [isOpen, orderId]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 ml-2 flex-shrink-0">
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Order Items - #{orderNumber}</DialogTitle>
                </DialogHeader>
                {loading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-5 text-gray-500">No items found for this order.</div>
                ) : (
                    <div className="max-h-[60vh] overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Variant</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Qty</TableHead>
                                    <TableHead className="text-right">Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.product_name}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {item.selected_size && <span>Size: {item.selected_size}</span>}
                                            {item.selected_color && <span> | Color: {item.selected_color}</span>}
                                            {!item.selected_size && !item.selected_color && <span>-</span>}
                                        </TableCell>
                                        <TableCell className="text-right">TK {Number(item.price).toFixed(2)}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="font-semibold text-right">
                                            TK {(Number(item.price) * item.quantity).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};