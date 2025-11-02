import { useState, useEffect, useCallback } from "react"; // useCallback যোগ করা হলো পারফর্ম্যান্সের জন্য
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import ScrollToTopButton from "@/components/Button";

// --- ইন্টারফেস ডেফিনিশন ---
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string; // সিঙ্গেল ইমেজ স্ট্রিং
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // --- ১. ডেটা লোড করা (useEffect) ---
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  // --- ২. ক্যালকুলেটেড ভ্যালু (Calculated Values) ---
  const subtotal = cartItems.reduce(
    (sum, item) => (item.price ? sum + item.price * item.quantity : sum),
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // --- ৩. ইভেন্ট হ্যান্ডলার (Event Handlers) ---

  // ইনপুট হ্যান্ডলারকে useCallback দিয়ে মেমোয়াইজ করা
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  // ফর্ম সাবমিট ও পেমেন্টে নেভিগেট করার ফাংশন
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ডামি ব্যাক-এন্ড কল সিমুলেশন
    const loadingToast = toast.loading("Processing order and initiating payment...");

    try {
      // API কল সিমুলেশন
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.dismiss(loadingToast);

      // ইউজারকে পেমেন্ট গেটওয়েতে নিয়ে যাওয়া
      navigate("/payment");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to initiate payment. Please check your details.");
    }
  };

  // --- ৪. রেন্ডারিং লজিক (Early Return) ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Button onClick={() => navigate("/shop")} variant="shop">
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- ৫. প্রধান JSX রিটার্ন (Main Render) ---
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/cart")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* A. Shipping Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* ইনপুট ফিল্ডস... */}
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={formData.country} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" variant="shop">
                Proceed to Payment ${total.toFixed(2)}
              </Button>
            </form>
          </div>

          {/* B. Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {/* কার্টের আইটেম রেন্ডার করা */}
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm pt-20">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      {item.selectedSize && (
                        <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>
                      )}
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              {/* খরচ ব্রেকডাউন */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between pt-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Checkout;