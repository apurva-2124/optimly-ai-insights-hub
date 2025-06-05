import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainDashboardLayout } from '@/components/layout/MainDashboardLayout';
import { SimulationResults } from '@/components/promptlab/SimulationResults';
import { StepIndicator } from '@/components/promptlab/StepIndicator';
import { QueryInputStep } from '@/components/promptlab/QueryInputStep';
import { IntentDetectionStep } from '@/components/promptlab/IntentDetectionStep';
import { LLMSimulationStep } from '@/components/promptlab/LLMSimulationStep';
import { ContentMatchStep } from '@/components/promptlab/ContentMatchStep';
import { ModelSelectionStep } from '@/components/promptlab/ModelSelectionStep';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from "@/components/ui/tooltip";
import { 
  ContentVariant, 
  QueryResult, 
  SimulationResult 
} from '@/lib/types';
import { dummySimulationResults } from '@/lib/dummy-data';
import { ArrowLeft } from 'lucide-react';
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

const PromptLab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [query, setQuery] = useState('');
  const [intentData, setIntentData] = useState<IntentData | null>(null);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [brandContent, setBrandContent] = useState('');
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>(['chatgpt']);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  const stepLabels = [
    'Input Query',
    'Detect Intent',
    'Simulate LLM',
    'Match Content',
    'Select Models'
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
  
  const handleDetectIntent = async () => {
    setIsLoading(true);
    
    // Simulate GPT-4 intent detection
    setTimeout(() => {
      const personas = [
        'Eco-conscious consumer',
        'Budget-conscious shopper', 
        'Corporate ESG manager',
        'Climate change advocate',
        'Trend-conscious Gen Z',
        'Small business buyer'
      ];
      
      const mockIntent = `Finding sustainable and ethical ${query.includes('brand') ? 'brands' : 'products'} that align with environmental values and transparent business practices`;
      const mockPersona = personas[Math.floor(Math.random() * personas.length)];
      const mockReasoning = `Based on keywords like "${query.split(' ').slice(0, 3).join(', ')}" the user appears to be prioritizing sustainability and transparency, indicating they are likely an ${mockPersona.toLowerCase()}.`;
      
      setIntentData({
        intent: mockIntent,
        persona: mockPersona,
        reasoning: mockReasoning
      });
      
      setCurrentStep(2);
      setIsLoading(false);
      toast.success("Intent and persona detected");
    }, 1500);
  };

  const handleSimulateLLM = async () => {
    setIsLoading(true);
    
    // Simulate LLM response generation
    setTimeout(() => {
      const mockResponse = `Based on your search for "${query}", here are some top recommendations:

**Sustainable and Transparent Brands:**

1. **Patagonia** - Known for their environmental activism and "Don't Buy This Jacket" campaign. They offer detailed supply chain transparency and use recycled materials extensively.

2. **Everlane** - Focuses on "Radical Transparency" by sharing the true cost of their products and factory information. They're committed to sustainable practices and ethical manufacturing.

3. **Eileen Fisher** - Pioneering circular fashion with their take-back program and commitment to organic fibers. They publish detailed sustainability reports.

4. **Reformation** - Carbon-neutral brand that tracks and shares the environmental impact of each garment. They use sustainable materials and deadstock fabrics.

When choosing sustainable brands, look for certifications like B-Corp, GOTS (Global Organic Textile Standard), and detailed supply chain information. Consider the brand's overall mission, not just individual eco-friendly products.`;

      setSimulatedResponse(mockResponse);
      setCurrentStep(3);
      setIsLoading(false);
      toast.success("LLM response simulated");
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
  
  return (
    <TooltipProvider>
      <MainDashboardLayout>
        <div className="space-y-6">
          <div>
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={handleBackToIndex}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Optimly Index
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">PromptLab</h1>
            <p className="text-lg text-muted-foreground">
              5-step simulation flow to test content variants against AI responses
            </p>
          </div>

          <StepIndicator 
            currentStep={currentStep}
            totalSteps={5}
            stepLabels={stepLabels}
          />

          <div className="space-y-6">
            <QueryInputStep
              query={query}
              onQueryChange={setQuery}
              onDetectIntent={handleDetectIntent}
              isLoading={isLoading && currentStep === 1}
            />

            <IntentDetectionStep
              intentData={intentData}
              onEdit={() => setCurrentStep(1)}
              onContinue={handleSimulateLLM}
              isLoading={isLoading && currentStep === 2}
            />

            <LLMSimulationStep
              simulatedResponse={simulatedResponse}
              onContinue={() => setCurrentStep(3)}
              isLoading={isLoading && currentStep === 3}
              query={query}
              intent={intentData?.intent || ''}
              persona={intentData?.persona || ''}
            />

            <ContentMatchStep
              brandContent={brandContent}
              onContentChange={setBrandContent}
              matchResult={matchResult}
              onScoreMatch={handleScoreMatch}
              onContinue={() => setCurrentStep(4)}
              isLoading={isLoading && currentStep === 4}
            />

            <ModelSelectionStep
              selectedModels={selectedModels}
              onModelToggle={handleModelToggle}
              onRunSimulation={handleRunSimulation}
              isLoading={isLoading && currentStep === 5}
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
