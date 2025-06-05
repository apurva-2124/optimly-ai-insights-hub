
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Upload, Trash2, HelpCircle, Edit3 } from "lucide-react";
import { toast } from "sonner";

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

const personas = [
  'Eco-conscious consumer',
  'Budget-conscious shopper',
  'Corporate ESG manager',
  'Gen Z trend-seeker',
  'Fitness-first buyer',
  'Tech early adopter',
  'Quality-focused buyer',
  'Research-driven consumer',
  'Online shopper'
];

const commonTopics = [
  'Sustainability',
  'Brand Comparison',
  'Quality Assessment',
  'Purchase Channel',
  'Product Reviews',
  'Pricing',
  'Customer Service',
  'Innovation',
  'Social Impact'
];

export const ManualEntry: React.FC<ManualEntryProps> = ({
  queries,
  onUpdateQuery,
  onRemoveQuery,
  onAddQueries
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addNewQuery = () => {
    const newQuery: DiscoveryQuery = {
      id: `manual-${Date.now()}`,
      query: '',
      topic: '',
      persona: '',
      funnelStage: 'Awareness'
    };
    
    onAddQueries([newQuery]);
    setEditingId(newQuery.id);
  };

  const handleInputChange = (id: string, field: keyof DiscoveryQuery, value: string) => {
    onUpdateQuery(id, { [field]: value });
  };

  const handleImportCSV = () => {
    // For demo purposes, show a toast
    toast.info("CSV import feature coming soon");
  };

  const FieldTooltip = ({ content, children }: { content: string; children: React.ReactNode }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            {children}
            <HelpCircle className="h-3 w-3 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-primary" />
          <CardTitle>Or enter your own</CardTitle>
        </div>
        <CardDescription>
          Manually add queries to track how AI assistants discover your brand
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={addNewQuery} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add New Row
          </Button>
          <Button onClick={handleImportCSV} variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1" />
            Import CSV
          </Button>
        </div>

        {queries.length > 0 && (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[35%]">
                    <FieldTooltip content="What a user might ask an AI assistant when looking for brands like yours">
                      Query
                    </FieldTooltip>
                  </TableHead>
                  <TableHead className="w-[20%]">
                    <FieldTooltip content="The main theme or category of the query">
                      Topic
                    </FieldTooltip>
                  </TableHead>
                  <TableHead className="w-[25%]">
                    <FieldTooltip content="The type of user most likely to ask this question">
                      Persona
                    </FieldTooltip>
                  </TableHead>
                  <TableHead className="w-[15%]">
                    <FieldTooltip content="Where the user is in their buying journey">
                      Funnel Stage
                    </FieldTooltip>
                  </TableHead>
                  <TableHead className="w-[5%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queries.map((query) => (
                  <TableRow key={query.id}>
                    <TableCell>
                      <Input
                        value={query.query}
                        onChange={(e) => handleInputChange(query.id, 'query', e.target.value)}
                        placeholder="e.g. best sustainable fashion brands"
                        className="border-none p-0 h-auto focus-visible:ring-0"
                      />
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={query.topic} 
                        onValueChange={(value) => handleInputChange(query.id, 'topic', value)}
                      >
                        <SelectTrigger className="border-none h-auto p-0">
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonTopics.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Custom...</SelectItem>
                        </SelectContent>
                      </Select>
                      {query.topic === 'custom' && (
                        <Input
                          value={query.topic}
                          onChange={(e) => handleInputChange(query.id, 'topic', e.target.value)}
                          placeholder="Enter custom topic"
                          className="mt-1"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={query.persona} 
                        onValueChange={(value) => handleInputChange(query.id, 'persona', value)}
                      >
                        <SelectTrigger className="border-none h-auto p-0">
                          <SelectValue placeholder="Select persona" />
                        </SelectTrigger>
                        <SelectContent>
                          {personas.map((persona) => (
                            <SelectItem key={persona} value={persona}>
                              {persona}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={query.funnelStage} 
                        onValueChange={(value) => handleInputChange(query.id, 'funnelStage', value as 'Awareness' | 'Consideration' | 'Decision')}
                      >
                        <SelectTrigger className="border-none h-auto p-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Awareness">Awareness</SelectItem>
                          <SelectItem value="Consideration">Consideration</SelectItem>
                          <SelectItem value="Decision">Decision</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveQuery(query.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {queries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No queries added yet. Click "Add New Row" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
