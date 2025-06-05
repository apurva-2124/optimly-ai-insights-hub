
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp, AlertCircle, Info } from "lucide-react";

interface VisibilitySummaryBarProps {
  onLearnMore: () => void;
}

export const VisibilitySummaryBar: React.FC<VisibilitySummaryBarProps> = ({ onLearnMore }) => {
  return (
    <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-gray-50 to-orange-50">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-gray-900">Visibility Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-orange-600">42%</span>
              <Badge className="bg-orange-100 text-orange-800">
                <TrendingDown className="h-3 w-3 mr-1" />
                Low
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              of your tracked queries mention your brand in AI-generated answers
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <span className="font-medium text-gray-900">Competitor Lead</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">2x</span>
              <Badge className="bg-red-100 text-red-800">
                Behind
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              Figma is mentioned 2x more than your brand in shared queries
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="font-medium text-gray-900">Trending Down</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">-3</span>
              <Badge className="bg-red-100 text-red-800">
                Past 7 days
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              You lost visibility in 3 queries over the past week
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onLearnMore} className="text-sm">
            <Info className="h-4 w-4 mr-2" />
            Why this matters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
