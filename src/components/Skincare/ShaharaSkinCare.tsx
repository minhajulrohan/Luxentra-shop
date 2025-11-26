import Acne from "@/assets/Acni.webp"
import EyeCream from "@/assets/Eye-Cream.webp"
import Facewash from "@/assets/Face-Wash.webp"
import Haircare from "@/assets/Hair-Care.webp"
import Mackup from "@/assets/Mackup.webp"
import Moisturizer from "@/assets/Moisturizer.webp"
import NightCream from "@/assets/Night-Cream.webp"
import Serum from "@/assets/Serum.webp"
import Sunscrean from "@/assets/Sunscreen.webp"
import Toner from "@/assets/Toner.webp"
import SkincareCard from "./SkincareCard"
const categories = [
  // Row 1
  { title: "Acne", href: "/products/acne", image: Acne, },
  { title: "Eye Cream", href: "/products/eye-cream", image: EyeCream, },
  { title: "Face Wash", href: "/products/facewash", image: Facewash, },
  { title: "Hair Care", href: "/products/hair-care", image: Haircare, },
  { title: "Mackup", href: "/products/mackup", image: Mackup, },
  { title: "Moisturizer", href: "/products/moisturizer", image: Moisturizer, }, // Added from image
  { title: "Night Cream", href: "/products/night-cream", image: NightCream, },
  { title: "Serum", href: "/products/serum", image: Serum, }, // Added from image
  { title: "Sunscrean", href: "/products/sunscrean", image: Sunscrean, }, 
  { title: "Toner", href: "/products/toner", image: Toner, },
];

const ShaharaSkinCare = () => {
  
  return (
    <section className="w-full py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black">
           Shop Products by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-2 sm:gap-5 md:gap-6 lg:gap-7">
          {categories.map((category, index) => (
            // CategoryCard should be the square, white component defined in the previous step.
            <SkincareCard key={index} {...category} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShaharaSkinCare;