
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Sparkles, ExternalLink } from 'lucide-react';
import { QueryResult } from '@/lib/types';
import { 
  dummyContentVariants, 
  generateDummyContentVariants, 
  getVariantsByQueryAndPersona 
} from '@/lib/dummy-data';
import { toast } from 'sonner';

interface QueryResultsTableProps {
  queries: QueryResult[];
  onGenerateVariants: (variants: any[], query: QueryResult) => void;
}

export const QueryResultsTable: React.FC<QueryResultsTableProps> = ({
  queries,
  onGenerateVariants
}) => {
  const navigate = useNavigate();
  const [generatingIds, setGeneratingIds] = useState<string[]>([]);
  
  const handleGenerateVariants = (query: QueryResult) => {
    setGeneratingIds(prev => [...prev, query.id]);
    
    setTimeout(() => {
      const newVariants = generateDummyContentVariants(query);
      onGenerateVariants(newVariants, query);
      setGeneratingIds(prev => prev.filter(id => id !== query.id));
      toast.success("Content variants generated successfully");
    }, 1500);
  };
  
  const handleTestInSimulator = (query: QueryResult) => {
    const variants = getVariantsByQueryAndPersona(dummyContentVariants, query.query, query.persona);
    if (variants.length === 0) {
      toast.error("Please generate content variants first");
      return;
    }
    
    navigate('/promptlab', { state: { variants, query } });
  };
  
  const getStatusColor = (score: number) => {
    if (score >= 0.7) return "confidence-high";
    if (score >= 0.4) return "confidence-medium";
    return "confidence-low";
  };
  
  const getScoreDisplay = (score: number) => {
    return (score * 100).toFixed(0) + "%";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Query / Persona</TableHead>
            <TableHead className="w-[150px]">Topic</TableHead>
            <TableHead>ChatGPT</TableHead>
            <TableHead>Gemini</TableHead>
            <TableHead>Perplexity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries.map((query) => (
            <TableRow key={query.id}>
              <TableCell className="font-medium">
                <div>{query.query}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {query.persona}
                </div>
              </TableCell>
              <TableCell>{query.topic}</TableCell>
              
              {query.results.map((result, index) => (
                <TableCell key={`${query.id}-${result.model}`}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <span className={`confidence-badge ${getStatusColor(result.confidenceScore)}`}>
                        {getScoreDisplay(result.confidenceScore)}
                      </span>
                      <span className="ml-2">
                        {result.mentioned ? "Mentioned" : "Not Mentioned"}
                      </span>
                    </div>
                    
                    {result.mentioned && (
                      <div className="text-xs text-muted-foreground flex items-center">
                        Citation: {result.citationType === 'inline' ? 'Inline' : result.citationType === 'link' ? 'Link' : 'None'}
                        {result.citationType === 'link' && <ExternalLink className="h-3 w-3 ml-1" />}
                      </div>
                    )}
                    
                    <div className="text-xs line-clamp-1 text-muted-foreground">
                      "{result.snippet}"
                    </div>
                  </div>
                </TableCell>
              ))}
              
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateVariants(query)}
                    disabled={generatingIds.includes(query.id)}
                  >
                    {generatingIds.includes(query.id) ? 
                      "Generating..." : 
                      <>
                        <Sparkles className="h-4 w-4 mr-1" />
                        Generate Variants
                      </>
                    }
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleTestInSimulator(query)}
                  >
                    Test in Simulator
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
