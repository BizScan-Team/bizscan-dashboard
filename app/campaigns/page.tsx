import { Megaphone, QrCode as QrCodeIcon } from "lucide-react";
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

export default function Campaigns() {
  const { campaigns, products } = data;

  const getProductTitle = (productId: string) => {
    return products.find((p) => p.id === productId)?.title || "Unknown Product";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-2">
            Manage your review collection campaigns
          </p>
        </div>
        <Button>
          <Megaphone className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-xl">{campaign.name}</CardTitle>
                  <CardDescription>
                    {getProductTitle(campaign.product_id)}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    campaign.status === "active" ? "default" : "secondary"
                  }
                  className={
                    campaign.status === "active"
                      ? "bg-success text-success-foreground"
                      : ""
                  }
                >
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Reward Type
                  </h4>
                  <p className="text-sm capitalize">
                    {campaign.reward_type.replace(/_/g, " ")}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Min Stars to Amazon
                  </h4>
                  <p className="text-sm">
                    {campaign.review_routing_rule.min_stars_to_amazon} stars
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Reward Message
                </h4>
                <p className="text-sm bg-muted p-3 rounded-lg">
                  {campaign.reward_text}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <QrCodeIcon className="mr-2 h-4 w-4" />
                  View QR Code
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
