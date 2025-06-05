
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Play } from 'lucide-react';

interface ModelSelectionStepProps {
  selectedModels: string[];
  onModelToggle: (model: string) => void;
  onRunSimulation: () => void;
  isLoading?: boolean;
}

export const ModelSelectionStep: React.FC<ModelSelectionStepProps> = ({
  selectedModels,
  onModelToggle,
  onRunSimulation,
  isLoading = false
}) => {
  const models = [
    { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI GPT-4' },
    { id: 'gemini', name: 'Gemini', description: 'Google Gemini Pro' },
    { id: 'perplexity', name: 'Perplexity', description: 'Perplexity AI' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
          Select Models to Test
        </CardTitle>
        <CardDescription>
          Choose which AI models to run your content simulation against
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {models.map((model) => (
            <div key={model.id} className="flex items-center space-x-3 p-3 border rounded-md">
              <Checkbox
                id={model.id}
                checked={selectedModels.includes(model.id)}
                onCheckedChange={() => onModelToggle(model.id)}
              />
              <div className="flex-1">
                <label htmlFor={model.id} className="text-sm font-medium cursor-pointer">
                  {model.name}
                </label>
                <p className="text-xs text-muted-foreground">{model.description}</p>
              </div>
              {selectedModels.includes(model.id) && (
                <Badge variant="secondary" className="text-xs">Selected</Badge>
              )}
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
          {isLoading ? "Running Simulation..." : `Run Simulation (${selectedModels.length} models)`}
        </Button>
      </CardContent>
    </Card>
  );
};
