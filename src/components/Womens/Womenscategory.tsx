import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import WomensCategoryCard from "./WomensCategoryCard";
import { Button } from "@/components/ui/button"; // ✅ fixed import
import Womens5 from "@/assets/Womens5.avif"; //eita import image
import Kurtis from "@/assets/womens-kurti.jpg"
import Abayas from "@/assets/womens-abays.webp"
import WomensBottomWears from "@/assets/womens-bottom-wears.avif"
import Tops from "@/assets/womens-tops.webp"
import NokshiBag from "@/assets/Nokshi-Bag1.jpg"
import scarves from "@/assets/womens-scarves.webp"
import Share1 from "@/assets/Share1.avif"
import Handbags from "@/assets/womens-hand-bag.jpg"
import LadiesShoe from "@/assets/womens-ladies-shoe.jpg"
import WomensPerfume from "@/assets/womens-perfume.jpg"


const categories = [
  { title: "Ethnic Set (2 & 3 Pcs)", href: "/products/ethnic", image: Womens5 },
  { title: "Kurtis", href: "/products/womens-kurits", image: Kurtis },
  { title: "Sharee", href: "/products/womens-saree1245",image: Share1 },
  { title: "Abayas", href: "/products/womens-abyas", image: Abayas },
  { title: "Womens Bottom Wear", href: "/products/womens-bottom-wear", image: WomensBottomWears },
   { title: "Tops", href: "/products/tops", image: Tops },
  { title: "Scarves", href: "/products/womens-scarves", image: scarves },
  { title: "Handbags", href: "/products/womens-handbags", image: Handbags },
  { title: "Ladies Shoe", href: "/products/womens-shoe", image: LadiesShoe },
  { title: "Perfume", href: "/products/womens-perfume", image: WomensPerfume },
  { title: "Nokshi Bags", href: "/products/womens-nokshi-bags", image: NokshiBag }
];

const WomensCategory = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 1 },
        "(min-width: 1024px)": { slidesToScroll: 1 },
      },
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full py-2 md:py-2 lg:py-2">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl lg:text-2xl font-bold text-foreground">
            Womens Category
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              aria-label="Next categories"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          className="embla overflow-hidden"
          ref={emblaRef}
          aria-roledescription="carousel"
          aria-label="Popular categories"
        >
          <div className="embla__container flex gap-6 md:gap-8 lg:gap-10">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex-[0_0_auto] animate-fade-in"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <WomensCategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomensCategory;