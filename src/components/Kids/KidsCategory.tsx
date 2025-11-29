import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import KidsCategoryCard from "./KidsCategoryCard";
import { Button } from "@/components/ui/button"; // ✅ fixed import
import CLothings from "@/assets/Clothin-BabyShop.avif"
import Toys from "@/assets/ToysBaby.jpg"
import BabySKin from "@/assets/baby-skincare.jpg"
import BabyFood from "@/assets/BabyFood.jpg"
import Frock from "@/assets/FrockDungaree.avif"
import Tops from "@/assets/Tops-Shirt1.avif"
import Kabli from "@/assets/kablipunjabi.avif"

const categories = [
  { title: "Clothing", href: "/products/kids-clothing", image: CLothings },
  { title: "ToysToys", href: "/products/kids-toys", image: Toys },
  { title: "Baby Skin Care", href: "/products/kids-skin-care", image: BabySKin},
  { title: "Moms Care", href: "/products/kids-moms-care", image: "" },
  { title: "Baby Food", href: "/products/kids-food", image: BabyFood },
  { title: "Frock & Dungaree", href: "/products/kids-frock", image: Frock },
  { title: "Tops & Ethnic", href: "/products/kids-tops", image: Tops },
  { title: "Kabli Punjabi", href: "/products/kids-punjabi", image: Kabli },
  { title: "Polo T-Shirt", href: "/products/kids-polo-T-shirt", image: "" },
];

const KidsCategory = () => {
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
            Kids Category
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
                <KidsCategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsCategory;