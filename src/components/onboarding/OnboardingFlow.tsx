
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronRight, 
  ChevronLeft, 
  BarChart2, 
  Target,
  Users,
  Tag,
  MessageSquare,
  Rocket
} from "lucide-react";
import { Brand } from '@/lib/types';
import { toast } from "sonner";
import { StepIndicator } from './StepIndicator';
import { BrandNameStep } from './steps/BrandNameStep';
import { IndustryStep } from './steps/IndustryStep';
import { CompetitorsStep } from './steps/CompetitorsStep';
import { PersonasStep } from './steps/PersonasStep';
import { TopicsStep } from './steps/TopicsStep';
import { QueriesStep } from './steps/QueriesStep';
import { LaunchStep } from './steps/LaunchStep';
import { generatePersonas, generateTopics, generateQueries } from './utils/onboardingUtils';

interface OnboardingFlowProps {
  onComplete: (brand: Brand) => void;
}

interface QueryEntry {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: string;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState("");
  const [personas, setPersonas] = useState("");
  const [personaChips, setPersonaChips] = useState<string[]>([]);
  const [topics, setTopics] = useState("");
  const [topicChips, setTopicChips] = useState<string[]>([]);
  const [queries, setQueries] = useState<QueryEntry[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [isGeneratingPersonas, setIsGeneratingPersonas] = useState(false);
  const [isGeneratingTopics, setIsGeneratingTopics] = useState(false);
  const [isGeneratingQueries, setIsGeneratingQueries] = useState(false);
  
  const stepLabels = [
    "Brand Name",
    "Industry", 
    "Competitors",
    "Personas",
    "Topics",
    "Search Queries",
    "Launch"
  ];

  const handleNextStep = () => {
    if (step === 1 && !brandName.trim()) {
      toast.error("Please enter your brand name");
      return;
    }
    
    if (step === 2 && !industry.trim()) {
      toast.error("Please enter your industry");
      return;
    }
    
    if (step < 7) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      onComplete({
        name: brandName,
        industry,
        competitors,
        personas: personaChips,
        topics: topicChips
      });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleAddCompetitor = () => {
    setCompetitors([...competitors, newCompetitor]);
    setNewCompetitor("");
  };
  
  const handleRemoveCompetitor = (competitor: string) => {
    setCompetitors(competitors.filter(c => c !== competitor));
  };

  const handleGeneratePersonas = () => {
    generatePersonas(setPersonaChips, setIsGeneratingPersonas);
  };

  const handleGenerateTopics = () => {
    generateTopics(setTopicChips, setIsGeneratingTopics);
  };

  const handleGenerateQueries = () => {
    generateQueries(
      brandName,
      competitors,
      personaChips,
      topicChips,
      queries,
      setQueries,
      setIsGeneratingQueries
    );
  };
  
  const getProgressValue = () => {
    return (step / 7) * 100;
  };

  const getStepIcon = () => {
    switch(step) {
      case 1: return <BarChart2 className="h-8 w-8" />;
      case 2: return <Target className="h-8 w-8" />;
      case 3: return <Users className="h-8 w-8" />;
      case 4: return <Users className="h-8 w-8" />;
      case 5: return <Tag className="h-8 w-8" />;
      case 6: return <MessageSquare className="h-8 w-8" />;
      case 7: return <Rocket className="h-8 w-8" />;
      default: return <BarChart2 className="h-8 w-8" />;
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <BrandNameStep brandName={brandName} setBrandName={setBrandName} />;
      case 2:
        return <IndustryStep industry={industry} setIndustry={setIndustry} />;
      case 3:
        return (
          <CompetitorsStep 
            competitors={competitors}
            newCompetitor={newCompetitor}
            setNewCompetitor={setNewCompetitor}
            onAddCompetitor={handleAddCompetitor}
            onRemoveCompetitor={handleRemoveCompetitor}
          />
        );
      case 4:
        return (
          <PersonasStep 
            personas={personas}
            setPersonas={setPersonas}
            personaChips={personaChips}
            setPersonaChips={setPersonaChips}
            isGeneratingPersonas={isGeneratingPersonas}
            onGeneratePersonas={handleGeneratePersonas}
          />
        );
      case 5:
        return (
          <TopicsStep 
            topics={topics}
            setTopics={setTopics}
            topicChips={topicChips}
            setTopicChips={setTopicChips}
            isGeneratingTopics={isGeneratingTopics}
            onGenerateTopics={handleGenerateTopics}
          />
        );
      case 6:
        return (
          <QueriesStep 
            newQuery={newQuery}
            setNewQuery={setNewQuery}
            queries={queries}
            setQueries={setQueries}
            personaChips={personaChips}
            topicChips={topicChips}
            isGeneratingQueries={isGeneratingQueries}
            onGenerateQueries={handleGenerateQueries}
          />
        );
      case 7:
        return <LaunchStep queries={queries} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div>
              <CardTitle>Welcome to Optimly</CardTitle>
              <CardDescription>
                Set up your brand to start tracking AI visibility
              </CardDescription>
            </div>
            <div className="text-primary">
              {getStepIcon()}
            </div>
          </div>
          
          <StepIndicator 
            currentStep={step}
            totalSteps={7}
            stepLabels={stepLabels}
          />
        </CardHeader>

        <CardContent>
          <Progress value={getProgressValue()} className="mb-6" />
          {renderStep()}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="ghost" onClick={handlePrevStep}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button onClick={handleNextStep}>
            {step === 7 ? "🚀 View Visibility Results" : "Continue"}
            {step < 7 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
