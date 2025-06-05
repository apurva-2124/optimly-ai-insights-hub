
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";

interface WeeklyReportCardProps {
  onPreviewReport: () => void;
  onSubscribeAlerts: () => void;
}

export const WeeklyReportCard: React.FC<WeeklyReportCardProps> = ({ 
  onPreviewReport, 
  onSubscribeAlerts 
}) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg text-blue-900">
              🗓 Your AI Visibility Report is ready
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-blue-800 font-medium">
            This week's performance summary:
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-red-100 text-red-800">
              <TrendingDown className="h-3 w-3 mr-1" />
              2 mentions lost
            </Badge>
            <Badge className="bg-orange-100 text-orange-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              1 competitor gained position
            </Badge>
          </div>
          <p className="text-sm text-blue-700">
            in your top 5 tracked queries
          </p>
        </div>
        
        <div className="pt-4 border-t border-blue-200 space-y-3">
          <Button 
            onClick={onPreviewReport} 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Preview Report
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            onClick={onSubscribeAlerts}
            className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            Subscribe to Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
