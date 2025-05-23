
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { BrandProfile } from '@/components/visibility/BrandProfile';
import { QueryEditor } from '@/components/visibility/QueryEditor';
import { TopicSummary } from '@/components/visibility/TopicSummary';
import { QueryResultsTable } from '@/components/visibility/QueryResultsTable';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { Brand, QueryResult, ContentVariant } from '@/lib/types';
import { 
  dummyBrand, 
  dummyQueries, 
  getTopicsFromQueries, 
  getPersonasFromQueries 
} from '@/lib/dummy-data';

const Index = () => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [queries, setQueries] = useState<QueryResult[]>(dummyQueries);
  const [topics, setTopics] = useState<string[]>(getTopicsFromQueries(dummyQueries));
  const [personas, setPersonas] = useState<string[]>(getPersonasFromQueries(dummyQueries));
  const [variants, setVariants] = useState<ContentVariant[]>([]);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  
  // Simulate checking if user has completed onboarding
  useEffect(() => {
    // For demo purposes, we'll use a timeout to simulate checking storage
    const timer = setTimeout(() => {
      // In a real app, we'd check local storage or an API
      // For the demo, let's default to showing onboarding
      setOnboardingComplete(false);
      setBrand(null);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCompleteOnboarding = (newBrand: Brand) => {
    setBrand(newBrand);
    setOnboardingComplete(true);
  };
  
  const handleUpdateBrand = (updatedBrand: Brand) => {
    setBrand(updatedBrand);
  };
  
  const handleUpdateQueries = (updatedQueries: QueryResult[]) => {
    setQueries(updatedQueries);
    setTopics(getTopicsFromQueries(updatedQueries));
    setPersonas(getPersonasFromQueries(updatedQueries));
  };
  
  const handleGenerateVariants = (newVariants: ContentVariant[], query: QueryResult) => {
    setVariants(prev => [...prev, ...newVariants]);
  };
  
  if (!onboardingComplete && !brand) {
    return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
  }
  
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Optimly Index</h1>
        <p className="text-lg text-muted-foreground">
          Track and improve your brand visibility across AI platforms
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <BrandProfile brand={brand || dummyBrand} onUpdateBrand={handleUpdateBrand} />
        </div>
        <div className="md:col-span-2">
          <QueryEditor 
            queries={queries} 
            topics={topics}
            personas={personas}
            onUpdateQueries={handleUpdateQueries} 
          />
        </div>
      </div>
      
      <div className="mb-8">
        <TopicSummary topics={topics} queries={queries} />
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Query Results</h2>
        <QueryResultsTable 
          queries={queries} 
          onGenerateVariants={handleGenerateVariants} 
        />
      </div>
    </AppLayout>
  );
};

export default Index;
