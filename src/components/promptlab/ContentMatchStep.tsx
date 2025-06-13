
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, TrendingUp, Globe } from 'lucide-react';
import { cn } from "@/lib/utils";
import { MatchResult } from '@/lib/types';

interface ContentMatchStepProps {
  brandContent: string;
  onContentChange: (content: string) => void;
  matchResult: MatchResult | null;
  onScoreMatch: () => void;
  onContinue: () => void;
  isLoading?: boolean;
  query?: string;
}

export const ContentMatchStep: React.FC<ContentMatchStepProps> = ({
  brandContent,
  onContentChange,
  matchResult,
  onScoreMatch,
  onContinue,
  isLoading = false,
  query = ''
}) => {
  const [isFetchingFallback, setIsFetchingFallback] = useState(false);
  const [hasFetchedFallback, setHasFetchedFallback] = useState(false);

  const handleFetchPublicContent = async () => {
    setIsFetchingFallback(true);
    
    // Simulate fetching public content based on the query
    setTimeout(() => {
      const fallbackContent = `**Premium Luxury Travel Experiences**

Discover unparalleled elegance and sophistication with our curated collection of luxury travel experiences. As a leader in premium hospitality, we specialize in creating extraordinary journeys that exceed the expectations of discerning travelers.

**Our Commitment to Excellence:**
• Personalized concierge service available 24/7
• Exclusive partnerships with world-renowned luxury providers
• Meticulously crafted itineraries tailored to individual preferences
• Uncompromising attention to detail in every aspect of your journey

**Award-Winning Service:**
Recognized by industry leaders for our dedication to exceptional guest experiences. Our team of travel specialists brings decades of expertise to ensure your journey is nothing short of extraordinary.

**Sustainable Luxury:**
We believe luxury and responsibility go hand in hand. Our eco-conscious approach ensures your travels contribute positively to the destinations you visit while maintaining the highest standards of comfort and service.

Contact our luxury travel specialists today to begin planning your next extraordinary adventure.`;

      onContentChange(fallbackContent);
      setHasFetchedFallback(true);
      setIsFetchingFallback(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const shouldShowFallback = !brandContent.trim() && !hasFetchedFallback && query;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
          Match Your Brand Content
        </CardTitle>
        <CardDescription>
          Upload or enter your brand's content to test how well it matches the user query and persona intent.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {shouldShowFallback && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 mb-1">No Content Detected</h4>
                <p className="text-sm text-blue-700 mb-3">
                  We can fetch publicly available content from your brand's website to use as a starting point for testing.
                </p>
                <Button
                  onClick={handleFetchPublicContent}
                  disabled={isFetchingFallback}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  {isFetchingFallback ? "Fetching Content..." : "Fetch Public Content"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-2 block">
            Brand Content
            {hasFetchedFallback && (
              <Badge variant="outline" className="ml-2 text-xs">Auto-fetched</Badge>
            )}
          </label>
          <Textarea
            value={brandContent}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Enter your brand's content, product descriptions, or marketing copy here..."
            className="min-h-[200px]"
          />
        </div>

        <Button 
          onClick={onScoreMatch}
          disabled={!brandContent.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? "Analyzing Content Match..." : "Score Content Match"}
        </Button>

        {matchResult && (
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Content Match Analysis</h3>
              <Badge variant={getScoreBadgeVariant(matchResult.score)} className="font-mono">
                {matchResult.score}%
              </Badge>
            </div>
            
            <div className="flex items-start gap-3">
              {matchResult.score >= 70 ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {matchResult.explanation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span className={cn("font-medium", getScoreColor(matchResult.score))}>
                {matchResult.score >= 80 ? "Excellent match" : 
                 matchResult.score >= 60 ? "Good match" : "Needs improvement"}
              </span>
            </div>
          </div>
        )}

        {matchResult && (
          <Button 
            onClick={onContinue}
            className="w-full"
            size="lg"
          >
            Continue to Content Variants →
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
