
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { SimulationResult, ModelWinners } from '@/lib/types';
import { SimulationSummaryBadge } from './SimulationSummaryBadge';
import { SimulationResultsTable } from './SimulationResultsTable';
import { ModelAnalysisTab } from './ModelAnalysisTab';
import { ReasoningTracesTab } from './ReasoningTracesTab';
import { SimulationResultsHeader } from './SimulationResultsHeader';
import { SimulationTabNavigation } from './SimulationTabNavigation';
import { toast } from "sonner";

interface SimulationResultsProps {
  results: SimulationResult[];
  modelWinners: ModelWinners;
  onSelectWinner: (result: SimulationResult) => void;
  contentVariants?: ContentVariant[];
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
  
  const toggleRowExpansion = (resultId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedRows(newExpanded);
  };

  // Ensure contentVariants is of the correct shape for ContentVariant[]
  // If any elements are missing required properties, add defaults (for demo/fallback)
  const safeContentVariants: ContentVariant[] = contentVariants.map(variant => ({
    id: variant.id,
    name: variant.name,
    content: variant.content,
    format: (variant as any).format ?? "",
    topic: (variant as any).topic ?? "",
    persona: (variant as any).persona ?? "",
    query: (variant as any).query ?? "",
    funnelStage: (variant as any).funnelStage ?? "",
    ...(variant.isControl !== undefined ? { isControl: variant.isControl } : {}),
  }));

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <SimulationResultsHeader
            results={results}
            modelWinners={modelWinners}
            contentVariants={safeContentVariants}
          />
          
          <SimulationSummaryBadge results={results} />
          
          <SimulationTabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
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
