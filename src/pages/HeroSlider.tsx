import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import slider1 from "@/assets/slider-1.png";

const slides = [
  {
    id: 1,
    image: slider1,
    title: "WINTER Collection 2025",
    subtitle: "AVAILABLE NOW",
    description: "at Outlets & Online",
  },
  {
    id: 2,
    image: slider1,
    title: "WINTER Collection 2025",
    subtitle: "AVAILABLE NOW",
    description: "at Outlets & Online",
  },
  {
    id: 3,
    image: slider1,
    title: "WINTER Collection 2025",
    subtitle: "AVAILABLE NOW",
    description: "at Outlets & Online",
  },
];

export const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative h-[70vh] md:h-[85vh] w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-md bg-slider-nav/90 hover:bg-slider-nav-hover text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-md bg-slider-nav/90 hover:bg-slider-nav-hover text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
