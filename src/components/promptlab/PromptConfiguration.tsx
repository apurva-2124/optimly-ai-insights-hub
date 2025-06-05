
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QueryResult } from '@/lib/types';

interface PromptConfigurationProps {
  query: QueryResult;
}

export const PromptConfiguration: React.FC<PromptConfigurationProps> = ({ query }) => {
  const [userQuery, setUserQuery] = useState(query.query);
  const [userIntent, setUserIntent] = useState(
    `Finding the best ${query.topic.toLowerCase()} brands with focus on quality and value`
  );
  const [brandName, setBrandName] = useState('EcoThreads');
  const [competitorSnippets, setCompetitorSnippets] = useState(
    'Patagonia: Premium outdoor clothing with lifetime repairs. Everlane: Transparent pricing and ethical factories.'
  );
  
  const simulationPrompt = `You are an AI search assistant simulating how large language models respond to user queries in real-world discovery scenarios.

INPUTS:
- user_query: "${userQuery}"
- user_intent: "${userIntent}"
- brand_name: "${brandName}"
- competitor_snippets: "${competitorSnippets}"

Your task is to:
1. Simulate the LLM's response to the query as it would appear in an AI-generated answer
2. Evaluate which content variant is most likely to result in the brand being surfaced
3. Provide reasoning trace explaining what features influenced inclusion/exclusion

Return structured analysis with variant scores, brand mention positioning, and reasoning.`;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Simulation Configuration</CardTitle>
        <CardDescription>
          Configure the simulation parameters for realistic LLM response testing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                User Query
              </label>
              <Input
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Enter the user's search query"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Brand Name
              </label>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter brand name"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              User Intent
            </label>
            <Textarea
              value={userIntent}
              onChange={(e) => setUserIntent(e.target.value)}
              placeholder="Describe the user's primary search intent"
              rows={2}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Competitor Context (Optional)
            </label>
            <Textarea
              value={competitorSnippets}
              onChange={(e) => setCompetitorSnippets(e.target.value)}
              placeholder="Enter competitive content snippets for context"
              rows={2}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Query Context
            </label>
            <div className="flex gap-2 mb-2">
              <Badge>Topic: {query.topic}</Badge>
              <Badge>Persona: {query.persona}</Badge>
              <Badge>Original Query: {query.query}</Badge>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Simulation Prompt Preview
            </label>
            <div className="p-3 bg-muted rounded-md font-mono text-xs max-h-32 overflow-y-auto">
              {simulationPrompt}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Models to Test
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="chatgpt" defaultChecked className="w-4 h-4" />
                <label htmlFor="chatgpt" className="text-sm">ChatGPT</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="gemini" defaultChecked className="w-4 h-4" />
                <label htmlFor="gemini" className="text-sm">Gemini</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="perplexity" defaultChecked className="w-4 h-4" />
                <label htmlFor="perplexity" className="text-sm">Perplexity</label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
