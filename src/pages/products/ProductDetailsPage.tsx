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
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="chat">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                      <div className="mt-6 space-y-2">
                        <h4 className="font-semibold">Product Features:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>High-quality materials and construction</li>
                          <li>Carefully designed for comfort and style</li>
                          <li>Available in multiple sizes and colors</li>
                          <li>Easy care and maintenance</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
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

                <TabsContent value="chat" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Ask a Question</h3>
                      <p className="text-muted-foreground mb-4">
                        Have questions about this product? Send us a message and we'll get back to you soon!
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Your Message
                          </label>
                          <Textarea
                            placeholder="Type your question here..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            rows={4}
                            className="w-full"
                          />
                        </div>
                        <Button onClick={handleChatSubmit}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
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