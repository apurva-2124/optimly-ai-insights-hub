
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, ArrowRight, AlertTriangle } from "lucide-react";

interface EmptyDiscoveryStateProps {
  onAddQueries: () => void;
}

export const EmptyDiscoveryState: React.FC<EmptyDiscoveryStateProps> = ({ onAddQueries }) => {
  return (
    <Card className="text-center py-12 bg-gradient-to-b from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <CardTitle className="text-2xl text-red-900">
          Your competitors are already winning AI search.
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 max-w-2xl mx-auto">
        <p className="text-lg text-red-800">
          AI assistants are becoming the new front door for discovery. Start tracking how your brand appears in tools like ChatGPT and Gemini — before you lose more ground.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="space-y-2">
            <Search className="h-8 w-8 text-red-600 mx-auto" />
            <p className="text-sm font-medium text-red-900">AI Search Growth</p>
            <p className="text-xs text-red-700">+300% usage in 2024</p>
          </div>
          <div className="space-y-2">
            <TrendingUp className="h-8 w-8 text-red-600 mx-auto" />
            <p className="text-sm font-medium text-red-900">Early Advantage</p>
            <p className="text-xs text-red-700">First movers dominate</p>
          </div>
          <div className="space-y-2">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto" />
            <p className="text-sm font-medium text-red-900">Falling Behind</p>
            <p className="text-xs text-red-700">Every day counts</p>
          </div>
        </div>
        
        <Button 
          onClick={onAddQueries}
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Add Queries Now
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
