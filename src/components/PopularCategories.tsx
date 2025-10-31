import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import CategoryCard from "./CategorypopulerCard";
import { Button } from "./ui/button";
import mensWinter from "../assets/mens-winter.jpg"
import womensWinter from "../assets/womens-winter.jpg"
import kidsWinter from "../assets/kids-winter.jpg"
import womensTopwear from "../assets/womens-topwear.jpg"
import smartwatch from "../assets/smartwatch.jpg"
import earbuds from "../assets/earbuds.jpg"
import mensChino from "../assets/mens-chino.jpg"


const categories = [
  {
    title: "Men's Winter Collection",
    href: "/menswinter",
    image: mensWinter,
  },
  {
    title: "Women's Winter Collection",
    href: "/womenswinter",
    image: womensWinter,
  },
  {
    title: "Kids Winter Collection",
    href: "#kids-winter",
    image: kidsWinter,
  },
  {
    title: "Women's Top Wear",
    href: "#womens-tops",
    image: womensTopwear,
  },
  {
    title: "Smart Watches",
    href: "#smart-watches",
    image: smartwatch,
  },
  {
    title: "In-Ear/Earbuds",
    href: "#earbuds",
    image: earbuds,
  },
  {
    title: "Mens Chino Pant",
    href: "#mens-chino",
    image: mensChino,
  },
];

const PopularCategories = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
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
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Popular Categories
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

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 md:gap-8 lg:gap-10">
            {categories.map((category, index) => (
              <div key={index} className="flex-[0_0_auto] animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
