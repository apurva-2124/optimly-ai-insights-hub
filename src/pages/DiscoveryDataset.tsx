
import React, { useState } from 'react';
import { MainDashboardLayout } from '@/components/layout/MainDashboardLayout';
import { AIGenerator } from '@/components/discovery/AIGenerator';
import { ManualEntry } from '@/components/discovery/ManualEntry';
import { DiscoveryExplainer } from '@/components/discovery/DiscoveryExplainer';
import { Brand } from '@/lib/types';
import { dummyBrand } from '@/lib/dummy-data';

interface DiscoveryQuery {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: 'Awareness' | 'Consideration' | 'Decision';
}

const DiscoveryDataset = () => {
  const [brand] = useState<Brand>(dummyBrand);
  const [discoveryQueries, setDiscoveryQueries] = useState<DiscoveryQuery[]>([]);

  const handleAddQueries = (queries: DiscoveryQuery[]) => {
    setDiscoveryQueries(prev => [...prev, ...queries]);
  };

  const handleUpdateQuery = (id: string, updatedQuery: Partial<DiscoveryQuery>) => {
    setDiscoveryQueries(prev => 
      prev.map(q => q.id === id ? { ...q, ...updatedQuery } : q)
    );
  };

  const handleRemoveQuery = (id: string) => {
    setDiscoveryQueries(prev => prev.filter(q => q.id !== id));
  };

  return (
    <MainDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Track how your brand gets discovered in AI answers</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Build your Discovery Dataset to see how well your brand gets recommended compared to competitors
          </p>
          
          <DiscoveryExplainer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AIGenerator 
            brand={brand}
            onAddQueries={handleAddQueries}
          />
          
          <ManualEntry 
            queries={discoveryQueries}
            onUpdateQuery={handleUpdateQuery}
            onRemoveQuery={handleRemoveQuery}
            onAddQueries={handleAddQueries}
          />
        </div>
      </div>
    </MainDashboardLayout>
  );
};

export default DiscoveryDataset;
