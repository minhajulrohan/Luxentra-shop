// src/components/Hero.jsx
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import slider1 from "@/assets/slider-1.png";
import Slider2 from "@/assets/Slider2.png"


const slides = [
  { image: slider1, alt: "Slide 1", link: "/shop" },
  { image: Slider2, alt: "Slide 2", link: "shaharaskincare" }
];

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Embla viewport */}
      <div className="embla h-[320px] sm:h-[380px] lg:h-[600px]" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] min-w-0 h-full"
            >
              <div className="relative w-full h-full">
                {/* Link wraps image so whole image is clickable */}
                <Link to={slide.link} className="block w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-center cursor-pointer select-none"
                    draggable={false}
                  />
                </Link>

                {/* Gradient overlay — pointer-events-none so it doesn't block clicks */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/25"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
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

export default Hero;
