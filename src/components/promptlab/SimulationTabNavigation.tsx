
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Brain, 
  MessageSquare,
} from 'lucide-react';

interface SimulationTabNavigationProps {
  activeTab: 'overview' | 'analysis' | 'reasoning';
  onTabChange: (tab: 'overview' | 'analysis' | 'reasoning') => void;
}

export const SimulationTabNavigation: React.FC<SimulationTabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex gap-2 border-b">
      <Button 
        variant={activeTab === 'overview' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => onTabChange('overview')}
      >
        <TrendingUp className="h-4 w-4 mr-1" />
        Overview
      </Button>
      <Button 
        variant={activeTab === 'analysis' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => onTabChange('analysis')}
      >
        <Brain className="h-4 w-4 mr-1" />
        Model Analysis
      </Button>
      <Button 
        variant={activeTab === 'reasoning' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => onTabChange('reasoning')}
      >
        <MessageSquare className="h-4 w-4 mr-1" />
        Reasoning Traces
      </Button>
    </div>
  );
};
