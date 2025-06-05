import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Database, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DiscoveryQuery {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: 'Awareness' | 'Consideration' | 'Decision';
}

interface ManualEntryProps {
  queries: DiscoveryQuery[];
  onUpdateQuery: (id: string, updatedQuery: Partial<DiscoveryQuery>) => void;
  onRemoveQuery: (id: string) => void;
  onAddQueries: (queries: DiscoveryQuery[]) => void;
}

export const ManualEntry: React.FC<ManualEntryProps> = ({ 
  queries, 
  onUpdateQuery, 
  onRemoveQuery, 
  onAddQueries 
}) => {
  const [newQuery, setNewQuery] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newPersona, setNewPersona] = useState('');
  const [newFunnelStage, setNewFunnelStage] = useState<'Awareness' | 'Consideration' | 'Decision'>('Awareness');

  const handleAddRow = () => {
    const newId = `manual-${Date.now()}`;
    onAddQueries([{ 
      id: newId, 
      query: newQuery, 
      topic: newTopic, 
      persona: newPersona, 
      funnelStage: newFunnelStage 
    }]);
    setNewQuery('');
    setNewTopic('');
    setNewPersona('');
    setNewFunnelStage('Awareness');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Or enter your own queries</CardTitle>
        <CardDescription>
          Manually add search queries that your customers might ask AI assistants
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {queries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No queries added yet</p>
              <p className="text-sm">Add your first query to get started</p>
            </div>
          ) : (
            queries.map((query) => (
              <div key={query.id} className="border rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={`query-${query.id}`} className="text-sm font-medium">
                    Query
                  </Label>
                  <Input
                    id={`query-${query.id}`}
                    value={query.query}
                    onChange={(e) => onUpdateQuery(query.id, { query: e.target.value })}
                    placeholder="Enter search query"
                    className="text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`topic-${query.id}`} className="text-sm font-medium">
                      Topic
                    </Label>
                    <Input
                      id={`topic-${query.id}`}
                      value={query.topic}
                      onChange={(e) => onUpdateQuery(query.id, { topic: e.target.value })}
                      placeholder="e.g., Sustainability"
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`persona-${query.id}`} className="text-sm font-medium">
                      Persona
                    </Label>
                    <Input
                      id={`persona-${query.id}`}
                      value={query.persona}
                      onChange={(e) => onUpdateQuery(query.id, { persona: e.target.value })}
                      placeholder="e.g., Eco-conscious consumer"
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`funnel-${query.id}`} className="text-sm font-medium">
                        Funnel Stage
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            Funnel stage reflects where the customer is in their journey. Use this to see how your content performs for people who are just browsing vs. ready to buy. It affects how LLMs shape their responses.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      value={query.funnelStage}
                      onValueChange={(value: 'Awareness' | 'Consideration' | 'Decision') => 
                        onUpdateQuery(query.id, { funnelStage: value })
                      }
                    >
                      <SelectTrigger id={`funnel-${query.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Awareness">Awareness</SelectItem>
                        <SelectItem value="Consideration">Consideration</SelectItem>
                        <SelectItem value="Decision">Decision</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveQuery(query.id)}
                  className="ml-auto block w-fit -mb-2"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-sm">Add Row:</h4>
          <div className="space-y-2">
            <Label htmlFor="new-query" className="text-sm font-medium">
              Query
            </Label>
            <Input
              id="new-query"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              placeholder="Enter search query"
              className="text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="new-topic" className="text-sm font-medium">
                Topic
              </Label>
              <Input
                id="new-topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="e.g., Sustainability"
                className="text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-persona" className="text-sm font-medium">
                Persona
              </Label>
              <Input
                id="new-persona"
                value={newPersona}
                onChange={(e) => setNewPersona(e.target.value)}
                placeholder="e.g., Eco-conscious consumer"
                className="text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-funnel" className="text-sm font-medium">
                Funnel Stage
              </Label>
              <Select
                value={newFunnelStage}
                onValueChange={(value: 'Awareness' | 'Consideration' | 'Decision') => 
                  setNewFunnelStage(value)
                }
              >
                <SelectTrigger id="new-funnel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Awareness">Awareness</SelectItem>
                  <SelectItem value="Consideration">Consideration</SelectItem>
                  <SelectItem value="Decision">Decision</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleAddRow} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Query
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
