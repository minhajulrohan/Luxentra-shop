import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/Button";

const blogPosts = [
  {
    id: 1,
    title: "10 Style Tips for Spring 2024",
    excerpt: "Discover the latest fashion trends and how to incorporate them into your wardrobe this spring season.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    date: "March 15, 2024",
    author: "Fashion Editor"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Sneaker Care",
    excerpt: "Learn professional tips and tricks to keep your sneakers looking fresh and extend their lifespan.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    date: "March 10, 2024",
    author: "Footwear Expert"
  },
  {
    id: 3,
    title: "Sustainable Fashion: Making Better Choices",
    excerpt: "Explore how to build a more sustainable wardrobe without compromising on style.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    date: "March 5, 2024",
    author: "Eco Fashion Writer"
  },
  {
    id: 4,
    title: "Accessorizing 101: Complete Your Look",
    excerpt: "Master the art of accessorizing with our comprehensive guide to bags, belts, and more.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    date: "February 28, 2024",
    author: "Style Consultant"
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
                    <Button variant="outline">Read More</Button>
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
