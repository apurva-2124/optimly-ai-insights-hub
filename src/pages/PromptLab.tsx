
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ContentVariantEditor } from '@/components/promptlab/ContentVariantEditor';
import { PromptConfiguration } from '@/components/promptlab/PromptConfiguration';
import { SimulationResults } from '@/components/promptlab/SimulationResults';
import { Button } from '@/components/ui/button';
import { 
  ContentVariant, 
  QueryResult, 
  SimulationResult 
} from '@/lib/types';
import { dummySimulationResults } from '@/lib/dummy-data';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const PromptLab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [variants, setVariants] = useState<ContentVariant[]>([]);
  const [query, setQuery] = useState<QueryResult | null>(null);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  useEffect(() => {
    // Load data passed from the Index page
    if (location.state?.variants && location.state?.query) {
      setVariants(location.state.variants);
      setQuery(location.state.query);
    }
  }, [location.state]);
  
  const handleUpdateVariants = (updatedVariants: ContentVariant[]) => {
    setVariants(updatedVariants);
  };
  
  const handleSimulate = (selectedVariantIds: string[]) => {
    setIsSimulating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Filter results based on selected variants
      const results = dummySimulationResults.filter(
        r => selectedVariantIds.includes(r.variantId) || 
            (r.isControl && selectedVariantIds.includes('control'))
      );
      
      setSimulationResults(results);
      setIsSimulating(false);
      setSimulationComplete(true);
      
      toast.success("Simulation completed successfully");
    }, 2000);
  };
  
  const handleSelectWinner = (result: SimulationResult) => {
    // In a real app, this would update the database
    console.log("Selected winner:", result);
  };
  
  const handleBackToIndex = () => {
    navigate('/');
  };
  
  return (
    <AppLayout>
      <div className="mb-6">
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
          Test content variants and analyze AI responses
        </p>
      </div>
      
      {query ? (
        <>
          <PromptConfiguration query={query} />
          
          <ContentVariantEditor 
            variants={variants} 
            onUpdateVariants={handleUpdateVariants}
            onSimulate={handleSimulate}
          />
          
          {isSimulating && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p className="text-lg">Running simulations across AI models...</p>
            </div>
          )}
          
          {simulationComplete && !isSimulating && (
            <SimulationResults 
              results={simulationResults} 
              onSelectWinner={handleSelectWinner}
            />
          )}
        </>
      ) : (
        <div className="bg-muted/30 border rounded-md p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No Content Selected</h3>
          <p className="text-muted-foreground mb-4">
            Please select content variants from the Optimly Index to test in PromptLab
          </p>
          <Button onClick={handleBackToIndex}>
            Go to Optimly Index
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default PromptLab;
