import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sara2 from "@/assets/sara2.avif";

const slides = [
  {
    id: 2,
    image: Sara2,
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
    // Outer container: Removed min-h-[500px] and let inner content determine height
    <div className="relative bg-background overflow-hidden">
      {/* Container for padding: Ensures the content doesn't touch the edges on mobile */}
      <div className="container mx-auto px-0 sm:px-4 md:px-6"> 
        <div className="embla w-full" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slide) => (
              <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0">
                {/* Adjusted Height: 
                    - h-[50vh] or h-[60vh] on small screens (instead of 70vh)
                    - h-[80vh] on medium screens (instead of 85vh)
                    - Added margin-y on mobile for spacing, or padding on inner div
                */}
                <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full mt-0 md:mt-4">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-none sm:rounded-2xl shadow-xl transition-all duration-500"
                  />
                  
                  {/* Content Overlay (Example: Can be used to display Title/Subtitle) */}
                  {/* If you need text on the image, add it here:
                  <div className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16 text-white">
                      <h3 className="text-xl md:text-3xl font-bold">{slide.title}</h3>
                      <p className="text-sm md:text-lg">{slide.subtitle}</p>
                  </div>
                  */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Adjusted for better mobile tap target size and position */}
        {/* Adjusted left/right spacing to stay inside the container/visible area */}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollPrev}
          // Smaller h/w on mobile, larger on desktop. Position closer to the edge on mobile (left-1/2)
          className="absolute left-1/2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full md:rounded-md bg-white/30 hover:bg-white/50 text-black md:text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
          style={{ transform: 'translate(-50%, -50%)', left: 'calc(5% + 1rem)' }} // Custom inline style for precise positioning on the left
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={scrollNext}
          // Position closer to the edge on mobile (right-1/2)
          className="absolute right-1/2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full md:rounded-md bg-white/30 hover:bg-white/50 text-black md:text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
          style={{ transform: 'translate(50%, -50%)', right: 'calc(5% + 1rem)' }} // Custom inline style for precise positioning on the right
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>

        {/* Dot Indicators - Positioned inside the container padding */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-6 sm:w-8 bg-white" // Slightly wider on desktop
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};