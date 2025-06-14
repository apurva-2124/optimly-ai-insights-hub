
import { useState } from 'react';
import { DiscoveryQuery } from './types';

export const useDiscoveryQueries = () => {
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
    },
    {
      id: '4',
      query: 'plastic-free packaging sustainable clothing brands',
      topic: 'Eco-friendly Packaging',
      persona: 'Eco-conscious consumer',
      funnelStage: 'Research'
    },
    {
      id: '5',
      query: 'fair trade organic cotton t-shirts women',
      topic: 'Fair Trade Fashion',
      persona: 'Budget-conscious shopper',
      funnelStage: 'Decision'
    }
  ]);

  return { discoveryQueries };
};
