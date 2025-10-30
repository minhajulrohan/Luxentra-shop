import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
// এখানে Lucide-react থেকে একটি আইকন ব্যবহার করা হয়েছে
import { CheckCircle, Home, ShoppingBag } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // আপনার অর্ডার ID যদি দরকার হয়, তাহলে আপনি URL Parameters 
  // থেকে সেটি ব্যবহার করতে পারতেন (e.g., /order-success/:orderId)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="bg-card border rounded-lg p-10 md:p-16 text-center shadow-lg max-w-xl w-full">
          
          {/* ✅ Success Icon */}
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Thank you for your purchase. A confirmation email with order details has been sent.
          </p>

          <div className="space-y-2 mb-8">
            <p className="font-semibold text-lg">Order ID: #XYZ123456</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Estimated Delivery: 3-5 business days.
            </p>
          </div>

          {/* ✅ Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/")} 
              variant="default"
              size="lg"
              className="text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
            
            <Button 
              onClick={() => navigate("/payment")} 
              variant="outline"
              size="lg"
              className="text-lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
            Payment Now
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;