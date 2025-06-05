
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, Edit3 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ContextSummaryBarProps {
  query: string;
  topic: string;
  persona: string;
  funnelStage: string;
  onEdit: () => void;
}

export const ContextSummaryBar: React.FC<ContextSummaryBarProps> = ({
  query,
  topic,
  persona,
  funnelStage,
  onEdit
}) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">Query Context</h3>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit3 className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-muted-foreground">Query</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">The search question we're testing</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge variant="outline" className="text-xs truncate max-w-full">
              {query}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-muted-foreground">Topic</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Content category this query relates to</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge className="text-xs">
              {topic}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-muted-foreground">Persona</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Customer type likely to ask this question</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge variant="secondary" className="text-xs">
              {persona}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-muted-foreground">Stage</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Where the customer is in their buying journey</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge variant={
              funnelStage === 'Awareness' ? 'outline' : 
              funnelStage === 'Consideration' ? 'secondary' : 'default'
            } className="text-xs">
              {funnelStage}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
