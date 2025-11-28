import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Grid, Menu, ShoppingCart, User, ChevronDown, ChevronUp } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

type NavItem = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number;
};

// --- subcategory data: আপনার দেয়া ডেটা অপরিবর্তিত রাখা হলো ---
const subCategoryData: Record<string, Array<any>> = {
  "Shahara's Skin": [
    { name: "ACNE", href: "/products/acne" },
    { name: "Eye Cream", href: "/products/eye-cream" },
    { name: "Face Wash", href: "/products/facewash" },
    { name: "Hair Care", href: "/products/hair-care" },
    { name: "Mackup", href: "/products/mackup" },
    { name: "Night Cream", href: "/products/night-cream" },
    { name: "Serum", href: "/products/serum" },
    { name: "Sunscrean", href: "/products/sunscrean" },
    { name: "Toner", href: "/products/toner" },
  ],
  "Womens": [
      { name: "Womens", href: "/products/womens"},
      { name: "Womens Top Ware & Bottom", href: "/products/womenstopware" },
      { name: "Womens Hudi", href: "/products/womens-hudi"},
      { name: "Ethnic Set (2 & 3 Pcs)", href: "/products/ethnic"},
      { name: "Comfort Wear / Athleisure", href: "/products/womens-comfort-wear"},
      { name: "Footwear", href: "/products/womens-shoe" },
      { name: "Nokshi Bags", href: "/products/nokshi-bags"},
      { name: "Sharee", href: "/products/womens-saree1245"}
  ],
  "Mens": [
  { name: "Mens Coti", href: "/products/womens"},
  { name: "Mens Lungi", href: "/products/Ethnic" },
  { name: "Mens Formal Pant", href: "/products/Womens-bottom-wear"},
  { name: "Mens Punjabi", href: "/products/mens-punjabe" },
  { name: "Mens Jeans Pant", href: "/products/tops-shirt" },
  { name: "Mens Casual Shirt", href: "/products/womens-footwear" },
  { name: "Mens Formal Shirt", href: "/products/womens-bags" },
  { name: "Mens Joggers", href: "/products/accessories" },
  { name: "Mens Polo", href: "/products/comfort-wear", },
  { name: "Mens Innerweare", href: "/products/tops-shirts"},
  ],
  "Kids": [
  { name: "Clothing", href: "/products/womens"},
  { name: "ToysToys", href: "/products/Ethnic"},
  { name: "Baby Skin Care", href: "/products/Womens-bottom-wear"},
  { name: "Moms Care", href: "/products/womens-comfort-wear"},
  { name: "Baby Food", href: "/products/tops-shirt" },
  { name: "Frock & Dungaree", href: "/products/womens-footwear" },
  { name: "Tops & Ethnic", href: "/products/womens-bags"},
  { name: "Kabli Punjabi", href: "/products/boys-panjabi" },
  { name: "Polo T-Shirt", href: "/products/tops-shirts" },
  ],
  "Daily Needs": [
    { name: "Household Items", href: "/daily/household" },
    { name: "Personal Care", href: "/daily/personal" },
    { name: "Snacks", href: "/daily/snacks" },
  ],
};

const allTopLevel = [
  { name: "Marketplace", href: "/shop" },
  { name: "Shahara's Skin", href: "/products/shahara-skin", key: "Shahara's Skin" },
  { name: "Womens", href: "/womens", key : "Womens"},
  { name: "Mens", href: "/products/mens-winter", key: "Mens" },
  { name: "Kids", href: "/products/kids-winter", key: "Kids" },
  { name: "Daily Needs", href: "/products/daily-needs", key: "Daily Needs" },
  { name: "BEST DEALS", href: "/products/BEST-DEALS" },
  { name: "Health Care", href: "/healthcare" },
  { name: "Grocery Shop", href: "/food" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "My Orders", href: "/orders" },
];

export function MobileBottomNav(): JSX.Element {
  const location = useLocation();
  const [cartCount, setCartCount] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { name: "HOME", href: "/", icon: Home },
    { name: "BEST DEALS", href: "/products/BEST-DEALS", icon: Grid },
    { name: "CART", href: "/cart", icon: ShoppingCart, badge: cartCount },
    { name: "ACCOUNTS", href: "/profile", icon: User },
  ];

  const readCartCountFromStorage = (): number => {
    try {
      const raw = localStorage.getItem("cart");
      if (!raw) return 0;
      const cart = JSON.parse(raw) as Array<{ quantity?: number }>;
      return cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    } catch (err) {
      console.warn("Failed to parse cart from localStorage:", err);
      return 0;
    }
  };

  useEffect(() => {
    setCartCount(readCartCountFromStorage());

    const onCartUpdated = () => setCartCount(readCartCountFromStorage());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cart") setCartCount(readCartCountFromStorage());
    };

    window.addEventListener("cartUpdated", onCartUpdated);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("cartUpdated", onCartUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  // sanitize key to use in id attributes (no spaces / special chars)
  const sanitizeKey = (k: string) =>
    k
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

  // двухколонное разделение: হেডার এবং সাধারণ আইটেম ঠিকঠাক রাখতে চেষ্টা করে
  const splitToTwoColumns = (items: Array<any>) => {
    // exclude highlight from grid (we show highlight separately)
    const nonHighlight = items.filter((i) => !i.isHighlight);

    // We'll distribute items preserving order but balancing count roughly.
    const total = nonHighlight.length;
    const targetPerCol = Math.ceil(total / 2);

    const col1: any[] = [];
    const col2: any[] = [];
    let cur = col1;
    let countCur = 0;

    for (let i = 0; i < nonHighlight.length; i++) {
      const item = nonHighlight[i];

      // If current column has reached targetPerCol, switch to col2
      if (countCur >= targetPerCol && cur === col1) {
        cur = col2;
        countCur = col2.length;
      }

      cur.push(item);
      countCur++;

      // if item isHeader, keep following items in same column (so header stays with its block)
      if (item.isHeader) {
        // lookahead: if next item exists and adding it won't overflow too much, keep it
        // (we simply continue without switching)
        continue;
      }
    }

    return [col1, col2];
  };

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden shadow-lg"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors relative ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <div className="relative">
                {Icon ? <Icon className="h-6 w-6" /> : null}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                    aria-label={`${item.badge} items in cart`}
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}

        {/* Category sheet with accordion */}
        <Sheet open={menuOpen} onOpenChange={(open) => { setMenuOpen(open); if (!open) setOpenSection(null); }}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Open categories"
            >
              <Menu className="h-6 w-6" />
              <span className="text-xs font-medium">CATEGORY</span>
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[320px]">
            <div className="px-4 py-6 overflow-y-auto h-full">
              <h3 className="text-lg font-semibold mb-3">Categories</h3>

              <div className="flex flex-col gap-2">
                {allTopLevel.map((top) => {
                  const keyRaw = (top as any).key ?? top.name;
                  const hasSub = Boolean((top as any).key && subCategoryData[(top as any).key]);
                  const key = keyRaw;
                  const idKey = sanitizeKey(keyRaw);

                  if (!hasSub) {
                    return (
                      <SheetClose asChild key={top.name}>
                        <Link
                          to={top.href}
                          className="block px-3 py-2 rounded-md hover:bg-accent transition-colors font-medium"
                          onClick={() => {
                            setMenuOpen(false);
                            setOpenSection(null);
                          }}
                        >
                          {top.name}
                        </Link>
                      </SheetClose>
                    );
                  }

                  const isOpen = openSection === key;
                  const items = subCategoryData[key] ?? [];
                  const highlight = items.find((i: any) => i.isHighlight);

                  const [col1, col2] = splitToTwoColumns(items);

                  return (
                    <div key={top.name} className="border-t border-border pt-3">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-1 py-2 hover:bg-accent/50 rounded-md transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={`section-${idKey}`}
                        onClick={() => toggleSection(key)}
                      >
                        <span className="text-base font-bold text-foreground">{top.name}</span>
                        <span className="ml-2 text-primary">
                          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </span>
                      </button>

                      <div
                        id={`section-${idKey}`}
                        className={`mt-2 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[1200px] ease-in p-2 border border-border/80 rounded-lg bg-accent/10" : "max-h-0 ease-out"}`}
                        aria-hidden={!isOpen}
                      >
                        {/* Grid for subcategories: 2 Columns for Mobile */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {[col1, col2].map((colItems, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                              {colItems.map((sub: any) =>
                                sub.isHeader ? (
                                  <div key={sub.name} className="text-sm font-bold text-primary pointer-events-none py-1.5 mt-2">
                                    {sub.name}
                                  </div>
                                ) : (
                                  <SheetClose asChild key={sub.name}>
                                    <Link
                                      to={sub.href}
                                      className="block text-sm py-1 hover:underline text-muted-foreground hover:text-foreground"
                                      onClick={() => {
                                        setMenuOpen(false);
                                        setOpenSection(null);
                                      }}
                                    >
                                      {sub.name}
                                    </Link>
                                  </SheetClose>
                                )
                              )}
                            </div>
                          ))}
                        </div>

                        {/* highlight button if exists */}
                        {highlight && (
                          <div className="mt-4 border-t border-border pt-3">
                            <SheetClose asChild>
                              <Link
                                to={highlight.href}
                                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors"
                                onClick={() => {
                                  setMenuOpen(false);
                                  setOpenSection(null);
                                }}
                              >
                                {highlight.name}
                              </Link>
                            </SheetClose>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default MobileBottomNav;