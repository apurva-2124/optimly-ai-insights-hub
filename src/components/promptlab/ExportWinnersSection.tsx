
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Copy, ExternalLink, Trophy } from 'lucide-react';
import { SimulationResult, ModelWinners, ContentVariant } from '@/lib/types';
import { toast } from "sonner";

interface ExportWinnersSectionProps {
  results: SimulationResult[];
  modelWinners: ModelWinners;
  contentVariants: ContentVariant[];
  onSelectWinner: (result: SimulationResult) => void;
}

export const ExportWinnersSection: React.FC<ExportWinnersSectionProps> = ({
  results,
  modelWinners,
  contentVariants,
  onSelectWinner
}) => {
  const getWinningVariant = () => {
    const winnerIds = Object.values(modelWinners);
    const mostCommonWinner = winnerIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topWinnerId = Object.entries(mostCommonWinner)
      .sort(([,a], [,b]) => b - a)[0]?.[0];
      
    return results.find(r => r.id === topWinnerId);
  };

  const winningResult = getWinningVariant();
  const winningVariant = contentVariants.find(v => v.id === winningResult?.variantId);

  const handleDownload = () => {
    if (winningResult && winningVariant) {
      const content = `Winning Content Variant\n\nVariant: ${winningVariant.name}\nFormat: ${winningVariant.format}\nScore: ${winningResult.score}%\n\nContent:\n${winningVariant.content}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `winning-variant-${winningVariant.name}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Winning variant downloaded");
    }
  };

  const handleCopyToCMS = () => {
    if (winningVariant) {
      navigator.clipboard.writeText(winningVariant.content);
      toast.success("Content copied to clipboard - ready for CMS upload");
    }
  };

  const handleViewResults = () => {
    toast.info("Opening detailed analysis report");
  };

  if (!winningResult || !winningVariant) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-green-800">Winning Variant Identified</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{winningVariant.name}</Badge>
                <Badge>{winningVariant.format}</Badge>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {winningResult.score}% Average Score
              </div>
              <p className="text-sm text-gray-600">
                Performed best across {Object.keys(modelWinners).length} AI assistants
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Model Performance:</h4>
            <div className="space-y-1">
              {results.filter(r => r.variantId === winningVariant.id).map(result => (
                <div key={result.model} className="flex justify-between text-sm">
                  <span className="capitalize">{result.model}:</span>
                  <span className="font-medium">{result.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Variant
          </Button>
          
          <Button onClick={handleCopyToCMS} variant="outline" className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Copy to CMS
          </Button>
          
          <Button onClick={handleViewResults} variant="outline" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};
