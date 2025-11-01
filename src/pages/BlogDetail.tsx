import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { blogPosts } from "./Blog";

const BlogDetail = () => {
  const { id } = useParams();
  
  // ✅ সমাধান: URL থেকে আসা স্ট্রিং id কে parseInt() দিয়ে নাম্বারে পরিবর্তন করে খোঁজা হচ্ছে।
  const blog = blogPosts.find((b) => b.id === parseInt(id));

  // --- (Blog Not Found Logic) ---
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  // ------------------------------

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <Link to="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-8"
            loading="eager"
          />

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {blog.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">{blog.title}</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">{blog.excerpt}</p>
            <div className="space-y-4">
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Share this article</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">Share on Twitter</Button>
              <Button variant="outline" size="sm">Share on Facebook</Button>
              <Button variant="outline" size="sm">Copy Link</Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;