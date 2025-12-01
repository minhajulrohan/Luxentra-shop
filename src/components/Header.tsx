import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User as UserIcon,
  Package,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSeparator as Separator,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Navbar } from "./Navbar";
import { AuthModal } from "@/components/auth/AuthModal";
import { supabase } from "@/integrations/supabase/client";
import Orders from './../pages/Orders';

// ADMIN ইমেইল ডিফাইন
const ADMIN_EMAIL = "minhajulislamrohan123@gmail.com";

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [profile, setProfile] = useState<any>(null); // ✅ profile state added

  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const isAdmin = !!(user && user.email === ADMIN_EMAIL);

  // ✅ Load profile when user logs in
  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user?.id)
      .single();
    if (!error) setProfile(data);
  };

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = Array.isArray(cart)
        ? cart.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
        : 0;
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate("/");
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount as EventListener);
    return () => window.removeEventListener("cartUpdated", updateCartCount as EventListener);
  }, []);

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-primary">Luxentra</span> Shop
            </Link>

            <nav className="hidden md:flex items-center justify-center gap-6 flex-1">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>

              {isAdmin && (
                <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">Admin</Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 border rounded-md px-3 py-2 w-64">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 p-0 h-auto focus-visible:ring-0"
              />
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {/* ✅ Fixed Avatar (now loads profile image) */}
                    <Avatar className="h-10 w-10">
                      <img
                        src={profile?.avatar_url || ""}
                        alt="avatar"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">My Account</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>

                  <Separator />

                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserIcon className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>

                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <Package className="mr-2 h-4 w-4" /> Admin Dashboard
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:inline-flex"
              >
                Login
              </Button>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                  <Link to="/about" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link to="/blog" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                  <Link to="/contact" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

                  {!user && (
                    <Button onClick={() => { setMobileMenuOpen(false); setIsAuthModalOpen(true); }}>
                      Login
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <Navbar />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;
