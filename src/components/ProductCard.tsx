import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  badge?: string | null;
  categorySlug: string;
  productSlug: string;
  colors?: string[]; 
  sizes?: string[]; // ✅ আপনার JSON এর সাথে মিল রেখে 'sizes' করা হলো
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  badge,
  categorySlug,
  productSlug,
  colors = [], 
  sizes = [], // ✅ এখানেও 'sizes' ব্যবহার করা হয়েছে
}: ProductCardProps) => {
  const { addToWishlist, isInWishlist } = useWishlist();
  
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // 1. Quick Add বাটন ক্লিক হ্যান্ডলার
  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    // Debugging
    console.log(`Product: ${name}`, { sizes, colors });

    // ✅ লজিক: sizes বা colors অ্যারেতে ডাটা থাকলে মডাল ওপেন হবে
    if ((sizes && sizes.length > 0) || (colors && colors.length > 0)) {
      setIsModalOpen(true);
    } else {
      addToCartFinal();
    }
  };

  // 2. কার্টে অ্যাড করার ফাইনাল ফাংশন
  const addToCartFinal = () => {
    // ✅ ভ্যালিডেশন: sizes চেক করা হচ্ছে
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const cartItem = {
      id,
      name,
      price,
      image, 
      size: selectedSize, // কার্টে সেভ করার সময় সিঙ্গেল 'size' নামেই যাবে
      color: selectedColor,
      quantity: 1,
    };

    const existingItemIndex = cart.findIndex(
      (item: any) =>
        item.id === id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    
    toast.success("Added to cart successfully!");
    
    setIsModalOpen(false);
    setSelectedSize("");
    setSelectedColor("");
  };

  return (
    <>
      <Link to={`/products/${categorySlug}/${productSlug}`}>
        <Card className="card-hover overflow-hidden group border h-full flex flex-col justify-between relative">
          
          <div className="relative overflow-hidden bg-secondary/20 aspect-[4/5]">
            {badge && (
              <Badge className="absolute top-2 left-2 z-10" variant="secondary">
                {badge}
              </Badge>
            )}
            
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-md h-8 w-8"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToWishlist(String(id));
                }}
              >
                <Heart
                  className={`w-4 h-4 ${isInWishlist(String(id)) ? "fill-current text-red-500" : ""}`}
                />
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-1 text-sm md:text-base" title={name}>{name}</h3>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary">
                  TK {price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    TK {originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="relative z-20"> 
                <Button
                  size="sm"
                  variant="default"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={handleQuickAddClick}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* --- Quick Add Modal --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Select Options</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="flex items-center gap-4 border-b pb-4">
              <img src={image} alt={name} className="w-16 h-16 object-cover rounded-md border" />
              <div>
                <h4 className="font-semibold text-sm line-clamp-1">{name}</h4>
                <p className="text-primary font-bold mt-1">TK {price.toFixed(2)}</p>
              </div>
            </div>

            {/* ✅ Size Selector */}
            {sizes.length > 0 && (
              <div className="space-y-3">
                <span className="text-sm font-medium">Size</span>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <Button
                      key={s}
                      variant={selectedSize === s ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(s)}
                      className="min-w-[3rem]"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {colors.length > 0 && (
              <div className="space-y-3">
                <span className="text-sm font-medium">Color</span>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={addToCartFinal}>
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;