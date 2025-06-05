
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { TableCell, TableRow } from "@/components/ui/table";
import { SimulationResult } from '@/lib/types';
import { 
  Flag, 
  Check, 
  Clock, 
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SimulationResultRowProps {
  result: SimulationResult;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpansion: () => void;
  onSelectWinner: () => void;
  onFlagResult: () => void;
}

export const SimulationResultRow: React.FC<SimulationResultRowProps> = ({
  result,
  isExpanded,
  isSelected,
  onToggleExpansion,
  onSelectWinner,
  onFlagResult
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
      <TableRow className={result.isControl ? "bg-muted/30" : ""}>
        <TableCell>
          <div className="flex items-center gap-2">
            <span>
              {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
            </span>
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
        </TableCell>
        <TableCell>
          <Badge className={getModelBadge(result.model)}>
            {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
          </Badge>
        </TableCell>
        <TableCell>
          {result.brandCited ? (
            <span className="text-green-600 font-medium">Yes</span>
          ) : (
            <span className="text-red-600 font-medium">No</span>
          )}
        </TableCell>
        <TableCell>
          <Badge className={getPositionBadge(getBrandMentionPosition(result))}>
            {getBrandMentionPosition(result)}
          </Badge>
        </TableCell>
        <TableCell>
          <span className={`confidence-badge ${getConfidenceBadge(result.confidenceScore)}`}>
            {formatScore(result.confidenceScore)}
          </span>
        </TableCell>
        <TableCell>
          <span className={getSentimentColor(result.sentiment)}>
            {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
          </span>
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          <Clock className="h-3 w-3 inline mr-1" />
          {new Date(result.timestamp).toLocaleTimeString()}
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end space-x-2">
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
            >
              {isSelected ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Selected
                </>
              ) : "Choose Winner"}
            </Button>
          </div>
        </TableCell>
      </TableRow>
      
      <TableRow className={`${result.isControl ? "bg-muted/30" : ""} ${!isExpanded ? "hidden" : ""}`}>
        <TableCell colSpan={8} className="p-0">
          <Collapsible open={isExpanded}>
            <CollapsibleContent>
              <div className="p-4 bg-muted/20 border-t">
                <div className="text-sm">
                  <h4 className="font-medium mb-2 text-muted-foreground">Reasoning Trace Preview</h4>
                  <p className="text-sm leading-relaxed">
                    {getReasoningTrace(result)}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>
      </TableRow>
    </>
  );
};
