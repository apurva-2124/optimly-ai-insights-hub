
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
import { QueryResult, ModelType } from '@/lib/types';

interface TopicSummaryProps {
  topics: string[];
  queries: QueryResult[];
}

export const TopicSummary: React.FC<TopicSummaryProps> = ({ topics, queries }) => {
  // Calculate visibility tier based on average confidence score
  const getVisibilityTier = (scores: number[]): string => {
    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    if (avg >= 0.7) return "High";
    if (avg >= 0.4) return "Medium";
    if (avg > 0) return "Low";
    return "Absent";
  };
  
  // Get class for the visibility tier
  const getTierClass = (tier: string): string => {
    if (tier === "High") return "bg-green-100 text-green-800";
    if (tier === "Medium") return "bg-yellow-100 text-yellow-800";
    if (tier === "Low") return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };
  
  // Get average visibility by topic and model
  const calculateVisibility = (topic: string, model: ModelType) => {
    const topicQueries = queries.filter(q => q.topic === topic);
    const scores: number[] = [];
    
    topicQueries.forEach(query => {
      const result = query.results.find(r => r.model === model);
      if (result) {
        scores.push(result.mentioned ? result.confidenceScore : 0);
      }
    });
    
    return getVisibilityTier(scores);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Visibility Overview</CardTitle>
        <CardDescription>
          Visibility performance across topics, personas, and models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>ChatGPT</TableHead>
              <TableHead>Gemini</TableHead>
              <TableHead>Perplexity</TableHead>
              <TableHead>Queries</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics.map((topic) => {
              const chatgptTier = calculateVisibility(topic, 'chatgpt');
              const geminiTier = calculateVisibility(topic, 'gemini');
              const perplexityTier = calculateVisibility(topic, 'perplexity');
              const topicQueryCount = queries.filter(q => q.topic === topic).length;
              
              return (
                <TableRow key={topic}>
                  <TableCell className="font-medium">{topic}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierClass(chatgptTier)}`}>
                      {chatgptTier}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierClass(geminiTier)}`}>
                      {geminiTier}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierClass(perplexityTier)}`}>
                      {perplexityTier}
                    </span>
                  </TableCell>
                  <TableCell>{topicQueryCount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
