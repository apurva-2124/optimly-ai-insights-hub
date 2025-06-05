
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AIGenerator } from '@/components/discovery/AIGenerator';
import { ManualEntry } from '@/components/discovery/ManualEntry';
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
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Build Your Discovery Dataset</h1>
        <p className="text-lg text-muted-foreground">
          Create queries that help track how AI assistants discover and recommend your brand
        </p>
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
    </AppLayout>
  );
};

export default DiscoveryDataset;
