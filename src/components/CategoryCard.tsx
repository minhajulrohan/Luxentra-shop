import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  count: number;
  image: string;
}

const CategoryCard = ({ name, count, image }: CategoryCardProps) => {
  return (
    <Card className="card-hover overflow-hidden cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg">{name}</h3>
          <p className="text-white/80 text-sm">({count})</p>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
