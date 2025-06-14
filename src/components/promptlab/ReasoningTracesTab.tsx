
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SimulationResult, ModelWinners } from '@/lib/types';
import { Check } from 'lucide-react';

interface ReasoningTracesTabProps {
  results: SimulationResult[];
  modelWinners: ModelWinners;
}

export const ReasoningTracesTab: React.FC<ReasoningTracesTabProps> = ({ results, modelWinners }) => {
  const getVariantScore = (result: SimulationResult) => {
    if (result.isControl) return 65;
    if (result.brandCited && result.confidenceScore > 0.8) return 92;
    if (result.brandCited && result.confidenceScore > 0.6) return 78;
    if (result.brandCited) return 64;
    return 34;
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

  const getModelBadge = (model: string) => {
    const modelColors = {
      chatgpt: "bg-green-100 text-green-800",
      gemini: "bg-blue-100 text-blue-800", 
      perplexity: "bg-purple-100 text-purple-800"
    };
    return modelColors[model as keyof typeof modelColors] || "bg-gray-100 text-gray-800";
  };

  const isWinner = (result: SimulationResult) => {
    return modelWinners[result.model] === result.id;
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-4">Reasoning Traces</h3>
      {results.map((result) => (
        <div key={`reasoning-${result.id}`} className="border rounded-md p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Badge className={getModelBadge(result.model)}>
                {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
              </Badge>
              <span className="font-medium">
                {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
              </span>
            </div>
            <span className="text-lg font-bold text-primary">
              {getVariantScore(result)}%
            </span>
          </div>
          
          <div className="bg-muted/30 rounded-md p-3 mb-3">
            <h4 className="text-sm font-medium mb-2">AI Response Snippet</h4>
            <p className="text-sm">{result.snippet}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Chain-of-Thought Analysis</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {getReasoningTrace(result)}
            </p>
          </div>
          
          {isWinner(result) && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
              <span className="text-green-800 text-sm font-medium flex items-center">
                <Check className="h-4 w-4 mr-1" />
                Selected as winning variant for {result.model}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
