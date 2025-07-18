import React, { useState, useEffect } from 'react';
import { MainDashboardLayout } from '@/components/layout/MainDashboardLayout';
import { BrandProfile } from '@/components/visibility/BrandProfile';
import { QueryEditor } from '@/components/visibility/QueryEditor';
import { TopicSummary } from '@/components/visibility/TopicSummary';
import { QueryResultsTable } from '@/components/visibility/QueryResultsTable';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { SuccessCard } from '@/components/discovery/SuccessCard';
import { VisibilityGapCard } from '@/components/discovery/VisibilityGapCard';
import { VisibilitySummaryBar } from '@/components/discovery/VisibilitySummaryBar';
import { AIVisibilityTrends } from '@/components/discovery/AIVisibilityTrends';
import { WeeklyReportCard } from '@/components/discovery/WeeklyReportCard';
import { Brand, QueryResult, ContentVariant } from '@/lib/types';
import { 
  dummyBrand, 
  dummyQueries, 
  getTopicsFromQueries, 
  getPersonasFromQueries 
} from '@/lib/dummy-data';
import { toast } from 'sonner';

const Index = () => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [queries, setQueries] = useState<QueryResult[]>(dummyQueries);
  const [topics, setTopics] = useState<string[]>(getTopicsFromQueries(dummyQueries));
  const [personas, setPersonas] = useState<string[]>(getPersonasFromQueries(dummyQueries));
  const [variants, setVariants] = useState<ContentVariant[]>([]);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showVisibilityGap, setShowVisibilityGap] = useState(false);
  
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
    setShowSuccessCard(true);
    setShowVisibilityGap(true);
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

  const handleViewResults = () => {
    setShowSuccessCard(false);
    setShowVisibilityGap(false);
    const resultsSection = document.getElementById('query-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewOpportunities = () => {
    setShowVisibilityGap(false);
    const resultsSection = document.getElementById('query-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    toast.info("AI discovery is replacing traditional search as the primary way customers find brands and products.");
  };

  const handlePreviewReport = () => {
    toast.success("Weekly report preview opened");
  };

  const handleSubscribeAlerts = () => {
    toast.success("Subscribed to AI visibility alerts");
  };
  
  if (!onboardingComplete && !brand) {
    return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
  }
  
  return (
    <MainDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Optimly Index</h1>
          <p className="text-lg text-muted-foreground">
            Track and improve your brand visibility across AI platforms
          </p>
        </div>

        {showSuccessCard && (
          <SuccessCard onViewResults={handleViewResults} />
        )}

        {showVisibilityGap && (
          <VisibilityGapCard onViewOpportunities={handleViewOpportunities} />
        )}

        <VisibilitySummaryBar onLearnMore={handleLearnMore} />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <BrandProfile brand={brand || dummyBrand} onUpdateBrand={handleUpdateBrand} />
          </div>
          <div className="md:col-span-1">
            <QueryEditor 
              queries={queries} 
              topics={topics}
              personas={personas}
              onUpdateQueries={handleUpdateQueries}
              brand={brand || dummyBrand}
            />
          </div>
          <div className="md:col-span-1">
            <WeeklyReportCard 
              onPreviewReport={handlePreviewReport}
              onSubscribeAlerts={handleSubscribeAlerts}
            />
          </div>
        </div>
        
        <div>
          <TopicSummary topics={topics} queries={queries} />
        </div>

        <div>
          <AIVisibilityTrends />
        </div>
        
        <div id="query-results">
          <h2 className="text-xl font-bold mb-4">Query Results</h2>
          <QueryResultsTable 
            queries={queries} 
            onGenerateVariants={handleGenerateVariants} 
          />
        </div>
      </div>
    </MainDashboardLayout>
  );
};

export default Index;
