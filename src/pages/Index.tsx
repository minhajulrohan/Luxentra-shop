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

  // ⭐️ --- THE NEW, SIMPLE FILTER FUNCTION ---
  /**
   * Filters products based on the explicit 'collection' field added to the product object.
   * This prevents products from leaking between sections.
   */
  function filterProductsByExplicitCollection(targetCollection) {
    const requiredCollection = targetCollection.toLowerCase();
    
    return allProducts.filter((product) => {
      // Check if the product has the exact collection tag.
      const productCollection = product.collection ? product.collection.toLowerCase() : "";
      
      // Exact match check is the most reliable method.
      return productCollection === requiredCollection;
    });
  }
  // ------------------------------------------

  // --- Filtered Products (Using the new function) ---
  // The function now strictly pulls products based on the single 'collection' field value.
  const mensProducts = filterProductsByExplicitCollection("mens").slice(0, 12);
  const womensProducts = filterProductsByExplicitCollection("womens").slice(0, 12);
  const kidsProducts = filterProductsByExplicitCollection("kids").slice(0, 12);

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