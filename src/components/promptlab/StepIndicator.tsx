
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
    <div className="fixed top-16 left-60 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm md:block hidden">
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
                      "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium border-2",
                      isCompleted && "bg-primary text-primary-foreground border-primary",
                      isCurrent && "bg-primary text-primary-foreground border-primary",
                      !isCompleted && !isCurrent && "bg-background text-muted-foreground border-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span className="text-sm mt-3 text-center max-w-[120px] font-medium">{label}</span>
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-16 mx-4 mt-[-24px]",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Mobile version */}
      <div className="md:hidden block">
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
                      <span className="text-xs mt-1 text-center max-w-[80px] truncate">{label}</span>
                    </div>
                    {index < totalSteps - 1 && (
                      <div
                        className={cn(
                          "h-0.5 w-8 mx-2 mt-[-16px]",
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
      </div>
    </div>
  );
};
