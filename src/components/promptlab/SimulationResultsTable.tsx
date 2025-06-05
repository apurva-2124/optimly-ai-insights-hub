
import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SimulationResult } from '@/lib/types';
import { SimulationResultRow } from './SimulationResultRow';
import { HelpCircle } from 'lucide-react';

interface SimulationResultsTableProps {
  results: SimulationResult[];
  selectedWinner: string | null;
  expandedRows: Set<string>;
  onToggleRowExpansion: (resultId: string) => void;
  onSelectWinner: (result: SimulationResult) => void;
  onFlagResult: (result: SimulationResult) => void;
}

export const SimulationResultsTable: React.FC<SimulationResultsTableProps> = ({
  results,
  selectedWinner,
  expandedRows,
  onToggleRowExpansion,
  onSelectWinner,
  onFlagResult
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Variant</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Brand Cited</TableHead>
          <TableHead>Position</TableHead>
          <TableHead className="flex items-center gap-1">
            Confidence
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Confidence is the model-estimated likelihood that this variant will be cited or surfaced for the given query and intent. Higher = greater probability of being selected by the LLM.
                </p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead>Sentiment</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <SimulationResultRow
            key={result.id}
            result={result}
            isExpanded={expandedRows.has(result.id)}
            isSelected={selectedWinner === result.id}
            onToggleExpansion={() => onToggleRowExpansion(result.id)}
            onSelectWinner={() => onSelectWinner(result)}
            onFlagResult={() => onFlagResult(result)}
          />
        ))}
      </TableBody>
    </Table>
  );
};
