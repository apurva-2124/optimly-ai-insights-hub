
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
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, Users, MessageSquare, Tag } from "lucide-react";
import { QueryResult } from '@/lib/types';
import { toast } from "sonner";

interface QueryOnboardingWizardProps {
  onComplete: (query: QueryResult) => void;
  onSkip: () => void;
}

const personas = [
  'Eco-conscious consumer',
  'Budget-conscious shopper', 
  'Corporate ESG manager',
  'Gen Z trend-seeker',
  'Fitness-first buyer',
  'Tech early adopter',
  'Values-driven consumer'
];

const sampleQueries = [
  'best sustainable brands in my category',
  'affordable alternatives to premium brands',
  'companies with transparent supply chains',
  'trending brands on social media',
  'ethical business practices in industry'
];

export const QueryOnboardingWizard: React.FC<QueryOnboardingWizardProps> = ({
  onComplete,
  onSkip
}) => {
  const [step, setStep] = useState(1);
  const [selectedPersona, setSelectedPersona] = useState('');
  const [queryText, setQueryText] = useState('');
  const [topicText, setTopicText] = useState('');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    if (!selectedPersona || !queryText || !topicText) {
      toast.error("Please fill all fields");
      return;
    }

    const newQuery: QueryResult = {
      id: `q-onboard-${Date.now()}`,
      query: queryText,
      topic: topicText,
      persona: selectedPersona,
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

    onComplete(newQuery);
    toast.success("Your first query has been added!");
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedPersona !== '';
      case 2: return queryText !== '';
      case 3: return topicText !== '';
      default: return false;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {step}
              </span>
              Set Up Your First Query
            </CardTitle>
            <CardDescription>
              Let's create your first AI visibility tracking query
            </CardDescription>
          </div>
          <Button variant="ghost" onClick={onSkip}>
            Skip Setup
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Users className="h-5 w-5" />
              Who's your target audience?
            </div>
            <p className="text-muted-foreground">
              Choose the type of user most likely to search for brands like yours
            </p>
            <div className="grid grid-cols-2 gap-3">
              {personas.map((persona) => (
                <Button
                  key={persona}
                  variant={selectedPersona === persona ? "default" : "outline"}
                  className="justify-start h-auto p-3"
                  onClick={() => setSelectedPersona(persona)}
                >
                  {persona}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <MessageSquare className="h-5 w-5" />
              What would they ask an AI assistant?
            </div>
            <p className="text-muted-foreground">
              Think about what a <Badge variant="secondary">{selectedPersona}</Badge> might search for
            </p>
            <Input
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="e.g. best sustainable fashion brands"
              className="text-base"
            />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Example queries:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQueries.map((query) => (
                  <Button
                    key={query}
                    variant="ghost"
                    size="sm"
                    onClick={() => setQueryText(query)}
                    className="text-xs"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Tag className="h-5 w-5" />
              What's the main topic?
            </div>
            <p className="text-muted-foreground">
              Categorize this query with a topic tag
            </p>
            <Input
              value={topicText}
              onChange={(e) => setTopicText(e.target.value)}
              placeholder="e.g. Sustainable Fashion"
              className="text-base"
            />
            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Review Your Query:</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Query:</strong> {queryText}</div>
                <div><strong>Topic:</strong> {topicText}</div>
                <div><strong>Persona:</strong> {selectedPersona}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={step === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          {step < 3 ? (
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={!canProceed()}
            >
              Create Query
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
