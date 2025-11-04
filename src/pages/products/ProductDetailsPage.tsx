import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Minus, Plus, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import allProductsData from "@/data/allProducts.json";
import ScrollToTopButton from "@/components/Button";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";

const ProductDetailsPage = () => {
  // -----------------------------------------------------------
  // 1. Hooks, Context & Data Fetching
  // -----------------------------------------------------------
  const { categorySlug, productSlug } = useParams<{ 
    categorySlug: string; 
    productSlug: string;
  }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  
  // Find product by slug
  const product = allProductsData.products.find(
    (p) => p.slug === productSlug && p.categorySlug === categorySlug
  );

  // -----------------------------------------------------------
  // 2. State Management
  // -----------------------------------------------------------
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  // Early Exit / Product Not Found Guard Clause
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Link to="/products">
              <Button>Back to Categories</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isWishlisted = isInWishlist(String(product.id));

  // -----------------------------------------------------------
  // 3. Core Logic Functions (Handlers)
  // -----------------------------------------------------------
  
  /**
   * Checks for required selections (size/color) and adds the item to the cart (localStorage).
   * @returns {boolean} True if item was added successfully, false otherwise.
   */
  const addItemToCart = () => {
    // Selection Check: Size
    if (product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return false;
    }

    // Selection Check: Color
    if (product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return false;
    }

    // Cart Logic
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    const existingItemIndex = cart.findIndex(
      (item: any) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
    return true; // Success
  };

  const handleAddToCart = () => {
    if (addItemToCart()) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleAddToOrder = () => {
    // Uses the same validation and cart logic, then navigates to checkout
    if (addItemToCart()) {
      // In a real application, you might use 'navigate('/checkout')' here
      toast({
        title: "Order Process Started",
        description: `Proceeding to checkout with ${product.name}.`,
      });
      navigate("/checkout");
    }
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(String(product.id));
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(String(product.id));
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleReviewSubmit = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to submit a review.",
        variant: "destructive",
      });
      return;
    }
    if (!reviewText.trim()) {
      toast({
        title: "Review required",
        description: "Please write a review before submitting.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Review submitted",
      description: "Thank you for your review!",
    });
    setReviewText("");
  };

  const handleChatSubmit = () => {
    if (!chatMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please type a message before sending.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message sent",
      description: "Our team will respond to your inquiry soon.",
    });
    setChatMessage("");
  };

  // -----------------------------------------------------------
  // 4. Component Rendering (JSX)
  // -----------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-8">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-6">
              <Link to="/products" className="text-primary hover:underline">
                All Categories
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link 
                to={`/products/${categorySlug}`} 
                className="text-primary hover:underline"
              >
                {product.category}
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary/30">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  {product.badge && (
                    <Badge variant="secondary" className="mb-4">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-primary">
                      ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        ${typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice).toFixed(2) : product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground">{product.description}</p>

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
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
                )}

                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
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
                )}

                {/* Quantity Selector */}
                <div>
                  <h3 className="font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button onClick={handleAddToOrder} className="flex-1">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Order Now
                  </Button>
                  <Button
                    variant={isWishlisted ? "default" : "outline"}
                    size="icon"
                    onClick={handleWishlistToggle}
                  >
                    <Heart
                      className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-5 h-auto">
                  <TabsTrigger value="description" className="uppercase text-xs md:text-sm py-3">Description</TabsTrigger>
                  <TabsTrigger value="usage" className="uppercase text-xs md:text-sm py-3">Use Information</TabsTrigger>
                  <TabsTrigger value="reviews" className="uppercase text-xs md:text-sm py-3">Reviews</TabsTrigger>
                  <TabsTrigger value="bengali" className="uppercase text-xs md:text-sm py-3">Bengali</TabsTrigger>
                  <TabsTrigger value="disclaimer" className="uppercase text-xs md:text-sm py-3">Disclaimer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-6">
                  <div className="space-y-8">
                    {/* Main Description */}
                    {product.description && (
                      <div>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {product.description}
                        </p>
                      </div>
                    )}

                    {/* Features Section */}
                    {(product as any).features && (product as any).features.length > 0 && (
                      <div className="bg-secondary/20 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Features</h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {(product as any).features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Active Ingredients */}
                    {(product as any).ingredients && (product as any).ingredients.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Active Informations</h3>
                        <div className="bg-card border rounded-lg p-6">
                          <ul className="space-y-3">
                            {(product as any).ingredients.map((ingredient: any, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary mt-2"></span>
                                <div>
                                  <span className="font-semibold text-foreground">{ingredient.name}</span>
                                  <span className="text-muted-foreground"> - {ingredient.benefit}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Full Ingredients List */}
                    {(product as any).fullIngredients && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Full Ingredients</h3>
                        <div className="bg-secondary/10 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {(product as any).fullIngredients}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">How to Use</h3>
                    
                    {(product as any).howToUse && (product as any).howToUse.length > 0 ? (
                      <div className="grid md:grid-cols-3 gap-6">
                        {(product as any).howToUse.map((step: any) => (
                          <Card key={step.step}>
                            <CardContent className="pt-6 text-center">
                              <div className="mb-4 text-4xl font-bold text-primary">{step.step}</div>
                              <h4 className="font-semibold mb-2">{step.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Usage instructions will be available soon.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                      {user ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Write Your Review
                            </label>
                            <Textarea
                              placeholder="Share your experience with this product..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              rows={4}
                              className="w-full"
                            />
                          </div>
                          <Button onClick={handleReviewSubmit}>
                            Submit Review
                          </Button>
                          <div className="mt-6 pt-6 border-t">
                            <p className="text-muted-foreground text-sm">
                              No reviews yet. Be the first to review this product!
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">
                            Please log in to write a review
                          </p>
                          <Link to="/auth">
                            <Button>Login</Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bengali" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">পণ্যের বিবরণ</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {(product as any).bengaliDescription || product.description}
                      </p>
                      {(product as any).bengaliFeatures && (product as any).bengaliFeatures.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold mb-3">বৈশিষ্ট্য:</h4>
                          <ul className="space-y-2 text-muted-foreground">
                            {(product as any).bengaliFeatures.map((feature: string, index: number) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="disclaimer" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">Disclaimer</h3>
                      <div className="space-y-4 text-muted-foreground">
                        <p className="leading-relaxed">
                          {product.Desclaimer || "This product is for external use only. Avoid contact with eyes. If irritation occurs, discontinue use and consult a healthcare professional."}
                        </p>
                        <div className="bg-secondary/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">Important Notes:</h4>
                          <ul className="space-y-1 list-disc list-inside">
                            <li>Keep out of reach of children</li>
                            <li>Store in a cool, dry place</li>
                            <li>Use within 12 months of opening</li>
                            <li>Perform a patch test before first use</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ProductDetailsPage;