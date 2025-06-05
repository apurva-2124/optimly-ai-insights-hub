
import React from 'react';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { QuerySelectionStep } from '@/components/promptlab/QuerySelectionStep';
import { ContextSummaryBar } from '@/components/promptlab/ContextSummaryBar';
import { IntentDetectionStep } from '@/components/promptlab/IntentDetectionStep';
import { EnhancedSimulationStep } from '@/components/promptlab/EnhancedSimulationStep';
import { ContentMatchStep } from '@/components/promptlab/ContentMatchStep';
import { ContentVariantSelection } from '@/components/promptlab/ContentVariantSelection';
import { EnhancedModelSelection } from '@/components/promptlab/EnhancedModelSelection';
import { SimulationResults } from '@/components/promptlab/SimulationResults';
import { IntentData, MatchResult, DiscoveryQuery, SimulationResult, ContentVariant } from '@/lib/types';

interface PromptLabStepsProps {
  currentStep: number;
  stepLabels: string[];
  query: string;
  queryContext: {
    topic: string;
    persona: string;
    funnelStage: string;
  };
  discoveryQueries: DiscoveryQuery[];
  intentData: IntentData | null;
  simulatedResponse: string | null;
  brandMentioned: boolean | null;
  matchScore: number | null;
  personaFit: string | null;
  brandContent: string;
  matchResult: MatchResult | null;
  selectedModels: string[];
  simulationResults: SimulationResult[];
  isLoading: boolean;
  simulationComplete: boolean;
  contentVariants: ContentVariant[];
  selectedVariants: string[];
  onQuerySelect: (selectedQuery: string) => void;
  onDetectIntent: () => void;
  onSimulateLLM: () => void;
  onScoreMatch: () => void;
  onContentChange: (content: string) => void;
  onModelToggle: (model: string) => void;
  onRunSimulation: () => void;
  onSelectWinner: (result: SimulationResult) => void;
  onEditContext: () => void;
  onSetCurrentStep: (step: number) => void;
  onAddVariant: (variant: Omit<ContentVariant, 'id'>) => void;
  onUpdateVariant: (id: string, variant: Partial<ContentVariant>) => void;
  onDeleteVariant: (id: string) => void;
  onToggleVariant: (id: string) => void;
}

export const PromptLabSteps: React.FC<PromptLabStepsProps> = ({
  currentStep,
  stepLabels,
  query,
  queryContext,
  discoveryQueries,
  intentData,
  simulatedResponse,
  brandMentioned,
  matchScore,
  personaFit,
  brandContent,
  matchResult,
  selectedModels,
  simulationResults,
  isLoading,
  simulationComplete,
  contentVariants,
  selectedVariants,
  onQuerySelect,
  onDetectIntent,
  onSimulateLLM,
  onScoreMatch,
  onContentChange,
  onModelToggle,
  onRunSimulation,
  onSelectWinner,
  onEditContext,
  onSetCurrentStep,
  onAddVariant,
  onUpdateVariant,
  onDeleteVariant,
  onToggleVariant
}) => {
  return (
    <div className="space-y-6">
      <StepIndicator 
        currentStep={currentStep}
        totalSteps={6}
        stepLabels={stepLabels}
      />

      <div className="space-y-6">
        <QuerySelectionStep
          selectedQuery={query}
          discoveryQueries={discoveryQueries}
          onQuerySelect={onQuerySelect}
          onDetectIntent={onDetectIntent}
          isLoading={isLoading && currentStep === 1}
        />

        {query && queryContext.topic && (
          <ContextSummaryBar
            query={query}
            topic={queryContext.topic}
            persona={queryContext.persona}
            funnelStage={queryContext.funnelStage}
            onEdit={onEditContext}
          />
        )}

        <IntentDetectionStep
          intentData={intentData}
          onEdit={() => onSetCurrentStep(1)}
          onContinue={onSimulateLLM}
          isLoading={isLoading && currentStep === 2}
        />

        <EnhancedSimulationStep
          simulatedResponse={simulatedResponse}
          brandMentioned={brandMentioned}
          matchScore={matchScore}
          personaFit={personaFit}
          onContinue={() => onSetCurrentStep(4)}
          isLoading={isLoading && currentStep === 3}
          query={query}
          persona={queryContext.persona}
          funnelStage={queryContext.funnelStage}
        />

        <ContentMatchStep
          brandContent={brandContent}
          onContentChange={onContentChange}
          matchResult={matchResult}
          onScoreMatch={onScoreMatch}
          onContinue={() => onSetCurrentStep(5)}
          isLoading={isLoading && currentStep === 4}
        />

        <ContentVariantSelection
          contentVariants={contentVariants}
          selectedVariants={selectedVariants}
          brandContent={brandContent}
          queryContext={queryContext}
          onAddVariant={onAddVariant}
          onUpdateVariant={onUpdateVariant}
          onDeleteVariant={onDeleteVariant}
          onToggleVariant={onToggleVariant}
          onContinue={() => onSetCurrentStep(6)}
          isLoading={isLoading && currentStep === 5}
        />

        <EnhancedModelSelection
          selectedModels={selectedModels}
          onModelToggle={onModelToggle}
          onRunSimulation={onRunSimulation}
          isLoading={isLoading && currentStep === 6}
          persona={queryContext.persona}
          funnelStage={queryContext.funnelStage}
        />

        {simulationComplete && !isLoading && (
          <SimulationResults 
            results={simulationResults} 
            onSelectWinner={onSelectWinner}
          />
        )}
      </div>
    </div>
  );
};
