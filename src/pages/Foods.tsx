import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/Button";
import FoodCategory from "@/components/Food/FoodCategory";






const Foods = () => {
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-8">
        <FoodCategory />
        </section>
        

      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Foods;
