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
    { name: "Single Ethnic", href: "/products/single-ethnic" },
    { name: "Ethnic Set (2 & 3 Pcs)", href: "/products/ethnic-set" },
    { name: "Fashion Tops", href: "/products/fashion-tops" },
    { name: "Women Shirt", href: "/products/shirts" },
    { name: "Womens Tees and Tank", href: "/products/tees" },
    { name: "Scarf", href: "/products/scarf" },
    { name: "Saree", href: "/products/saree" },
    { name: "Maternity Wear", href: "/products/maternity" },

    { name: "Womens Bottom Wear", href: "/products/bottoms", isHeader: true },
    { name: "Womens Pant", href: "/products/pant" },
    { name: "Womens Chino Pant", href: "/products/chino" },
    { name: "Womens Jeans Pant", href: "/products/jeans" },
    { name: "Womens Formal Pant", href: "/products/formal-pant" },
    { name: "Womens Cargo Pant", href: "/products/cargo" },
    { name: "Womens Joggers", href: "/products/joggers" },
    { name: "Womens Skirt", href: "/products/skirt" },

    { name: "Womens Modest Wear", href: "/products/modest", isHeader: true },
    { name: "Womens Western Set", href: "/products/western-set" },
    { name: "Womens Sleepwear", href: "/products/sleepwear" },
    { name: "Womens Jumpsuit", href: "/products/jumpsuit" },
    { name: "Midi Dress", href: "/products/midi-dress" },
    { name: "Western Gown", href: "/products/gown" },
    { name: "Womens Shrug", href: "/products/shrug" },
    { name: "Womens Party Wear", href: "/products/party-wear" },

    { name: "Winter Collection", href: "/products/womens-winter", isHighlight: true },
  ],
  Mens: [
    { name: "Mens Top Wear", href: "/products/top-wear", isHeader: true },
    { name: "Mens Panjabi", href: "/products/panjabi" },
    { name: "Mens Casual Shirt", href: "/products/casual-shirt" },
    { name: "Mens Formal Shirt", href: "/products/formal-shirt" },
    { name: "Mens Katua & Fatua", href: "/products/katua" },
    { name: "Mens T-Shirt", href: "/products/shirts" },
    { name: "Mens Polo", href: "/products//polo" },
    { name: "Mens Coti", href: "/products/coti" },

    { name: "Mens Bottom Wear", href: "/products/bottoms", isHeader: true },
    { name: "Mens Formal Pant", href: "/products/formal-pant" },
    { name: "Mens Chino Pant", href: "/products/chino" },
    { name: "Mens Jeans Pant", href: "/products/jeans" },
    { name: "Mens Cargo Pant", href: "/products/cargo" },
    { name: "Mens Joggers", href: "/products/joggers" },
    { name: "Mens Shorts", href: "/products/shorts" },
    { name: "Mens Payjama", href: "/products/payjama" },

    { name: "Mens Sports Wear", href: "/products/sports", isHeader: true },
    { name: "Mens Sports Wear Set", href: "/products/sports-set" },
    { name: "Mens Jersey", href: "/products/jersey" },
    { name: "Mens Innerwear", href: "/products/innerwear", isHeader: true },

    { name: "Winter Collection", href: "/products/winter", isHighlight: true },
  ],
  Kids: [
    { name: "New Born", href: "/products/newborn", isHeader: true },
    { name: "0-18 Months", href: "/products/0-18mo" },
    { name: "Boys", href: "/products/boys" },
    { name: "Girls", href: "/products/girls" },
    { name: "Baby Boys (2-7Y)", href: "/products/baby-boys" },
    { name: "Polo & T-Shirt", href: "/products/polo-tshirt" },
    { name: "Panjabi & Kabli", href: "/products/panjabi" },
    { name: "Pant & Payjama", href: "/products/pant-payjama" },
    { name: "Shirt & Katua", href: "/products/shirt-katua" },
    { name: "Boys Set", href: "/products/boys-set" },
    { name: "Boys Sleepwear", href: "/products/boys-sleepwear" },

    { name: "Baby Girls (2-7Y)", href: "/products/baby-girls", isHeader: true },
    { name: "Girls Kurti", href: "/products/girls-kurti" },
    { name: "Frock & Dungaree", href: "/products/frock" },
    { name: "Tops & Skirt", href: "/products/tops-skirt" },
    { name: "Girls 3 Pcs", href: "/products/girls-3pcs" },
    { name: "Girls Pant", href: "/products/girls-pant" },

    { name: "Boys (8-15Y)", href: "/products/boys-8-15", isHeader: true },
    { name: "Shirt & Katua", href: "/products/boys-shirt" },
    { name: "Panjabi & Kabli", href: "/products/boys-panjabi" },
    { name: "Winter Collection", href: "/products/winter", isHighlight: true },
  ],
  "Daily Needs": [
    { name: "Household Items", href: "/products/household" },
    { name: "Personal Care", href: "/products/personal" },
    { name: "Snacks", href: "/products/snacks" },
  ],
};

const navLinks = [
  { name: "Marketplace", href: "/marketplace" },
  { name: "Shahara's Skin", href: "/products/shahara-skin", subCategories: subCategoryData["Shahara's Skin"] },
  { name: "Womens", href: "/products/womens/", subCategories: subCategoryData.Womens },
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


export default Navbar;