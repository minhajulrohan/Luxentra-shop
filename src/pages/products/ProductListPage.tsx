import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import allProductsData from "@/data/allProducts.json";
import ScrollToTopButton from "@/components/Button";

const ProductListPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  // Filter products by categorySlug
  const filteredProducts = allProductsData.products.filter(
    (product) => product.categorySlug === categorySlug
  );

  const categoryName = filteredProducts[0]?.category || categorySlug;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4">
              <Link to="/products" className="text-primary hover:underline">
                All Categories
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{categoryName}</span>
            </nav>
            <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground">
              Browse our {categoryName?.toLowerCase()} collection ({filteredProducts.length} items)
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${categorySlug}/${product.slug}`}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.images[0]}
                      badge={product.badge}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found in this category.</p>
                <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
                  View all categories
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ProductListPage;
