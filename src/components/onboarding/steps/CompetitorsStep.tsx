
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgePlus } from "lucide-react";
import { toast } from "sonner";

interface CompetitorsStepProps {
  competitors: string[];
  newCompetitor: string;
  setNewCompetitor: (value: string) => void;
  onAddCompetitor: () => void;
  onRemoveCompetitor: (competitor: string) => void;
}

export const CompetitorsStep: React.FC<CompetitorsStepProps> = ({
  competitors,
  newCompetitor,
  setNewCompetitor,
  onAddCompetitor,
  onRemoveCompetitor
}) => {
  const handleAddCompetitor = () => {
    if (!newCompetitor.trim()) return;
    if (competitors.includes(newCompetitor)) {
      toast.error("Competitor already added");
      return;
    }
    onAddCompetitor();
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">Add your top competitors</h3>
      <p className="text-sm text-muted-foreground mb-4">
        We'll track these competitors alongside your brand to show where you're gaining or losing ground in AI answers.
      </p>
      
      <div className="flex space-x-2">
        <Input
          placeholder="Competitor name"
          value={newCompetitor}
          onChange={(e) => setNewCompetitor(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
        />
        <Button onClick={handleAddCompetitor}>
          <BadgePlus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      {competitors.length > 0 && (
        <div className="mt-3">
          <label className="text-sm font-medium mb-2 block">
            Added competitors:
          </label>
          <div className="flex flex-wrap gap-2">
            {competitors.map((competitor, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {competitor}
                <button 
                  className="ml-2 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemoveCompetitor(competitor)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground mt-4">
        Optional: You can skip this step and add competitors later.
      </p>
    </div>
  );
};
