
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket } from "lucide-react";

interface QueryEntry {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: string;
}

interface LaunchStepProps {
  queries: QueryEntry[];
}

export const LaunchStep: React.FC<LaunchStepProps> = ({ queries }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium mb-2">You're ready to see how your brand performs</h3>
        <p className="text-sm text-muted-foreground">
          We've created a custom Discovery Dataset using your personas, topics, and search queries. Let's test how your brand appears in real AI-generated answers.
        </p>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Rocket className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-green-900 mb-1">🚀 Setup Complete!</h4>
              <p className="text-sm text-green-800 mb-2">
                Your brand was mentioned in 2 out of 3 LLMs for sample queries like "{queries[0]?.query || 'best sustainable fashion brands for organic cotton'}." Let's optimize the rest.
              </p>
              <div className="flex gap-2 text-xs">
                <Badge className="bg-green-100 text-green-800">✅ ChatGPT</Badge>
                <Badge className="bg-green-100 text-green-800">✅ Gemini</Badge>
                <Badge className="bg-red-100 text-red-800">❌ Perplexity</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
