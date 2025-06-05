
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, ExternalLink } from "lucide-react";

export const DiscoveryExplainer: React.FC = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">What is a Discovery Dataset?</h3>
              <p className="text-blue-800 leading-relaxed">
                We call this your Discovery Dataset — it's a set of real search queries that customers might ask tools like ChatGPT or Gemini. We use these queries to test how well your brand gets recommended, compared to competitors — and help you fix what's missing.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Opens detailed guide about Discovery Datasets</p>
                </TooltipContent>
              </Tooltip>
              
              <span className="text-sm text-blue-600">
                💡 Start with 5-10 queries to see your first visibility results
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
