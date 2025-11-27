import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Info } from "lucide-react";
import { toast } from "sonner";
import ScrollToTopButton from "@/components/Button";
import { Helmet } from "react-helmet-async";

// ✅ ফিক্স: CartItem ইন্টারফেস আপডেট করা হলো
// এটি প্রোডাক্ট ডিটেইলস পেজ থেকে localStorage এ সেভ হওয়া ডেটা স্ট্রাকচারের সাথে মিলিয়ে দেওয়া হলো।
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string; // আপনার product detail page এ 'image' হিসেবে সেভ হয়েছে, 'images' নয়।
  size: string;   // পূর্বে ছিল selectedSize
  color: string;  // পূর্বে ছিল selectedColor
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    // localStorage থেকে ডেটা লোড
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  };

  useEffect(() => {
    loadCart();
    
    // Custom event listener for real-time cart update across components
    const handleCartUpdate = () => {
      loadCart();
    };
    
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(index); 
      return;
    }
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Item removed from cart");
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Default shipping logic for Cart view (Actual calculation happens at Checkout based on City)
  const shipping = subtotal > 5999 ? 0 : 120;
  
  // Tax calculation (1.5%)
  const tax = subtotal * 0.015;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  // --- Empty Cart View ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
              <Helmet>
        <title>Luxentra-shop || Cart</title>
        <meta name="description" content="Welcome to MyStore — best products online." />
        <meta property="og:title" content="Home — MyStore" />
      </Helmet>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center p-8">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to get started
            </p>
            <Button variant="shop" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Cart with Items View ---
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      // ✅ Fix: item.image ব্যবহার করা হলো
                      src={item.image ? item.image : 'https://via.placeholder.com/128x128?text=No+Image'}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      {/* Link to Product Detail Page (using item.id is generic, ideally use slug) */}
                      <Link
                        to={`/product/${item.id}`} 
                        className="text-xl font-semibold hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        {/* ✅ Fix: item.size এবং item.color ব্যবহার করা হলো */}
                        {item.size && <span>Size: <strong>{item.size}</strong></span>}
                        {item.color && <span>Color: <strong>{item.color}</strong></span>}
                        {/* যদি সাইজ বা কালার না থাকে (যেমন: স্কিনকেয়ার), তবে এই স্প্যানগুলি রেন্ডার হবে না */}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-primary">
                          TK {(item.price * item.quantity).toFixed(2)}
                        </span>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">TK {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span>Shipping (Est.)</span>
                    </div>
                    <span className="font-semibold">
                      {shipping === 0 ? "FREE" : `TK ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground -mt-3 text-right">
                    *Final shipping calculated at checkout
                  </p>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (1.5%)</span>
                    <span className="font-semibold">TK {tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary text-2xl">
                      TK {total.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/* Free Shipping Banner Logic Fixed */}
                {subtotal < 5999 && (
                  <div className="mt-4 p-3 bg-secondary/50 rounded-md border border-secondary flex items-start gap-2">
                     <Info className="w-4 h-4 mt-0.5 text-primary" />
                     <p className="text-sm text-muted-foreground">
                      Add <span className="font-bold text-foreground">TK {(5999 - subtotal).toFixed(2)}</span> more for free shipping!
                    </p>
                  </div>
                )}
                
                <Button
                  variant="shop"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full mt-3"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Cart;