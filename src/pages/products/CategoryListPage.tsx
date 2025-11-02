import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/Button";
import allProductsData from "@/data/allProducts.json";

const CategoryListPage = () => {
  // Extract unique categories from products
  const categories = Array.from(
    new Set(allProductsData.products.map(product => product.categorySlug))
  ).map(slug => {
    const product = allProductsData.products.find(p => p.categorySlug === slug);
    return {
      slug,
      name: product?.category || slug,
      count: allProductsData.products.filter(p => p.categorySlug === slug).length
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">All Categories</h1>
            <p className="text-muted-foreground">
              Browse our complete collection by category
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/products/${category.slug}`}
                  className="group"
                >
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary">
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {category.count} {category.count === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </Link>
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

export default CategoryListPage;
