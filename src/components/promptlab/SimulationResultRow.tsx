
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { SimulationResult } from '@/lib/types';
import { 
  Flag, 
  Check, 
  Clock, 
  ChevronDown,
  ChevronUp,
  Crown,
} from 'lucide-react';

interface SimulationResultRowProps {
  result: SimulationResult;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpansion: () => void;
  onSelectWinner: () => void;
  onFlagResult: () => void;
  showModelBadge?: boolean;
}

export const SimulationResultRow: React.FC<SimulationResultRowProps> = ({
  result,
  isExpanded,
  isSelected,
  onToggleExpansion,
  onSelectWinner,
  onFlagResult,
  showModelBadge = true
}) => {
  const getVariantScore = (result: SimulationResult) => {
    if (result.isControl) return 65;
    if (result.brandCited && result.confidenceScore > 0.8) return 92;
    if (result.brandCited && result.confidenceScore > 0.6) return 78;
    if (result.brandCited) return 64;
    return 34;
  };

  const getBrandMentionPosition = (result: SimulationResult) => {
    if (!result.brandCited) return 'omitted';
    if (result.confidenceScore > 0.8) return 'top';
    if (result.confidenceScore > 0.6) return 'mid';
    return 'bottom';
  };

  const getReasoningTrace = (result: SimulationResult) => {
    if (result.isControl) {
      return "Control variant provided basic brand information but lacked specific value propositions and third-party validation that would drive higher visibility in AI responses.";
    }
    
    const score = getVariantScore(result);
    if (score > 85) {
      return "Variant scored highly due to clear value proposition, specific product details, third-party certifications, and Q&A structure that directly addresses user intent.";
    } else if (score > 70) {
      return "Variant performed well with good clarity and relevant information, but could benefit from more specific examples and external validation.";
    } else if (score > 50) {
      return "Variant included brand mention but lacked compelling differentiation and specific details that would elevate it above competitors.";
    } else {
      return "Variant failed to provide sufficient relevance to user query or lacked key information that would warrant inclusion in AI response.";
    }
  };

  const getConfidenceBadge = (score: number) => {
    if (score >= 0.8) return "confidence-high";
    if (score >= 0.5) return "confidence-medium";
    return "confidence-low";
  };

  const formatScore = (score: number) => {
    return Math.round(score * 100) + "%";
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return "text-green-600";
    if (sentiment === 'neutral') return "text-gray-500";
    return "text-red-600";
  };

  const getPositionBadge = (position: string) => {
    if (position === 'top') return "bg-green-100 text-green-800";
    if (position === 'mid') return "bg-yellow-100 text-yellow-800";
    if (position === 'bottom') return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const getModelBadge = (model: string) => {
    const modelColors = {
      chatgpt: "bg-green-100 text-green-800",
      gemini: "bg-blue-100 text-blue-800", 
      perplexity: "bg-purple-100 text-purple-800"
    };
    return modelColors[model as keyof typeof modelColors] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <div className={`p-4 ${result.isControl ? "bg-muted/30" : ""} ${isSelected ? "bg-amber-50 border-l-4 border-l-amber-500" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
              </span>
              {isSelected && (
                <Crown className="h-4 w-4 text-amber-500" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExpansion}
                className="h-6 w-6 p-0"
              >
                {isExpanded ? 
                  <ChevronUp className="h-3 w-3" /> : 
                  <ChevronDown className="h-3 w-3" />
                }
              </Button>
            </div>
            
            {showModelBadge && (
              <Badge className={getModelBadge(result.model)}>
                {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
              </Badge>
            )}
            
            <div className="flex items-center gap-3">
              {result.brandCited ? (
                <span className="text-green-600 font-medium">Brand Cited</span>
              ) : (
                <span className="text-red-600 font-medium">Not Cited</span>
              )}
              
              <Badge className={getPositionBadge(getBrandMentionPosition(result))}>
                {getBrandMentionPosition(result)}
              </Badge>
              
              <span className={`confidence-badge ${getConfidenceBadge(result.confidenceScore)}`}>
                {formatScore(result.confidenceScore)}
              </span>
              
              <span className={getSentimentColor(result.sentiment)}>
                {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(result.timestamp).toLocaleTimeString()}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onFlagResult}
            >
              <Flag className="h-4 w-4" />
            </Button>
            
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={onSelectWinner}
              disabled={isSelected}
              className="min-w-[100px]"
            >
              {isSelected ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Winner
                </>
              ) : "Select Winner"}
            </Button>
          </div>
        </div>
        
        <Collapsible open={isExpanded}>
          <CollapsibleContent>
            <div className="mt-4 p-4 bg-muted/20 rounded-md">
              <h4 className="font-medium mb-2 text-muted-foreground">Reasoning Trace</h4>
              <p className="text-sm leading-relaxed">
                {getReasoningTrace(result)}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};
