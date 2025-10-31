import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/Button";
import { Link } from "react-router-dom";

// ✅ সমাধান: BlogDetail.jsx-এর জন্য প্রয়োজনীয় পূর্ণাঙ্গ ডেটা যোগ করা হলো।
export const blogPosts = [
  {
    id: 1,
    title: "10 Style Tips for Spring 2024",
    excerpt: "Discover the latest fashion trends and how to incorporate them into your wardrobe this spring season.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    date: "March 15, 2024",
    author: "Fashion Editor",
    category: "Style", // <--- Added
    content: "The arrival of spring brings a fresh perspective to fashion. This year, we're seeing a return to bright colors, relaxed fits, and playful accessories. Don't be afraid to experiment with layered textures and patterns to create unique outfits.\n\nStart by refreshing your basics. Swap out heavy wool sweaters for lightweight knits and linen shirts. Pastel shades like lavender and mint are dominating the palette. For footwear, chunky loafers and platform sandals are the season's must-haves. Remember, the key to spring style is effortless transition." // <--- Added
  },
  {
    id: 2,
    title: "The Ultimate Guide to Sneaker Care",
    excerpt: "Learn professional tips and tricks to keep your sneakers looking fresh and extend their lifespan.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    date: "March 10, 2024",
    author: "Footwear Expert",
    category: "Footwear", // <--- Added
    content: "Maintaining the pristine condition of your sneakers requires a simple but consistent routine. The golden rule is to never put your sneakers in a washing machine, as this can damage the adhesives and materials.\n\nFor general cleaning, mix warm water with mild detergent and use a soft-bristled brush. Focus on one small area at a time. For deep stains, a sneaker-specific cleaning solution is recommended. Always let your shoes air dry completely away from direct sunlight, which can cause yellowing." // <--- Added
  },
  {
    id: 3,
    title: "Sustainable Fashion: Making Better Choices",
    excerpt: "Explore how to build a more sustainable wardrobe without compromising on style.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    date: "March 5, 2024",
    author: "Eco Fashion Writer",
    category: "Sustainability", // <--- Added
    content: "Sustainable fashion is about making conscious choices that reduce environmental impact and promote ethical labor practices. It starts with asking where and how your clothes are made. Look for brands that are transparent about their supply chain and use eco-friendly materials like organic cotton, recycled polyester, or Tencel.\n\nAnother key step is practicing circularity—buying less, choosing quality over quantity, and extending the life of your garments through repair and upcycling. Thrifting and buying pre-loved items is one of the easiest ways to be more sustainable and find unique pieces." // <--- Added
  },
  {
    id: 4,
    title: "Accessorizing 101: Complete Your Look",
    excerpt: "Master the art of accessorizing with our comprehensive guide to bags, belts, and more.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    date: "February 28, 2024",
    author: "Style Consultant",
    category: "Tips", // <--- Added
    content: "Accessories are the finishing touches that can transform a basic outfit into a statement. Start with the 'Rule of Three,' where you aim to wear three pieces of jewelry or accessories (e.g., a watch, a ring, and a necklace).\n\nBelts are essential for defining your waistline and adding structure. A statement bag can be the focal point of your look, so choose one that contrasts slightly with your outfit's color palette. Remember, balance is key: if your outfit is loud, keep the accessories simple, and vice versa." // <--- Added
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Fashion Blog</h1>
            <p className="text-muted-foreground">Style tips, trends, and inspiration</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden card-hover">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Link to={`/blogDetails/${post.id}`}><Button variant="outline">Read More</Button></Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Blog;