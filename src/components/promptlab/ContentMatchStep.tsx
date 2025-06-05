
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Zap } from 'lucide-react';

interface MatchResult {
  score: number;
  explanation: string;
}

interface ContentMatchStepProps {
  brandContent: string;
  onContentChange: (content: string) => void;
  matchResult: MatchResult | null;
  onScoreMatch: () => void;
  onContinue: () => void;
  isLoading?: boolean;
}

export const ContentMatchStep: React.FC<ContentMatchStepProps> = ({
  brandContent,
  onContentChange,
  matchResult,
  onScoreMatch,
  onContinue,
  isLoading = false
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
          Match Brand Content to Query
        </CardTitle>
        <CardDescription>
          Test how well your brand content aligns with the simulated AI response
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Paste or edit brand content
          </label>
          <Textarea
            value={brandContent}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Enter your brand content, product descriptions, or marketing copy..."
            className="min-h-[120px]"
          />
        </div>
        
        <Button 
          onClick={onScoreMatch}
          disabled={!brandContent.trim() || isLoading}
          className="w-full"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          {isLoading ? "Scoring..." : "Score Match"}
        </Button>
        
        {matchResult && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Match Score & Analysis</label>
              <div className="p-4 bg-muted/30 rounded-md border space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Match Score:</span>
                  <Badge className={getScoreBadgeColor(matchResult.score)}>
                    {matchResult.score}/100
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium block mb-2">Analysis:</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {matchResult.explanation}
                  </p>
                </div>
              </div>
            </div>
            
            <Button onClick={onContinue} className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Select Models to Test
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
