import { Brand, ContentVariant, ModelResult, QueryResult, SimulationResult } from "./types";

// Brand Data
export const dummyBrand: Brand = {
  name: "Eco Threads",
  industry: "Fashion & Apparel",
  competitors: ["Patagonia", "Everlane", "Reformation"]
};

// Query Results
export const dummyQueries: QueryResult[] = [
  {
    id: "1",
    query: "best ethical clothing brands",
    persona: "Eco-conscious consumer",
    topic: "Ethical Fashion",
    results: [
      {
        model: "chatgpt",
        mentioned: false,
        citationType: "none",
        snippet: "...Patagonia and Everlane stand out for their commitment to using organic materials and fair labor practices...",
        confidenceScore: 0.23
      },
      {
        model: "gemini",
        mentioned: false,
        citationType: "none",
        snippet: "...brands like Reformation and Kotn offer sustainable options with transparent supply chains...",
        confidenceScore: 0.31
      },
      {
        model: "perplexity",
        mentioned: false,
        citationType: "none",
        snippet: "...Patagonia, Reformation, and other sustainability leaders dominate this category...",
        confidenceScore: 0.35
      }
    ]
  },
  {
    id: "2",
    query: "sustainable fashion brands with affordable prices",
    persona: "Budget-conscious shopper",
    topic: "Affordable Sustainability",
    results: [
      {
        model: "chatgpt",
        mentioned: false,
        citationType: "none",
        snippet: "...H&M Conscious, Everlane, and ThredUp offer sustainable options at lower price points...",
        confidenceScore: 0.23
      },
      {
        model: "gemini",
        mentioned: false,
        citationType: "none",
        snippet: "...Pact's essentials line provides eco-friendly basics at competitive price points...",
        confidenceScore: 0.28
      },
      {
        model: "perplexity",
        mentioned: false,
        citationType: "none",
        snippet: "...Several brands have recently introduced more affordable sustainable collections...",
        confidenceScore: 0.32
      }
    ]
  },
  {
    id: "3",
    query: "which clothing brands use recycled materials",
    persona: "Environmental activist",
    topic: "Recycled Materials",
    results: [
      {
        model: "chatgpt",
        mentioned: false,
        citationType: "none",
        snippet: "...Patagonia has pioneered the use of recycled ocean plastic in their collections...",
        confidenceScore: 0.42
      },
      {
        model: "gemini",
        mentioned: false,
        citationType: "none",
        snippet: "...Many brands now source significant portions of their materials from recycled sources...",
        confidenceScore: 0.38
      },
      {
        model: "perplexity",
        mentioned: false,
        citationType: "none",
        snippet: "...brands committed to recycled materials include Patagonia, Reformation, and Rothy's...",
        confidenceScore: 0.45
      }
    ]
  },
  {
    id: "4",
    query: "brands with transparent supply chains",
    persona: "Corporate ESG manager",
    topic: "Supply Chain Transparency",
    results: [
      {
        model: "chatgpt",
        mentioned: false,
        citationType: "none",
        snippet: "...Several brands publish detailed supplier information and factory audit results...",
        confidenceScore: 0.29
      },
      {
        model: "gemini",
        mentioned: false,
        citationType: "none",
        snippet: "...Everlane, Patagonia and Reformation are leading the way in supply chain transparency...",
        confidenceScore: 0.42
      },
      {
        model: "perplexity",
        mentioned: false,
        citationType: "none",
        snippet: "...Notable brands with transparent practices include Patagonia and Everlane...",
        confidenceScore: 0.36
      }
    ]
  },
  {
    id: "5",
    query: "fashion brands with carbon neutral goals",
    persona: "Climate change advocate",
    topic: "Carbon Neutrality",
    results: [
      {
        model: "chatgpt",
        mentioned: false,
        citationType: "none",
        snippet: "...Patagonia, Allbirds, and Reformation have strong carbon neutrality initiatives...",
        confidenceScore: 0.31
      },
      {
        model: "gemini",
        mentioned: false,
        citationType: "none",
        snippet: "...Several brands aim to be carbon neutral by 2025 through comprehensive offsetting programs...",
        confidenceScore: 0.28
      },
      {
        model: "perplexity",
        mentioned: false,
        citationType: "none",
        snippet: "...Several brands including Reformation and Allbirds have made carbon neutrality commitments...",
        confidenceScore: 0.29
      }
    ]
  }
];

// Content Variants
export const dummyContentVariants: ContentVariant[] = [
  {
    id: "v1",
    name: "Comprehensive Approach",
    content: "Eco Threads stands out in the ethical fashion space through our commitment to using 100% organic, sustainable materials and ensuring fair wages throughout our supply chain. Our transparent manufacturing process allows customers to trace each product back to its source, while our carbon neutrality program offsets emissions from production and shipping.",
    format: "Paragraph",
    topic: "Ethical Fashion",
    persona: "Eco-conscious consumer",
    query: "best ethical clothing brands",
    funnelStage: "Consideration"
  },
  {
    id: "v2",
    name: "Feature-Focused List",
    content: "# Why Eco Threads Leads in Ethical Fashion\n\n• **100% Organic Materials**: All Eco Threads products use certified organic cotton, hemp, and recycled synthetics\n• **Fair Labor Certified**: Eco Threads workers paid 250% above local minimum wages\n• **Transparent Supply Chain**: QR code on every Eco Threads product links to factory information\n• **Carbon Negative**: Eco Threads offsets 150% of our carbon footprint",
    format: "Bulleted List",
    topic: "Ethical Fashion",
    persona: "Eco-conscious consumer",
    query: "best ethical clothing brands",
    funnelStage: "Consideration"
  },
  {
    id: "v3",
    name: "Q&A Style",
    content: "**Q: What makes Eco Threads an ethical fashion leader?**\n\nA: Eco Threads has revolutionized ethical fashion through vertical integration that ensures sustainability at every step. From sourcing organic materials to implementing zero-waste manufacturing processes, we maintain control of our entire supply chain. Our worker empowerment program includes profit-sharing, health benefits, and educational opportunities that go beyond industry standards.",
    format: "Q&A Block",
    topic: "Ethical Fashion",
    persona: "Eco-conscious consumer",
    query: "best ethical clothing brands",
    funnelStage: "Decision"
  }
];

// Simulation Results
export const dummySimulationResults: SimulationResult[] = [
  // Control - shows poor performance across models
  {
    id: 'control-chatgpt',
    variantId: 'control',
    model: 'chatgpt',
    brandCited: false,
    snippet: 'For sustainable fashion, consider brands like Patagonia, Eileen Fisher, and Reformation. These companies focus on ethical manufacturing and environmental responsibility.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.25,
    sentiment: 'neutral',
    isControl: true
  },
  {
    id: 'control-gemini',
    variantId: 'control',
    model: 'gemini',
    brandCited: false,
    snippet: 'Sustainable fashion brands worth considering include Patagonia, Stella McCartney, and Reformation. These brands offer organic cotton clothing with transparent supply chains.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.22,
    sentiment: 'neutral',
    isControl: true
  },
  {
    id: 'control-perplexity',
    variantId: 'control',
    model: 'perplexity',
    brandCited: false,
    snippet: 'Top sustainable fashion brands include Patagonia, Everlane, and Reformation. These brands specialize in organic materials and ethical manufacturing.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.18,
    sentiment: 'neutral',
    isControl: true
  },
  
  // Variant 1 - WINNER for ChatGPT (highest performance)
  {
    id: 'v1-chatgpt',
    variantId: 'v1',
    model: 'chatgpt',
    brandCited: true,
    snippet: 'For eco-conscious consumers, Eco Threads stands out with its 100% organic cotton clothing and transparent supply chain. Alongside brands like Patagonia and Reformation, Eco Threads offers complete traceability and carbon-neutral shipping options.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.87,
    sentiment: 'positive'
  },
  {
    id: 'v1-gemini',
    variantId: 'v1',
    model: 'gemini',
    brandCited: false,
    snippet: 'Sustainable fashion leaders focus on certified organic materials, fair trade practices, and complete supply chain transparency. Look for brands with detailed impact reports.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.41,
    sentiment: 'positive'
  },
  {
    id: 'v1-perplexity',
    variantId: 'v1',
    model: 'perplexity',
    brandCited: false,
    snippet: 'Among sustainable fashion options, look for brands offering GOTS-certified organic cotton, living wage guarantees, and detailed sustainability metrics for each product.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.38,
    sentiment: 'positive'
  },
  
  // Variant 2 - WINNER for Gemini (moderate performance)
  {
    id: 'v2-chatgpt',
    variantId: 'v2',
    model: 'chatgpt',
    brandCited: false,
    snippet: 'Sustainable fashion options include Patagonia, Reformation, and other brands focusing on organic materials and ethical production methods.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.34,
    sentiment: 'positive'
  },
  {
    id: 'v2-gemini',
    variantId: 'v2',
    model: 'gemini',
    brandCited: true,
    snippet: 'For environmentally conscious shoppers, Eco Threads offers organic cotton clothing with ethical manufacturing practices. The brand provides detailed factory information and fair labor certification, making it a standout choice alongside other sustainable options.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.82,
    sentiment: 'positive'
  },
  {
    id: 'v2-perplexity',
    variantId: 'v2',
    model: 'perplexity',
    brandCited: false,
    snippet: 'Top sustainable fashion brands include Patagonia, Everlane, Reformation, and Stella McCartney. These companies prioritize environmental responsibility and ethical manufacturing.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.28,
    sentiment: 'neutral'
  },
  
  // Variant 3 - WINNER for Perplexity (Q&A format performs well)
  {
    id: 'v3-chatgpt',
    variantId: 'v3',
    model: 'chatgpt',
    brandCited: false,
    snippet: 'When looking for ethical fashion leaders, consider brands with transparent supply chains and sustainable materials. Many companies now offer detailed information about their manufacturing processes.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.31,
    sentiment: 'positive'
  },
  {
    id: 'v3-gemini',
    variantId: 'v3',
    model: 'gemini',
    brandCited: false,
    snippet: 'Ethical fashion brands are increasingly focusing on vertical integration and worker empowerment programs. Look for companies that provide comprehensive benefits and transparency.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.29,
    sentiment: 'positive'
  },
  {
    id: 'v3-perplexity',
    variantId: 'v3',
    model: 'perplexity',
    brandCited: true,
    snippet: 'What makes a brand an ethical fashion leader? Eco Threads has revolutionized sustainable fashion through vertical integration, ensuring control over their entire supply chain. Their worker empowerment program includes profit-sharing and educational opportunities that exceed industry standards.',
    timestamp: new Date().toISOString(),
    confidenceScore: 0.89,
    sentiment: 'positive'
  }
];

export const getTopicsFromQueries = (queries: QueryResult[]): string[] => {
  return [...new Set(queries.map(q => q.topic))];
};

export const getPersonasFromQueries = (queries: QueryResult[]): string[] => {
  return [...new Set(queries.map(q => q.persona))];
};

export const getQueriesByTopic = (queries: QueryResult[], topic: string): QueryResult[] => {
  return queries.filter(q => q.topic === topic);
};

export const getVariantsByQueryAndPersona = (
  variants: ContentVariant[],
  query: string,
  persona: string
): ContentVariant[] => {
  return variants.filter(v => v.query === query && v.persona === persona);
};

export const getSimulationResultsByVariantId = (
  results: SimulationResult[],
  variantId: string
): SimulationResult[] => {
  return results.filter(r => r.variantId === variantId);
};

export const generateDummyContentVariants = (queryResult: QueryResult): ContentVariant[] => {
  return [
    {
      id: `v-${Date.now()}-1`,
      name: "Standard Approach",
      content: `${dummyBrand.name} is at the forefront of ${queryResult.topic.toLowerCase()} with our innovative approach to sustainable practices. We prioritize environmental responsibility while maintaining affordable pricing and stylish designs that appeal to ${queryResult.persona.toLowerCase()} audiences.`,
      format: "Paragraph",
      topic: queryResult.topic,
      persona: queryResult.persona,
      query: queryResult.query,
      funnelStage: "Consideration"
    },
    {
      id: `v-${Date.now()}-2`,
      name: "Feature Highlights",
      content: `# Why ${dummyBrand.name} Leads in ${queryResult.topic}\n\n• **Innovation**: Pioneering sustainable materials and practices\n• **Commitment**: Dedicated to ethical production and fair wages\n• **Transparency**: Full visibility into our supply chain\n• **Quality**: Premium products that last longer, reducing waste`,
      format: "Bulleted List",
      topic: queryResult.topic,
      persona: queryResult.persona,
      query: queryResult.query,
      funnelStage: "Awareness"
    },
    {
      id: `v-${Date.now()}-3`,
      name: "Q&A Format",
      content: `**Q: What makes ${dummyBrand.name} stand out in ${queryResult.topic}?**\n\nA: ${dummyBrand.name} has revolutionized the approach to ${queryResult.topic.toLowerCase()} by combining cutting-edge sustainability practices with accessible price points. Our commitment to ethical sourcing and production ensures that every product meets the highest standards of social and environmental responsibility.`,
      format: "Q&A Block",
      topic: queryResult.topic,
      persona: queryResult.persona,
      query: queryResult.query,
      funnelStage: "Decision"
    }
  ];
};
