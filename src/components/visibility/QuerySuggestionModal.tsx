
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QueryResult } from '@/lib/types';
import { toast } from "sonner";

interface QuerySuggestion {
  id: string;
  query: string;
  topic: string;
  persona: string;
  reasoning: string;
  strategicScore: number;
}

interface QuerySuggestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brandName: string;
  industry: string;
  competitor?: string;
  onAddQuery: (query: QueryResult) => void;
}

export const QuerySuggestionModal: React.FC<QuerySuggestionModalProps> = ({
  open,
  onOpenChange,
  brandName,
  industry,
  competitor,
  onAddQuery
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<QuerySuggestion[]>([]);

  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const mockSuggestions: QuerySuggestion[] = [
        {
          id: 'sg-1',
          query: `best ${industry.toLowerCase()} brands for sustainability`,
          topic: 'Sustainable Business',
          persona: 'Eco-conscious consumer',
          reasoning: `Users interested in ${industry.toLowerCase()} often prioritize environmental impact when making purchasing decisions.`,
          strategicScore: 92
        },
        {
          id: 'sg-2',
          query: `${industry.toLowerCase()} companies with transparent supply chains`,
          topic: 'Supply Chain Transparency',
          persona: 'Corporate ESG manager',
          reasoning: `B2B buyers and ESG professionals frequently research supply chain practices for compliance and partnerships.`,
          strategicScore: 88
        },
        {
          id: 'sg-3',
          query: `affordable ${industry.toLowerCase()} alternatives to ${competitor || 'premium brands'}`,
          topic: 'Budget Options',
          persona: 'Budget-conscious shopper',
          reasoning: `Price-sensitive consumers often seek alternatives to established players in the market.`,
          strategicScore: 85
        },
        {
          id: 'sg-4',
          query: `trending ${industry.toLowerCase()} brands on social media`,
          topic: 'Social Trends',
          persona: 'Gen Z trend-seeker',
          reasoning: `Younger demographics discover brands through social platforms and viral content.`,
          strategicScore: 78
        },
        {
          id: 'sg-5',
          query: `${industry.toLowerCase()} brands with ethical business practices`,
          topic: 'Ethical Business',
          persona: 'Values-driven consumer',
          reasoning: `Conscious consumers increasingly prioritize ethical considerations in brand selection.`,
          strategicScore: 82
        }
      ];
      
      setSuggestions(mockSuggestions.sort((a, b) => b.strategicScore - a.strategicScore));
      setIsGenerating(false);
    }, 2000);
  };

  const handleAddQuery = (suggestion: QuerySuggestion) => {
    const newQuery: QueryResult = {
      id: `q-${Date.now()}-${suggestion.id}`,
      query: suggestion.query,
      topic: suggestion.topic,
      persona: suggestion.persona,
      results: [
        {
          model: 'chatgpt',
          mentioned: false,
          citationType: 'none',
          snippet: 'New query - no results yet',
          confidenceScore: 0
        },
        {
          model: 'gemini',
          mentioned: false,
          citationType: 'none',
          snippet: 'New query - no results yet',
          confidenceScore: 0
        },
        {
          model: 'perplexity',
          mentioned: false,
          citationType: 'none',
          snippet: 'New query - no results yet',
          confidenceScore: 0
        }
      ]
    };
    
    onAddQuery(newQuery);
    toast.success("Query added to Optimly Index");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Generated Query Ideas
          </DialogTitle>
          <DialogDescription>
            Based on {brandName} in the {industry} industry
            {competitor && ` with competitor ${competitor}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <div className="text-center py-8">
              <Button 
                onClick={generateSuggestions} 
                disabled={isGenerating}
                size="lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating Ideas..." : "Generate Query Ideas"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Ranked by Strategic Visibility Opportunity
              </div>
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-medium">
                          {suggestion.query}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{suggestion.topic}</Badge>
                          <Badge variant="outline">{suggestion.persona}</Badge>
                          <Badge 
                            variant={suggestion.strategicScore >= 90 ? "default" : 
                                   suggestion.strategicScore >= 80 ? "secondary" : "outline"}
                          >
                            {suggestion.strategicScore}% Strategic Score
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{suggestion.reasoning}</p>
                          </TooltipContent>
                        </Tooltip>
                        <Button onClick={() => handleAddQuery(suggestion)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add to Index
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
