
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
import { Play } from 'lucide-react';

interface EnhancedModelSelectionProps {
  selectedModels: string[];
  onModelToggle: (model: string) => void;
  onRunSimulation: () => void;
  isLoading?: boolean;
  persona: string;
  funnelStage: string;
}

export const EnhancedModelSelection: React.FC<EnhancedModelSelectionProps> = ({
  selectedModels,
  onModelToggle,
  onRunSimulation,
  isLoading = false,
  persona,
  funnelStage
}) => {
  const models = [
    { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI GPT-4', active: true },
    { id: 'gemini', name: 'Gemini', description: 'Google Gemini Pro', active: true },
    { id: 'perplexity', name: 'Perplexity', description: 'Perplexity AI', active: true }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
          Run Visibility Test
        </CardTitle>
        <CardDescription>
          Test your content across AI assistants for this {persona} in the {funnelStage} stage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {models.map((model) => (
            <div
              key={model.id}
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                selectedModels.includes(model.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              }`}
              onClick={() => onModelToggle(model.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{model.name}</span>
                {selectedModels.includes(model.id) && (
                  <Badge variant="secondary" className="text-xs">Selected</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{model.description}</p>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onRunSimulation}
          disabled={selectedModels.length === 0 || isLoading}
          className="w-full"
          size="lg"
        >
          <Play className="h-4 w-4 mr-2" />
          {isLoading ? "Running Visibility Test..." : `Test Across ${selectedModels.length} AI Assistants`}
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          This will show how your brand content performs for this specific customer scenario
        </div>
      </CardContent>
    </Card>
  );
};
