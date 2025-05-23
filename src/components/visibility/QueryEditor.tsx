
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
import { Trash2, Plus, Edit } from "lucide-react";
import { QueryResult } from '@/lib/types';
import { toast } from "sonner";

interface QueryEditorProps {
  queries: QueryResult[];
  topics: string[];
  personas: string[];
  onUpdateQueries: (queries: QueryResult[]) => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({
  queries,
  topics,
  personas,
  onUpdateQueries
}) => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [newQuery, setNewQuery] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newPersona, setNewPersona] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const handleAddQuery = () => {
    if (!newQuery || !newTopic || !newPersona) {
      toast.error("Please fill all fields");
      return;
    }
    
    const newQueryObj: QueryResult = {
      id: `q-${Date.now()}`,
      query: newQuery,
      topic: newTopic,
      persona: newPersona,
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
    toast.success("Query added successfully");
  };
  
  const handleRemoveQuery = (id: string) => {
    const updatedQueries = queries.filter(q => q.id !== id);
    onUpdateQueries(updatedQueries);
    toast.success("Query removed successfully");
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Queries & Topics</CardTitle>
            <CardDescription>
              Edit your queries, topics, and personas
            </CardDescription>
          </div>
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
      </CardHeader>
      <CardContent>
        {showNewForm && (
          <div className="bg-muted/50 p-4 rounded-md mb-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Query</label>
                <Input 
                  value={newQuery} 
                  onChange={(e) => setNewQuery(e.target.value)}
                  placeholder="Enter search query"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Topic</label>
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
                <label className="text-sm font-medium mb-1 block">Persona</label>
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
            <div className="flex justify-end">
              <Button onClick={handleAddQuery}>
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
        </div>
      </CardContent>
    </Card>
  );
};
