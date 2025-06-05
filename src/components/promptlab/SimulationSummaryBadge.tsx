
import React from 'react';
import { Trophy } from 'lucide-react';
import { SimulationResult } from '@/lib/types';

interface SimulationSummaryBadgeProps {
  results: SimulationResult[];
}

export const SimulationSummaryBadge: React.FC<SimulationSummaryBadgeProps> = ({ results }) => {
  const getWinningVariant = () => {
    return results.reduce((winner, current) => {
      if (!winner) return current;
      return getVariantScore(current) > getVariantScore(winner) ? current : winner;
    }, null as SimulationResult | null);
  };

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

  const getConfidenceDelta = () => {
    const winner = getWinningVariant();
    const control = results.find(r => r.isControl);
    if (!winner || !control) return 0;
    return Math.round((winner.confidenceScore - control.confidenceScore) * 100);
  };

  const getVisibilityChange = () => {
    const winner = getWinningVariant();
    const control = results.find(r => r.isControl);
    if (!winner || !control) return 'No change detected';
    
    const winnerPos = getBrandMentionPosition(winner);
    const controlPos = getBrandMentionPosition(control);
    
    if (winnerPos === controlPos) return 'Position maintained';
    return `Moved from ${controlPos} → ${winnerPos} in ${winner.model}`;
  };

  const winner = getWinningVariant();
  const confidenceDelta = getConfidenceDelta();
  const visibilityChange = getVisibilityChange();

  if (!winner) return null;

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="h-5 w-5 text-yellow-600" />
        <span className="font-semibold text-lg">Simulation Summary</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Winner:</span>
          <div className="font-medium text-green-700">
            {winner.isControl ? 'Control' : `Variant ${winner.variantId.replace('v', '')}`}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Confidence Delta:</span>
          <div className="font-medium text-blue-700">
            {confidenceDelta > 0 ? '+' : ''}{confidenceDelta}%
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Visibility Change:</span>
          <div className="font-medium text-purple-700">
            {visibilityChange}
          </div>
        </div>
      </div>
    </div>
  );
};
