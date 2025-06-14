
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContentVariant, QueryResult, SimulationResult } from '@/lib/types';
import { dummySimulationResults } from '@/lib/dummy-data';
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

export const usePromptLabState = () => {
  const location = useLocation();
  
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
  const [contentVariants, setContentVariants] = useState<ContentVariant[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<string[]>(['control']);
  
  const [discoveryQueries] = useState<DiscoveryQuery[]>([
    {
      id: '1',
      query: 'best sustainable fashion brands for eco-conscious consumers',
      topic: 'Sustainable Fashion',
      persona: 'Eco-conscious consumer',
      funnelStage: 'Consideration'
    },
    {
      id: '2', 
      query: 'affordable organic cotton clothing brands under $50',
      topic: 'Affordable Sustainability',
      persona: 'Budget-conscious shopper',
      funnelStage: 'Decision'
    },
    {
      id: '3',
      query: 'ethical clothing brands with transparent supply chains',
      topic: 'Ethical Fashion',
      persona: 'Eco-conscious consumer',
      funnelStage: 'Awareness'
    }
  ]);

  useEffect(() => {
    if (location.state?.variants && location.state?.query) {
      const variants = location.state.variants as ContentVariant[];
      const queryResult = location.state.query as QueryResult;
      setQuery(queryResult.query);
      if (variants.length > 0) {
        setBrandContent(variants[0].content);
        setContentVariants(variants.slice(1));
      }
    }
  }, [location.state]);
  
  const handleQuerySelect = (selectedQuery: string) => {
    setQuery(selectedQuery);
    
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
    
    setTimeout(() => {
      const mockIntent = `Finding sustainable and ethical ${query.includes('brand') ? 'brands' : 'clothing'} that align with environmental values and transparent business practices`;
      const mockPersona = queryContext.persona || 'Eco-conscious consumer';
      const mockReasoning = `Based on the query "${query}" and the ${queryContext.funnelStage} stage, this user is likely a ${mockPersona} looking for detailed comparisons and specific features around sustainable fashion.`;
      
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

1. **Eco Threads** - Premium sustainable fashion with 100% organic cotton and transparent supply chains. Perfect for eco-conscious consumers seeking quality and ethics.

2. **Pact** - Affordable organic basics with fair trade certification. Known for comfortable essentials and accessible price points.

3. **Everlane** - Radical transparency in pricing and production. Offers premium sustainable clothing with detailed factory information.

4. **Kotn** - Direct-trade organic cotton from Egypt with farmer partnerships. Combines quality craftsmanship with ethical sourcing.

These brands offer the sustainable materials and ethical practices that ${queryContext.persona} typically values, especially during the ${queryContext.funnelStage} phase of shopping for eco-friendly clothing.`;

      setSimulatedResponse(mockResponse);
      setBrandMentioned(Math.random() > 0.3);
      setMatchScore(Math.floor(Math.random() * 30) + 70);
      setPersonaFit(`This content meets 85% of the ${queryContext.funnelStage}-stage needs for ${queryContext.persona}, with strong emphasis on sustainability and ethical practices.`);
      setCurrentStep(3);
      setIsLoading(false);
      toast.success("AI response simulated");
    }, 2000);
  };

  const handleScoreMatch = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const score = brandContent.includes('sustainable') || brandContent.includes('eco') || brandContent.includes('ethical') || brandContent.includes('organic') ? 
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
    setCurrentStep(6);
    
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

  const handleAddVariant = (variant: Omit<ContentVariant, 'id'>) => {
    const newVariant: ContentVariant = {
      ...variant,
      id: `variant-${Date.now()}`
    };
    setContentVariants(prev => [...prev, newVariant]);
    setSelectedVariants(prev => [...prev, newVariant.id]);
    toast.success("Variant added");
  };

  const handleUpdateVariant = (id: string, updates: Partial<ContentVariant>) => {
    setContentVariants(prev => 
      prev.map(variant => 
        variant.id === id ? { ...variant, ...updates } : variant
      )
    );
  };

  const handleDeleteVariant = (id: string) => {
    setContentVariants(prev => prev.filter(variant => variant.id !== id));
    setSelectedVariants(prev => prev.filter(variantId => variantId !== id));
    toast.success("Variant deleted");
  };

  const handleToggleVariant = (id: string) => {
    setSelectedVariants(prev => {
      if (id === 'control') {
        // Control cannot be deselected if it's the only one
        if (prev.includes('control') && prev.length === 1) {
          return prev;
        }
        return prev.includes('control') 
          ? prev.filter(variantId => variantId !== 'control')
          : [...prev, 'control'];
      }
      
      return prev.includes(id)
        ? prev.filter(variantId => variantId !== id)
        : [...prev, id];
    });
  };

  return {
    currentStep,
    setCurrentStep,
    query,
    queryContext,
    intentData,
    simulatedResponse,
    brandMentioned,
    matchScore,
    personaFit,
    brandContent,
    setBrandContent,
    matchResult,
    selectedModels,
    simulationResults,
    isLoading,
    simulationComplete,
    discoveryQueries,
    contentVariants,
    selectedVariants,
    handleQuerySelect,
    handleDetectIntent,
    handleSimulateLLM,
    handleScoreMatch,
    handleModelToggle,
    handleRunSimulation,
    handleSelectWinner,
    handleAddVariant,
    handleUpdateVariant,
    handleDeleteVariant,
    handleToggleVariant
  };
};
