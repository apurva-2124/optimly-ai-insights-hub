
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SimulationResult, ModelWinners } from '@/lib/types';
import { SimulationResultRow } from './SimulationResultRow';
import { Crown } from 'lucide-react';

interface SimulationResultsTableProps {
  results: SimulationResult[];
  modelWinners: ModelWinners;
  expandedRows: Set<string>;
  onToggleRowExpansion: (resultId: string) => void;
  onSelectWinner: (result: SimulationResult) => void;
  onFlagResult: (result: SimulationResult) => void;
}

export const SimulationResultsTable: React.FC<SimulationResultsTableProps> = ({
  results,
  modelWinners,
  expandedRows,
  onToggleRowExpansion,
  onSelectWinner,
  onFlagResult
}) => {
  const getModelBadge = (model: string) => {
    const modelColors = {
      chatgpt: "bg-green-100 text-green-800",
      gemini: "bg-blue-100 text-blue-800", 
      perplexity: "bg-purple-100 text-purple-800"
    };
    return modelColors[model as keyof typeof modelColors] || "bg-gray-100 text-gray-800";
  };

  const groupResultsByModel = () => {
    return results.reduce((acc, result) => {
      if (!acc[result.model]) acc[result.model] = [];
      acc[result.model].push(result);
      return acc;
    }, {} as Record<string, SimulationResult[]>);
  };

  const groupedResults = groupResultsByModel();

  return (
    <div className="space-y-6">
      {Object.entries(groupedResults).map(([model, modelResults]) => (
        <div key={model} className="border rounded-lg overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={getModelBadge(model)}>
                  {model.charAt(0).toUpperCase() + model.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {modelResults.length} variants tested
                </span>
              </div>
              {modelWinners[model] && (
                <div className="flex items-center gap-1 text-sm font-medium text-amber-700">
                  <Crown className="h-4 w-4" />
                  Winner Selected
                </div>
              )}
            </div>
          </div>
          
          <div className="divide-y">
            {modelResults.map((result) => (
              <SimulationResultRow
                key={result.id}
                result={result}
                isExpanded={expandedRows.has(result.id)}
                isSelected={modelWinners[model] === result.id}
                onToggleExpansion={() => onToggleRowExpansion(result.id)}
                onSelectWinner={() => onSelectWinner(result)}
                onFlagResult={() => onFlagResult(result)}
                showModelBadge={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
