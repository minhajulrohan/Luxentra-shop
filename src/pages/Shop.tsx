import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ScrollToTopButton from "@/components/Button";

const Shop = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const categories = ["all", ...new Set(productsData.products.map(p => p.category))];

  let filteredProducts = productsData.products;

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterCategory !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Shop All Products</h1>
            <p className="text-muted-foreground">Discover our complete collection</p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.images[0]}
                  badge={product.badge}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Shop;
