
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgePlus, Sparkles, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QueryEntry {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: string;
}

interface QueriesStepProps {
  newQuery: string;
  setNewQuery: (value: string) => void;
  queries: QueryEntry[];
  setQueries: (queries: QueryEntry[]) => void;
  personaChips: string[];
  topicChips: string[];
  isGeneratingQueries: boolean;
  onGenerateQueries: () => void;
}

export const QueriesStep: React.FC<QueriesStepProps> = ({
  newQuery,
  setNewQuery,
  queries,
  setQueries,
  personaChips,
  topicChips,
  isGeneratingQueries,
  onGenerateQueries
}) => {
  const funnelStages = ["Awareness", "Consideration", "Decision"];

  const handleAddQuery = () => {
    if (!newQuery.trim()) return;
    
    const newQueryEntry: QueryEntry = {
      id: `query-${Date.now()}`,
      query: newQuery,
      topic: topicChips[0] || "",
      persona: personaChips[0] || "",
      funnelStage: "Awareness"
    };
    
    setQueries([...queries, newQueryEntry]);
    setNewQuery("");
  };

  const handleRemoveQuery = (id: string) => {
    setQueries(queries.filter(q => q.id !== id));
  };

  const handleUpdateQuery = (id: string, field: keyof QueryEntry, value: string) => {
    setQueries(queries.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium mb-2">What questions do your customers ask AI assistants?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          These are real or likely questions your audience might ask in tools like ChatGPT or Gemini. We'll use them to test how well your brand shows up in AI-generated answers — and how you compare to competitors.
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="e.g. best sustainable fashion brands for organic cotton"
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddQuery()}
          className="flex-1"
        />
        <Button onClick={handleAddQuery} disabled={!newQuery.trim()}>
          <BadgePlus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={onGenerateQueries}
          disabled={isGeneratingQueries}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isGeneratingQueries ? "Generating..." : "✨ Generate Queries with AI"}
        </Button>
      </div>

      {queries.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Your search queries ({queries.length}):</label>
            <p className="text-xs text-muted-foreground">
              You can always add or update queries later in the Discovery Dataset tab.
            </p>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {queries.map((query) => (
              <div key={query.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                <div className="flex-1 grid grid-cols-4 gap-2 items-center">
                  <Input
                    value={query.query}
                    onChange={(e) => handleUpdateQuery(query.id, 'query', e.target.value)}
                    className="col-span-2 text-sm"
                    placeholder="Search query"
                  />
                  <Select
                    value={query.persona}
                    onValueChange={(value) => handleUpdateQuery(query.id, 'persona', value)}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Persona" />
                    </SelectTrigger>
                    <SelectContent>
                      {personaChips.map((persona) => (
                        <SelectItem key={persona} value={persona} className="text-xs">
                          {persona}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={query.funnelStage}
                    onValueChange={(value) => handleUpdateQuery(query.id, 'funnelStage', value)}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {funnelStages.map((stage) => (
                        <SelectItem key={stage} value={stage} className="text-xs">
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveQuery(query.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-md">
        <div className="text-sm">
          <strong>Example queries:</strong>
          <ul className="list-disc list-inside mt-1 text-muted-foreground">
            <li>"best sustainable fashion brands for organic cotton"</li>
            <li>"Eco Threads vs. Patagonia for eco-friendly clothing"</li>
            <li>"affordable ethical clothing brands with fair trade"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
