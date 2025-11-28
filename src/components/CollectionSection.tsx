import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number | null;
  images: string[];
  sizes?: string[];
  colors?: string[];
  badge?: string | null;
}

interface CollectionSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  onViewAll?: () => void;
  sectionClass?: string;
}

const CollectionSection = ({
  title,
  subtitle,
  products,
  onViewAll,
  sectionClass = "bg-white",
}: CollectionSectionProps) => {
  return (
    <section className={`w-full py-4 px-4 md:px-6 lg:px-8 ${sectionClass}`}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              productSlug={product.slug}
              categorySlug={product.categorySlug}
              price={product.price}
              originalPrice={product.originalPrice ?? undefined}
              image={product.images?.[0] ?? ""}
              badge={product.badge ?? undefined}
              sizes={product.sizes}
              colors={product.colors}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button
            onClick={onViewAll}
            variant="default"
            size="lg"
            className="bg-primary text-white hover:bg-foreground/90 font-semibold px-8"
          >
            VIEW ALL
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
