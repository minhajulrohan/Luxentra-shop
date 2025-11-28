// src/pages/Index.jsx
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import allProductsData from "@/data/allProducts.json";
import ScrollToTopButton from "@/components/Button";
import PopularCategories from "@/components/PopularCategories";
import { Helmet } from "react-helmet-async";
import CollectionSection from "@/components/CollectionSection";
import EmailSubscription from './../components/EmailSubscription';
const Index = () => {
  const navigate = useNavigate();
  const allProducts = allProductsData?.products || [];

  // --- Category Filter Function ---
  function filterProductsByCategory(category) {
    return allProducts.filter((product) => {
      // specifications theke gender check kora
      const genderSpec = product.specifications.find(
        (spec) => spec.label.toLowerCase().includes("gender")
      )?.value.toLowerCase() || "";

      // categorySlug or categoryName theke category match kora
      const categorySlug = product.categorySlug?.toLowerCase() || "";
      const categoryName = product.category?.toLowerCase() || "";

      if (category === "mens") {
        return (
          genderSpec.includes("male") ||
          categoryName.includes("men") ||
          categorySlug.includes("men")
        );
      } else if (category === "womens") {
        return (
          genderSpec.includes("female") ||
          categoryName.includes("women") ||
          categorySlug.includes("women")
        );
      } else if (category === "kids") {
        return (
          genderSpec.includes("kids") ||
          categoryName.includes("kids") ||
          categorySlug.includes("kids")
        );
      } else {
        return false;
      }
    });
  }

  // --- Filtered Products ---
  const mensProducts = filterProductsByCategory("mens").slice(0, 12);
  const womensProducts = filterProductsByCategory("womens").slice(0, 12);
  const kidsProducts = filterProductsByCategory("kids").slice(0, 12);

  // Navigate helper
  const handleViewAll = (collection) => {
    navigate(`/${collection}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Luxentra Shop – বাংলাদেশের ট্রাস্টেড অনলাইন শপ</title>
        <meta name="description" content="Welcome to MyStore — best products online." />
        <meta property="og:title" content="Home — MyStore" />
      </Helmet>

      <Header />
      <Hero />
      <PopularCategories />
      <Features />

      {/* --- Mens Collection --- */}
      <CollectionSection
        title="Men's Collection"
        subtitle="Grab these new items before they are gone!"
        products={mensProducts}
        onViewAll={() => handleViewAll("mens")}
        sectionClass="bg-stone-200"
      />

      {/* --- Womens Collection --- */}
      <CollectionSection
        title="Women's Collection"
        subtitle="Grab these new items before they are gone!"
        products={womensProducts}
        onViewAll={() => handleViewAll("womens")}
        sectionClass="bg-stone-200"
      />

      {/* --- Kids Collection --- */}
      <CollectionSection
        title="Kids Collection"
        subtitle="Fun and fashionable items for children!"
        products={kidsProducts}
        onViewAll={() => handleViewAll("kids")}
        sectionClass="bg-stone-200"
      />

      {/* Remaining Sections */}
      <EmailSubscription />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
