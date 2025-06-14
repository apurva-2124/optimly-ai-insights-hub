import React from 'react';
import { StepIndicator } from '@/components/promptlab/StepIndicator';
import { SimulatorSection } from '@/components/promptlab/SimulatorSection';
import { QuerySelectionStep } from '@/components/promptlab/QuerySelectionStep';
import { ContextSummaryBar } from '@/components/promptlab/ContextSummaryBar';
import { IntentDetectionStep } from '@/components/promptlab/IntentDetectionStep';
import { EnhancedSimulationStep } from '@/components/promptlab/EnhancedSimulationStep';
import { ContentMatchStep } from '@/components/promptlab/ContentMatchStep';
import { ContentVariantSelection } from '@/components/promptlab/ContentVariantSelection';
import { EnhancedModelSelection } from '@/components/promptlab/EnhancedModelSelection';
import { SimulationResults } from '@/components/promptlab/SimulationResults';
import { ExportWinnersSection } from '@/components/promptlab/ExportWinnersSection';
import { IntentData, MatchResult, DiscoveryQuery, SimulationResult, ContentVariant, ModelWinners } from '@/lib/types';

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
  modelWinners: ModelWinners;
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
  onGenerateOptimizedVariant: () => void;
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
  modelWinners,
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
  onToggleVariant,
  onGenerateOptimizedVariant
}) => {
  return (
    <div className="space-y-8">
      <StepIndicator 
        currentStep={currentStep}
        totalSteps={3}
        stepLabels={stepLabels}
      />

      {/* Add padding-top to account for the floating progress bar */}
      <div className="space-y-8 pt-32">
        
        {/* Step 1: Simulate AI Answers */}
        <SimulatorSection
          title="Simulate AI Answers"
          description="See what LLMs say about your brand—before your customers do"
          banner="Test your visibility across ChatGPT, Gemini, and Perplexity before customers search"
        >
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

          {intentData && (
            <IntentDetectionStep
              intentData={intentData}
              onEdit={() => onSetCurrentStep(1)}
              onContinue={onSimulateLLM}
              isLoading={isLoading && currentStep === 1}
            />
          )}

          {simulatedResponse && (
            <EnhancedSimulationStep
              simulatedResponse={simulatedResponse}
              brandMentioned={brandMentioned}
              matchScore={matchScore}
              personaFit={personaFit}
              onContinue={() => onSetCurrentStep(2)}
              isLoading={isLoading && currentStep === 1}
              query={query}
              persona={queryContext.persona}
              funnelStage={queryContext.funnelStage}
              onGenerateOptimizedVariant={onGenerateOptimizedVariant}
            />
          )}
        </SimulatorSection>

        {/* Step 2: Generate Optimized Variants */}
        {(currentStep >= 2 || simulatedResponse) && (
          <SimulatorSection
            title="Generate Optimized Variants"
            description="AI-tailored content, generated and tested in one place"
            banner="Upload your content or generate AI-optimized variants based on simulation insights"
          >
            <ContentMatchStep
              brandContent={brandContent}
              onContentChange={onContentChange}
              matchResult={matchResult}
              onScoreMatch={onScoreMatch}
              onContinue={() => onSetCurrentStep(3)}
              isLoading={isLoading && currentStep === 2}
              query={query}
            />

            {brandContent && (
              <ContentVariantSelection
                contentVariants={contentVariants}
                selectedVariants={selectedVariants}
                brandContent={brandContent}
                queryContext={queryContext}
                onAddVariant={onAddVariant}
                onUpdateVariant={onUpdateVariant}
                onDeleteVariant={onDeleteVariant}
                onToggleVariant={onToggleVariant}
                onContinue={() => onSetCurrentStep(3)}
                isLoading={isLoading && currentStep === 2}
              />
            )}
          </SimulatorSection>
        )}

        {/* Step 3: Compare & Export Winners */}
        {(currentStep >= 3 || contentVariants.length > 0) && (
          <SimulatorSection
            title="Compare & Export Winners"
            description="A/B test and ship content that performs best with AI search"
            banner="Run cross-model tests and export winning variants directly to your CMS"
          >
            <EnhancedModelSelection
              selectedModels={selectedModels}
              onModelToggle={onModelToggle}
              onRunSimulation={onRunSimulation}
              isLoading={isLoading && currentStep === 3}
              persona={queryContext.persona}
              funnelStage={queryContext.funnelStage}
            />

            {simulationComplete && !isLoading && (
              <>
                <SimulationResults 
                  results={simulationResults}
                  modelWinners={modelWinners}
                  onSelectWinner={onSelectWinner}
                  contentVariants={contentVariants}
                />
                
                <ExportWinnersSection
                  results={simulationResults}
                  modelWinners={modelWinners}
                  contentVariants={contentVariants}
                  onSelectWinner={onSelectWinner}
                />
              </>
            )}
          </SimulatorSection>
        )}
      </div>
    </div>
  );
};
