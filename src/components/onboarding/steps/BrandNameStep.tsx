
import React from 'react';
import { Input } from "@/components/ui/input";

interface BrandNameStepProps {
  brandName: string;
  setBrandName: (value: string) => void;
}

export const BrandNameStep: React.FC<BrandNameStepProps> = ({
  brandName,
  setBrandName
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">What's your brand name?</h3>
      <Input
        placeholder="Enter your brand name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        className="text-lg"
      />
      <p className="text-sm text-muted-foreground">
        We'll use this to track how your brand appears in AI-generated content.
      </p>
    </div>
  );
};
