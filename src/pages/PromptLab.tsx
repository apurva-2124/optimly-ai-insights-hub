import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainDashboardLayout } from '@/components/layout/MainDashboardLayout';
import { SimulationResults } from '@/components/promptlab/SimulationResults';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { QuerySelectionStep } from '@/components/promptlab/QuerySelectionStep';
import { ContextSummaryBar } from '@/components/promptlab/ContextSummaryBar';
import { IntentDetectionStep } from '@/components/promptlab/IntentDetectionStep';
import { EnhancedSimulationStep } from '@/components/promptlab/EnhancedSimulationStep';
import { ContentMatchStep } from '@/components/promptlab/ContentMatchStep';
import { EnhancedModelSelection } from '@/components/promptlab/EnhancedModelSelection';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from "@/components/ui/tooltip";
import { 
  ContentVariant, 
  QueryResult, 
  SimulationResult 
} from '@/lib/types';
import { dummySimulationResults } from '@/lib/dummy-data';
import { ArrowLeft, Database } from 'lucide-react';
import { toast } from 'sonner';

interface IntentData {
  intent: string;
  persona: string;
  reasoning: string;
}

interface MatchResult {
  score: number;
  explanation: string;
}

interface DiscoveryQuery {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: string;
}

const PromptLab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [query, setQuery] = useState('');
  const [queryContext, setQueryContext] = useState({
    topic: '',
    persona: '',
    funnelStage: ''
  });
  const [intentData, setIntentData] = useState<IntentData | null>(null);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [brandMentioned, setBrandMentioned] = useState<boolean | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [personaFit, setPersonaFit] = useState<string | null>(null);
  const [brandContent, setBrandContent] = useState('');
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>(['chatgpt', 'gemini', 'perplexity']);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  // Mock Discovery Dataset - in real app, this would come from user data
  const [discoveryQueries] = useState<DiscoveryQuery[]>([
    {
      id: '1',
      query: 'best luxury cruises to Antarctica',
      topic: 'Luxury Travel',
      persona: 'Adventure-seeking retiree',
      funnelStage: 'Consideration'
    },
    {
      id: '2', 
      query: 'Seabourn vs Regent for world cruise',
      topic: 'Luxury Travel',
      persona: 'Affluent traveler',
      funnelStage: 'Decision'
    },
    {
      id: '3',
      query: 'which cruise lines include butler service',
      topic: 'Premium Amenities',
      persona: 'Luxury service seeker',
      funnelStage: 'Awareness'
    }
  ]);
  
  const stepLabels = [
    'Select Query',
    'Detect Context',
    'Simulate AI',
    'Match Content',
    'Test Models'
  ];

  useEffect(() => {
    // Load data passed from the Index page if available
    if (location.state?.variants && location.state?.query) {
      const variants = location.state.variants as ContentVariant[];
      const queryResult = location.state.query as QueryResult;
      setQuery(queryResult.query);
      if (variants.length > 0) {
        setBrandContent(variants[0].content);
      }
    }
  }, [location.state]);
  
  const handleQuerySelect = (selectedQuery: string) => {
    setQuery(selectedQuery);
    
    // Find matching query context from Discovery Dataset
    const matchingQuery = discoveryQueries.find(q => q.query === selectedQuery);
    if (matchingQuery) {
      setQueryContext({
        topic: matchingQuery.topic,
        persona: matchingQuery.persona,
        funnelStage: matchingQuery.funnelStage
      });
    }
  };

  const handleDetectIntent = async () => {
    setIsLoading(true);
    
    // Enhanced simulation with context
    setTimeout(() => {
      const mockIntent = `Finding sustainable and ethical ${query.includes('brand') ? 'brands' : 'products'} that align with environmental values and transparent business practices`;
      const mockPersona = queryContext.persona || 'Eco-conscious consumer';
      const mockReasoning = `Based on the query "${query}" and the ${queryContext.funnelStage} stage, this user is likely a ${mockPersona} looking for detailed comparisons and specific features.`;
      
      setIntentData({
        intent: mockIntent,
        persona: mockPersona,
        reasoning: mockReasoning
      });
      
      setCurrentStep(2);
      setIsLoading(false);
      toast.success("Query context analyzed");
    }, 1500);
  };

  const handleSimulateLLM = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockResponse = `Based on your search for "${query}", here are some top recommendations:

**For ${queryContext.persona} in the ${queryContext.funnelStage} stage:**

1. **Seabourn** - Ultra-luxury with all-suite accommodations and personalized service. Perfect for discerning travelers seeking intimate expedition experiences.

2. **Regent Seven Seas** - All-inclusive luxury with spacious suites and exceptional service. Known for comprehensive shore excursions.

3. **Silversea** - Premium expedition cruising with expert guides and zodiac landings. Butler service available in all suites.

These brands offer the premium amenities and personalized service that ${queryContext.persona} typically values, especially during the ${queryContext.funnelStage} phase of planning.`;

      setSimulatedResponse(mockResponse);
      setBrandMentioned(Math.random() > 0.4); // Random for demo
      setMatchScore(Math.floor(Math.random() * 30) + 70);
      setPersonaFit(`This content meets 85% of the ${queryContext.funnelStage}-stage needs for ${queryContext.persona}, with strong emphasis on luxury and service quality.`);
      setCurrentStep(3);
      setIsLoading(false);
      toast.success("AI response simulated");
    }, 2000);
  };

  const handleScoreMatch = async () => {
    setIsLoading(true);
    
    // Simulate content matching analysis
    setTimeout(() => {
      const score = brandContent.includes('sustainable') || brandContent.includes('eco') || brandContent.includes('ethical') ? 
        Math.floor(Math.random() * 20) + 75 : 
        Math.floor(Math.random() * 30) + 45;
      
      const explanation = score >= 75 ? 
        "Strong alignment with user intent. Content includes relevant sustainability keywords, transparency messaging, and addresses eco-conscious concerns. Clear value proposition for environmentally-minded consumers." :
        "Moderate alignment with query intent. Content could benefit from more specific sustainability claims, third-party certifications, and transparency about manufacturing processes to better match user expectations.";
      
      setMatchResult({ score, explanation });
      setCurrentStep(4);
      setIsLoading(false);
      toast.success("Content match scored");
    }, 1000);
  };

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleRunSimulation = async () => {
    setIsLoading(true);
    setCurrentStep(5);
    
    // Simulate final analysis across selected models
    setTimeout(() => {
      const results = dummySimulationResults.filter(
        r => selectedModels.includes(r.model)
      );
      
      setSimulationResults(results);
      setSimulationComplete(true);
      setIsLoading(false);
      toast.success("Simulation completed across all selected models");
    }, 3000);
  };

  const handleSelectWinner = (result: SimulationResult) => {
    console.log("Selected winner:", result);
    toast.success("Winner selected!");
  };
  
  const handleBackToIndex = () => {
    navigate('/');
  };
  
  const handleGoToDiscoveryDataset = () => {
    navigate('/discovery-dataset');
  };
  
  return (
    <TooltipProvider>
      <MainDashboardLayout>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={handleBackToIndex}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Optimly Index
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleGoToDiscoveryDataset}
              >
                <Database className="h-4 w-4 mr-1" />
                Manage Queries
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">AI Search Simulator</h1>
            <p className="text-lg text-muted-foreground">
              Test how your brand content performs when customers ask AI assistants about your industry
            </p>
          </div>

          <StepIndicator 
            currentStep={currentStep}
            totalSteps={5}
            stepLabels={stepLabels}
          />

          <div className="space-y-6">
            <QuerySelectionStep
              selectedQuery={query}
              discoveryQueries={discoveryQueries}
              onQuerySelect={handleQuerySelect}
              onDetectIntent={handleDetectIntent}
              isLoading={isLoading && currentStep === 1}
            />

            {query && queryContext.topic && (
              <ContextSummaryBar
                query={query}
                topic={queryContext.topic}
                persona={queryContext.persona}
                funnelStage={queryContext.funnelStage}
                onEdit={() => setCurrentStep(1)}
              />
            )}

            <IntentDetectionStep
              intentData={intentData}
              onEdit={() => setCurrentStep(1)}
              onContinue={handleSimulateLLM}
              isLoading={isLoading && currentStep === 2}
            />

            <EnhancedSimulationStep
              simulatedResponse={simulatedResponse}
              brandMentioned={brandMentioned}
              matchScore={matchScore}
              personaFit={personaFit}
              onContinue={() => setCurrentStep(4)}
              isLoading={isLoading && currentStep === 3}
              query={query}
              persona={queryContext.persona}
              funnelStage={queryContext.funnelStage}
            />

            <ContentMatchStep
              brandContent={brandContent}
              onContentChange={setBrandContent}
              matchResult={matchResult}
              onScoreMatch={handleScoreMatch}
              onContinue={() => setCurrentStep(5)}
              isLoading={isLoading && currentStep === 4}
            />

            <EnhancedModelSelection
              selectedModels={selectedModels}
              onModelToggle={handleModelToggle}
              onRunSimulation={handleRunSimulation}
              isLoading={isLoading && currentStep === 5}
              persona={queryContext.persona}
              funnelStage={queryContext.funnelStage}
            />

            {simulationComplete && !isLoading && (
              <SimulationResults 
                results={simulationResults} 
                onSelectWinner={handleSelectWinner}
              />
            )}
          </div>
        </div>
      </MainDashboardLayout>
    </TooltipProvider>
  );
};

export default PromptLab;
