
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Database } from 'lucide-react';

interface PromptLabHeaderProps {
  onBackToIndex: () => void;
  onGoToDiscoveryDataset: () => void;
}

export const PromptLabHeader: React.FC<PromptLabHeaderProps> = ({
  onBackToIndex,
  onGoToDiscoveryDataset
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={onBackToIndex}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Optimly Index
        </Button>
        
        <Button 
          variant="outline"
          onClick={onGoToDiscoveryDataset}
        >
          <Database className="h-4 w-4 mr-1" />
          Manage Queries
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">AI Search Simulator</h1>
      <p className="text-lg text-muted-foreground">
        Test how your brand content performs when customers ask AI assistants about your industry
      </p>
    </div>
  );
};
