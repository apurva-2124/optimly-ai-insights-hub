
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Calendar, Target } from "lucide-react";

export const AIVisibilityTrends: React.FC = () => {
  const trends = [
    {
      query: "best project management tools",
      change: -15,
      competitor: "Notion",
      days: 3
    },
    {
      query: "collaboration software for teams",
      change: -8,
      competitor: "Slack",
      days: 5
    },
    {
      query: "design tools for startups",
      change: +12,
      competitor: null,
      days: 2
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              AI Visibility Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{trend.query}</p>
                  <p className="text-sm text-muted-foreground">
                    {trend.days} days ago
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {trend.competitor && (
                    <div className="text-right">
                      <p className="text-sm text-red-600 font-medium">
                        Lost to {trend.competitor}
                      </p>
                    </div>
                  )}
                  <Badge className={trend.change > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {trend.change > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {trend.change > 0 ? '+' : ''}{trend.change}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="bg-gradient-to-b from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-900 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Strategic Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-purple-800 font-medium">
              Don't fall behind.
            </p>
            <p className="text-sm text-purple-700">
              Brands that optimize for AI visibility early will dominate the next wave of customer acquisition.
            </p>
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Market leaders</span>
                <span className="font-medium text-purple-900">80%+ visibility</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Your current rate</span>
                <span className="font-medium text-red-600">42%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
