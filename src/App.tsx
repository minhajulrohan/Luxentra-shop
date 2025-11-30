import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AdminDashboard from "./pages/admin/AdminDashboard";
import Marketplace from "./pages/Marketplace";
import HealthCare from "./pages/HealthCare";
import Foods from "./pages/Foods";
import SkinCarepage from "./pages/SkinCarepage";
import { HelmetProvider } from "react-helmet-async";
import WomenspageCategory from "./pages/WomenspageCategory";
import MensCategoryPage from "./pages/MensCategoryPage";
import Kidspage from "./pages/Kidspage";
import ScrollTop from "./components/ScrollTop";
import ProfileLayout from "./components/ProfileLayout";
import Dashboard from "./pages/profile/Dashboard";
import ProfileInfo from "./pages/profile/ProfileInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <BrowserRouter>
            <ScrollTop />
          {/* <PopupController /> */}
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
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/healthcare" element={<HealthCare />} />
            <Route path="/food" element={<Foods />} />
            <Route path="/shaharaskincare" element={<SkinCarepage />} />
            <Route path="/womens" element={<WomenspageCategory />} />    
            <Route path="/mens" element={<MensCategoryPage />} />
            <Route path="/kids" element={<Kidspage />} />    
              
            {/* Standardized Product Routing */}
            <Route path="/products" element={<CategoryListPage />} />
            <Route path="/products/:categorySlug" element={<ProductListPage />} />
            <Route path="/products/:categorySlug/:productSlug" element={<ProductDetailsPage />} />
              
            
            {/* Auth Route */}
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/profile"
                  element={<ProfileLayout>
                    <Dashboard/>
                  </ProfileLayout>} />
                
                <Route path="/profile/info" element={<ProfileLayout>
                  <ProfileInfo />
                </ProfileLayout>} />

                <Route path="/profile/wishlist" element={<ProfileLayout>
                  <Wishlist />
                </ProfileLayout>} />

                <Route path="/profile/orders" element={<ProfileLayout>
                  <Orders />
                </ProfileLayout>} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/test" element={ <TestConnection />} />
              

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNav />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
      </ThemeProvider>
      </HelmetProvider>
  </QueryClientProvider>
);

export default App;