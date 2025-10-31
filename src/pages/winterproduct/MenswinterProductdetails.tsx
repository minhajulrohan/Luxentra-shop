import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import MenswinproductCard from "@/components/Menswinter/MenswinproductCard"
import MenswinterProductData from "@/data/menswinterpd.json"
import { toast } from "sonner";
import ScrollToTopButton from "@/components/Button";

interface winterproduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  badge: string | null;
  description: string;
  sizes: string[];
  colors: string[];
  images: string[];
}

const MenswinterProductdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [winterproduct, setwinterproduct] = useState<winterproduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = MenswinterProductData.winterproduct.find(
      (p) => p.id === Number(id)
    );
    if (foundProduct) {
      setwinterproduct(foundProduct as winterproduct);
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = {
      ...winterproduct,
      selectedSize,
      selectedColor,
      quantity,
    };
    
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex(
      (item: any) =>
        item.id === winterproduct?.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Added to cart!");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleOrderNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (!winterproduct) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = MenswinterProductData.winterproduct
    .filter((p) => p.category === winterproduct.category && p.id !== winterproduct.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <img
                src={winterproduct.images[selectedImage]}
                alt={winterproduct.name}
                className="w-full h-[500px] object-cover"
              />
            </Card>
            <div className="grid grid-cols-3 gap-4">
              {winterproduct.images.map((image, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-primary"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${winterproduct.name} ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              {winterproduct.badge && (
                <Badge className="mb-2 bg-accent text-accent-foreground">
                  {winterproduct.badge}
                </Badge>
              )}
              <h1 className="text-4xl font-bold mb-2">{winterproduct.name}</h1>
              <p className="text-muted-foreground">{winterproduct.category}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                ${winterproduct.price.toFixed(2)}
              </span>
              {winterproduct.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${winterproduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-lg leading-relaxed">{winterproduct.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {winterproduct.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {winterproduct.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="shop"
                size="lg"
                className="flex-1"
                onClick={handleOrderNow}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-auto">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Related Products</h2>
              <Link to="/" className="text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <MenswinproductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  originalPrice={relatedProduct.originalPrice}
                  image={relatedProduct.images[0]}
                  badge={relatedProduct.badge}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MenswinterProductdetails;
