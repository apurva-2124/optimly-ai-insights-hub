
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
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Edit, Sparkles, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QueryResult, Brand } from '@/lib/types';
import { toast } from "sonner";
import { QuerySuggestionModal } from './QuerySuggestionModal';
import { QueryOnboardingWizard } from './QueryOnboardingWizard';

interface QueryEditorProps {
  queries: QueryResult[];
  topics: string[];
  personas: string[];
  onUpdateQueries: (queries: QueryResult[]) => void;
  brand?: Brand;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({
  queries,
  topics,
  personas,
  onUpdateQueries,
  brand
}) => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(queries.length === 0);
  const [newQuery, setNewQuery] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newPersona, setNewPersona] = useState('');
  const [autoDetectEnabled, setAutoDetectEnabled] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  
  const handleAddQuery = (queryObj?: QueryResult) => {
    if (queryObj) {
      onUpdateQueries([...queries, queryObj]);
      setShowOnboarding(false);
      return;
    }

    if (!newQuery) {
      toast.error("Please enter a query");
      return;
    }

    if (!autoDetectEnabled && (!newTopic || !newPersona)) {
      toast.error("Please fill all fields or enable auto-detection");
      return;
    }
    
    const newQueryObj: QueryResult = {
      id: `q-${Date.now()}`,
      query: newQuery,
      topic: newTopic || 'Auto-detected Topic',
      persona: newPersona || 'Auto-detected Persona',
      results: [
        {
          model: 'chatgpt',
          mentioned: false,
          citationType: 'none',
          snippet: 'New query - no results yet',
          confidenceScore: 0
        },
        {
          model: 'gemini',
          mentioned: false,
          citationType: 'none',
          snippet: 'New query - no results yet',
          confidenceScore: 0
        },
        {
          model: 'perplexity',
          mentioned: false,
          citationType: 'none',
          snippet: 'New query - no results yet',
          confidenceScore: 0
        }
      ]
    };
    
    onUpdateQueries([...queries, newQueryObj]);
    setNewQuery('');
    setNewTopic('');
    setNewPersona('');
    setShowNewForm(false);
    setShowOnboarding(false);
    toast.success("Query added successfully");
  };

  const handleAutoDetect = () => {
    if (!newQuery) {
      toast.error("Please enter a query first");
      return;
    }

    setIsDetecting(true);
    
    // Simulate AI detection
    setTimeout(() => {
      // Mock auto-detection based on query content
      const queryLower = newQuery.toLowerCase();
      
      let detectedTopic = 'General';
      let detectedPersona = 'General Consumer';

      if (queryLower.includes('sustainable') || queryLower.includes('eco')) {
        detectedTopic = 'Sustainability';
        detectedPersona = 'Eco-conscious consumer';
      } else if (queryLower.includes('budget') || queryLower.includes('cheap') || queryLower.includes('affordable')) {
        detectedTopic = 'Budget Options';
        detectedPersona = 'Budget-conscious shopper';
      } else if (queryLower.includes('trend') || queryLower.includes('social')) {
        detectedTopic = 'Trends';
        detectedPersona = 'Gen Z trend-seeker';
      } else if (queryLower.includes('supply chain') || queryLower.includes('transparent')) {
        detectedTopic = 'Supply Chain';
        detectedPersona = 'Corporate ESG manager';
      }

      setNewTopic(detectedTopic);
      setNewPersona(detectedPersona);
      setIsDetecting(false);
      toast.success("Topic and persona detected!");
    }, 1500);
  };
  
  const handleRemoveQuery = (id: string) => {
    const updatedQueries = queries.filter(q => q.id !== id);
    onUpdateQueries(updatedQueries);
    toast.success("Query removed successfully");
  };

  if (showOnboarding) {
    return (
      <QueryOnboardingWizard 
        onComplete={handleAddQuery}
        onSkip={() => setShowOnboarding(false)}
      />
    );
  }
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Queries & Topics</CardTitle>
              <CardDescription>
                Track your brand visibility across AI platforms
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowSuggestionModal(true)}
                variant="outline"
                disabled={!brand}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Generate Ideas with AI
              </Button>
              <Button 
                onClick={() => setShowNewForm(!showNewForm)}
                variant={showNewForm ? "secondary" : "default"}
              >
                {showNewForm ? "Cancel" : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Query
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showNewForm && (
            <div className="bg-muted/50 p-4 rounded-md mb-4 animate-fade-in">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-sm font-medium">Query</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">
                          What a user might ask an AI assistant (e.g. ChatGPT) to find a brand like yours
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input 
                    value={newQuery} 
                    onChange={(e) => setNewQuery(e.target.value)}
                    placeholder="e.g. best sustainable fashion brands"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="auto-detect" 
                    checked={autoDetectEnabled}
                    onCheckedChange={setAutoDetectEnabled}
                  />
                  <label htmlFor="auto-detect" className="text-sm font-medium">
                    🔍 Auto-detect Topic & Persona
                  </label>
                  {autoDetectEnabled && newQuery && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleAutoDetect}
                      disabled={isDetecting}
                    >
                      {isDetecting ? "Detecting..." : "Detect"}
                    </Button>
                  )}
                </div>

                {!autoDetectEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <label className="text-sm font-medium">Topic</label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              The main theme of the query (e.g., Sustainable Fashion, Creative Tools)
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input 
                        value={newTopic} 
                        onChange={(e) => setNewTopic(e.target.value)}
                        placeholder="Enter topic"
                        list="topics-list"
                      />
                      <datalist id="topics-list">
                        {topics.map((topic) => (
                          <option key={topic} value={topic} />
                        ))}
                      </datalist>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <label className="text-sm font-medium">Persona</label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              The type of user most likely to ask this question (e.g., Eco-conscious consumer)
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input 
                        value={newPersona} 
                        onChange={(e) => setNewPersona(e.target.value)}
                        placeholder="Enter persona"
                        list="personas-list"
                      />
                      <datalist id="personas-list">
                        {personas.map((persona) => (
                          <option key={persona} value={persona} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                )}

                {autoDetectEnabled && (newTopic || newPersona) && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-md">
                    <p className="text-sm text-green-800">
                      <strong>Auto-detected:</strong> {newTopic && `Topic: ${newTopic}`}
                      {newTopic && newPersona && ' • '}
                      {newPersona && `Persona: ${newPersona}`}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={() => handleAddQuery()}>
                  Add Query
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            {queries.map((query) => (
              <div 
                key={query.id} 
                className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/30 group transition-colors"
              >
                <div>
                  <div className="font-medium">{query.query}</div>
                  <div className="text-sm text-muted-foreground">
                    {query.topic} • {query.persona}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveQuery(query.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {queries.length === 0 && !showNewForm && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No queries yet. Add your first query to start tracking AI visibility.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <QuerySuggestionModal
        open={showSuggestionModal}
        onOpenChange={setShowSuggestionModal}
        brandName={brand?.name || 'Your Brand'}
        industry={brand?.industry || 'Your Industry'}
        competitor={brand?.competitors?.[0]}
        onAddQuery={handleAddQuery}
      />
    </>
  );
};
