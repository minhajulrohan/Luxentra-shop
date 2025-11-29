import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const RelatedProducts = ({ currentProduct, allProducts }) => {

  // UseMemo দিয়ে filtering optimize করা
  const relatedProducts = useMemo(() => {
    if (!currentProduct || !allProducts?.length) return [];

    // 1. একই category + current product বাদ
    const sameCategory = allProducts.filter(
      (p) => p.categorySlug === currentProduct.categorySlug && p.id !== currentProduct.id
    );

    // 2. brand match করলে priority দিন (optional)
    const sameBrand = sameCategory.filter(
      (p) => p.brand === currentProduct.brand
    );

    // brand matched product available থাকলে সেটা নিন, না হলে শুধু category matched নিন
    return sameBrand.length > 0 ? sameBrand : sameCategory;
  }, [currentProduct, allProducts]);

  return (
    <section className="py-10 bg-gray-50 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Related Products</h2>
          {relatedProducts.length > 5 && (
            <Link to={`/products/${currentProduct.categorySlug}`}>
              <Button variant="outline">View More</Button>
            </Link>
          )}
        </div>

        {relatedProducts.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">
            No related products available.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.slice(0, 10).map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <Link to={`/products/${product.categorySlug}/${product.slug}`}>
                  <CardContent className="p-3">
                    <div className="aspect-square rounded-lg overflow-hidden border bg-secondary/30">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="mt-3 text-sm font-medium line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-lg font-bold text-primary">
                      ৳ {product.price.toFixed(0)}
                    </p>

                    {product.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">
                        ৳ {product.originalPrice.toFixed(0)}
                      </p>
                    )}
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
