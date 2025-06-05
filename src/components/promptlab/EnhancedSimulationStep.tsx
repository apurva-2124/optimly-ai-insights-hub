
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Target } from 'lucide-react';

interface EnhancedSimulationStepProps {
  simulatedResponse: string | null;
  brandMentioned: boolean | null;
  matchScore: number | null;
  personaFit: string | null;
  onContinue: () => void;
  isLoading?: boolean;
  query: string;
  persona: string;
  funnelStage: string;
}

export const EnhancedSimulationStep: React.FC<EnhancedSimulationStepProps> = ({
  simulatedResponse,
  brandMentioned,
  matchScore,
  personaFit,
  onContinue,
  isLoading = false,
  query,
  persona,
  funnelStage
}) => {
  if (!simulatedResponse) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
            AI Response Simulation
          </CardTitle>
          <CardDescription>
            Complete previous steps to simulate AI responses
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getBrandStatusIcon = () => {
    if (brandMentioned === true) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (brandMentioned === false) return <XCircle className="h-4 w-4 text-red-500" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  const getBrandStatusText = () => {
    if (brandMentioned === true) return "Brand Mentioned";
    if (brandMentioned === false) return "Brand Not Mentioned";
    return "Competitors Mentioned";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
          AI Response Simulation
        </CardTitle>
        <CardDescription>
          Testing visibility for this query as it would appear to a {persona} in the {funnelStage} stage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 mb-4">
          <div className="flex items-center gap-2">
            {getBrandStatusIcon()}
            <span className="text-sm font-medium">{getBrandStatusText()}</span>
          </div>
          
          {matchScore !== null && (
            <div className={`px-2 py-1 rounded-md border text-sm font-medium ${getScoreColor(matchScore)}`}>
              {matchScore}% Match
            </div>
          )}
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Simulated AI Response</label>
          <div className="p-4 bg-muted/30 rounded-md border">
            <div className="prose prose-sm max-w-none">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{simulatedResponse}</p>
            </div>
          </div>
        </div>

        {personaFit && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="text-sm">
              <span className="font-medium">Persona Alignment: </span>
              {personaFit}
            </div>
          </div>
        )}
        
        <Button onClick={onContinue} className="w-full">
          <Target className="h-4 w-4 mr-2" />
          Test Your Brand Content
        </Button>
      </CardContent>
    </Card>
  );
};
