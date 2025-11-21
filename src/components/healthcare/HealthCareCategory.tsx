import COVID from "@/assets/COVID Essentials.webp"
import Sexual from "@/assets/Sexual Wellness.webp"
import Diabetes from "@/assets/Diabetes Care.webp"
import Womens from "@/assets/Womens Care.webp"
import Natural from "@/assets/Natural food.webp"
import Men from "@/assets/Men's Products.webp"
import Devices from "@/assets/Devices.webp"
import Herbal from "@/assets/Herbal.webp"
import Family from "@/assets/Family Nutation.webp"
import Health from "@/assets/Health & Beauty.webp"
import Laundry from "@/assets/Laundry.webp"
import Surgical from "@/assets/Surgical.webp"
import HealthDental from "@/assets/Health & Dental.webp"
import PersonalCares from "@/assets/Personal Care .webp"
import Baby from "@/assets/Baby Care.webp"
import Beverages from "@/assets/Beverages.webp"
import HealthCareCard  from "./HealthCareCard";

const categories = [
  // Row 1
  { title: "COVID Essentials", href: "/products/covid-essentials", image: COVID, },
  { title: "Sexual Wellness", href: "/products/sexual-wellness", image: Sexual, },
  { title: "Diabetes Care", href: "/products/diabetes-care", image: Diabetes, },
  { title: "Womens Care", href: "/products/womens-care", image: Womens, },
  { title: "Natural foods", href: "/products/natural-foods", image: Natural, },
  { title: "Men's Products", href: "/products/mens-products", image: Men, }, // Added from image
  { title: "Devices & Accessories", href: "/products/devices-accessories", image: Devices, },
  { title: "Herbal", href: "/products/herbal", image: Herbal, }, // Added from image
  
  // Row 2 and beyond
  { title: "Family Nutrition", href: "/products/family-nutrition", image: Family, }, // Title corrected to match image
  { title: "Health & Beauty", href: "/products/health-beauty", image: Health, },
  
  // Cookware items from your list, mapped to image style (using generic Cookware title for some)
  { title: "Laundry", href: "/products/laundry", image: Laundry, }, // Frying Pan
  { title: "Surgical", href: "/products/surgical", image: Surgical, },
  { title: "Health & Dental", href: "/products/health-dental", image: HealthDental, }, // Woks/Cookware from your list
  { title: "Personal Care ", href: "/products/personal-care", image: PersonalCares, }, // Added from image
  { title: "Baby Care", href: "/products/baby-care", image: Baby, }, // Added from image
  { title: "Beverages", href: "/products/beverages", image: Beverages, }, // Added from image
];

const HealthCareCategory = () => {
  
  return (
    <section className="w-full py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black">
            Shop ByCategories
          </h2>
        </div>

        {/* Grid Layout: Uses 8 columns on large screens to display 2 rows of 8 cards.
           If there are more than 16 items (like the 17 here), the grid will wrap the extra item(s) 
           onto the next line, maintaining the visual style.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
          {categories.map((category, index) => (
            // CategoryCard should be the square, white component defined in the previous step.
            <HealthCareCard key={index} {...category} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HealthCareCategory;