
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

export interface QueryContext {
  topic: string;
  persona: string;
  funnelStage: string;
}
