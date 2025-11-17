import { Truck, Shield, Headphones, Award } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $50",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "100% authentic products",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
  },
  {
    icon: Shield,
    title: "100% Safe",
    description: "Secure shopping",
  },
];

const Features = () => {
  return (
    <section className="py-5 border-y bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
