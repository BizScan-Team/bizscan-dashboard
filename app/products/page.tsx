import { Star, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import data from "@/data/seeds.json";

export default function Products() {
  const { products } = data;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">
            Manage your Amazon product catalog
          </p>
        </div>
        <Button>Add Product</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Product Image
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg line-clamp-2">
                  {product.title}
                </CardTitle>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <CardDescription className="font-mono text-xs">
                ASIN: {product.asin}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="text-lg font-semibold">
                    {product.avg_rating}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.total_reviews} reviews
                </span>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a
                  href={product.amazon_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Amazon
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
