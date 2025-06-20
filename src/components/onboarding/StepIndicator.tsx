
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
    <div className="flex items-center justify-center mb-8 overflow-x-auto">
      <div className="flex items-center min-w-max">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2",
                    isCompleted && "bg-primary text-primary-foreground border-primary",
                    isCurrent && "bg-primary text-primary-foreground border-primary",
                    !isCompleted && !isCurrent && "bg-background text-muted-foreground border-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className="text-xs mt-1 text-center max-w-[60px] leading-tight">{label}</span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-12 mx-2 mt-[-16px]",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
