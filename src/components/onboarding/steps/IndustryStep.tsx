
import React from 'react';
import { Input } from "@/components/ui/input";

interface IndustryStepProps {
  industry: string;
  setIndustry: (value: string) => void;
}

export const IndustryStep: React.FC<IndustryStepProps> = ({
  industry,
  setIndustry
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">What industry are you in?</h3>
      <Input
        placeholder="e.g. Fashion & Apparel, Technology, Food & Beverage"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        list="industries"
      />
      <datalist id="industries">
        <option value="Fashion & Apparel" />
        <option value="Technology" />
        <option value="Food & Beverage" />
        <option value="Health & Wellness" />
        <option value="Finance" />
        <option value="Travel & Tourism" />
        <option value="Entertainment" />
        <option value="Home & Garden" />
        <option value="Automotive" />
        <option value="Real Estate" />
      </datalist>
      <p className="text-sm text-muted-foreground">
        This helps us generate relevant queries, topics, and comparison benchmarks.
      </p>
    </div>
  );
};
