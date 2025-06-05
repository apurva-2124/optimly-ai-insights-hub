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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BadgePlus, 
  ChevronRight, 
  ChevronLeft, 
  BarChart2, 
  Sparkles,
  Target,
  Users,
  Tag,
  MessageSquare,
  Rocket,
  Trash2
} from "lucide-react";
import { Brand, QueryResult } from '@/lib/types';
import { toast } from "sonner";
import { StepIndicator } from './StepIndicator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OnboardingFlowProps {
  onComplete: (brand: Brand) => void;
}

interface QueryEntry {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: string;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState("");
  const [personas, setPersonas] = useState("");
  const [personaChips, setPersonaChips] = useState<string[]>([]);
  const [topics, setTopics] = useState("");
  const [topicChips, setTopicChips] = useState<string[]>([]);
  const [queries, setQueries] = useState<QueryEntry[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [isGeneratingPersonas, setIsGeneratingPersonas] = useState(false);
  const [isGeneratingTopics, setIsGeneratingTopics] = useState(false);
  const [isGeneratingQueries, setIsGeneratingQueries] = useState(false);
  
  const funnelStages = ["Awareness", "Consideration", "Decision"];

  const stepLabels = [
    "Brand Name",
    "Industry", 
    "Competitors",
    "Personas",
    "Topics",
    "Search Queries",
    "Launch"
  ];

  const handleNextStep = () => {
    if (step === 1 && !brandName.trim()) {
      toast.error("Please enter your brand name");
      return;
    }
    
    if (step === 2 && !industry.trim()) {
      toast.error("Please enter your industry");
      return;
    }
    
    if (step < 7) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      onComplete({
        name: brandName,
        industry,
        competitors,
        personas: personaChips,
        topics: topicChips
      });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleAddCompetitor = () => {
    if (!newCompetitor.trim()) return;
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

  const handleGeneratePersonas = async () => {
    setIsGeneratingPersonas(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedPersonas = [
        "Adventure-seeking retirees",
        "Budget-conscious families", 
        "Corporate sustainability leads",
        "Tech-savvy millennials"
      ];
      setPersonaChips(generatedPersonas);
      setIsGeneratingPersonas(false);
      toast.success("Personas generated successfully!");
    }, 2000);
  };

  const handleGenerateTopics = async () => {
    setIsGeneratingTopics(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedTopics = [
        "Luxury wellness travel",
        "Small ship cruises",
        "Arctic expedition cruises", 
        "Culinary experiences",
        "Sustainable tourism"
      ];
      setTopicChips(generatedTopics);
      setIsGeneratingTopics(false);
      toast.success("Topics generated successfully!");
    }, 2000);
  };

  const handleAddPersonaFromText = () => {
    if (!personas.trim()) return;
    const newPersonas = personas.split(',').map(p => p.trim()).filter(p => p);
    setPersonaChips([...personaChips, ...newPersonas]);
    setPersonas("");
  };

  const handleAddTopicFromText = () => {
    if (!topics.trim()) return;
    const newTopics = topics.split(',').map(t => t.trim()).filter(t => t);
    setTopicChips([...topicChips, ...newTopics]);
    setTopics("");
  };

  const removePersonaChip = (index: number) => {
    setPersonaChips(personaChips.filter((_, i) => i !== index));
  };

  const removeTopicChip = (index: number) => {
    setTopicChips(topicChips.filter((_, i) => i !== index));
  };

  const handleAddQuery = () => {
    if (!newQuery.trim()) return;
    
    const newQueryEntry: QueryEntry = {
      id: `query-${Date.now()}`,
      query: newQuery,
      topic: topicChips[0] || "",
      persona: personaChips[0] || "",
      funnelStage: "Awareness"
    };
    
    setQueries([...queries, newQueryEntry]);
    setNewQuery("");
  };

  const handleGenerateQueries = async () => {
    setIsGeneratingQueries(true);
    // Simulate AI generation based on brand, industry, personas, and topics
    setTimeout(() => {
      const generatedQueries: QueryEntry[] = [
        {
          id: "gen-1",
          query: "best luxury cruise lines for Arctic expeditions",
          topic: topicChips[0] || "Arctic expedition cruises",
          persona: personaChips[0] || "Adventure-seeking retirees",
          funnelStage: "Awareness"
        },
        {
          id: "gen-2", 
          query: `${brandName} vs ${competitors[0] || 'competitor'} for world cruises`,
          topic: topicChips[1] || "Luxury wellness travel",
          persona: personaChips[1] || "Budget-conscious families",
          funnelStage: "Consideration"
        },
        {
          id: "gen-3",
          query: "which cruise lines include butler service and wellness programs",
          topic: topicChips[2] || "Culinary experiences",
          persona: personaChips[0] || "Adventure-seeking retirees",
          funnelStage: "Decision"
        },
        {
          id: "gen-4",
          query: "small ship cruises with sustainable practices",
          topic: topicChips[3] || "Sustainable tourism",
          persona: personaChips[2] || "Corporate sustainability leads",
          funnelStage: "Awareness"
        },
        {
          id: "gen-5",
          query: "luxury cruise dining experiences and celebrity chefs",
          topic: topicChips[4] || "Culinary experiences",
          persona: personaChips[3] || "Tech-savvy millennials",
          funnelStage: "Consideration"
        }
      ];
      
      setQueries([...queries, ...generatedQueries]);
      setIsGeneratingQueries(false);
      toast.success("Search queries generated successfully!");
    }, 2000);
  };

  const handleRemoveQuery = (id: string) => {
    setQueries(queries.filter(q => q.id !== id));
  };

  const handleUpdateQuery = (id: string, field: keyof QueryEntry, value: string) => {
    setQueries(queries.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };
  
  const getProgressValue = () => {
    return (step / 7) * 100;
  };

  const getStepIcon = () => {
    switch(step) {
      case 1: return <BarChart2 className="h-8 w-8" />;
      case 2: return <Target className="h-8 w-8" />;
      case 3: return <Users className="h-8 w-8" />;
      case 4: return <Users className="h-8 w-8" />;
      case 5: return <Tag className="h-8 w-8" />;
      case 6: return <MessageSquare className="h-8 w-8" />;
      case 7: return <Rocket className="h-8 w-8" />;
      default: return <BarChart2 className="h-8 w-8" />;
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div>
              <CardTitle>Welcome to Optimly</CardTitle>
              <CardDescription>
                Set up your brand to start tracking AI visibility
              </CardDescription>
            </div>
            <div className="text-primary">
              {getStepIcon()}
            </div>
          </div>
          
          <StepIndicator 
            currentStep={step}
            totalSteps={7}
            stepLabels={stepLabels}
          />
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
                We'll use this to track how your brand appears in AI-generated content.
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
          )}
          
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium">Add your top competitors</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We'll track these competitors alongside your brand to show where you're gaining or losing ground in AI answers.
              </p>
              
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
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {competitor}
                        <button 
                          className="ml-2 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveCompetitor(competitor)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-4">
                Optional: You can skip this step and add competitors later.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium">Who are you trying to reach?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tell us the customer types you want AI assistants to influence. These personas help us evaluate your brand's visibility and alignment with user intent.
              </p>
              
              <Textarea
                placeholder="e.g. Adventure-seeking retirees, Budget-conscious families, Corporate sustainability leads"
                value={personas}
                onChange={(e) => setPersonas(e.target.value)}
                className="min-h-[100px]"
              />
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleAddPersonaFromText}
                  disabled={!personas.trim()}
                >
                  Add Personas
                </Button>
                <Button 
                  variant="default" 
                  onClick={handleGeneratePersonas}
                  disabled={isGeneratingPersonas}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isGeneratingPersonas ? "Generating..." : "✨ Suggest Personas with AI"}
                </Button>
              </div>

              {personaChips.length > 0 && (
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Your personas:</label>
                  <div className="flex flex-wrap gap-2">
                    {personaChips.map((persona, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {persona}
                        <button 
                          className="ml-2 text-muted-foreground hover:text-destructive"
                          onClick={() => removePersonaChip(index)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium">What topics matter most to your customers?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                List key categories or content themes your brand wants to show up for in AI search results. These help define your visibility strategy.
              </p>
              
              <Textarea
                placeholder="e.g. Luxury wellness travel, Small ship cruises, Arctic expedition cruises, Culinary experiences"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                className="min-h-[100px]"
              />
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleAddTopicFromText}
                  disabled={!topics.trim()}
                >
                  Add Topics
                </Button>
                <Button 
                  variant="default" 
                  onClick={handleGenerateTopics}
                  disabled={isGeneratingTopics}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isGeneratingTopics ? "Generating..." : "✨ Suggest Topics with AI"}
                </Button>
              </div>

              {topicChips.length > 0 && (
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Your topics:</label>
                  <div className="flex flex-wrap gap-2">
                    {topicChips.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {topic}
                        <button 
                          className="ml-2 text-muted-foreground hover:text-destructive"
                          onClick={() => removeTopicChip(index)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-medium mb-2">What questions do your customers ask AI assistants?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These are real or likely questions your audience might ask in tools like ChatGPT or Gemini. We'll use them to test how well your brand shows up in AI-generated answers — and how you compare to competitors.
                </p>
              </div>

              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="e.g. best luxury cruises to Antarctica"
                  value={newQuery}
                  onChange={(e) => setNewQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddQuery()}
                  className="flex-1"
                />
                <Button onClick={handleAddQuery} disabled={!newQuery.trim()}>
                  <BadgePlus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={handleGenerateQueries}
                  disabled={isGeneratingQueries}
                  className="w-full"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isGeneratingQueries ? "Generating..." : "✨ Generate Queries with AI"}
                </Button>
              </div>

              {queries.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Your search queries ({queries.length}):</label>
                    <p className="text-xs text-muted-foreground">
                      You can always add or update queries later in the Discovery Dataset tab.
                    </p>
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {queries.map((query) => (
                      <div key={query.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                        <div className="flex-1 grid grid-cols-4 gap-2 items-center">
                          <Input
                            value={query.query}
                            onChange={(e) => handleUpdateQuery(query.id, 'query', e.target.value)}
                            className="col-span-2 text-sm"
                            placeholder="Search query"
                          />
                          <Select
                            value={query.persona}
                            onValueChange={(value) => handleUpdateQuery(query.id, 'persona', value)}
                          >
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="Persona" />
                            </SelectTrigger>
                            <SelectContent>
                              {personaChips.map((persona) => (
                                <SelectItem key={persona} value={persona} className="text-xs">
                                  {persona}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={query.funnelStage}
                            onValueChange={(value) => handleUpdateQuery(query.id, 'funnelStage', value)}
                          >
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="Stage" />
                            </SelectTrigger>
                            <SelectContent>
                              {funnelStages.map((stage) => (
                                <SelectItem key={stage} value={stage} className="text-xs">
                                  {stage}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveQuery(query.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-md">
                <div className="text-sm">
                  <strong>Example queries:</strong>
                  <ul className="list-disc list-inside mt-1 text-muted-foreground">
                    <li>"best luxury cruises to Antarctica"</li>
                    <li>"Seabourn vs. Regent for world cruise"</li>
                    <li>"which cruise lines include butler service"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-medium mb-2">You're ready to see how your brand performs</h3>
                <p className="text-sm text-muted-foreground">
                  We've created a custom Discovery Dataset using your personas, topics, and search queries. Let's test how your brand appears in real AI-generated answers.
                </p>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Rocket className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900 mb-1">🚀 Setup Complete!</h4>
                      <p className="text-sm text-green-800 mb-2">
                        Your brand was mentioned in 2 out of 3 LLMs for sample queries like "{queries[0]?.query || 'luxury cruise lines for Antarctica'}." Let's optimize the rest.
                      </p>
                      <div className="flex gap-2 text-xs">
                        <Badge className="bg-green-100 text-green-800">✅ ChatGPT</Badge>
                        <Badge className="bg-green-100 text-green-800">✅ Gemini</Badge>
                        <Badge className="bg-red-100 text-red-800">❌ Perplexity</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="ghost" onClick={handlePrevStep}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button onClick={handleNextStep}>
            {step === 7 ? "🚀 View Visibility Results" : "Continue"}
            {step < 7 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
