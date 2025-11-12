import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LayoutGrid, Package } from "lucide-react";

interface CategoryStats {
  category: string;
  count: number;
  total_stock: number;
}

export const CategoryManagement = () => {
  const [categories, setCategories] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("category, stock");

      if (error) throw error;

      // Group by category and calculate stats
      const categoryMap = new Map<string, { count: number; total_stock: number }>();
      
      data?.forEach((product) => {
        const existing = categoryMap.get(product.category) || { count: 0, total_stock: 0 };
        categoryMap.set(product.category, {
          count: existing.count + 1,
          total_stock: existing.total_stock + (product.stock || 0),
        });
      });

      const categoryStats: CategoryStats[] = Array.from(categoryMap.entries()).map(
        ([category, stats]) => ({
          category,
          count: stats.count,
          total_stock: stats.total_stock,
        })
      );

      setCategories(categoryStats.sort((a, b) => b.count - a.count));
    } catch (error: any) {
      toast.error("Failed to load categories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalProducts = categories.reduce((sum, cat) => sum + cat.count, 0);
  const totalStock = categories.reduce((sum, cat) => sum + cat.total_stock, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              Active product categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
            <p className="text-xs text-muted-foreground">
              Items in inventory
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.category} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg capitalize mb-2">
                          {category.category.replace(/-/g, " ")}
                        </h3>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Package className="h-4 w-4" />
                            <span>{category.count} products</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <LayoutGrid className="h-4 w-4" />
                            <span>{category.total_stock} items in stock</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {((category.count / totalProducts) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};