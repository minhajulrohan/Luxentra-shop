// PopulerCategoryM.jsx

import CategoryCard from "./CategoryCard"; // Assuming you are using the square card component from the last response
import smartTV from "@/assets/smartTV.avif"
import ledTV from "@/assets/ledTV.avif"
import tv from "@/assets/tv.avif"
import bags from "@/assets/bags.avif"
import analogsWatches from "@/assets/analogsWatches.avif"
import shavingAndTrimming from "@/assets/shavingAndTrimming.avif"
import kidsToyes from "@/assets/kidsToyes.avif"
import FryingPan from "@/assets/friyingpan.avif"
import PressureCooker from "@/assets/pressureCoocker.avif"
import Woks from "@/assets/cocke.avif"
import clock from "@/assets/clock.avif"
import Headphone from "@/assets/Headphones.avif"
import GiftCard from "@/assets/GiftCards.avif"
import PopulerCategoryMCard from "./PopulerCategoryMCard";

// Adding imports for the categories that were missing in your original list 
// but appeared in the image, assuming they have corresponding assets.
// Since you didn't provide paths for them, I'll map them to existing ones where possible.
// NOTE: I am using the full list derived from your *original* request's data,
// but with correct titles from the *image* where clear (e.g., Kids Toys instead of kids Toyes).

const categories = [
  // Row 1
  { title: "Smart TV", href: "/products/smart-tv", image: smartTV, },
  { title: "LED TV", href: "/products/led-tv", image: ledTV, },
  { title: "TV", href: "/products/tv", image: tv, },
  { title: "Bags", href: "/products/bags", image: bags, },
  { title: "Analog Watches", href: "/products/analog-watches", image: analogsWatches, },
  { title: "Smart Watches", href: "/products/smart-watches", image: analogsWatches, }, // Added from image
  { title: "Shaving And Trimming", href: "/products/shaving-and-trimming", image: shavingAndTrimming, },
  { title: "Men", href: "/products/men", image: shavingAndTrimming, }, // Added from image
  
  // Row 2 and beyond
  { title: "Kids Toys", href: "/products/kids-toyes", image: kidsToyes, }, // Title corrected to match image
  { title: "Clocks", href: "/products/clock", image: clock, },
  
  // Cookware items from your list, mapped to image style (using generic Cookware title for some)
  { title: "Cookware", href: "/products/frying-pan", image: FryingPan, }, // Frying Pan
  { title: "Pressure Cooker", href: "/products/pressure-cooker", image: PressureCooker, },
  { title: "Cookware (Woks)", href: "/products/woks", image: Woks, }, // Woks/Cookware from your list
  { title: "Sauce Pot/Pan", href: "/products/sauce-pot-pan", image: PressureCooker, }, // Added from image
  { title: "Headphones", href: "/products/headphones", image: Headphone, }, // Added from image
  { title: "Gift Cards", href: "/products/gift-cards", image: GiftCard, }, // Added from image
];

const PopulerCategoryM = () => {
  
  return (
    <section className="w-full py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black">
            Popular Categories
          </h2>
        </div>

        {/* Grid Layout: Uses 8 columns on large screens to display 2 rows of 8 cards.
           If there are more than 16 items (like the 17 here), the grid will wrap the extra item(s) 
           onto the next line, maintaining the visual style.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
          {categories.map((category, index) => (
            // CategoryCard should be the square, white component defined in the previous step.
            <PopulerCategoryMCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopulerCategoryM;