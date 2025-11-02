import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  badge?: string | null;
  categorySlug: string; 
  productSlug: string;
}

const ProductCard = ({ id, name, price, originalPrice, image, badge, categorySlug, productSlug }: ProductCardProps) => {
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success("Added to cart!");
  };

  return (
    <Link to={`/products/${categorySlug}/${productSlug}`}>
      <Card className="card-hover overflow-hidden group border">
        <div className="relative overflow-hidden bg-secondary/20">
          {badge && (
            <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded z-10">
              {badge}
            </span>
          )}
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-md"
              onClick={(e) => {
                e.preventDefault();
                toast.success("Added to wishlist!");
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-1">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant="shop"
              className="rounded-full"
              onClick={handleQuickAdd}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
