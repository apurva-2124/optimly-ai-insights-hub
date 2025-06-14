
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Download, 
  FileText,
  Trophy,
} from 'lucide-react';
import { toast } from "sonner";
// Removed MarketoIntegration import
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

  // DEMO: Find the top winner and preview content
  const getDemoWinningVariant = () => {
    // Assume the "winner" is the variant with the highest avg confidence score from modelWinners
    const winnerIds = Object.values(modelWinners || {});
    let topResult: SimulationResult | undefined;
    let topScore = -1;

    results.forEach(result => {
      if (winnerIds.includes(result.id) && result.confidenceScore > topScore) {
        topScore = result.confidenceScore;
        topResult = result;
      }
    });

    if (!topResult) return null;
    const winningVariant = contentVariants.find(v => v.id === topResult?.variantId);
    return (winningVariant && topResult)
      ? {
          name: winningVariant.name,
          format: winningVariant.format || "Variant",
          score: Math.round(topResult.confidenceScore * 100),
          content: winningVariant.content
        }
      : null;
  };

  const handleDemoExport = () => {
    const demoWinner = getDemoWinningVariant();
    if (demoWinner) {
      toast.success(
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" /> 
            Exported Winner: <strong>{demoWinner.name}</strong>
          </div>
          <div className="text-xs mt-1 text-muted-foreground">
            Format: {demoWinner.format} &mdash; Score: {demoWinner.score}%
          </div>
          <hr className="my-2" />
          <div className="text-xs max-h-16 overflow-y-auto">{demoWinner.content.slice(0, 120)}...</div>
        </div>
      );
    } else {
      toast.error("No winner selected. Please select a winner for demo export.");
    }
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
        <Button 
          variant="default"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleDemoExport}
        >
          <Trophy className="h-4 w-4 text-yellow-500" />
          Export Winners (Demo)
        </Button>
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

