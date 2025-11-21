import React, { useState } from "react";
// Lucide Icons
import { Menu, Store } from "lucide-react";

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- ডেটা ডেফিনিশন (cleaned) ---
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

const subCategoryData = {
  "Shahara's Skin": [
    { name: "Face Care", href: "/skin/face" },
    { name: "Body Lotion", href: "/skin/body" },
    { name: "Serums", href: "/skin/serums" },
  ],
  Womens: [
    { name: "Womens Top Wear", href: "/womens/top-wear", isHeader: true },
    { name: "Single Ethnic", href: "/womens/single-ethnic" },
    { name: "Ethnic Set (2 & 3 Pcs)", href: "/womens/ethnic-set" },
    { name: "Fashion Tops", href: "/womens/fashion-tops" },
    { name: "Women Shirt", href: "/womens/shirts" },
    { name: "Womens Tees and Tank", href: "/womens/tees" },
    { name: "Scarf", href: "/womens/scarf" },
    { name: "Saree", href: "/womens/saree" },
    { name: "Maternity Wear", href: "/womens/maternity" },

    { name: "Womens Bottom Wear", href: "/womens/bottoms", isHeader: true },
    { name: "Womens Pant", href: "/womens/pant" },
    { name: "Womens Chino Pant", href: "/womens/chino" },
    { name: "Womens Jeans Pant", href: "/womens/jeans" },
    { name: "Womens Formal Pant", href: "/womens/formal-pant" },
    { name: "Womens Cargo Pant", href: "/womens/cargo" },
    { name: "Womens Joggers", href: "/womens/joggers" },
    { name: "Womens Skirt", href: "/womens/skirt" },

    { name: "Womens Modest Wear", href: "/womens/modest", isHeader: true },
    { name: "Womens Western Set", href: "/womens/western-set" },
    { name: "Womens Sleepwear", href: "/womens/sleepwear" },
    { name: "Womens Jumpsuit", href: "/womens/jumpsuit" },
    { name: "Midi Dress", href: "/womens/midi-dress" },
    { name: "Western Gown", href: "/womens/gown" },
    { name: "Womens Shrug", href: "/womens/shrug" },
    { name: "Womens Party Wear", href: "/womens/party-wear" },

    { name: "Winter Collection", href: "/products/womens-winter", isHighlight: true },
  ],
  Mens: [
    { name: "Mens Top Wear", href: "/mens/top-wear", isHeader: true },
    { name: "Mens Panjabi", href: "/mens/panjabi" },
    { name: "Mens Casual Shirt", href: "/mens/casual-shirt" },
    { name: "Mens Formal Shirt", href: "/mens/formal-shirt" },
    { name: "Mens Katua & Fatua", href: "/mens/katua" },
    { name: "Mens T-Shirt", href: "/mens/tshirts" },
    { name: "Mens Polo", href: "/mens/polo" },
    { name: "Mens Coti", href: "/mens/coti" },

    { name: "Mens Bottom Wear", href: "/mens/bottoms", isHeader: true },
    { name: "Mens Formal Pant", href: "/mens/formal-pant" },
    { name: "Mens Chino Pant", href: "/mens/chino" },
    { name: "Mens Jeans Pant", href: "/mens/jeans" },
    { name: "Mens Cargo Pant", href: "/mens/cargo" },
    { name: "Mens Joggers", href: "/mens/joggers" },
    { name: "Mens Shorts", href: "/mens/shorts" },
    { name: "Mens Payjama", href: "/mens/payjama" },

    { name: "Mens Sports Wear", href: "/mens/sports", isHeader: true },
    { name: "Mens Sports Wear Set", href: "/mens/sports-set" },
    { name: "Mens Jersey", href: "/mens/jersey" },
    { name: "Mens Innerwear", href: "/mens/innerwear", isHeader: true },

    { name: "Winter Collection", href: "/mens/winter", isHighlight: true },
  ],
  Kids: [
    { name: "New Born", href: "/kids/newborn", isHeader: true },
    { name: "0-18 Months", href: "/kids/0-18mo" },
    { name: "Boys", href: "/kids/boys" },
    { name: "Girls", href: "/kids/girls" },
    { name: "Baby Boys (2-7Y)", href: "/kids/baby-boys" },
    { name: "Polo & T-Shirt", href: "/kids/polo-tshirt" },
    { name: "Panjabi & Kabli", href: "/kids/panjabi" },
    { name: "Pant & Payjama", href: "/kids/pant-payjama" },
    { name: "Shirt & Katua", href: "/kids/shirt-katua" },
    { name: "Boys Set", href: "/kids/boys-set" },
    { name: "Boys Sleepwear", href: "/kids/boys-sleepwear" },

    { name: "Baby Girls (2-7Y)", href: "/kids/baby-girls", isHeader: true },
    { name: "Girls Kurti", href: "/kids/girls-kurti" },
    { name: "Frock & Dungaree", href: "/kids/frock" },
    { name: "Tops & Skirt", href: "/kids/tops-skirt" },
    { name: "Girls 3 Pcs", href: "/kids/girls-3pcs" },
    { name: "Girls Pant", href: "/kids/girls-pant" },

    { name: "Boys (8-15Y)", href: "/kids/boys-8-15", isHeader: true },
    { name: "Shirt & Katua", href: "/kids/boys-shirt" },
    { name: "Panjabi & Kabli", href: "/kids/boys-panjabi" },
    { name: "Winter Collection", href: "/kids/winter", isHighlight: true },
  ],
  "Daily Needs": [
    { name: "Household Items", href: "/daily/household" },
    { name: "Personal Care", href: "/daily/personal" },
    { name: "Snacks", href: "/daily/snacks" },
  ],
};

const navLinks = [
  { name: "Marketplace", href: "/marketplace" },
  { name: "Shahara's Skin", href: "/products/shahara-skin", subCategories: subCategoryData["Shahara's Skin"] },
  { name: "Womens", href: "/products/womens-winter", subCategories: subCategoryData.Womens },
  { name: "Mens", href: "/products/mens-winter", subCategories: subCategoryData.Mens },
  { name: "Kids", href: "/products/kids-winter", subCategories: subCategoryData.Kids },
  { name: "Daily Needs", href: "/products/daily-needs", subCategories: subCategoryData["Daily Needs"] },
  { name: "BAG DEALS", href: "/products/BAG-DEALS" },
  { name: "Health & Beauty", href: "/products/health-beauty" },
  { name: "Grocery Shop", href: "/products/grocery-shop" },
];

// --- Navbar Component ---
export function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(/** @type {string|null} */ (null));

  const essentialNavLinks = navLinks.filter((link) =>
    ["Marketplace"].includes(link.name)
  );

  const secondaryNavLinks = navLinks.filter((link) =>
    !["Marketplace"].includes(link.name)
  );

  const handleMouseEnter = (linkName) => {
    setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const renderNavLink = (link, isDropdown) => {
    const isLinkHovered = hoveredLink === link.name;

    // --- Grid dropdown renderer (no image column) ---
    const renderGridDropdown = (subCategories) => {
      const highlightItem = subCategories.find((item) => item.isHighlight);
      const filteredSubCategories = subCategories.filter((item) => !item.isHighlight);

      // 3 columns for lists; 4th column reserved for highlight link (no image)
      const threeColumns = 3;
      const itemsPerGridColumn = Math.ceil(filteredSubCategories.length / threeColumns);
      const gridData = [];

      for (let i = 0; i < threeColumns; i++) {
        const start = i * itemsPerGridColumn;
        const end = start + itemsPerGridColumn;
        gridData.push(filteredSubCategories.slice(start, end));
      }

      return (
        <DropdownMenuContent
          className={`p-4 bg-popover w-[800px] shadow-lg`}
          onMouseEnter={() => handleMouseEnter(link.name)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid grid-cols-4 gap-4">
            {/* columns 1-3: lists */}
            {gridData.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col space-y-1">
                {column.map((sub) => (
                  <DropdownMenuItem
                    key={sub.name}
                    asChild
                    className={`cursor-pointer h-auto py-1.5 ${sub.isHeader ? "font-bold text-md text-primary hover:text-primary hover:bg-transparent" : "text-sm hover:bg-muted/50"}`}
                    disabled={sub.isHeader}
                  >
                    <a href={sub.href} className={sub.isHeader ? "pointer-events-none" : ""}>
                      {sub.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </div>
            ))}

            {/* column 4: only highlight link (image removed) */}
            <div className="flex flex-col space-y-2">
              {highlightItem && (
                <DropdownMenuItem key={highlightItem.name} asChild className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold text-center justify-center">
                  <a href={highlightItem.href} className="w-full">
                    {highlightItem.name}
                  </a>
                </DropdownMenuItem>
              )}
            </div>
          </div>
        </DropdownMenuContent>
      );
    };

    // --- Simple dropdown renderer ---
    const renderSimpleDropdown = (subCategories) => (
      <DropdownMenuContent
        className="w-48 bg-popover"
        onMouseEnter={() => handleMouseEnter(link.name)}
        onMouseLeave={handleMouseLeave}
      >
        {subCategories.map((sub) => (
          <DropdownMenuItem key={sub.name} asChild className="cursor-pointer">
            <a href={sub.href}>{sub.name}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    );

    if (isDropdown && link.subCategories) {
      return (
        <DropdownMenu
          key={link.name}
          open={isLinkHovered}
          onOpenChange={(open) => setHoveredLink(open ? link.name : null)}
        >
          <DropdownMenuTrigger asChild>
            <a
              href={link.href}
              className="px-3 py-2 text-md font-bold text-foreground rounded-md transition-colors whitespace-nowrap hover:bg-[hsl(var(--nav-item-hover))] hover:text-primary"
              onMouseEnter={() => handleMouseEnter(link.name)}
              onMouseLeave={handleMouseLeave}
            >
              {link.name}
            </a>
          </DropdownMenuTrigger>

          {link.name === "Mens" || link.name === "Kids" || link.name === "Womens"
            ? renderGridDropdown(link.subCategories)
            : renderSimpleDropdown(link.subCategories)}
        </DropdownMenu>
      );
    }

    // Default link (no dropdown)
    return (
      <a
        key={link.name}
        href={link.href}
        className="px-3 py-2 text-md md:text-base font-bold text-foreground hover:bg-[hsl(var(--nav-item-hover))] rounded-md transition-colors whitespace-nowrap hover:text-primary"
      >
        {link.name}
      </a>
    );
  };

  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* 1. Shop By Category */}
          <div className="hidden sm:block">
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
                    <a href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>{category}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 2. Primary Navigation Links */}
          <div className="flex flex-1 items-center justify-center gap-1 overflow-x-auto scrollbar-hide">
            {essentialNavLinks.map((link) => renderNavLink(link, false))}

            <div className="hidden lg:flex items-center gap-1">
              {secondaryNavLinks.map((link) => renderNavLink(link, true))}
            </div>
          </div>

          {/* 3. Outlets Button */}
          <Button className="hidden sm:flex gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Store className="h-4 w-4" />
            Outlets
          </Button>
        </div>
      </div>
    </nav>
  );
}
