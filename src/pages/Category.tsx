import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import ScrollToTopButton from "@/components/Button";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1) || "";

  const filteredProducts = productsData.products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground">
              Browse our {categoryName.toLowerCase()} collection ({filteredProducts.length} items)
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found in this category.</p>
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

export default Category;
