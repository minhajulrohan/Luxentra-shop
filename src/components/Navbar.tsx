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

// // --- Subcategories Data ---
// const subCategoryData = {
//   "Shahara's Skin": [
//     { name: "Face Care", href: "/skin/face" },
//     { name: "Body Lotion", href: "/skin/body" },
//     { name: "Serums", href: "/skin/serums" },
//   ],
//   "Womens": [
//     { name: "Womens Top Wear", href: "/womens/top-wear", isHeader: true },
//     { name: "Single Ethnic", href: "/products/single-ethnic" },
//     { name: "Ethnic Set (2 & 3 Pcs)", href: "/products/ethnic-set" },
//     { name: "Fashion Tops", href: "/products/fashion-tops" },
//     { name: "Women Shirt", href: "/products/womens-shirts" },
//     { name: "Womens Tees and Tank", href: "/products/tees" },
//     { name: "Scarf", href: "/products/scarf" },
//     { name: "Saree", href: "/products/saree" },
//     { name: "Maternity Wear", href: "/products/maternity" },
//     { name: "Womens Bottom Wear", href: "/products/bottoms", isHeader: true },
//     { name: "Womens Pant", href: "/products/womens-pant" },
//     { name: "Womens Chino Pant", href: "/products/womens-chino" },
//     { name: "Womens Jeans Pant", href: "/products/womens-jeans" },
//     { name: "Womens Formal Pant", href: "/products/womens-formal-pant" },
//     { name: "Womens Cargo Pant", href: "/products/womens-cargo" },
//     { name: "Womens Joggers", href: "/products/womens-joggers" },
//     { name: "Womens Skirt", href: "/products/womens-skirt" },
//     { name: "Womens Modest Wear", href: "/products/womens-modest", isHeader: true },
//     { name: "Womens Western Set", href: "/products/womens-western-set" },
//     { name: "Womens Sleepwear", href: "/products/womens-sleepwear" },
//     { name: "Womens Jumpsuit", href: "/products/womens-jumpsuit" },
//     { name: "Midi Dress", href: "/products/womens-midi-dress" },
//     { name: "Western Gown", href: "/products/womens-gown" },
//     { name: "Womens Shrug", href: "/products/womens-shrug" },
//     { name: "Womens Party Wear", href: "/products/womens-party-wear" },
//     { name: "Winter Collection", href: "/products/womens-winter", isHighlight: true },
//   ],
//   "Mens": [
//     { name: "Mens Top Wear", href: "/products/mens-top-wear", isHeader: true },
//     { name: "Mens Panjabi", href: "/products/mens-panjabi" },
//     { name: "Mens Casual Shirt", href: "/products/menscasual-shirt" },
//     { name: "Mens Formal Shirt", href: "/products/mens-formal-shirt" },
//     { name: "Mens Katua & Fatua", href: "/products/mens-katua" },
//     { name: "Mens T-Shirt", href: "/products/mens-shirts" },
//     { name: "Mens Polo", href: "/products/mens-polo" },
//     { name: "Mens Coti", href: "/products/mens-coti" },
//     { name: "Mens Bottom Wear", href: "/products/mens-bottoms", isHeader: true },
//     { name: "Mens Formal Pant", href: "/products/mens-formal-pant" },
//     { name: "Mens Chino Pant", href: "/products/mens-chino" },
//     { name: "Mens Jeans Pant", href: "/products/mens-jeans" },
//     { name: "Mens Cargo Pant", href: "/products/mens-cargo" },
//     { name: "Mens Joggers", href: "/products/mens-joggers" },
//     { name: "Mens Shorts", href: "/products/mens-shorts" },
//     { name: "Mens Payjama", href: "/products/mens-payjama" },
//     { name: "Mens Sports Wear", href: "/products/mens-sports", isHeader: true },
//     { name: "Mens Sports Wear Set", href: "/products/mens-sports-set" },
//     { name: "Mens Jersey", href: "/products/mens-jersey" },
//     { name: "Mens Innerwear", href: "/products/mens-innerwear", isHeader: true },
//     { name: "Winter Collection", href: "/products/mens-winter", isHighlight: true },
//   ],
//   "Kids": [
//     { name: "New Born", href: "/products/newborn", isHeader: true },
//     { name: "0-18 Months", href: "/products/0-18mo" },
//     { name: "Boys", href: "/products/boys" },
//     { name: "Girls", href: "/products/girls" },
//     { name: "Baby Boys (2-7Y)", href: "/products/baby-boys" },
//     { name: "Polo & T-Shirt", href: "/products/polo-tshirt" },
//     { name: "Panjabi & Kabli", href: "/products/panjabi" },
//     { name: "Pant & Payjama", href: "/products/pant-payjama" },
//     { name: "Shirt & Katua", href: "/products/shirt-katua" },
//     { name: "Boys Set", href: "/products/boys-set" },
//     { name: "Boys Sleepwear", href: "/products/boys-sleepwear" },
//     { name: "Baby Girls (2-7Y)", href: "/products/baby-girls", isHeader: true },
//     { name: "Girls Kurti", href: "/products/girls-kurti" },
//     { name: "Frock & Dungaree", href: "/products/frock" },
//     { name: "Tops & Skirt", href: "/products/tops-skirt" },
//     { name: "Girls 3 Pcs", href: "/products/girls-3pcs" },
//     { name: "Girls Pant", href: "/products/girls-pant" },
//     { name: "Boys (8-15Y)", href: "/products/boys-8-15", isHeader: true },
//     { name: "Shirt & Katua", href: "/products/boys-shirt" },
//     { name: "Panjabi & Kabli", href: "/products/boys-panjabi" },
//     { name: "Winter Collection", href: "/products/winter", isHighlight: true },
//   ],
//   "Daily Needs": [
//     { name: "Household Items", href: "/products/household" },
//     { name: "Personal Care", href: "/products/personal" },
//     { name: "Snacks", href: "/products/snacks" },
//   ],
//   "Health Care": [
//     { name: "OTC Medicines", href: "/products/otc-medicines" },
//     { name: "Online Doctor's", href: "/products/online-doctors" },
//   ],
// };

// --- Categories for Shop By Category ---
// const categories = [
//   "Electronics",
//   "Fashion & Apparel",
//   "Home & Garden",
//   "Sports & Outdoors",
//   "Health & Beauty",
//   "Toys & Games",
//   "Books & Media",
//   "Automotive",
//   "Jewelry & Watches",
//   "Pet Supplies",
// ];

// --- Navbar Links ---
const navLinks = [
  { name: "Marketplace", href: "/marketplace" },
  { name: "Shahara's Skin", href: "/shaharaskincare"},
  { name: "Womens", href: "/womens"},
  { name: "Mens", href: "/products/mens-winter"},
  { name: "Kids", href: "/products/kids-winter"},
  { name: "Daily Needs", href: "/products/Daily-Needs" },
  { name: "BAG DEALS", href: "/products/BAG-DEALS" },
  { name: "Health Care", href: "/healthcare"},
  { name: "Grocery Shop", href: "/food" },
];

// ============================
//      NAVBAR COMPONENT
// ============================

export function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const openDropdown = (name) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setHoveredLink(name);
  };

  const closeDropdown = () => {
    const timeout = setTimeout(() => {
      setHoveredLink(null);
    }, 300); // ← Hover delay (300ms)
    setCloseTimeout(timeout);
  };

  const handleMouseEnter = (name) => openDropdown(name);
  const handleMouseLeave = () => closeDropdown();

  const essentialNavLinks = navLinks.filter((link) =>
    ["Marketplace", "Shahara's Skin"].includes(link.name)
  );

  const secondaryNavLinks = navLinks.filter(
    (link) => !["Marketplace", "Shahara's Skin"].includes(link.name)
  );

  // --- Grid Dropdown ---
  const renderGridDropdown = (subCategories, linkName) => {
    const highlightItem = subCategories.find((item) => item.isHighlight);
    const filtered = subCategories.filter((item) => !item.isHighlight);

    const columns = 3;
    const itemsPerColumn = Math.ceil(filtered.length / columns);

    const gridData = [];
    for (let i = 0; i < columns; i++) {
      gridData.push(filtered.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn));
    }

    return (
      <DropdownMenuContent
        className="p-4 bg-popover w-[800px] shadow-lg"
        onMouseEnter={() => handleMouseEnter(linkName)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="grid grid-cols-4 gap-4">
          {gridData.map((col, idx) => (
            <div key={idx} className="flex flex-col space-y-1">
              {col.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  asChild
                  disabled={item.isHeader}
                  className={`cursor-pointer h-auto py-1.5 ${
                    item.isHeader
                      ? "font-bold text-md text-primary hover:bg-transparent"
                      : "text-sm hover:bg-muted/50"
                  }`}
                >
                  <a href={item.href} className={item.isHeader ? "pointer-events-none" : ""}>
                    {item.name}
                  </a>
                </DropdownMenuItem>
              ))}
            </div>
          ))}

          <div>
            {highlightItem && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold text-center"
              >
                <a href={highlightItem.href}>{highlightItem.name}</a>
              </DropdownMenuItem>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    );
  };

  // --- Simple Dropdown ---
  const renderSimpleDropdown = (sub, linkName) => (
    <DropdownMenuContent
      className="w-48 bg-popover"
      onMouseEnter={() => handleMouseEnter(linkName)}
      onMouseLeave={handleMouseLeave}
    >
      {sub.map((item) => (
        <DropdownMenuItem key={item.name} asChild>
          <a href={item.href}>{item.name}</a>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );

  // --- Render Link ---
  const renderNavLink = (link, isDropdown) => {
    const isHovered = hoveredLink === link.name;

    if (isDropdown && link.subCategories) {
      return (
        <DropdownMenu
          key={link.name}
          open={isHovered}
          onOpenChange={(open) => (open ? openDropdown(link.name) : closeDropdown())}
        >
          <DropdownMenuTrigger
            asChild
            onMouseEnter={() => handleMouseEnter(link.name)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href={link.href}
              className="px-3 py-2 text-md font-bold text-foreground rounded-md hover:bg-[hsl(var(--nav-item-hover))] hover:text-primary transition"
            >
              {link.name}
            </a>
          </DropdownMenuTrigger>

          {["Mens", "Kids", "Womens"].includes(link.name)
            ? renderGridDropdown(link.subCategories, link.name)
            : renderSimpleDropdown(link.subCategories, link.name)}
        </DropdownMenu>
      );
    }

    return (
      <a
        key={link.name}
        href={link.href}
        className="px-3 py-2 text-md font-bold hover:bg-[hsl(var(--nav-item-hover))] hover:text-primary rounded-md transition"
      >
        {link.name}
      </a>
    );
  };

  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Shop By Category */}
          {/* <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-primary font-semibold">
                  <Menu className="h-5 w-5" />
                  Shop By Category
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-popover">
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat} asChild>
                    <a href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}>
                      {cat}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}

          {/* Primary Navigation */}
          <div className="flex flex-1 items-center justify-center gap-1 overflow-x-auto scrollbar-hide">
            {essentialNavLinks.map((link) => renderNavLink(link, false))}

            <div className="hidden lg:flex items-center gap-1">
              {secondaryNavLinks.map((link) => renderNavLink(link, true))}
            </div>
          </div>

          {/* Outlets Button */}
          <Button className="hidden sm:flex gap-2 bg-primary text-white">
            <Store className="h-4 w-4" />
            Outlets
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
