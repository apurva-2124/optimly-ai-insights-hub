
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
  const [promptTemplate, setPromptTemplate] = useState(
    `As a [persona], which [topic] brands do you recommend and why?`
  );
  
  const [filledPrompt, setFilledPrompt] = useState(
    `As a ${query.persona}, which ${query.topic.toLowerCase()} brands do you recommend and why?`
  );
  
  const handleTemplateChange = (newTemplate: string) => {
    setPromptTemplate(newTemplate);
    
    // Replace placeholders with actual values
    let filled = newTemplate;
    filled = filled.replace('[persona]', query.persona);
    filled = filled.replace('[topic]', query.topic.toLowerCase());
    
    setFilledPrompt(filled);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Prompt Configuration</CardTitle>
        <CardDescription>
          Configure the prompt template for simulation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Prompt Template
            </label>
            <Textarea
              value={promptTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              placeholder="Enter prompt template with [persona] and [topic] placeholders"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use [persona] and [topic] placeholders to include dynamic values
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Query Context
            </label>
            <div className="flex gap-2 mb-2">
              <Badge>Topic: {query.topic}</Badge>
              <Badge>Persona: {query.persona}</Badge>
              <Badge>Query: {query.query}</Badge>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Final Prompt
            </label>
            <div className="p-3 bg-muted rounded-md font-mono text-sm">
              {filledPrompt}
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
