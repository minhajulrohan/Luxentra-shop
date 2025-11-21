import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import allProductsData from "@/data/allProducts.json";
import ScrollToTopButton from "@/components/Button";
import { HeroSlider } from "./HeroSliderM";
import PopulerCategoryM from "@/components/PopulerCategoryM";
import NewArrivals from "@/components/NewArivalM";




const Marketplace = () => {
  const products = allProductsData.products;

  
const fetchedProducts = [ /* ... your array of JSON objects ... */]; 

// The filter buttons shown in the image
const filterButtons = ["Smart TV", "LED TV", "Bags", "Analog Watches", "Smart Watches", "Shaving And Trimming"];

  const categories = [
    {
      name: "Accessories",
      count: 24,
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500",
    },
    {
      name: "Footwear",
      count: 18,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500",
    },
    {
      name: "Clothing",
      count: 32,
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500",
    },
    {
      name: "Fashion",
      count: 28,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500",
    },
    
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSlider />
     <PopulerCategoryM />
      <main className="flex-1">
        {/* Categories Section */}
        <section className="bg-secondary/20 py-5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/products/footwear">
                <CategoryCard
                  name="Footwear"
                  count={allProductsData.products.filter(p => p.category === "Footwear").length}
                  image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
                />
              </Link>
              <Link to="/products/accessories">
                <CategoryCard
                  name="Accessories"
                  count={allProductsData.products.filter(p => p.category === "Accessories").length}
                  image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
                />
              </Link>
              <Link to="/products/clothing">
                <CategoryCard
                  name="Clothing"
                  count={allProductsData.products.filter(p => p.category === "Clothing").length}
                  image="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
                />
              </Link>
              <Link to="/products/fashion">
                <CategoryCard
                  name="Fashion"
                  count={allProductsData.products.filter(p => p.category === "Fashion").length}
                  image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                />
              </Link>
            </div>
          </div>
        </section>
        <NewArrivals
          products={fetchedProducts} 
          categories={filterButtons}
        />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Marketplace;
