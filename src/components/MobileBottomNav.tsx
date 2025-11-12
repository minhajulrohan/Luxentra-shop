import { Link, useLocation } from "react-router-dom";
import { Home, Grid, Menu, ShoppingCart, User, Heart, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import products from "../data/allProducts.json"

export function MobileBottomNav() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", href: "/", icon: Home },
    { name: "BEAST DEALS", href: "/products/BEST-DEALS", icon: Grid },
    { name: "CART", href: "/cart", icon: ShoppingCart, badge: cartCount },
    { name: "ACCOUNTS", href: "/profile", icon: User },
  ];

  const menuItems = [
    { name: "Marketplace", href: "/shop" },
    { name: "Shahara's Skin", href: "/products/shahara-skin" },
    { name: "Womens", href: "/products/womens-winter" },
    { name: "Mens", href: "/products/mens-winter" },
    { name: "Kids", href: "/products/kids-winter" },
    { name: "Daily Needs", href: "/products/Dayli-Needs" },
    { name: "BEST DEALS", href: "/products/BEST-DEALS" },
    { name: "Health & Beauty", href: "/products/Healty-Beuty" },
    { name: "Luxentra FOOD", href: "/products/FOOD" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "My Orders", href: "/orders" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden shadow-lg">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors relative ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
        
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-muted-foreground hover:text-foreground">
              <Menu className="h-6 w-6" />
              <span className="text-xs font-medium">CATEGORY</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px]">
            <div className="flex flex-col gap-1 mt-8">
              {menuItems.map((item) => (
                <SheetClose asChild key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-md transition-colors text-lg font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}