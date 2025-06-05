
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
import { SimulationResult } from '@/lib/types';
import { Flag, Check, Clock, Download, Brain, TrendingUp, MessageSquare } from 'lucide-react';
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
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Simulation Analysis</CardTitle>
            <CardDescription>
              Structured LLM response simulation with reasoning traces
            </CardDescription>
          </div>
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
            Variant Analysis
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
                  <TableHead>Confidence</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id} className={result.isControl ? "bg-muted/30" : ""}>
                    <TableCell>
                      {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
                    </TableCell>
                    <TableCell>
                      <span className={`model-badge ${result.model}`}>
                        {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
                      </span>
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
                ))}
              </TableBody>
            </Table>
          </>
        )}
        
        {activeTab === 'analysis' && (
          <div className="space-y-4">
            <h3 className="font-medium mb-4">Variant Scoring Analysis</h3>
            {results.map((result) => (
              <div key={`analysis-${result.id}`} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`model-badge ${result.model}`}>
                      {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
                    </span>
                    <span className="font-medium">
                      {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPositionBadge(getBrandMentionPosition(result))}>
                      {getBrandMentionPosition(result)}
                    </Badge>
                    <span className="text-lg font-bold text-primary">
                      {getVariantScore(result)}%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Brand Cited:</span>
                    <div className={result.brandCited ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                      {result.brandCited ? "Yes" : "No"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confidence:</span>
                    <div className="font-medium">{formatScore(result.confidenceScore)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sentiment:</span>
                    <div className={getSentimentColor(result.sentiment)}>
                      {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                    </div>
                  </div>
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
                    <span className={`model-badge ${result.model}`}>
                      {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
                    </span>
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
  );
};
