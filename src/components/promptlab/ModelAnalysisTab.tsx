
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SimulationResult } from '@/lib/types';

interface ModelAnalysisTabProps {
  results: SimulationResult[];
}

export const ModelAnalysisTab: React.FC<ModelAnalysisTabProps> = ({ results }) => {
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

  const groupResultsByModel = () => {
    const grouped = results.reduce((acc, result) => {
      if (!acc[result.model]) acc[result.model] = [];
      acc[result.model].push(result);
      return acc;
    }, {} as Record<string, SimulationResult[]>);
    return grouped;
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium mb-4">Model-Specific Analysis</h3>
      {Object.entries(groupResultsByModel()).map(([model, modelResults]) => (
        <div key={model} className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge className={getModelBadge(model)}>
              {model.charAt(0).toUpperCase() + model.slice(1)}
            </Badge>
            <span className="font-medium">Performance Comparison</span>
          </div>
          
          <div className="grid gap-3">
            {modelResults.map((result) => (
              <div key={`${model}-${result.id}`} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
                  </span>
                  <Badge className={getPositionBadge(getBrandMentionPosition(result))}>
                    {getBrandMentionPosition(result)}
                  </Badge>
                  <span className={result.brandCited ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {result.brandCited ? "Cited" : "Not Cited"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={getSentimentColor(result.sentiment)}>
                    {result.sentiment}
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {getVariantScore(result)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
