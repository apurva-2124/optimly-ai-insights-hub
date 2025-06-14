
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
import { CheckCircle, XCircle, Target, Wrench } from 'lucide-react';

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
  onGenerateOptimizedVariant?: () => void;
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
  funnelStage,
  onGenerateOptimizedVariant
}) => {
  const detectBrandMention = (response: string): boolean => {
    if (!response) return false;
    
    const brandVariants = [
      'Eco Threads',
      'eco-threads', 
      'EcoThreads',
      'eco threads',
      'ECOTHREADS'
    ];
    
    const lowerResponse = response.toLowerCase();
    return brandVariants.some(variant => 
      lowerResponse.includes(variant.toLowerCase())
    );
  };

  // Use actual brand detection instead of the legacy brandMentioned prop
  const isBrandMentioned = simulatedResponse ? detectBrandMention(simulatedResponse) : false;
  const needsOptimization = !isBrandMentioned && matchScore !== null && matchScore >= 80;

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
            {isBrandMentioned ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">Brand Mentioned</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-700">Brand Not Mentioned</span>
              </>
            )}
          </div>
          
          {matchScore !== null && (
            <div className="flex items-center gap-2">
              <Badge variant="outline">{matchScore}% Match Score</Badge>
              {needsOptimization && (
                <div className="flex items-center gap-1 text-orange-600">
                  <Wrench className="h-3 w-3" />
                  <span className="text-xs font-medium">Optimization Needed</span>
                </div>
              )}
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
        
        <div className="flex gap-2">
          <Button onClick={onContinue} className="flex-1">
            <Target className="h-4 w-4 mr-2" />
            Test Your Brand Content
          </Button>
          
          {needsOptimization && onGenerateOptimizedVariant && (
            <Button 
              onClick={onGenerateOptimizedVariant} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Wrench className="h-4 w-4" />
              Generate Optimized Variant
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
