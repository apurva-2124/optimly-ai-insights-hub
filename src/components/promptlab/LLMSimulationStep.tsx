
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
import { MessageSquare, Target } from 'lucide-react';

interface LLMSimulationStepProps {
  simulatedResponse: string | null;
  onContinue: () => void;
  isLoading?: boolean;
  query: string;
  intent: string;
  persona: string;
}

export const LLMSimulationStep: React.FC<LLMSimulationStepProps> = ({
  simulatedResponse,
  onContinue,
  isLoading = false,
  query,
  intent,
  persona
}) => {
  if (!simulatedResponse) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
            Simulate LLM Response
          </CardTitle>
          <CardDescription>
            Complete Step 2 to simulate AI responses
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
          Simulate LLM Response
        </CardTitle>
        <CardDescription>
          AI-generated response for your target query and persona
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 mb-3">
          <Badge>Query: {query}</Badge>
          <Badge variant="outline">Intent: {intent}</Badge>
          <Badge variant="secondary">Persona: {persona}</Badge>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Simulated AI Response</label>
          <div className="p-4 bg-muted/30 rounded-md border">
            <div className="prose prose-sm max-w-none">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{simulatedResponse}</p>
            </div>
          </div>
        </div>
        
        <Button onClick={onContinue} className="w-full">
          <Target className="h-4 w-4 mr-2" />
          Match Brand Content to Query
        </Button>
      </CardContent>
    </Card>
  );
};
