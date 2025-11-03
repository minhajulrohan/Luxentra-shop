import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/payment";
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
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsconditions" element={<TermsConditions />} />
            <Route path="/blogDetails/:id" element={<BlogDetail />} />
            
            {/* Standardized Product Routing */}
            <Route path="/products" element={<CategoryListPage />} />
            <Route path="/products/:categorySlug" element={<ProductListPage />} />
            <Route path="/products/:categorySlug/:productSlug" element={<ProductDetailsPage />} />

            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
