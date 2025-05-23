
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgePlus, ChevronRight, BarChart2 } from "lucide-react";
import { Brand } from '@/lib/types';
import { toast } from "sonner";

interface OnboardingFlowProps {
  onComplete: (brand: Brand) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState("");
  
  const handleNextStep = () => {
    if (step === 1 && !brandName) {
      toast.error("Please enter your brand name");
      return;
    }
    
    if (step === 2 && !industry) {
      toast.error("Please select your industry");
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        name: brandName,
        industry,
        competitors
      });
    }
  };
  
  const handleAddCompetitor = () => {
    if (!newCompetitor) return;
    if (competitors.includes(newCompetitor)) {
      toast.error("Competitor already added");
      return;
    }
    setCompetitors([...competitors, newCompetitor]);
    setNewCompetitor("");
  };
  
  const handleRemoveCompetitor = (competitor: string) => {
    setCompetitors(competitors.filter(c => c !== competitor));
  };
  
  const getProgressValue = () => {
    return (step / 3) * 100;
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Welcome to Optimly</CardTitle>
              <CardDescription>
                Set up your brand to start optimizing your AI visibility
              </CardDescription>
            </div>
            <div className="text-primary">
              <BarChart2 className="h-8 w-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={getProgressValue()} className="mb-6" />
          
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium">What's your brand name?</h3>
              <Input
                placeholder="Enter your brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="text-lg"
              />
              <p className="text-sm text-muted-foreground">
                We'll use this to track your brand's visibility in AI-generated content
              </p>
            </div>
          )}
          
          {step === 2 && (
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
                <option value="Travel" />
                <option value="Entertainment" />
                <option value="Home & Garden" />
              </datalist>
              <p className="text-sm text-muted-foreground">
                This helps us generate relevant queries and topics for your brand
              </p>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium">Add your top competitors (optional)</h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Competitor name"
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
                />
                <Button onClick={handleAddCompetitor}>
                  <BadgePlus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              {competitors.length > 0 && (
                <div className="mt-3">
                  <label className="text-sm font-medium mb-2 block">
                    Added competitors:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {competitors.map((competitor, index) => (
                      <div 
                        key={index} 
                        className="bg-muted rounded-md px-3 py-1 text-sm flex items-center"
                      >
                        {competitor}
                        <button 
                          className="ml-2 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveCompetitor(competitor)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                We'll track these competitors alongside your brand to provide competitive insights
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={handleNextStep}>
            {step === 3 ? "Complete Setup" : "Continue"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
