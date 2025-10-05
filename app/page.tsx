"use client";

import { Package, Megaphone, Star, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import data from "@/data/seeds.json";
import { MetricCard } from "@/components/metric-card";

export default function Dashboard() {
  const { sellers, products, campaigns } = data;
  const seller = sellers[0];

  // Calculate metrics
  const totalProducts = products.length;
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const avgRating = (
    products.reduce((acc, p) => acc + p.avg_rating, 0) / products.length
  ).toFixed(1);
  const totalReviews = products.reduce((acc, p) => acc + p.total_reviews, 0);

  // Chart data
  const campaignData = campaigns.map((c) => ({
    name: c.name.split(" ").slice(0, 2).join(" "),
    status: c.status === "active" ? 1 : 0,
  }));

  const productData = products.map((p) => ({
    name: p.title.split(" ").slice(0, 2).join(" "),
    reviews: p.total_reviews,
    rating: p.avg_rating,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {seller.contact_name}. Here&apos;s what&apos;s happening
          with your campaigns.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Active Campaigns"
          value={activeCampaigns}
          icon={<Megaphone className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Average Rating"
          value={avgRating}
          icon={<Star className="h-4 w-4" />}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Total Reviews"
          value={totalReviews}
          icon={<MessageSquare className="h-4 w-4" />}
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Reviews and ratings by product</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(35 20% 88%",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="reviews" fill="#d08f4e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Trends</CardTitle>
            <CardDescription>Product ratings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis domain={[0, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(35 20% 88%",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="hsl(28 65% 60%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(28 65% 60%)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products & Campaigns */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>Your latest Amazon products</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Reviews</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[#f59f0a] text-[#f59f0a]" />
                        <span>{product.avg_rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.total_reviews}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Your running marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.reward_type}
                    </p>
                  </div>
                  <Badge
                    variant={
                      campaign.status === "active" ? "default" : "secondary"
                    }
                    className={
                      campaign.status === "active"
                        ? "bg-[#16a249] text-white"
                        : ""
                    }
                  >
                    {campaign.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
