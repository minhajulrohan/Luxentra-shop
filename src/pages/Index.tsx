import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import allProductsData from "@/data/allProducts.json";
import ScrollToTopButton from "@/components/Button";
import PopularCategories from "@/components/PopularCategories";


const Index = () => {
  const products = allProductsData.products;

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
      <Hero />
      <PopularCategories />
      <Features />
      <main className="flex-1">
        {/* Featured Products Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Check out our latest arrivals</p>
            </div>
            <Link to="/shop">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 200).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={typeof product.price === 'string' ? parseFloat(product.price) : product.price}
                originalPrice={product.originalPrice ? (typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice) : undefined}
                image={product.images[0]}
                badge={product.badge}
                categorySlug={product.categorySlug} 
                productSlug={product.slug}
              />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-secondary/20 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
                <p className="text-muted-foreground">Explore our diverse collection</p>
              </div>
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

        {/* Best Sellers Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Most popular items this week</p>
            </div>
            <Link to="/shop">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={typeof product.price === 'string' ? parseFloat(product.price) : product.price}
                originalPrice={product.originalPrice ? (typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice) : undefined}
                image={product.images[0]}
                badge={product.badge}
                categorySlug={product.categorySlug} 
                productSlug={product.slug}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
