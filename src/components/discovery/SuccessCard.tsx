
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

interface SuccessCardProps {
  onViewResults: () => void;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({ onViewResults }) => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-green-900">
              🚀 Your first visibility results are in!
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">Brand mentioned in 2 of 3 AI answers</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Across ChatGPT, Gemini, and Perplexity
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-800">
                ✅ ChatGPT
              </Badge>
              <Badge className="bg-green-100 text-green-800">
                ✅ Gemini
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                ❌ Perplexity
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-green-200">
          <p className="text-sm text-green-800 mb-3">
            Here's where you're showing up — and where you're getting outranked by competitors.
          </p>
          <Button onClick={onViewResults} className="bg-green-600 hover:bg-green-700">
            See Full Results
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
