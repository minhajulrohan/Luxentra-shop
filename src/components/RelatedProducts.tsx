import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  categorySlug: string;
  badge?: string;
}

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

export const RelatedProducts = ({ currentProduct, allProducts }: RelatedProductsProps) => {
  // Get related products from the same category, excluding current product
  const relatedProducts = allProducts
    .filter(p => 
      p.categorySlug === currentProduct.categorySlug && 
      p.id !== currentProduct.id
    )
    .slice(0, 4); // Show max 4 related products

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden">
              <Link to={`/products/${product.categorySlug}/${product.slug}`}>
                <div className="aspect-square overflow-hidden bg-secondary/30">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-primary">
                    TK {product.price.toFixed(2)}
                  </p>
                  {product.badge && (
                    <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
