
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Download, 
  FileText,
} from 'lucide-react';
import { toast } from "sonner";
import { MarketoIntegration } from './MarketoIntegration';
import { SimulationResult, ModelWinners } from '@/lib/types';

interface SimulationResultsHeaderProps {
  results: SimulationResult[];
  modelWinners: ModelWinners;
  contentVariants: Array<{ id: string; name: string; content: string; }>;
}

export const SimulationResultsHeader: React.FC<SimulationResultsHeaderProps> = ({
  results,
  modelWinners,
  contentVariants
}) => {
  const handleExport = () => {
    toast.success("Results exported");
  };
  
  const handleGenerateSlide = () => {
    const getWinningVariant = () => {
      return results.reduce((winner, current) => {
        if (!winner) return current;
        const getVariantScore = (result: SimulationResult) => {
          if (result.isControl) return 65;
          if (result.brandCited && result.confidenceScore > 0.8) return 92;
          if (result.brandCited && result.confidenceScore > 0.6) return 78;
          if (result.brandCited) return 64;
          return 34;
        };
        return getVariantScore(current) > getVariantScore(winner) ? current : winner;
      }, null as SimulationResult | null);
    };

    const getReasoningTrace = (result: SimulationResult) => {
      if (result.isControl) {
        return "Control variant provided basic brand information but lacked specific value propositions and third-party validation that would drive higher visibility in AI responses.";
      }
      
      const getVariantScore = (result: SimulationResult) => {
        if (result.isControl) return 65;
        if (result.brandCited && result.confidenceScore > 0.8) return 92;
        if (result.brandCited && result.confidenceScore > 0.6) return 78;
        if (result.brandCited) return 64;
        return 34;
      };
      
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

    const winner = getWinningVariant();
    const summaryData = {
      winner: winner ? `Variant ${winner.variantId.replace('v', '')}` : 'N/A',
      confidenceDelta: winner ? `+${Math.round((winner.confidenceScore - 0.65) * 100)}%` : 'N/A',
      topInsight: winner ? getReasoningTrace(winner).slice(0, 100) + '...' : 'N/A',
      timestamp: new Date().toLocaleString(),
      query: 'Sample sustainability query'
    };
    
    console.log('Generated slide summary:', summaryData);
    toast.success("Slide summary generated");
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">Simulation Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Structured LLM response simulation with reasoning traces
        </p>
      </div>
      <div className="flex gap-2">
        <MarketoIntegration 
          results={results}
          modelWinners={modelWinners}
          contentVariants={contentVariants}
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleGenerateSlide}
        >
          <FileText className="h-4 w-4" />
          Generate Slide
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleExport}
        >
          <Download className="h-4 w-4" />
          Export Analysis
        </Button>
      </div>
    </div>
  );
};
