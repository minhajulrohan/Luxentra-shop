import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroShoe from "@/assets/hero-shoe.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              New Collection
            </div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Step Into Style
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Discover the latest in athletic footwear and fashion. Quality meets performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button variant="shop" size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/category/footwear">
                <Button variant="outline" size="lg">
                  View Collection
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
            <img
              src={heroShoe}
              alt="Featured Product"
              className="relative z-10 w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
