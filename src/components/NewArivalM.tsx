import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Button from "./Button";

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice: number | string;
  category: string;
  categorySlug: string;
  badge: string;
  images: string[];
}

interface ProductsProps {
  products: Product[];
  categories: string[];
}

const defaultCategories = [
  "smart-tv",
  "LED TV",
  "Bags",
  "Analog Watches",
  "Smart Watches",
  "Shaving And Trimming",
];

// Helper function for clean matching
const normalize = (str: string) =>
  str?.toLowerCase().replace(/[- ]/g, "");

const NewArrivals: React.FC<ProductsProps> = ({
  products = [],
  categories = defaultCategories,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("Smart-Tv");

  // Filter products safely (case-insensitive & hyphen/space-safe)
  const filteredProducts = products.filter((product) => {
    if (activeCategory === "All") return true;

    return (
      normalize(product.category) === normalize(activeCategory)
    );
  });

  const productsToDisplay = filteredProducts.slice(0, 12);

  return (
    <section className="w-full py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">New Arrivals</h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300
                ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 xl:gap-8">
          {productsToDisplay.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No new arrivals found in this category.
            </p>
          ) : (
            productsToDisplay.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={
                  product.originalPrice
                    ? Number(product.originalPrice)
                    : null
                }
                image={
                  product.images?.[0] ||
                  "https://via.placeholder.com/300?text=No+Image"
                }
                badge={product.badge}
                categorySlug={product.categorySlug}
                productSlug={product.slug}
              />
            ))
          )}
        </div>

        {/* View All Button */}
        {filteredProducts.length > 12 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              View All
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
