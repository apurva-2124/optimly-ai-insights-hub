
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels
}) => {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="flex items-center justify-center py-4 overflow-x-auto">
        <div className="flex items-center min-w-max px-4">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <React.Fragment key={stepNumber}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2",
                      isCompleted && "bg-primary text-primary-foreground border-primary",
                      isCurrent && "bg-primary text-primary-foreground border-primary",
                      !isCompleted && !isCurrent && "bg-background text-muted-foreground border-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center max-w-[80px]">{label}</span>
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-12 mx-2 mt-[-20px]",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
