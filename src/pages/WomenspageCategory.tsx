// src/pages/Shop.jsx (or wherever your Shop component lives)
import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import allProductsData from "@/data/allProducts.json";
import Womenscategory from "@/components/Womens/Womenscategory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ScrollToTopButton from "@/components/Button";

const ITEMS_PER_PAGE = 40;

const WomenspageCategory = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(Number.isNaN(pageParam) ? 1 : pageParam);

  // categories list
  const categories = useMemo(
    () => ["all", ...new Set(allProductsData.products.map((p) => p.category))],
    []
  );

  // filter by search and category
  let filteredProducts = allProductsData.products;

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterCategory !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === filterCategory);
  }

  // sort
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.price) - Number(b.price);
        case "price-high":
          return Number(b.price) - Number(a.price);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // total pages
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));

  // make sure currentPage stays in range when filters change
  useEffect(() => {
    const newPage = Math.min(Math.max(1, currentPage), totalPages);
    if (newPage !== currentPage) setCurrentPage(newPage);
    // reflect in URL param
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      // preserve existing search query param if present
      if (searchQuery) next.set("search", searchQuery);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // sync currentPage when URL page param changes (e.g., user navigates /?page=2)
  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    if (!Number.isNaN(p) && p !== currentPage) {
      setCurrentPage(p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // slice products for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageProducts = sortedProducts.slice(startIndex, endIndex);

  // handler to change page (updates state + URL param)
  const goToPage = (p) => {
    const pageNum = Math.min(Math.max(1, p), totalPages);
    setCurrentPage(pageNum);
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pageNum));
    setSearchParams(next);
    // scroll to top of products section (optional)
    const productsSection = document.querySelector("section.py-8");
    if (productsSection) productsSection.scrollIntoView({ behavior: "smooth" });
  };

  const prevPage = () => goToPage(currentPage - 1);
  const nextPage = () => goToPage(currentPage + 1);

  // small helper to render page numbers with ellipsis if many pages
  const renderPageNumbers = () => {
    const pages = [];
    const maxButtons = 7; // show up to 7 buttons including first/last/near current
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // always show first, last and around current
      pages.push(1);
      let left = Math.max(2, currentPage - 1);
      let right = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        left = 2;
        right = 4;
      } else if (currentPage >= totalPages - 2) {
        left = totalPages - 3;
        right = totalPages - 1;
      }

      if (left > 2) pages.push("left-ellipsis");
      for (let p = left; p <= right; p++) pages.push(p);
      if (right < totalPages - 1) pages.push("right-ellipsis");
      pages.push(totalPages);
    }

    return pages.map((p, idx) => {
      if (p === "left-ellipsis" || p === "right-ellipsis") {
        return (
          <span key={`e-${idx}`} className="px-2 text-muted-foreground">
            …
          </span>
        );
      }
      return (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`mx-1 w-9 h-9 rounded-md flex items-center justify-center ${
            p === currentPage ? "bg-primary text-white" : "bg-background border"
          }`}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
    <Helmet>
    <title>Luxentra-shop || Womens Category</title>
    <meta name="description" content="Welcome to MyStore — best products online." />
    <meta property="og:title" content="Home — MyStore" />
      </Helmet>
      <Header />
      <Womenscategory />
      <main className="flex-1">
        
        <section className="bg-secondary/30 py-2">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-2">Womens Collection's</h1>
            <p className="text-muted-foreground">Discover our complete collection</p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v); goToPage(1); }}>
                  <SelectTrigger className="w-full sm:w-[220px] h-12 bg-background border-2 border-primary">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] bg-background border shadow-lg z-50">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="cursor-pointer hover:bg-accent">
                        {cat === "all" ? "All Categories" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={(v) => { setSortBy(v); goToPage(1); }}>
                <SelectTrigger className="w-full sm:w-[220px] h-12 bg-background border-2">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="featured" className="cursor-pointer hover:bg-accent">Featured</SelectItem>
                  <SelectItem value="price-low" className="cursor-pointer hover:bg-accent">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="cursor-pointer hover:bg-accent">Price: High to Low</SelectItem>
                  <SelectItem value="name" className="cursor-pointer hover:bg-accent">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
              {pageProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={typeof product.price === "string" ? parseFloat(product.price) : product.price}
                  originalPrice={
                    product.originalPrice
                      ? typeof product.originalPrice === "string"
                        ? parseFloat(product.originalPrice)
                        : product.originalPrice
                      : undefined
                  }
                  image={product.images[0]}
                  badge={product.badge}
                  categorySlug={product.categorySlug}
                  productSlug={product.slug}
                  colors={product.colors}
                  sizes={product.sizes}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-background border"}`}
              >
                Prev
              </button>

              {renderPageNumbers()}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-background border"}`}
              >
                Next
              </button>
            </div>

            {/* optional: show range info */}
            <div className="mt-3 text-center text-sm text-muted-foreground">
              Showing {Math.min(sortedProducts.length, startIndex + 1)}–{Math.min(sortedProducts.length, endIndex)} of {sortedProducts.length} products
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default WomenspageCategory;
