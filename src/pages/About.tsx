import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Gift, Package, Shield, TrendingUp, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/Button";


const About = () => {
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCountersVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const Counter = ({ targetValue, label, suffix = "" }: { targetValue: number; label: string; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersVisible) return;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = targetValue / steps;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(increment * currentStep));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, [countersVisible, targetValue]);

    return (
      <div className={`flex flex-col items-center transition-all duration-700 ${countersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent/20 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {count.toLocaleString()}{suffix}
            </span>
          </div>
        </div>
        <p className="mt-4 text-sm md:text-base font-medium text-muted-foreground text-center">{label}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Welcome to Luxentra Shop
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your trusted destination for premium USA-imported products in Bangladesh and Vietnam. 
              Shop quality products and earn rewards through simple tasks—shopping made smarter and more rewarding.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 px-4 border-y bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm md:text-base font-medium">1000+ Satisfied Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm md:text-base font-medium">Fast International Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm md:text-base font-medium">100% Authentic Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Counters Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <Counter targetValue={1000} label="Satisfied Customers" suffix="+" />
            <Counter targetValue={500} label="Premium Products" suffix="+" />
            <Counter targetValue={100} label="Secure Payments" suffix="%" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-secondary/20 border-primary/10 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Luxentra Shop, our mission is to bridge the gap between premium international products and 
              customers in Bangladesh and Vietnam. We believe everyone deserves access to high-quality, 
              authentic USA-imported goods at fair prices. Beyond traditional shopping, we empower our 
              community to earn rewards through simple tasks, making premium products more accessible while 
              creating a win-win ecosystem for our valued customers.
            </p>
          </Card>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-16 md:py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Makes Luxentra Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: "Premium USA Imports",
                description: "Carefully curated products sourced directly from trusted USA suppliers"
              },
              {
                icon: Gift,
                title: "Reward System",
                description: "Earn rewards by completing simple tasks like app installs and surveys"
              },
              {
                icon: Shield,
                title: "100% Authentic",
                description: "Every product is guaranteed original with full authenticity verification"
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Dedicated support team ready to assist you at every step"
              },
              {
                icon: CheckCircle2,
                title: "Easy Payments",
                description: "Flexible payment options including Cash on Delivery (COD)"
              },
              {
                icon: TrendingUp,
                title: "Fast Delivery",
                description: "Reliable shipping to Bangladesh and Vietnam with tracking"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-primary/10">
                <feature.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Browse & Shop",
                description: "Explore our curated collection of premium USA-imported products across various categories"
              },
              {
                step: "2",
                title: "Complete Simple Tasks",
                description: "Earn reward points by completing easy tasks like app installations, surveys, or sharing with friends"
              },
              {
                step: "3",
                title: "Redeem Rewards",
                description: "Use your earned points for discounts, free shipping, or exclusive gifts on your next purchase"
              },
              {
                step: "4",
                title: "Enjoy Your Purchase",
                description: "Choose your preferred payment method (Online or COD) and receive your authentic products with reliable delivery"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 md:p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products & Sourcing */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 md:p-12 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Products & Sourcing</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Every product at Luxentra Shop is meticulously sourced from reputable suppliers in the United States. 
                We partner only with trusted brands and distributors to ensure authenticity and quality.
              </p>
              <p>
                Our diverse catalog includes electronics, fashion, beauty products, home goods, and more—all meeting 
                strict quality standards. We handle all import logistics, customs, and quality checks so you receive 
                only the finest products at your doorstep in Bangladesh or Vietnam.
              </p>
              <p className="font-semibold text-foreground">
                Quality is not just our promise—it's our guarantee.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Payment & Delivery */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Payment & Delivery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 border-primary/10 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-accent" />
                Easy Payment Options
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Cash on Delivery (COD):</strong> Pay when you receive your order</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Online Payment:</strong> Secure checkout with cards and mobile banking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Flexible Options:</strong> Choose what works best for you</span>
                </li>
              </ul>
            </Card>
            <Card className="p-8 border-primary/10 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-accent" />
                Reliable Delivery
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Bangladesh & Vietnam:</strong> We deliver to your location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Tracking Available:</strong> Monitor your order every step of the way</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Safe Packaging:</strong> Products arrive in perfect condition</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default About;
