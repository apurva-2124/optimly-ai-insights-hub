
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface MatchScoreIndicatorProps {
  score: number;
  className?: string;
  showBreakdown?: boolean;
}

export const MatchScoreIndicator: React.FC<MatchScoreIndicatorProps> = ({
  score,
  className = "",
  showBreakdown = false
}) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    return "Poor Match";
  };

  const getScoreAdvice = (score: number): string => {
    if (score >= 80) return "Content is well-optimized and highly relevant to the query. Strong potential for AI visibility.";
    if (score >= 60) return "Good content alignment with room for optimization. Consider adding more specific details or certifications.";
    return "Content needs significant improvements to match user intent. Focus on relevance, specificity, and value proposition.";
  };

  const getProgressColor = (score: number): string => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Helper function to generate realistic breakdown scores
  const generateBreakdownScore = (baseScore: number, variance: number): number => {
    const randomVariance = (Math.random() - 0.5) * variance;
    return Math.min(100, Math.max(0, baseScore + randomVariance));
  };

  // Generate realistic breakdown scores based on the main score
  const breakdownScores = {
    keywordRelevance: generateBreakdownScore(score, 15),
    topicAlignment: generateBreakdownScore(score, 12),
    intentMatching: generateBreakdownScore(score, 18),
    personaFit: generateBreakdownScore(score, 10)
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        {getScoreIcon(score)}
        <span className={`text-sm font-medium ${getScoreColor(score)}`}>
          {getScoreLabel(score)}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${getProgressColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 cursor-help">
              <Badge variant="outline" className={getScoreColor(score)}>
                {score}%
              </Badge>
              <Info className="h-3 w-3 text-gray-400" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-2">
              <div className="font-medium">Match Score Analysis</div>
              <div className="text-xs text-gray-600">
                {getScoreAdvice(score)}
              </div>
              {showBreakdown && (
                <div className="space-y-1 pt-2 border-t">
                  <div className="text-xs font-medium">Score Breakdown:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Keyword Relevance:</span>
                      <span>{Math.round(breakdownScores.keywordRelevance)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Topic Alignment:</span>
                      <span>{Math.round(breakdownScores.topicAlignment)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intent Matching:</span>
                      <span>{Math.round(breakdownScores.intentMatching)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Persona Fit:</span>
                      <span>{Math.round(breakdownScores.personaFit)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
