
import { useState } from 'react';
import { toast } from 'sonner';
import { IntentData, QueryContext } from './types';

export const useSimulationHandlers = (
  queryContext: QueryContext,
  setCurrentStep: (step: number) => void,
  setIntentData: (data: IntentData | null) => void,
  setSimulatedResponse: (response: string | null) => void,
  setMatchScore: (score: number | null) => void,
  setPersonaFit: (fit: string | null) => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDetectIntent = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockIntent = `Finding sustainable and ethical ${queryContext.persona.includes('brand') ? 'brands' : 'clothing'} that align with environmental values and transparent business practices`;
      const mockPersona = queryContext.persona || 'Eco-conscious consumer';
      const mockReasoning = `Based on the query and the ${queryContext.funnelStage} stage, this user is likely a ${mockPersona} looking for detailed comparisons and specific features around sustainable fashion.`;
      setIntentData({
        intent: mockIntent,
        persona: mockPersona,
        reasoning: mockReasoning
      });
      // Only advance to the next sub-step, not the next main step
      // We'll let the outer component handle step changes
      setIsLoading(false);
      toast.success("Query context analyzed");
    }, 1500);
  };

  const handleSimulateLLM = async () => {
    setIsLoading(true);

    setTimeout(() => {
      // Generate response that excludes the brand for demo purposes
      const mockResponse = `Based on your search, here are some top recommendations:

**For ${queryContext.persona} in the ${queryContext.funnelStage} stage:**

1. **Pact** - Affordable organic basics with fair trade certification. Known for comfortable essentials and accessible price points.

2. **Everlane** - Radical transparency in pricing and production. Offers premium sustainable clothing with detailed factory information.

3. **Kotn** - Direct-trade organic cotton from Egypt with farmer partnerships. Combines quality craftsmanship with ethical sourcing.

4. **Patagonia** - Environmental activism meets high-quality outdoor wear. Strong commitment to sustainable materials and repair programs.

These brands offer the sustainable materials and ethical practices that ${queryContext.persona} typically values, especially during the ${queryContext.funnelStage} phase of shopping for eco-friendly clothing.`;

      setSimulatedResponse(mockResponse);

      // Set a high match score to potentially trigger optimization
      const score = Math.floor(Math.random() * 30) + 75;
      setMatchScore(score);
      setPersonaFit(`This content meets ${85 + Math.floor(Math.random() * 10)}% of the ${queryContext.funnelStage}-stage needs for ${queryContext.persona}, with strong emphasis on sustainability and ethical practices.`);
      // -- DO NOT move to step 3 here --
      setIsLoading(false);
      toast.success("AI response simulated");
    }, 2000);
  };

  return {
    isLoading,
    handleDetectIntent,
    handleSimulateLLM
  };
};
