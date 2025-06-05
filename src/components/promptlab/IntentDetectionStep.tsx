
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
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Brain, Edit, HelpCircle } from 'lucide-react';

interface IntentData {
  intent: string;
  persona: string;
  reasoning: string;
}

interface IntentDetectionStepProps {
  intentData: IntentData | null;
  onEdit: () => void;
  onContinue: () => void;
  isLoading?: boolean;
}

export const IntentDetectionStep: React.FC<IntentDetectionStepProps> = ({
  intentData,
  onEdit,
  onContinue,
  isLoading = false
}) => {
  if (!intentData) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
            Auto-Detect Intent and Persona
          </CardTitle>
          <CardDescription>
            Complete Step 1 to detect user intent and persona
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
          Auto-Detect Intent and Persona
        </CardTitle>
        <CardDescription>
          AI-detected user characteristics based on the query
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Intent</label>
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-sm">{intentData.intent}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Persona</label>
            <Badge variant="secondary" className="text-sm">
              {intentData.persona}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Reasoning</label>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-3 w-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">AI reasoning for intent and persona detection</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="p-3 bg-muted/30 rounded-md">
          <p className="text-sm text-muted-foreground">{intentData.reasoning}</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit} className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button onClick={onContinue} className="flex-1">
            <Brain className="h-4 w-4 mr-2" />
            Simulate LLM Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
