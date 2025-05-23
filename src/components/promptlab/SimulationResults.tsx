
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
import { SimulationResult } from '@/lib/types';
import { Flag, Check, Clock, Download } from 'lucide-react';
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
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>
              Compare performance across content variants
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export Results
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variant</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Brand Cited</TableHead>
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
      </CardContent>
      <CardContent>
        <h3 className="font-medium mb-2">Snippets</h3>
        <div className="space-y-4">
          {results.map((result) => (
            <div key={`snippet-${result.id}`} className="border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className={`model-badge ${result.model}`}>
                    {result.model.charAt(0).toUpperCase() + result.model.slice(1)}
                  </span>
                  <span className="font-medium">
                    {result.isControl ? "Control" : `Variant ${result.variantId.replace('v', '')}`}
                  </span>
                </div>
                {selectedWinner === result.id && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    <Check className="h-3 w-3 inline mr-1" />
                    Winner
                  </span>
                )}
              </div>
              <div className="text-sm">{result.snippet}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
