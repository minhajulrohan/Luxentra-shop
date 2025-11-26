import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, Heart, Minus, Plus, MessageCircle, 
  Truck, ArrowLeftRight, Clock, ShieldCheck 
} from "lucide-react"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// ধরে নেওয়া হচ্ছে এই ফাইল পাথ ঠিক আছে এবং JSON ফাইলটি লোড হচ্ছে
import allProductsData from "@/data/allProducts.json"; 

// ডামি হুকস (আপনার প্রজেক্ট অনুযায়ী এটি নিশ্চিত করুন)
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth"; 

// --- ডামি প্রোডাক্ট স্পেসিফিকেশন কম্পোনেন্ট ---
// এটি ট্যাবের ভেতরে স্পেসিফিকেশন টেবিল দেখানোর জন্য ব্যবহার করা হয়
const ProductSpecifications = ({ specifications }: { specifications: { label: string, value: string }[] }) => (
  <div className="border rounded-lg overflow-hidden mt-6">
    <table className="min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        {specifications.map((spec, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500 w-1/3">
              {spec.label}
            </td>
            <td className="px-6 py-3 whitespace-wrap text-sm text-gray-900 w-2/3">
              {spec.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- ডামি RelatedProducts কম্পোনেন্ট (আপনার প্রজেক্টে এটি থাকলে এটি ব্যবহার করুন) ---
const RelatedProducts = ({ currentProduct, allProducts }: any) => (
    <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Simplified placeholder for related products */}
                {allProducts.slice(0, 5).map((p: any) => (
                    <div key={p.id} className="border rounded-lg p-3 bg-white shadow-sm">
                        <Link to={`/products/${p.categorySlug}/${p.slug}`}>
                            <img src={p.images[0]} alt={p.name} className="w-full h-32 object-cover mb-2 rounded" />
                            <p className="text-sm font-medium truncate">{p.name}</p>
                            <p className="text-lg font-bold text-primary">৳ {p.price.toFixed(0)}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


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
  
  // ডামি হুকস এর জন্য ডামি ফাংশন (যদি আপনার প্রজেক্টে না থাকে)
  const useWishlist = () => ({
    addToWishlist: (id: string) => console.log(`Adding ${id} to wishlist`),
    removeFromWishlist: (id: string) => console.log(`Removing ${id} from wishlist`),
    isInWishlist: (id: string) => false, 
  });
  const useAuth = () => ({ user: { isLoggedIn: true } }); 
  
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
  // Default selection set to empty string for validation
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

  // --- ডামি ডেটা (বিক্রেতা এবং ডেলিভারি) ---
  const sellerInfo = {
    name: product.brand || "Seller Default",
    link: "#", 
    sku: product.sku || "N/A"
  };

  // স্টক স্ট্যাটাস ডাইনামিক করা হলো। যদি JSON-এ না থাকে, তবে 1 ধরা হলো।
  const currentStock = (product as any).stockQuantity ?? 1; 

  const deliveryInfoList = [
    { icon: Truck, text: "60 TK shipping inside Dhaka city & Kurigram" },
    { icon: Truck, text: "Home delivery all over Bangladesh" },
    { icon: ArrowLeftRight, text: "7 Days replacement policy only for Luxentra-shop manufacture products" },
    { icon: Clock, text: "Dedicated Customer Support" },
    { icon: ShieldCheck, text: "Verified and Trusted Sellers" },
  ];
  
  // JSON থেকে স্পেসিফিকেশন ডেটা লোড করা
  const productSpecs = (product as any).specifications || [];


  // -----------------------------------------------------------
  // 3. Core Logic Functions (Handlers) - Validation Logic
  // -----------------------------------------------------------
  
  /**
   * Checks for required selections (size/color) and adds the item to the cart (localStorage).
   * @returns {boolean} True if item was added successfully, false otherwise.
   */
  const addItemToCart = (): boolean => {
    // Selection Check: Size
    // পণ্যটিতে যদি sizes অ্যারে থাকে (JSON-এ) এবং সেটি সিলেক্ট করা না থাকে (empty string)
    if (product.sizes && product.sizes.length > 0 && !selectedSize) { 
      toast({
        title: "Selection Required",
        description: "Please select a size before adding to cart or ordering.",
        variant: "destructive",
      });
      return false;
    }

    // Selection Check: Color
    // পণ্যটিতে যদি colors অ্যারে থাকে (JSON-এ) এবং সেটি সিলেক্ট করা না থাকে (empty string)
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select a color before adding to cart or ordering.",
        variant: "destructive",
      });
      return false;
    }

    // Stock Check 
    if (currentStock < quantity) {
        toast({
            title: "Out of Stock",
            description: "The requested quantity is not available in stock.",
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
    // If validation and cart addition is successful, navigate to checkout
    if (addItemToCart()) { 
      toast({
        title: "Order Process Started",
        description: `Proceeding to checkout with ${product.name}.`,
      });
      navigate("/checkout");
    }
  };


  // -----------------------------------------------------------
  // 3.1. WhatsApp Logic (Validation added)
  // -----------------------------------------------------------
  const whatsappNumber = "8801788517930"; 

  const getWhatsappLink = (): string => {
    // ভ্যালিডেশন চেক (এই চেকের জন্য কোনো Toast Message দেখানো হয় না, কারণ সেটি handleWhatsappOrder এ দেখানো হবে)
    if (product.sizes && product.sizes.length > 0 && !selectedSize) { 
      return '#'; 
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      return '#'; 
    }

    const productLink = window.location.href; 
    const productName = product.name; 
    
    const selectedOptions = 
      (product.sizes.length > 0 && selectedSize ? `Size: ${selectedSize}` : "") +
      (product.colors.length > 0 && selectedColor ? `, Color: ${selectedColor}` : "");
    
    // মেসেজ ফরম্যাট তৈরি
    const message = 
      `আমি এই প্রোডাক্টটি অর্ডার করতে চাই।\n` +
      `প্রোডাক্ট: ${productName}\n` +
      `পরিমাণ: ${quantity}\n` +
      (selectedOptions ? `অপশন: ${selectedOptions.startsWith(', ') ? selectedOptions.substring(2) : selectedOptions}\n` : "") +
      `লিংক: ${productLink}`;

    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  // হোয়াটসঅ্যাপ বাটন হ্যান্ডেল করার জন্য ফাংশন: এটি ভ্যালিডেশন করে এবং ব্যর্থ হলে নেভিগেশন বন্ধ করে
  const handleWhatsappOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // addItemToCart এর মতো একই ভ্যালিডেশন লজিক ব্যবহার করা হলো (Toast সহ)
    if (product.sizes && product.sizes.length > 0 && !selectedSize) { 
        e.preventDefault(); // Stop navigation
        toast({
            title: "Selection Required",
            description: "Please select a size for WhatsApp order.",
            variant: "destructive",
        });
        return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
        e.preventDefault(); // Stop navigation
        toast({
            title: "Selection Required",
            description: "Please select a color for WhatsApp order.",
            variant: "destructive",
        });
        return;
    }
    // যদি ভ্যালিডেশন সফল হয়, তবে নেভিগেশন হবে
  };

  // Other functions (unchanged)
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

  useEffect(() => {
  if (!product) return;

  // LocalStorage থেকে রিসেন্টলি দেখানো প্রোডাক্ট লোড
  const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

  // একই প্রোডাক্ট থাকলে আগেরটা বাদ দিন
  const filtered = recentlyViewed.filter((item: any) => item.id !== product.id);

  // নতুন প্রোডাক্ট যোগ করুন timestamp সহ
  filtered.unshift({
    id: product.id,
    name: product.name,
    images: product.images,
    price: product.price,
    slug: product.slug,
    categorySlug: product.categorySlug,
    viewedAt: new Date().getTime(), // timestamp in ms
  });

  // শুধু সর্বাধিক 5 প্রোডাক্ট রাখুন
  localStorage.setItem("recentlyViewed", JSON.stringify(filtered.slice(0, 5)));
}, [product]);

  const [recentProduct, setRecentProduct] = useState<any>(null);

useEffect(() => {
  const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

  const now = new Date().getTime();
  const oneMinuteAgo = now - 60 * 1000; // 1 min in ms

  const recent = recentlyViewed.find((item: any) => item.viewedAt >= oneMinuteAgo && item.id !== product.id);

  if (recent) setRecentProduct(recent);
}, [product]);

  // -----------------------------------------------------------
  // 4. Component Rendering (JSX)
  // -----------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-8">
          <div className="container mx-auto px-4">
            
            {/* Breadcrumb (Unchanged) */}
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

            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column: Images */}
              <div className="lg:col-span-1 space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden border bg-secondary/30">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center md:justify-start overflow-x-auto gap-4 p-2 -m-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
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

              {/* Middle Column: Product Details & Actions */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-sm text-muted-foreground mb-4">
                    Brand: <span className="font-semibold text-foreground">{product.brand}</span>
                  </p>

                  {/* Price Block */}
                  <div className="flex items-center gap-4 border-b pb-4 mb-4">
                    <span className="text-4xl font-bold text-primary">
                      ৳ {typeof product.price === 'string' ? parseFloat(product.price).toFixed(0) : product.price.toFixed(0)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        ৳ {typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice).toFixed(0) : product.originalPrice.toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Seller Info */}
                <div className="text-sm border-b pb-4">
                    <span className="text-muted-foreground">SKU / Item Code: </span>
                    <span className="font-medium text-foreground mr-4">{sellerInfo.sku}</span>
                    |
                    <span className="text-muted-foreground ml-4">Sold by: </span>
                    <Link to={sellerInfo.link} className="text-primary hover:underline font-medium">
                      {sellerInfo.name} <span className="text-xs">(Visit Store)</span>
                    </Link>
                </div>

                {/* Color Selection - ✅ Fix: onClick added */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Color: <span className="font-normal text-primary">{selectedColor || "Select a color"}</span></h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <Button
                          key={color}
                          variant={selectedColor === color ? "default" : "outline"}
                          onClick={() => setSelectedColor(color)} 
                          className="min-w-[60px]"
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection - ✅ Fix: onClick added */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Size: <span className="font-normal text-primary">{selectedSize || "Select a size"}</span></h3>
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
                {/* End Size & Color Selection */}

                {/* Quantity Selector + Stock Status */}
                <div className="flex items-center gap-6 pt-2">
                  <h3 className="font-semibold">Quantity:</h3>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-10 text-center select-none border-x">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      className="rounded-l-none"
                      disabled={quantity >= currentStock} 
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Stock Status */}
                  <span className={`text-sm font-medium ${currentStock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {currentStock > 0 ? `In Stock: ${currentStock}` : "Out of Stock"}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex gap-4">
                    {/* Handlers call the validation logic (addItemToCart) */}
                    <Button 
                        onClick={handleAddToCart} 
                        className="flex-1 h-12 bg-primary hover:bg-primary/90 text-lg" 
                        disabled={currentStock === 0}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      ADD TO CART
                    </Button>
                    <Button 
                        onClick={handleAddToOrder} 
                        className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white text-lg" 
                        disabled={currentStock === 0}
                    >
                      BUY NOW
                    </Button>
                    <Button
                      variant={isWishlisted ? "default" : "outline"}
                      size="icon"
                      onClick={handleWishlistToggle}
                      className="h-12 w-12"
                    >
                      <Heart
                        className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>
                  {/* হোয়াটসঅ্যাপ বাটন - ✅ Fix: onClick handler added for validation */}
                  <Link 
                    to={getWhatsappLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                    onClick={handleWhatsappOrder} 
                  >
                    <Button 
                        className="w-full h-10 bg-[#25D366] text-white hover:bg-[#1da851] transition-colors font-semibold text-base"
                        disabled={currentStock === 0}
                    >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        অর্ডার করুন হোয়াটসঅ্যাপে
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Delivery Info & Recently Viewed */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Delivery & Return Info Block */}
                <Card className="shadow-lg border-primary/20">
                    <CardContent className="p-4 space-y-3">
                        <h4 className="text-lg font-semibold mb-2">Delivery & Services</h4>
                        {deliveryInfoList.map((item, index) => (
                            <div key={index} className="flex items-start text-sm text-muted-foreground">
                                <item.icon className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                                <span className="leading-tight">{item.text}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Placeholder for Recently Viewed */}
                <Card className="shadow-sm">
  <CardContent className="p-4">
    <h4 className="text-lg font-semibold mb-3 border-b pb-2">Recently Viewed</h4>
    {recentProduct ? (
      <Link
        to={`/products/${recentProduct.categorySlug}/${recentProduct.slug}`}
        className="flex flex-col items-center gap-2 hover:bg-gray-50 rounded p-2 transition"
      >
        <img 
          src={recentProduct.images[0]} 
          alt={recentProduct.name} 
          className="w-40 h-40 object-cover rounded"
        />
        <div>
          <p className="text-base font-medium line-clamp-2">{recentProduct.name}</p>
          <p className="text-base font-bold text-primary">৳ {recentProduct.price.toFixed(0)}</p>
        </div>
      </Link>
    ) : (
      <p className="text-muted-foreground">No recently viewed products.</p>
    )}
  </CardContent>
</Card>


              </div>
            </div>

            {/* Product Details Tabs - Dynamic Rendering */}
            <div className="mt-12">
              <Tabs defaultValue="description" className="w-full">
                {/* Tab List: Only show triggers if the corresponding data exists */}
          <TabsList className="flex overflow-x-auto gap-2 md:grid md:grid-cols-5 h-auto">
  {product.description && (
    <TabsTrigger value="description" className="uppercase text-xs md:text-sm py-3 flex-shrink-0">
      Description
    </TabsTrigger>
  )}
  {productSpecs.length > 0 && (
    <TabsTrigger value="specification" className="uppercase text-xs md:text-sm py-3 flex-shrink-0">
      Specification
    </TabsTrigger>
  )}
  {(product as any).howToUse && (product as any).howToUse.length > 0 && (
    <TabsTrigger value="usage" className="uppercase text-xs md:text-sm py-3 flex-shrink-0">
      How to Use
    </TabsTrigger>
  )}
  {/* <TabsTrigger value="reviews" className="uppercase text-xs md:text-sm py-3 flex-shrink-0">
    Reviews
  </TabsTrigger> */}
  {((product as any).bengaliDescription || (product as any).bengaliFeatures) && (
    <TabsTrigger value="bengali" className="uppercase text-xs md:text-sm py-3 flex-shrink-0">
      Bengali
    </TabsTrigger>
  )}
  <TabsTrigger value="disclaimer" className="uppercase text-xs md:text-sm py-3 flex-shrink-0">
    Disclaimer
  </TabsTrigger>
</TabsList>
                
                {/* Description Tab (Show only if description exists) */}
                {product.description && (
                    <TabsContent value="description" className="mt-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold mb-2">Product Description</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {product.fullDescription || product.description}
                            </p>
                            {/* Features/Ingredients sections - show only if data is present */}
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
                            {(product as any).ingredients && (product as any).ingredients.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Active Informations</h3>
                                    {/* ... (Ingredients rendering) ... */}
                                </div>
                            )}
                        </div>
                    </TabsContent>
                )}

                {/* Specification Tab (Show only if specifications data exists) */}
                {productSpecs.length > 0 && (
                <TabsContent value="specification" className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Detailed Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {productSpecs.map((spec, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    <p className="text-sm font-medium text-gray-500">{spec.label}</p>
                    <p className="text-sm text-gray-900 mt-1">{spec.value}</p>
                  </div>
                  ))}
                  </div>
                <div className="mt-4 p-4 bg-yellow-50/50 border border-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-800">
                Note: The color is the same as the picture. However, it may slightly differ due to lighting.
                </p>
                </div>
              </TabsContent>
              )}

                
                {/* Usage Tab (Show only if howToUse data exists) */}
                {(product as any).howToUse && (product as any).howToUse.length > 0 && (
                    <TabsContent value="usage" className="mt-6">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">How to Use</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* ... (How to Use rendering) ... */}
                            </div>
                        </div>
                    </TabsContent>
                )}


                {/* Reviews Tab (Placeholder) */}
                <TabsContent value="reviews" className="mt-6">
                    <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <p className="text-muted-foreground">No reviews yet. Be the first one!</p>
                        {/* Review form placeholder */}
                    </div>
                </TabsContent>

                {/* Bengali Tab (Show only if bengali data exists) */}
                {((product as any).bengaliDescription || (product as any).bengaliFeatures) && (
                    <TabsContent value="bengali" className="mt-6">
                        <h3 className="text-xl font-bold mb-4">বাংলায় বিস্তারিত</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {(product as any).bengaliDescription}
                        </p>
                        {/* Bengali Features rendering */}
                    </TabsContent>
                )}

                {/* Disclaimer Tab (Placeholder) */}
                <TabsContent value="disclaimer" className="mt-6">
                    <h3 className="text-xl font-bold mb-4">Product Disclaimer</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        আপনি চাইলে আমাদের হোয়াটসঅ্যাপ থেকে অর্ডার কনফার্ম করতে পারেন, এবং সরাসরি আমাদের Website এ অর্ডার করলে পণ্য পাওয়ার নিশ্চয়তা বেশি থাকে। কারন, আপনার মেসেজটি আমাদের এজেন্ট পড়ার পূর্বে অন্য ক্রেতা Website থেকে কিনে স্টক আউট করে দিতে পারে। লাক্সেন্ট্রা-শপ সবসময় সঠিক স্টক ওয়েবসাইট এ আপডেট করে থাকার চেষ্টা করে। এর পরেও যে কোনো কারণে ওয়েবসাইট এ পণ্যটির সঠিক স্টক আপডেট করা না থাকলে আমরা আপনাকে দ্রুত কল করে জানিয়ে দিবো যেন আপনি আপনার ডেলিভারি সম্পর্কে দ্রুত সিদ্ধান্ত নিতে পারেন। তাই অতি জরুরী অবস্থার প্রেক্ষিতে অনুগ্রহ করে আমাদের আগে কল করে নিশ্চিত হউন পণ্য টি এখনো স্টক এ আছে কিনা। অন্যথায় কোনো কারণে ডেলিভারি বিলম্ব হলে আমরা দায়ী থাকবো না।,
                    </p>
                </TabsContent>

              </Tabs>
            </div>
          </div>
        </section>

        <RelatedProducts 
          currentProduct={product} 
          allProducts={allProductsData.products}
        />
      </main>

      <Footer />
      {/* ScrollToTopButton (assuming you have this component) */}
      {/* <ScrollToTopButton /> */}
    </div>
  );
};

export default ProductDetailsPage;