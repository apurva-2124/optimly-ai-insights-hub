
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Plus } from 'lucide-react';

interface QuerySelectionStepProps {
  selectedQuery: string;
  discoveryQueries: Array<{
    id: string;
    query: string;
    topic: string;
    persona: string;
    funnelStage: string;
  }>;
  onQuerySelect: (query: string) => void;
  onDetectIntent: () => void;
  isLoading?: boolean;
}

export const QuerySelectionStep: React.FC<QuerySelectionStepProps> = ({
  selectedQuery,
  discoveryQueries,
  onQuerySelect,
  onDetectIntent,
  isLoading = false
}) => {
  const [isCustomQuery, setIsCustomQuery] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  const handleQuerySelection = (value: string) => {
    if (value === 'custom') {
      setIsCustomQuery(true);
      onQuerySelect('');
    } else {
      setIsCustomQuery(false);
      onQuerySelect(value);
    }
  };

  const handleCustomQuerySubmit = () => {
    onQuerySelect(customQuery);
    onDetectIntent();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
          Choose a Search Query
        </CardTitle>
        <CardDescription>
          Select from your Discovery Dataset or enter a new query to test
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Query Selection</label>
          {discoveryQueries.length > 0 ? (
            <Select onValueChange={handleQuerySelection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose from your Discovery Dataset..." />
              </SelectTrigger>
              <SelectContent>
                {discoveryQueries.map((query) => (
                  <SelectItem key={query.id} value={query.query}>
                    <div className="flex flex-col">
                      <span>{query.query}</span>
                      <span className="text-xs text-muted-foreground">
                        {query.topic} • {query.persona} • {query.funnelStage}
                      </span>
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="custom">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Enter a new query
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="text-sm text-muted-foreground p-4 border rounded-md bg-muted/30">
              No queries in your Discovery Dataset yet. Enter a new query below.
            </div>
          )}
        </div>

        {(isCustomQuery || discoveryQueries.length === 0) && (
          <div>
            <label className="text-sm font-medium mb-2 block">Enter New Query</label>
            <Input
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="e.g. best luxury cruises to Antarctica"
              className="w-full"
            />
          </div>
        )}

        <Button 
          onClick={isCustomQuery ? handleCustomQuerySubmit : onDetectIntent}
          disabled={(!selectedQuery && !customQuery) || isLoading}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isLoading ? "Analyzing..." : "Analyze Query Context"}
        </Button>
      </CardContent>
    </Card>
  );
};
