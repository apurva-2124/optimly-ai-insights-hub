
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SimulatorSectionProps {
  stepNumber: number;
  title: string;
  description: string;
  banner?: string;
  children: React.ReactNode;
  className?: string;
}

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({
  stepNumber,
  title,
  description,
  banner,
  children,
  className = ""
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {banner && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 text-center">
          <p className="text-sm font-medium text-primary">{banner}</p>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
              {stepNumber}
            </span>
            {title}
          </CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
