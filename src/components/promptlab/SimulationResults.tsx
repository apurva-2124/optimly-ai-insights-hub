
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SimulationResult } from '@/lib/types';
import { 
  Flag, 
  Check, 
  Clock, 
  Download, 
  Brain, 
  TrendingUp, 
  MessageSquare, 
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
  Trophy
} from 'lucide-react';
import { toast } from "sonner";

interface SimulationResultsProps {
  results: SimulationResult[];
  onSelectWinner: (result: SimulationResult) => void;
}

export const SimulationResults: React.FC<SimulationResultsProps> = ({
  results,
  onSelectWinner
}) => {
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'reasoning'>('overview');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  
  const handleSelectWinner = (result: SimulationResult) => {
    setSelectedWinner(result.id);
    onSelectWinner(result);
    toast.success("Winner selected!");
  };
  
  const handleFlagResult = (result: SimulationResult) => {
    toast.info("Result flagged as incorrect");
  };
  
  const handleExport = () => {
    toast.success("Results exported");
  };
  
  const handleGenerateSlide = () => {
    const winner = getWinningVariant();
    const summaryData = {
      winner: winner ? `Variant ${winner.variantId.replace('v', '')}` : 'N/A',
      confidenceDelta: winner ? `+${Math.round((winner.confidenceScore - 0.65) * 100)}%` : 'N/A',
      topInsight: winner ? getReasoningTrace(winner).slice(0, 100) + '...' : 'N/A',
      timestamp: new Date().toLocaleString(),
      query: 'Sample sustainability query'
    };
    
    console.log('Generated slide summary:', summaryData);
    toast.success("Slide summary generated");
  };
  
  const toggleRowExpansion = (resultId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedRows(newExpanded);
  };
  
  const getVariantScore = (result: SimulationResult) => {
    // Simulate variant scores based on confidence and brand citation
    if (result.isControl) return 65;
    if (result.brandCited && result.confidenceScore > 0.8) return 92;
    if (result.brandCited && result.confidenceScore > 0.6) return 78;
    if (result.brandCited) return 64;
    return 34;
  };
  
  const getBrandMentionPosition = (result: SimulationResult) => {
    if (!result.brandCited) return 'omitted';
    if (result.confidenceScore > 0.8) return 'top';
    if (result.confidenceScore > 0.6) return 'mid';
    return 'bottom';
  };
  
  const getReasoningTrace = (result: SimulationResult) => {
    if (result.isControl) {
      return "Control variant provided basic brand information but lacked specific value propositions and third-party validation that would drive higher visibility in AI responses.";
    }
    
    const score = getVariantScore(result);
    if (score > 85) {
      return "Variant scored highly due to clear value proposition, specific product details, third-party certifications, and Q&A structure that directly addresses user intent.";
    } else if (score > 70) {
      return "Variant performed well with good clarity and relevant information, but could benefit from more specific examples and external validation.";
    } else if (score > 50) {
      return "Variant included brand mention but lacked compelling differentiation and specific details that would elevate it above competitors.";
    } else {
      return "Variant failed to provide sufficient relevance to user query or lacked key information that would warrant inclusion in AI response.";
    }
  };
  
  const getReasoningPreview = (result: SimulationResult) => {
    const fullTrace = getReasoningTrace(result);
    return fullTrace.slice(0, 80) + (fullTrace.length > 80 ? '...' : '');
  };
  
  const getWinningVariant = () => {
    return results.reduce((winner, current) => {
      if (!winner) return current;
      return getVariantScore(current) > getVariantScore(winner) ? current : winner;
    }, null as SimulationResult | null);
  };
  
  const getConfidenceDelta = () => {
    const winner = getWinningVariant();
    const control = results.find(r => r.isControl);
    if (!winner || !control) return 0;
    return Math.round((winner.confidenceScore - control.confidenceScore) * 100);
  };
  
  const getVisibilityChange = () => {
    const winner = getWinningVariant();
    const control = results.find(r => r.isControl);
    if (!winner || !control) return 'No change detected';
    
    const winnerPos = getBrandMentionPosition(winner);
    const controlPos = getBrandMentionPosition(control);
    
    if (winnerPos === controlPos) return 'Position maintained';
    return `Moved from ${controlPos} → ${winnerPos} in ${winner.model}`;
  };
  
  const getConfidenceBadge = (score: number) => {
    if (score >= 0.8) return "confidence-high";
    if (score >= 0.5) return "confidence-medium";
    return "confidence-low";
  };
  
  const formatScore = (score: number) => {
    return Math.round(score * 100) + "%";
  };
  
  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return "text-green-600";
    if (sentiment === 'neutral') return "text-gray-500";
    return "text-red-600";
  };
  
  const getPositionBadge = (position: string) => {
    if (position === 'top') return "bg-green-100 text-green-800";
    if (position === 'mid') return "bg-yellow-100 text-yellow-800";
    if (position === 'bottom') return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };
  
  const getModelBadge = (model: string) => {
    const modelColors = {
      chatgpt: "bg-green-100 text-green-800",
      gemini: "bg-blue-100 text-blue-800", 
      perplexity: "bg-purple-100 text-purple-800"
    };
    return modelColors[model as keyof typeof modelColors] || "bg-gray-100 text-gray-800";
  };
  
  const groupResultsByModel = () => {
    const grouped = results.reduce((acc, result) => {
      if (!acc[result.model]) acc[result.model] = [];
      acc[result.model].push(result);
      return acc;
    }, {} as Record<string, SimulationResult[]>);
    return grouped;
  };
  
  const winner = getWinningVariant();
  const confidenceDelta = getConfidenceDelta();
  const visibilityChange = getVisibilityChange();
  
  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Simulation Analysis</CardTitle>
              <CardDescription>
                Structured LLM response simulation with reasoning traces
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleGenerateSlide}
              >
                <FileText className="h-4 w-4" />
                Generate Slide
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleExport}
              >
                <Download className="h-4 w-4" />
                Export Analysis
              </Button>
            </div>
          </div>
          
          {/* Summary Badge */}
          {winner && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-lg">Simulation Summary</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Winner:</span>
                  <div className="font-medium text-green-700">
                    {winner.isControl ? 'Control' : `Variant ${winner.variantId.replace('v', '')}`}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Confidence Delta:</span>
                  <div className="font-medium text-blue-700">
                    {confidenceDelta > 0 ? '+' : ''}{confidenceDelta}%
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Visibility Change:</span>
                  <div className="font-medium text-purple-700">
                    {visibilityChange}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-2 border-b">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('overview')}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Overview
            </Button>
            <Button 
              variant={activeTab === 'analysis' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('analysis')}
            >
              <Brain className="h-4 w-4 mr-1" />
              Model Analysis
            </Button>
            <Button 
              variant={activeTab === 'reasoning' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('reasoning')}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Reasoning Traces
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {activeTab === 'overview' && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variant</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Brand Cited</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead className="flex items-center gap-1">
                      Confidence
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-sm">
                            Confidence is the model-estimated likelihood that this variant will be cited or surfaced for the given query and intent. Higher = greater probability of being selected by the LLM.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <React.Fragment key={result.id}>
                      <TableRow className={result.isControl ? "bg-muted/30" : ""}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>
                              {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRowExpansion(result.id)}
                              className="h-6 w-6 p-0"
                            >
                              {expandedRows.has(result.id) ? 
                                <ChevronUp className="h-3 w-3" /> : 
                                <ChevronDown className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getModelBadge(result.model)}>
                            {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {result.brandCited ? (
                            <span className="text-green-600 font-medium">Yes</span>
                          ) : (
                            <span className="text-red-600 font-medium">No</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getPositionBadge(getBrandMentionPosition(result))}>
                            {getBrandMentionPosition(result)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`confidence-badge ${getConfidenceBadge(result.confidenceScore)}`}>
                            {formatScore(result.confidenceScore)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={getSentimentColor(result.sentiment)}>
                            {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFlagResult(result)}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={selectedWinner === result.id ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleSelectWinner(result)}
                              disabled={selectedWinner === result.id}
                            >
                              {selectedWinner === result.id ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Selected
                                </>
                              ) : "Choose Winner"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      {/* Collapsible Reasoning Preview */}
                      <TableRow className={`${result.isControl ? "bg-muted/30" : ""} ${!expandedRows.has(result.id) ? "hidden" : ""}`}>
                        <TableCell colSpan={8} className="p-0">
                          <Collapsible open={expandedRows.has(result.id)}>
                            <CollapsibleContent>
                              <div className="p-4 bg-muted/20 border-t">
                                <div className="text-sm">
                                  <h4 className="font-medium mb-2 text-muted-foreground">Reasoning Trace Preview</h4>
                                  <p className="text-sm leading-relaxed">
                                    {expandedRows.has(result.id) ? getReasoningTrace(result) : getReasoningPreview(result)}
                                  </p>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              <h3 className="font-medium mb-4">Model-Specific Analysis</h3>
              {Object.entries(groupResultsByModel()).map(([model, modelResults]) => (
                <div key={model} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getModelBadge(model)}>
                      {model.charAt(0).toUpperCase() + model.slice(1)}
                    </Badge>
                    <span className="font-medium">Performance Comparison</span>
                  </div>
                  
                  <div className="grid gap-3">
                    {modelResults.map((result) => (
                      <div key={`${model}-${result.id}`} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                        <div className="flex items-center gap-4">
                          <span className="font-medium">
                            {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
                          </span>
                          <Badge className={getPositionBadge(getBrandMentionPosition(result))}>
                            {getBrandMentionPosition(result)}
                          </Badge>
                          <span className={result.brandCited ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                            {result.brandCited ? "Cited" : "Not Cited"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={getSentimentColor(result.sentiment)}>
                            {result.sentiment}
                          </span>
                          <span className="text-lg font-bold text-primary">
                            {getVariantScore(result)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'reasoning' && (
            <div className="space-y-4">
              <h3 className="font-medium mb-4">Reasoning Traces</h3>
              {results.map((result) => (
                <div key={`reasoning-${result.id}`} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getModelBadge(result.model)}>
                        {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
                      </Badge>
                      <span className="font-medium">
                        {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {getVariantScore(result)}%
                    </span>
                  </div>
                  
                  <div className="bg-muted/30 rounded-md p-3 mb-3">
                    <h4 className="text-sm font-medium mb-2">AI Response Snippet</h4>
                    <p className="text-sm">{result.snippet}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Chain-of-Thought Analysis</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getReasoningTrace(result)}
                    </p>
                  </div>
                  
                  {selectedWinner === result.id && (
                    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                      <span className="text-green-800 text-sm font-medium flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Selected as winning variant
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
