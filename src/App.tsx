import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./hooks/useAuth";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/payment";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyPolicy from "./pages/Privacypolicy";
import TermsConditions from "./pages/Termsconditions";
import Auth from "./pages/auth/Auth";
import BlogDetail from "./pages/BlogDetail";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import CategoryListPage from "./pages/products/CategoryListPage";
import ProductListPage from "./pages/products/ProductListPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import TestConnection from "./test/TestConnection";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-success/:orderNumber" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/track-order/:orderNumber" element={<TrackOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsconditions" element={<TermsConditions />} />
            <Route path="/blogDetails/:id" element={<BlogDetail />} />
            
            {/* Standardized Product Routing */}
            <Route path="/products" element={<CategoryListPage />} />
            <Route path="/products/:categorySlug" element={<ProductListPage />} />
            <Route path="/products/:categorySlug/:productSlug" element={<ProductDetailsPage />} />
            
            {/* Auth Route */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/test" element={ <TestConnection />} />
              

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNav />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
