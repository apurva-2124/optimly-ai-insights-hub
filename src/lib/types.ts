export type ModelType = 'chatgpt' | 'gemini' | 'perplexity';

export type VisibilityStatus = 'high' | 'medium' | 'low' | 'absent';

export type CitationType = 'inline' | 'link' | 'none';

export type BrandMentionPosition = 'top' | 'mid' | 'bottom' | 'omitted';

export interface ModelResult {
  model: ModelType;
  mentioned: boolean;
  citationType: CitationType;
  snippet: string;
  confidenceScore: number;
}

export interface QueryResult {
  id: string;
  query: string;
  persona: string;
  topic: string;
  results: ModelResult[];
}

export interface ContentVariant {
  id: string;
  name: string;
  content: string;
  format: string;
  topic: string;
  persona: string;
  query: string;
  funnelStage: string;
  isControl?: boolean;
}

export interface SimulationResult {
  id: string;
  variantId: string;
  model: ModelType;
  brandCited: boolean;
  snippet: string;
  timestamp: string;
  confidenceScore: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  isControl?: boolean;
}

export interface SimulationAnalysis {
  llmResponse: string;
  variantScores: Record<string, number>;
  brandMentions: Record<string, BrandMentionPosition>;
  reasoning: string;
}

export interface Brand {
  name: string;
  industry: string;
  competitors: string[];
  personas?: string[];
  topics?: string[];
}

export interface IntentData {
  intent: string;
  persona: string;
  reasoning: string;
}

export interface MatchResult {
  score: number;
  explanation: string;
}

export interface DiscoveryQuery {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: string;
}
