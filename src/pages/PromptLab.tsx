
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainDashboardLayout } from '@/components/layout/MainDashboardLayout';
import { TooltipProvider } from "@/components/ui/tooltip";
import { PromptLabHeader } from '@/components/promptlab/PromptLabHeader';
import { PromptLabSteps } from '@/components/promptlab/PromptLabSteps';
import { usePromptLabState } from '@/hooks/usePromptLabState';

const PromptLab = () => {
  const navigate = useNavigate();
  const {
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
  } = usePromptLabState();
  
  const stepLabels = [
    'Select Query',
    'Detect Context',
    'Simulate AI',
    'Match Content',
    'Select Variants',
    'Run Visibility Test'
  ];
  
  const handleBackToIndex = () => {
    navigate('/');
  };
  
  const handleGoToDiscoveryDataset = () => {
    navigate('/discovery-dataset');
  };
  
  return (
    <TooltipProvider>
      <MainDashboardLayout>
        <div className="space-y-6">
          <PromptLabHeader
            onBackToIndex={handleBackToIndex}
            onGoToDiscoveryDataset={handleGoToDiscoveryDataset}
          />

          <PromptLabSteps
            currentStep={currentStep}
            stepLabels={stepLabels}
            query={query}
            queryContext={queryContext}
            discoveryQueries={discoveryQueries}
            intentData={intentData}
            simulatedResponse={simulatedResponse}
            brandMentioned={brandMentioned}
            matchScore={matchScore}
            personaFit={personaFit}
            brandContent={brandContent}
            matchResult={matchResult}
            selectedModels={selectedModels}
            simulationResults={simulationResults}
            isLoading={isLoading}
            simulationComplete={simulationComplete}
            contentVariants={contentVariants}
            selectedVariants={selectedVariants}
            modelWinners={modelWinners}
            onQuerySelect={handleQuerySelect}
            onDetectIntent={handleDetectIntent}
            onSimulateLLM={handleSimulateLLM}
            onScoreMatch={handleScoreMatch}
            onContentChange={setBrandContent}
            onModelToggle={handleModelToggle}
            onRunSimulation={handleRunSimulation}
            onSelectWinner={handleSelectWinner}
            onEditContext={() => setCurrentStep(1)}
            onSetCurrentStep={setCurrentStep}
            onAddVariant={handleAddVariant}
            onUpdateVariant={handleUpdateVariant}
            onDeleteVariant={handleDeleteVariant}
            onToggleVariant={handleToggleVariant}
            onGenerateOptimizedVariant={handleGenerateOptimizedVariant}
          />
        </div>
      </MainDashboardLayout>
    </TooltipProvider>
  );
};

export default PromptLab;
