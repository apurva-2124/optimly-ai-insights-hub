
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { SimulationResult, ModelWinners } from '@/lib/types';
import { 
  Download, 
  Brain, 
  TrendingUp, 
  MessageSquare, 
  FileText,
} from 'lucide-react';
import { toast } from "sonner";
import { SimulationSummaryBadge } from './SimulationSummaryBadge';
import { SimulationResultsTable } from './SimulationResultsTable';
import { ModelAnalysisTab } from './ModelAnalysisTab';
import { ReasoningTracesTab } from './ReasoningTracesTab';
import { MarketoIntegration } from './MarketoIntegration';

interface SimulationResultsProps {
  results: SimulationResult[];
  modelWinners: ModelWinners;
  onSelectWinner: (result: SimulationResult) => void;
  contentVariants?: Array<{ id: string; name: string; content: string; }>;
}

export const SimulationResults: React.FC<SimulationResultsProps> = ({
  results,
  modelWinners,
  onSelectWinner,
  contentVariants = []
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'reasoning'>('overview');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  
  const handleSelectWinner = (result: SimulationResult) => {
    onSelectWinner(result);
  };
  
  const handleFlagResult = (result: SimulationResult) => {
    toast.info("Result flagged as incorrect");
  };
  
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
  
  const toggleRowExpansion = (resultId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedRows(newExpanded);
  };
  
  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Simulation Analysis</CardTitle>
              <CardDescription>
                Structured LLM response simulation with reasoning traces
              </CardDescription>
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
          
          <SimulationSummaryBadge results={results} />
          
          <div className="flex gap-2 border-b">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('overview')}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Overview
            </Button>
            <Button 
              variant={activeTab === 'analysis' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('analysis')}
            >
              <Brain className="h-4 w-4 mr-1" />
              Model Analysis
            </Button>
            <Button 
              variant={activeTab === 'reasoning' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('reasoning')}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Reasoning Traces
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {activeTab === 'overview' && (
            <SimulationResultsTable
              results={results}
              modelWinners={modelWinners}
              expandedRows={expandedRows}
              onToggleRowExpansion={toggleRowExpansion}
              onSelectWinner={handleSelectWinner}
              onFlagResult={handleFlagResult}
            />
          )}
          
          {activeTab === 'analysis' && (
            <ModelAnalysisTab results={results} />
          )}
          
          {activeTab === 'reasoning' && (
            <ReasoningTracesTab 
              results={results} 
              modelWinners={modelWinners}
            />
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
