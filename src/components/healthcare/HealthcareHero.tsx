import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

import h1 from "@/assets/healtcareSlider1.webp";
import h2 from "@/assets/healthcareSlider2.webp";
import h3 from "@/assets/healthcareSlider3.webp";

const slides = [h1, h2, h3];

const HealthCareHero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((image, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] min-w-0"
            >
              <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="
                w-full 
               h-[180px]        /* Mobile */
               sm:h-[240px]     /* Small tablet */
               md:h-[300px]     /* Tablet */
               lg:h-[380px]     /* Laptop */
              xl:h-[450px]     /* Desktop */
              object-cover"/>

            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 rounded-full transition-all ${
              index === selectedIndex
                ? "w-8 bg-primary"
                : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HealthCareHero;
