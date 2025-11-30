import { useState } from "react"; // ✅ useState যোগ করা হলো
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import allProductsData from "@/data/allProducts.json";
import ScrollToTopButton from "@/components/Button";
import { Helmet } from "react-helmet-async";
// ✅ Modal/Dialog কম্পোনেন্টগুলি ইম্পোর্ট করা হলো
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"; 
// ধরে নিচ্ছি Dialog কম্পোনেন্টগুলি shadcn/ui থেকে আসছে

// মডাল state এর জন্য interface
interface SelectedProduct {
    id: number;
    name: string;
    price: number;
    images: string[];
    sizes: string[];
    colors: string[];
}

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { user } = useAuth();
    const { toast } = useToast();

    // ✅ State for Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToConfigure, setProductToConfigure] = useState<SelectedProduct | null>(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const wishlistProducts = allProductsData.products.filter(product => 
        wishlist.includes(String(product.id))
    );

    // --- Core Add to Cart Logic ---
    const finalizeAddToCart = (product: SelectedProduct, size: string, color: string) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        
        // নিশ্চিত করুন যে price একটি সংখ্যা
        const numericPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

        const cartItem = {
            id: product.id,
            name: product.name,
            price: numericPrice,
            // ✅ ফিক্স: image অ্যারে থেকে সিঙ্গুলার URL নেওয়া হয়েছে
            image: product.images.length > 0 ? product.images[0] : "", 
            selectedSize: size, // Modal থেকে নেওয়া
            selectedColor: color, // Modal থেকে নেওয়া
            quantity: 1,
        };

        // একই id, size, এবং color এর আইটেম খুঁজুন
        const existingItemIndex = cart.findIndex(
            (item: any) => 
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        });
        
        setIsModalOpen(false); // Modal বন্ধ করুন
        setProductToConfigure(null); // State পরিষ্কার করুন
    };

    // --- Button Click Handler (Checking for Options) ---
    const handleAddClick = (product: any) => {
        const sizes = Array.isArray(product.sizes) ? product.sizes : [];
        const colors = Array.isArray(product.colors) ? product.colors : [];

        if (sizes.length > 0 || colors.length > 0) {
            // ✅ অপশন আছে: মডাল ওপেন হবে
            setProductToConfigure(product);
            
            // ডিফল্ট সিলেকশন সেট করা
            setSelectedSize(sizes.length > 0 ? sizes[0] : "");
            setSelectedColor(colors.length > 0 ? colors[0] : "");
            
            setIsModalOpen(true);
        } else {
            // ✅ অপশন নেই: সরাসরি কার্টে যোগ হবে
            // যেহেতু Wishlist এ product.images একটি অ্যারে, তাই এর প্রথম উপাদান পাঠানো হচ্ছে
            finalizeAddToCart(
                { ...product, images: product.images }, // product কে SelectedProduct হিসেবে কাস্ট করা
                "", // কোনো সাইজ নেই
                ""  // কোনো কালার নেই
            );
        }
    };
    
    // মডালের ভেতর থেকে কার্টে যোগ করার ফাংশন
    const handleFinalizeFromModal = () => {
        if (!productToConfigure) return;

        // ভ্যারিয়েশন আছে এমন প্রোডাক্টের জন্য:
        // Size বা Color যদি দরকার হয় এবং সিলেক্ট না করা হয়, তাহলে একটি ত্রুটি বার্তা দেখানো যেতে পারে।
        // বর্তমানে আমরা শুধু ডিফল্ট ভ্যালু (বা সিলেক্ট করা ভ্যালু) ব্যবহার করছি।

        finalizeAddToCart(
            productToConfigure, 
            selectedSize, 
            selectedColor
        );
    };


    if (!user) {
        // ... (Login check UI remains the same)
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
                        <p className="text-muted-foreground mb-6">
                            Please log in to view your wishlist
                        </p>
                        <Link to="/auth">
                            <Button>Login</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <section className="bg-secondary/30 py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
                        <p className="text-muted-foreground">
                            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
                        </p>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container mx-auto px-4">
                        {wishlistProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground text-lg mb-6">
                                    Your wishlist is empty
                                </p>
                                <Link to="/shop">
                                    <Button>Continue Shopping</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-6">
                                {wishlistProducts.map((product) => (
                                    <div 
                                        key={product.id} 
                                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <Link 
                                            to={`/products/${product.categorySlug}/${product.slug}`}
                                            className="block"
                                        >
                                            <div className="aspect-square overflow-hidden">
                                                <img
                                                    // ✅ ফিক্স: product.images অ্যারে থেকে প্রথম ইমেজ
                                                    src={product.images.length > 0 ? product.images[0] : 'placeholder.jpg'} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                />
                                            </div>
                                        </Link>
                                        <div className="p-4">
                                            <Link 
                                                to={`/products/${product.categorySlug}/${product.slug}`}
                                                className="hover:text-primary transition-colors"
                                            >
                                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center gap-2 mb-4">
                                                {/* ✅ ফিক্স: TK ব্যবহার করা */}
                                                <span className="text-xl font-bold text-primary">
                                                    TK {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        TK {typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice).toFixed(2) : product.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    // ✅ ফিক্স: handleAddClick ব্যবহার করা 
                                                    onClick={() => handleAddClick(product)} 
                                                    className="flex-1"
                                                    size="sm"
                                                >
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    Add to Cart
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeFromWishlist(String(product.id))}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <ScrollToTopButton />

            {/* --- ✅ Quick Add Modal/Dialog --- */}
            {productToConfigure && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent 
                        className="w-full max-w-sm sm:max-w-[400px]" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogHeader>
                            <DialogTitle>Select Options</DialogTitle>
                        </DialogHeader>
                        
                        <div className="grid gap-6 py-4">
                            {/* Product Info inside Modal */}
                            <div className="flex items-center gap-4 border-b pb-4">
                                <img 
                                    src={productToConfigure.images.length > 0 ? productToConfigure.images[0] : 'placeholder.jpg'} 
                                    alt={productToConfigure.name} 
                                    className="w-16 h-16 object-cover rounded-md border" 
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm line-clamp-1">{productToConfigure.name}</h4>
                                    <p className="text-primary font-bold mt-1">TK {typeof productToConfigure.price === 'string' ? parseFloat(productToConfigure.price).toFixed(2) : productToConfigure.price.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Size Selector */}
                            {productToConfigure.sizes.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-sm font-medium">Size</span>
                                    <div className="flex flex-wrap gap-2">
                                        {productToConfigure.sizes.map((s) => (
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
                            {productToConfigure.colors.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-sm font-medium">Color</span>
                                    <div className="flex flex-wrap gap-2">
                                        {productToConfigure.colors.map((color) => (
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

                        <div className="flex gap-3 mt-4">
                            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button className="flex-1" onClick={handleFinalizeFromModal}>
                                Add to Cart
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Wishlist;