
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wand2, Check, X, Lightbulb } from "lucide-react";
import { Brand } from '@/lib/types';
import { toast } from "sonner";

interface DiscoveryQuery {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: 'Awareness' | 'Consideration' | 'Decision';
}

interface SuggestedQuery extends DiscoveryQuery {
  isEditing: boolean;
  accepted: boolean;
}

interface AIGeneratorProps {
  brand: Brand;
  onAddQueries: (queries: DiscoveryQuery[]) => void;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ brand, onAddQueries }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedQueries, setSuggestedQueries] = useState<SuggestedQuery[]>([]);

  const generateQueries = async () => {
    setIsGenerating(true);
    
    // Simulate GPT-4 API call with mock data
    setTimeout(() => {
      const mockQueries: SuggestedQuery[] = [
        {
          id: `gen-${Date.now()}-1`,
          query: `Best sustainable ${brand.industry.toLowerCase()} brands`,
          topic: 'Sustainability',
          persona: 'Eco-conscious consumer',
          funnelStage: 'Awareness',
          isEditing: false,
          accepted: false
        },
        {
          id: `gen-${Date.now()}-2`,
          query: `${brand.name} vs competitors comparison`,
          topic: 'Brand Comparison',
          persona: 'Budget-conscious shopper',
          funnelStage: 'Consideration',
          isEditing: false,
          accepted: false
        },
        {
          id: `gen-${Date.now()}-3`,
          query: `Top rated ${brand.industry.toLowerCase()} companies for quality`,
          topic: 'Quality Assessment',
          persona: 'Quality-focused buyer',
          funnelStage: 'Consideration',
          isEditing: false,
          accepted: false
        },
        {
          id: `gen-${Date.now()}-4`,
          query: `Where to buy ${brand.industry.toLowerCase()} products online`,
          topic: 'Purchase Channel',
          persona: 'Online shopper',
          funnelStage: 'Decision',
          isEditing: false,
          accepted: false
        },
        {
          id: `gen-${Date.now()}-5`,
          query: `Reviews of ${brand.name} products`,
          topic: 'Product Reviews',
          persona: 'Research-driven consumer',
          funnelStage: 'Decision',
          isEditing: false,
          accepted: false
        }
      ];
      
      setSuggestedQueries(mockQueries);
      setIsGenerating(false);
      toast.success("Generated 5 query suggestions based on your brand");
    }, 2000);
  };

  const acceptQuery = (id: string) => {
    setSuggestedQueries(prev => 
      prev.map(q => q.id === id ? { ...q, accepted: true } : q)
    );
  };

  const discardQuery = (id: string) => {
    setSuggestedQueries(prev => prev.filter(q => q.id !== id));
  };

  const addAcceptedQueries = () => {
    const acceptedQueries = suggestedQueries
      .filter(q => q.accepted)
      .map(({ isEditing, accepted, ...query }) => query);
    
    if (acceptedQueries.length === 0) {
      toast.error("Please accept at least one query");
      return;
    }
    
    onAddQueries(acceptedQueries);
    setSuggestedQueries([]);
    toast.success(`Added ${acceptedQueries.length} queries to your dataset`);
  };

  const getFunnelStageColor = (stage: string) => {
    switch (stage) {
      case 'Awareness': return 'bg-blue-100 text-blue-800';
      case 'Consideration': return 'bg-yellow-100 text-yellow-800';
      case 'Decision': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <CardTitle>Need help getting started?</CardTitle>
        </div>
        <CardDescription>
          Generate AI-powered query suggestions based on your brand and industry
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateQueries} 
          disabled={isGenerating}
          className="w-full"
          size="lg"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate with AI"}
        </Button>

        {suggestedQueries.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Suggested Queries:</h4>
            {suggestedQueries.map((query) => (
              <div 
                key={query.id} 
                className={`border rounded-lg p-3 space-y-2 ${
                  query.accepted ? 'bg-green-50 border-green-200' : 'bg-background'
                }`}
              >
                <div className="font-medium text-sm">{query.query}</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {query.topic}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {query.persona}
                  </Badge>
                  <Badge className={`text-xs ${getFunnelStageColor(query.funnelStage)}`}>
                    {query.funnelStage}
                  </Badge>
                </div>
                {!query.accepted && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => acceptQuery(query.id)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => discardQuery(query.id)}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Discard
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            {suggestedQueries.some(q => q.accepted) && (
              <Button onClick={addAcceptedQueries} className="w-full">
                Add Selected Queries to Dataset
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
