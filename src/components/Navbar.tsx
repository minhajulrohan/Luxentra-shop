import { useState } from "react";
// Lucide Icons
import { Menu, Store } from "lucide-react";

// shadcn/ui Components (We are keeping DropdownMenu but removing Sheet)
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Removed: import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Removed: import { Separator } from "@/components/ui/separator"; 

// --- Data Definitions ---

const categories = [
  "Electronics",
  "Fashion & Apparel",
  "Home & Garden",
  "Sports & Outdoors",
  "Health & Beauty",
  "Toys & Games",
  "Books & Media",
  "Automotive",
  "Jewelry & Watches",
  "Pet Supplies",
];

const navLinks = [
  { name: "Marketplace", href: "/shop" },
  { name: "Shahara's Skin", href: "/products/shahara-skin" },
  { name: "Womens", "href": "/products/womens-winter" },
  { name: "Mens", href: "/products/mens-winter" },
  { name: "Kids", href: "/products/kids-winter" },
  { name: "Dayli Needs", href: "/products/Dayli-Needs" },
  { name: "BAG DEALS", href: "/products/BAG-DEALS" },
  { name: "Healty & Beuty", href: "/products/Healty-Beuty" },
  { name: "Grocerry Shop", href: "/products/Grocerry-Shop" }
];

export function Navbar() {
  // Removed: const [isOpen, setIsOpen] = useState(false);

  // Links to show always (Marketplace, SaRa, DHEU)
  const essentialNavLinks = navLinks.filter(link => 
    ["Marketplace", "Shahara's Skin", "Womens"].includes(link.name)
  );
    
  // Links to show only on Desktop/Dropdown (The rest of the links)
  const secondaryNavLinks = navLinks.filter(link => 
    !["Marketplace", "Shahara's Skin", "Womens"].includes(link.name)
  );

  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* 1. Shop By Category Dropdown (Visible on Desktop, Hidden on Mobile) */}
          <div className="hidden sm:block"> {/* Hide completely on extra small screens if needed, otherwise use hidden lg:block */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 font-semibold text-primary hover:text-primary hover:bg-[hsl(var(--nav-item-hover))]">
                  <Menu className="h-5 w-5" />
                  Shop By Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} className="cursor-pointer">
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* 2. Primary Navigation Links (ALWAYS VISIBLE: Marketplace, SaRa, DHEU) */}
          {/* We now show this flex container on ALL screen sizes */}
          <div className="flex flex-1 items-center justify-center gap-1 overflow-x-auto scrollbar-hide ">
            {essentialNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                // Increased padding/font size for better tap target on mobile
                className="px-3 py-2 text-md md:text-base font-bold text-foreground hover:bg-[hsl(var(--nav-item-hover))] rounded-md transition-colors whitespace-nowrap hover:text-primary"
              >
                {link.name}
              </a>
            ))}
            
            {/* Secondary Links: Hidden on Mobile, Shown on Desktop/Dropdown (if necessary) */}
            <div className="hidden lg:flex items-center gap-1">
                {secondaryNavLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="px-3 py-2 text-md font-bold text-foreground hover:bg-[hsl(var(--nav-item-hover))] rounded-md transition-colors whitespace-nowrap hover:text-primary"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

          </div>

          {/* 3. Outlets Button (Hidden below 'lg' breakpoint) */}
          <Button className="hidden sm:flex gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Store className="h-4 w-4" />
            Outlets
          </Button>

          {/* 4. Removed Mobile Menu (Sheet) */}
          
        </div>
      </div>
    </nav>
  );
}