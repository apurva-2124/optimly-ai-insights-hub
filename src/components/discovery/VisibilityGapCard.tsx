
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";

interface VisibilityGapCardProps {
  onViewOpportunities: () => void;
}

export const VisibilityGapCard: React.FC<VisibilityGapCardProps> = ({ onViewOpportunities }) => {
  return (
    <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-orange-900">
              🚨 Visibility Gap Detected
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-orange-800 font-medium">
            Your brand was mentioned in only <span className="font-bold">2 out of 6</span> high-intent discovery queries across AI models.
          </p>
          <p className="text-sm text-orange-700">
            That means your competitors may already be showing up when your customers ask tools like ChatGPT or Gemini what to buy.
          </p>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <Badge className="bg-red-100 text-red-800">
            <TrendingDown className="h-3 w-3 mr-1" />
            33% visibility rate
          </Badge>
          <Badge className="bg-orange-100 text-orange-800">
            4 missed opportunities
          </Badge>
        </div>
        
        <div className="pt-4 border-t border-orange-200">
          <Button onClick={onViewOpportunities} className="bg-orange-600 hover:bg-orange-700">
            View Missed Opportunities
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
