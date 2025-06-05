
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

interface QueryInputStepProps {
  query: string;
  onQueryChange: (query: string) => void;
  onDetectIntent: () => void;
  isLoading?: boolean;
}

export const QueryInputStep: React.FC<QueryInputStepProps> = ({
  query,
  onQueryChange,
  onDetectIntent,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
          Input a Search Query
        </CardTitle>
        <CardDescription>
          Enter the query your target audience would search for
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">User Query</label>
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="e.g. brands with transparent supply chains"
            className="w-full"
          />
        </div>
        <Button 
          onClick={onDetectIntent}
          disabled={!query.trim() || isLoading}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isLoading ? "Detecting..." : "Detect Intent & Persona"}
        </Button>
      </CardContent>
    </Card>
  );
};
