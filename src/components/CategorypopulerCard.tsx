import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  image?: string;
  title: string;
  href: string;
  icon?: LucideIcon;
  bgColor?: string;
}

const CategoryCard = ({ image, title, href, icon: Icon, bgColor = "bg-gradient-to-br from-primary/10 to-accent/10" }: CategoryCardProps) => {
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-square w-32 md:w-40 lg:w-48 overflow-hidden rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/20">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${bgColor} transition-all duration-300 group-hover:brightness-110`}>
            {Icon && <Icon className="h-12 w-12 text-primary/60" />}
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <h3 className="text-center text-sm md:text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary max-w-[140px] md:max-w-[160px] lg:max-w-[192px]">
        {title}
      </h3>
    </a>
  );
};

export default CategoryCard;
