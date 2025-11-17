import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider-2.jpg";
import slider3 from "@/assets/slider-3.jpg";
import slider4 from "@/assets/slider-4.jpg";
import slider5 from "@/assets/slider-5.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
  image: slider1,
  title: "৫ হাজার টাকার ওপর অর্ডারে  ",
  highlight: "ফ্রি হোম ডেলিভারি",
  subtitle: "আপনার দোরগোড়ায় দ্রুত ও নিরাপদ শিপিং!",
  badge: "4.9",
  badgeText: "Fast Delivery Rating"
 },
  {
  image: slider2,
  title: "আমরা দেই শুধুই",
  highlight: "বিশ্বাসযোগ্য মান",
  subtitle: "প্রতিটি পণ্যে প্রিমিয়াম কোয়ালিটির নিশ্চয়তা।",
  badge: "5.0",
  badgeText: "Quality Assurance"
 },
  {
  image: slider3,
  title: "ওয়ার্ল্ডওয়াইড",
  highlight: "ব্র্যান্ড কালেকশন",
  subtitle: "গ্লোবাল ব্র্যান্ডের আসল পণ্য এখন আপনার হাতের নাগালে!",
  badge: "4.8",
  badgeText: "Global Brand Trust"
 },
  {
  image: slider4,
  title: "কম দামে",
  highlight: "সেরা পণ্য",
  subtitle: "বাজেট-ফ্রেন্ডলি দামে প্রিমিয়াম কোয়ালিটির কালেকশন।",
  badge: "4.7",
  badgeText: "Best Value"
 },
  {
  image: slider5,
  title: "১০০% আসল",
  highlight: "কোয়ালিটির গ্যারান্টি",
  subtitle: "প্রতিটি পণ্য তিন-স্তরের কোয়ালিটি চেকের মাধ্যমে সরবরাহ করা হয়।",
  badge: "5.0",
  badgeText: "Authenticity Verified"
 },
];

const Hero = () => {
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
    <section className="relative min-h-[500px] bg-background overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 h-full">
              <div className="grid lg:grid-cols-10 gap-4 items-center h-full px-6 sm:px-12 lg:px-20 pt-4 pb-12 lg:py-12">

                {/* IMAGE — stays above on mobile */}
                
                <div className="relative h-[280px] sm:h-[350px] lg:h-[500px] order-1 lg:order-2 lg:col-span-7">
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                </div>

                {/* TEXT + BUTTONS */}
                <div className="space-y-6 lg:space-y-8 order-2 lg:order-1 lg:col-span-3">

                  {/* ⭐ Mobile text */}
                  <div className="block lg:hidden text-center space-y-1 mt-4">
                    <h1 className="text-2xl font-bold">
                      {slide.title}{" "}
                      <span className="text-primary">{slide.highlight}</span>
                    </h1>
                    <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                  </div>

                  {/* ⭐ Desktop text */}
                  <div className="hidden lg:block space-y-3">
                    <Badge
                      variant="secondary"
                      className="bg-primary text-primary-foreground px-6 py-3 text-base font-semibold rounded-2xl inline-flex items-center gap-2"
                    >
                      <Star className="w-5 h-5 fill-current" />
                      {slide.badge} ★ {slide.badgeText}
                    </Badge>

                    <h1 className="text-3xl font-bold leading-tight">
                      {slide.title}{" "}
                      <span className="italic font-serif">{slide.highlight}</span>
                      <br />
                      <span className="text-primary">{slide.highlight}</span>
                      <span className="block mt-2">{slide.subtitle}</span>
                    </h1>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-4 justify-center lg:justify-start mt-4 lg:flex-wrap">
                    <Button
                      size="lg"
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-semibold shadow-xl hover:scale-105 transition-transform"
                    >
                      <Link to="/shop">Shop Now</Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-6 text-base font-semibold shadow-xl hover:scale-105 transition-all"
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

      {/* DOTS */}
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

export default Hero;
