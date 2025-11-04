import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ScrollToTopButton from "@/components/Button";

interface CartItem {
  id: number;
  name: string;
  price: number;
  images: string[]; // ধরে নেওয়া হলো ProductDetailsPage এই ফরম্যাট সেভ করে
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    // JSON.parse(null) দিলে এরর হয়, তাই || "[]" ব্যবহার করা জরুরি।
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  };

  useEffect(() => {
    loadCart();
    
    const handleCartUpdate = () => {
      loadCart();
    };
    
    // গ্লোবাল ইভেন্ট লিসেনার সেটআপ করা
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // কোয়ান্টিটি ০ বা মাইনাস হলে, আইটেমটি রিমুভ করে দেওয়া উচিত
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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 10000 ? 0 : 120;
  const tax = subtotal * 0.015;
  const total = subtotal + shipping + tax;

  // Checkout বাটনে ক্লিক করার হ্যান্ডলার
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    // toast.success("Proceeding to checkout..."); // এটি Checkout পেইজে দরকার নেই
    navigate("/checkout"); // ✅ Checkout পেইজে নেভিগেট করা
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
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
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      // ✅ সুরক্ষিত রেন্ডারিং: নিশ্চিত করা হলো যে images অ্যারেতে অন্তত একটি উপাদান আছে
                      src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/128x128?text=No+Image'}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-xl font-semibold hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                        <span>Color: <strong>{item.selectedColor}</strong></span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-primary">
                          TK {item.price.toFixed(2)}
                        </span>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(index, item.quantity - 1)
                              }
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
                              onClick={() =>
                                updateQuantity(index, item.quantity + 1)
                              }
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
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? "FREE" : `TK ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
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
                
                {subtotal < 50 && (
                  <p className="text-sm text-muted-foreground mt-4 p-3 bg-secondary rounded-md">
                    Add TK {(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                
                <Button
                  variant="shop"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleCheckout} // ✅ সংশোধিত: handleCheckout ফাংশন ব্যবহার করা হয়েছে
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