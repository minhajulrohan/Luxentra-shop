import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useWishlist } from "@/hooks/useWishlist";

// Cart.jsx এর সাথে সামঞ্জস্যপূর্ণ ইন্টারফেস
interface CartItem {
  id: number;
  name: string;
  price: number;
  images: string[]; // ✅ Array of strings (যেমনটি Cart.jsx আশা করে)
  selectedSize?: string; // Quick Add-এর জন্য অপশনাল
  selectedColor?: string; // Quick Add-এর জন্য অপশনাল
  quantity: number;
}

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string; // ProductCard শুধু একটি স্ট্রিং পায়
  badge?: string | null;
  categorySlug: string; 
  productSlug: string;
}

const ProductCard = ({ id, name, price, originalPrice, image, badge, categorySlug, productSlug }: ProductCardProps) => {
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 1. কার্ট আইটেম তৈরি করা
    const newItem: CartItem = {
      id: id,
      name: name,
      price: price,
      // ✅ ডেটা ট্রান্সফর্মেশন: image স্ট্রিংটিকে একটি অ্যারে [image] হিসেবে সেভ করা হলো
      images: [image], 
      quantity: 1, // ডিফল্ট কোয়ান্টিটি ১
      // Quick Add এ Size/Color সাধারণত থাকে না
    };

    // 2. localStorage থেকে কার্ট লোড করা
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    
    // 3. ডুপ্লিকেট আইটেম চেক করা
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    let updatedCart: CartItem[];

    if (existingItemIndex > -1) {
      // যদি আইটেমটি ইতিমধ্যেই থাকে, শুধু কোয়ান্টিটি বাড়ান
      updatedCart = cart.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      // নতুন আইটেম যোগ করা
      updatedCart = [...cart, newItem];
    }

    // 4. localStorage আপডেট করা
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // 5. গ্লোবাল ইভেন্ট ডিসপ্যাচ করা (Header/Cart/অন্যান্য কম্পোনেন্ট আপডেট করতে)
    window.dispatchEvent(new Event("cartUpdated"));
    
    const finalQuantity = updatedCart[existingItemIndex > -1 ? existingItemIndex : updatedCart.length - 1].quantity;
    toast.success(`${name} added to cart! Total: ${finalQuantity}`);
  };

  return (
    <Link to={`/products/${categorySlug}/${productSlug}`}>
      <Card className="card-hover overflow-hidden group border">
        <div className="relative overflow-hidden bg-secondary/20">
          {badge && (
            <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded z-10">
              {badge}
            </span>
          )}
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-md"
              onClick={(e) => {
                e.preventDefault();
                addToWishlist(String(id));
              }}
            >
              <Heart className={`w-4 h-4 ${isInWishlist(String(id)) ? 'fill-current text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-1">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">TK {price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  TK {originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant="shop"
              className="rounded-full"
              onClick={handleQuickAdd}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;