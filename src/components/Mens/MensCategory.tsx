import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import MensCategoryCard from "./MensCategoryCard";
import { Button } from "@/components/ui/button"; // ✅ fixed import
import Womens1 from "@/assets/MensCoti.avif";
import Womens2 from "@/assets/MensLunggi.avif";
import Womens3 from "@/assets/MensFormalPant.avif";
import Womens4 from "@/assets/MensPunjabi.avif";
import Womens5 from "@/assets/MensJeans.avif";
import MensCasualShirt from "@/assets/MensCasualShirt.avif"
import MensFormalShirt from "@/assets/MensFormalShirt.avif"
import MensJoggers from "@/assets/MensJoggers.avif"
import MensPolo from "@/assets/MensPolo.avif"
import MensInnerwear from "@/assets/MensInnerwear.avif"

const categories = [
  { title: "Mens Coti", href: "/products/womens", image: Womens1 },
  { title: "Mens Lungi", href: "/products/Ethnic", image: Womens5 },
  { title: "Mens Formal Pant", href: "/products/Womens-bottom-wear", image: Womens3 },
  { title: "Mens Punjabi", href: "/products/mens-punjabe", image: Womens4 },
  { title: "Mens Jeans Pant", href: "/products/tops-shirt", image: Womens2 },
  { title: "Mens Casual Shirt", href: "/products/womens-footwear", image: MensCasualShirt },
  { title: "Mens Formal Shirt", href: "/products/womens-bags", image: MensFormalShirt },
  { title: "Mens Joggers", href: "/products/accessories", image: MensJoggers },
  { title: "Mens Polo", href: "/products/comfort-wear", image: MensPolo },
  { title: "Mens Innerweare", href: "/products/tops-shirts", image: MensInnerwear },
];

const MensCategory = () => {
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
            Mens Category
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
                <MensCategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MensCategory;