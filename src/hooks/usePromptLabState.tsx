import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContentVariant, QueryResult, SimulationResult, ModelWinners } from '@/lib/types';
import { dummySimulationResults } from '@/lib/dummy-data';
import { toast } from 'sonner';
import { useDiscoveryQueries } from './promptlab/useDiscoveryQueries';
import { useSimulationHandlers } from './promptlab/useSimulationHandlers';
import { useContentVariants } from './promptlab/useContentVariants';
import { IntentData, MatchResult, QueryContext } from './promptlab/types';

export const usePromptLabState = () => {
  const location = useLocation();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [query, setQuery] = useState('');
  const [queryContext, setQueryContext] = useState<QueryContext>({
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
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [modelWinners, setModelWinners] = useState<ModelWinners>({});

  const { discoveryQueries } = useDiscoveryQueries();
  const { 
    contentVariants, 
    selectedVariants, 
    setContentVariants, 
    setSelectedVariants,
    handleAddVariant, 
    handleUpdateVariant, 
    handleDeleteVariant, 
    handleToggleVariant 
  } = useContentVariants();
  
  const { 
    isLoading, 
    handleDetectIntent, 
    handleSimulateLLM 
  } = useSimulationHandlers(
    queryContext,
    setCurrentStep,
    setIntentData,
    setSimulatedResponse,
    setMatchScore,
    setPersonaFit
  );

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
  }, [location.state, setContentVariants]);
  
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

  const handleGenerateOptimizedVariant = () => {
    toast.success("Generating optimized variant to improve brand visibility");
    setCurrentStep(5); // Go to variant selection step
  };

  const handleScoreMatch = async () => {
    const score = brandContent.includes('sustainable') || brandContent.includes('eco') || brandContent.includes('ethical') || brandContent.includes('organic') ? 
      Math.floor(Math.random() * 20) + 75 : 
      Math.floor(Math.random() * 30) + 45;
    
    const explanation = score >= 75 ? 
      "Strong alignment with user intent. Content includes relevant sustainability keywords, transparency messaging, and addresses eco-conscious concerns. Clear value proposition for environmentally-minded consumers." :
      "Moderate alignment with query intent. Content could benefit from more specific sustainability claims, third-party certifications, and transparency about manufacturing processes to better match user expectations.";
    
    setMatchResult({ score, explanation });
    setCurrentStep(4);
    toast.success("Content match scored");
  };

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleRunSimulation = async () => {
    setCurrentStep(6);
    
    setTimeout(() => {
      const results = dummySimulationResults.filter(
        r => selectedModels.includes(r.model)
      );
      
      setSimulationResults(results);
      setSimulationComplete(true);
      toast.success("Simulation completed across all selected models");
    }, 3000);
  };

  const handleSelectWinner = (result: SimulationResult) => {
    setModelWinners(prev => ({
      ...prev,
      [result.model]: result.id
    }));
    toast.success(`Winner selected for ${result.model.charAt(0).toUpperCase() + result.model.slice(1)}`);
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
    modelWinners,
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
    handleToggleVariant,
    handleGenerateOptimizedVariant
  };
};
