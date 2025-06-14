
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
          <SimulationResultsHeader
            results={results}
            modelWinners={modelWinners}
            contentVariants={contentVariants}
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
            />
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
