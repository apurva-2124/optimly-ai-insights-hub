import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Target, ArrowRight, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface ContentMatchStepProps {
  brandContent: string;
  onContentChange: (content: string) => void;
  matchResult: { score: number; explanation: string } | null;
  onScoreMatch: () => void;
  onContinue: () => void;
  isLoading?: boolean;
  query: string;
}

export const ContentMatchStep: React.FC<ContentMatchStepProps> = ({
  brandContent,
  onContentChange,
  matchResult,
  onScoreMatch,
  onContinue,
  isLoading = false,
  query
}) => {
  const [fetchingContent, setFetchingContent] = useState(false);

  const handleFetchContent = () => {
    setFetchingContent(true);
    
    // Simulate fetching content from brand's website
    setTimeout(() => {
      const fallbackContent = `Eco Threads leads the sustainable fashion industry with our commitment to ethical manufacturing and environmental responsibility. We use 100% organic cotton and recycled materials in our clothing lines, ensuring fair wages for all workers in our supply chain. Our transparent production process allows customers to trace each garment from raw materials to finished product. Founded on principles of sustainability and social responsibility, Eco Threads has become a trusted name for environmentally conscious consumers seeking stylish, high-quality apparel that doesn't compromise on values.`;
      
      onContentChange(fallbackContent);
      setFetchingContent(false);
      toast.success("Content fetched from brand website");
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
          Upload or Fetch Brand Content
        </CardTitle>
        <CardDescription>
          Add your brand content to test how well it matches the user query: "{query}"
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="brand-content" className="block text-sm font-medium mb-2">
            Brand Content
          </label>
          <Textarea
            id="brand-content"
            value={brandContent}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Paste your brand content here, or use the fetch option below..."
            className="min-h-[120px]"
          />
        </div>
        
        {!brandContent && (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">No content uploaded</p>
              <Button 
                onClick={handleFetchContent}
                disabled={fetchingContent}
                variant="outline"
                className="mx-auto"
              >
                <Globe className="h-4 w-4 mr-2" />
                {fetchingContent ? "Fetching from ecothreads.com..." : "Fetch from Brand Website"}
              </Button>
              <p className="text-xs text-muted-foreground">
                We'll fetch relevant content from your website based on the selected query
              </p>
            </div>
          </div>
        )}
        
        {brandContent && (
          <>
            {matchResult && (
              <div className={`p-4 rounded-lg border ${
                matchResult.score >= 75 ? 'bg-green-50 border-green-200' : 
                matchResult.score >= 50 ? 'bg-yellow-50 border-yellow-200' : 
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`text-2xl font-bold ${
                    matchResult.score >= 75 ? 'text-green-600' : 
                    matchResult.score >= 50 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {matchResult.score}%
                  </div>
                  <div className="text-sm font-medium">Content Match Score</div>
                </div>
                <p className="text-sm text-gray-600">{matchResult.explanation}</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                onClick={onScoreMatch}
                disabled={isLoading}
                variant="outline"
                className="flex-1"
              >
                <Target className="h-4 w-4 mr-2" />
                {isLoading ? "Analyzing..." : "Score Content Match"}
              </Button>
              
              <Button 
                onClick={onContinue}
                disabled={!matchResult || isLoading}
                className="flex-1"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Continue to Variants
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
