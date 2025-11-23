
import FoodCard from "./FoodCard"
import Fruits from "@/assets/fruits-vegetables.webp";
import Vegetables from "@/assets/fresh-vegetables.webp";
import Meet from "@/assets/live-cock-chicken-processed-25-gm-500-gm.webp";
import Fishs from "@/assets/meat-fish.webp";
import Coocking from "@/assets/cooking.webp";
import Such from "@/assets/sauces-pickles.webp";
import Dairy from "@/assets/dairy-eggs.webp";
import Breakfast from "@/assets/breakfast.webp";
import Candy from "@/assets/candy-chocolate.webp";
import Snacks from "@/assets/snacks.webp";
import Beverages from "@/assets/beverages (1).webp";
import Baking from "@/assets/baking.webp";
import Frozen from "@/assets/frozen-canned.webp";
import Diabetic from "@/assets/diabetic-food.webp";
import iceCream from "@/assets/ice-cream.webp";

const categories = [
  // Row 1
  { title: "Fruits", href: "/products/fruits", image: Fruits, },
  { title: "Vegetables", href: "/products/vegetables", image: Vegetables, },
  { title: "Meat & Chicken", href: "/products/Meat-Chicken", image: Meet, },
  { title: "Fishs", href: "/products/Fishs", image: Fishs, },
  { title: "Coocking", href: "/products/Coocking", image: Coocking, },
  { title: "Sauces & Pickles", href: "/products/Sauces-Pickles", image: Such, },
  { title: "Dairy & Eggs", href: "/products/Dairy-Eggs", image: Dairy, },
  { title: "Breakfast", href: "/products/Breakfast", image: Breakfast, },
  { title: "Candy & Chocolate", href: "/products/Candy-Chocolate", image: Candy, },
  { title: "Snacks", href: "/products/Snacks", image: Snacks, },
  { title: "Beverages", href: "/products/Beverages", image: Beverages, },
  { title: "Baking", href: "/products/Baking", image: Baking, },
  { title: "Frozen & Canned", href: "/products/Frozen-Canned", image: Frozen, },
  { title: "Diabetic Food", href: "/products/Diabetic-Food", image: Diabetic, },
  { title: "Ice Cream", href: "/products/Ice-Cream", image: iceCream, },
];

const FoodCategory = () => {
  
  return (
    <section className="w-full py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header section */}
        <div className="">
          <h2 className="text-3xl font-bold text-primary">
            Luxentra Fresh Food
          </h2>
          <p className="mt-10 mb-10 font-bold">Only Delivery Kurigram Location and Delivery Charge 50tk</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
          {categories.map((category, index) => (
            // CategoryCard should be the square, white component defined in the previous step.
            <FoodCard key={index} {...category} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FoodCategory;