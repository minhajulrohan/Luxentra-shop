import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
// Assuming you have these placeholder image assets
import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider-2.jpg";
import slider3 from "@/assets/slider-3.jpg";
import slider4 from "@/assets/slider-4.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
    image: slider1,
    title: "Fulfilled",
    highlight: "over $250M",
    subtitle: "in orders for our merchants!",
    badge: "4.8",
    badgeText: "Rating on Shopify App Store",
  },
  {
    image: slider2,
    title: "Trusted by",
    highlight: "10,000+",
    subtitle: "happy customers worldwide!",
    badge: "4.9",
    badgeText: "Customer Satisfaction",
  },
  {
    image: slider3,
    title: "Delivering",
    highlight: "premium quality",
    subtitle: "fashion at your doorstep!",
    badge: "5.0",
    badgeText: "Quality Guarantee",
  },
  {
    image: slider4,
    title: "Join",
    highlight: "thousands",
    subtitle: "of satisfied shoppers today!",
    badge: "4.8",
    badgeText: "Top Rated Store",
  },
];

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    // FIX 1: Use min-h on mobile and remove fixed h-[650px] for better flow.
    <section className="relative min-h-[500px] lg:h-[700px] bg-background overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 h-full">
              
              {/* FIX 2: Standardized padding: pt-4 (from navbar) pb-12 (for navigation dots) */}
              <div className="grid lg:grid-cols-10 gap-4 items-center h-full px-6 sm:px-12 lg:px-20 pt-4 pb-12 lg:py-12">
                
                {/* 1. Image (70%) */}
                {/* FIX 3: Standard Mobile Image Height (280px) for better look */}
                <div className="relative h-[280px] sm:h-[350px] lg:h-[500px] animate-scale-in order-1 lg:order-2 lg:col-span-7">
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                </div>
                
                {/* 2. Content (Buttons - 30% on desktop) */}
                {/* FIX 4: pt-0 on mobile, mt-4 to separate from image */}
                <div className="space-y-6 lg:space-y-8 animate-fade-in order-2 lg:order-1 pt-0 lg:pt-0 lg:col-span-3">
                  
                  {/* Text content hidden on mobile */}
                  <div className="hidden lg:block">
                    <Badge
                      variant="secondary"
                      className="bg-primary text-primary-foreground px-6 py-3 text-base font-semibold rounded-2xl inline-flex items-center gap-2"
                    >
                      <Star className="w-5 h-5 fill-current" />
                      {slide.badge} ★ {slide.badgeText}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 hidden lg:block">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight"> 
                      {slide.title}{" "}
                      <span className="italic font-serif">over</span>
                      <br />
                      <span className="text-primary">{slide.highlight}</span>{" "}
                      <span className="block mt-2">{slide.subtitle}</span>
                    </h1>
                  </div>

                  {/* Buttons (mt-4 to separate from image on mobile) */}
                  <div className="flex gap-4 justify-center lg:justify-start mt-4 lg:flex-wrap"> 
                    <Button
                      size="lg" // Retaining large size
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-semibold shadow-2xl hover:scale-105 transition-transform duration-300"
                    >
                      <Link to="/shop">Shop Now</Link>
                    </Button>
                    <Button
                      size="lg" // Retaining large size
                      variant="outline"
                      asChild
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-6 text-base font-semibold shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/shop">View Collection</Link>
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots (Positioned close to the bottom) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-primary"
                : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;