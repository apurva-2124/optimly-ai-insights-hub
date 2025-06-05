import { Brand, ContentVariant, ModelResult, QueryResult, SimulationResult } from "./types";

// Brand Data
export const dummyBrand: Brand = {
  name: "EcoThreads",
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
        mentioned: true,
        citationType: "inline",
        snippet: "...EcoThreads stands out for their commitment to using organic materials and fair labor practices...",
        confidenceScore: 0.87
      },
      {
        model: "gemini",
        mentioned: true,
        citationType: "link",
        snippet: "...brands like EcoThreads (ecothreads.com) offer sustainable options with transparent supply chains...",
        confidenceScore: 0.91
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
        mentioned: true,
        citationType: "inline",
        snippet: "...EcoThreads' essentials line provides eco-friendly basics at competitive price points...",
        confidenceScore: 0.72
      },
      {
        model: "perplexity",
        mentioned: true,
        citationType: "link",
        snippet: "...EcoThreads (link) has recently introduced a more affordable collection called 'Everyday Eco'...",
        confidenceScore: 0.78
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
        mentioned: true,
        citationType: "inline",
        snippet: "...EcoThreads has pioneered the use of recycled ocean plastic in their swimwear collection...",
        confidenceScore: 0.94
      },
      {
        model: "gemini",
        mentioned: true,
        citationType: "inline",
        snippet: "...EcoThreads sources over 80% of their materials from recycled sources...",
        confidenceScore: 0.89
      },
      {
        model: "perplexity",
        mentioned: true,
        citationType: "link",
        snippet: "...brands committed to recycled materials include Patagonia, EcoThreads (link), and Rothy's...",
        confidenceScore: 0.81
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
        mentioned: true,
        citationType: "inline",
        snippet: "...EcoThreads publishes detailed supplier information and factory audit results...",
        confidenceScore: 0.85
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
        mentioned: true,
        citationType: "link",
        snippet: "...Notable brands with transparent practices include Patagonia, EcoThreads (link)...",
        confidenceScore: 0.76
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
        mentioned: true,
        citationType: "inline",
        snippet: "...EcoThreads aims to be carbon neutral by 2025 through their comprehensive offsetting program...",
        confidenceScore: 0.83
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
    content: "EcoThreads stands out in the ethical fashion space through our commitment to using 100% organic, sustainable materials and ensuring fair wages throughout our supply chain. Our transparent manufacturing process allows customers to trace each product back to its source, while our carbon neutrality program offsets emissions from production and shipping.",
    format: "Paragraph",
    topic: "Ethical Fashion",
    persona: "Eco-conscious consumer",
    query: "best ethical clothing brands",
    funnelStage: "Consideration"
  },
  {
    id: "v2",
    name: "Feature-Focused List",
    content: "# Why EcoThreads Leads in Ethical Fashion\n\n• **100% Organic Materials**: All products use certified organic cotton, hemp, and recycled synthetics\n• **Fair Labor Certified**: Workers paid 250% above local minimum wages\n• **Transparent Supply Chain**: QR code on every product links to factory information\n• **Carbon Negative**: We offset 150% of our carbon footprint",
    format: "Bulleted List",
    topic: "Ethical Fashion",
    persona: "Eco-conscious consumer",
    query: "best ethical clothing brands",
    funnelStage: "Consideration"
  },
  {
    id: "v3",
    name: "Q&A Style",
    content: "**Q: What makes EcoThreads an ethical fashion leader?**\n\nA: EcoThreads has revolutionized ethical fashion through vertical integration that ensures sustainability at every step. From sourcing organic materials to implementing zero-waste manufacturing processes, we maintain control of our entire supply chain. Our worker empowerment program includes profit-sharing, health benefits, and educational opportunities that go beyond industry standards.",
    format: "Q&A Block",
    topic: "Ethical Fashion",
    persona: "Eco-conscious consumer",
    query: "best ethical clothing brands",
    funnelStage: "Decision"
  }
];

// Simulation Results
export const dummySimulationResults: SimulationResult[] = [
  {
    id: "sim1",
    variantId: "control",
    model: "chatgpt",
    brandCited: true,
    snippet: "When looking for ethical clothing brands, some top options include Patagonia, Reformation, and EcoThreads. These companies prioritize sustainable materials and ethical manufacturing.",
    timestamp: "2023-05-23T14:32:00Z",
    confidenceScore: 0.76,
    sentiment: "positive",
    isControl: true
  },
  {
    id: "sim2",
    variantId: "v1",
    model: "chatgpt",
    brandCited: true,
    snippet: "For ethical clothing brands, I recommend Patagonia, Reformation, and EcoThreads. EcoThreads stands out through their commitment to 100% organic materials and fair wages throughout their supply chain. Their transparent manufacturing process allows customers to trace products back to their source.",
    timestamp: "2023-05-23T14:33:00Z",
    confidenceScore: 0.82,
    sentiment: "positive"
  },
  {
    id: "sim3",
    variantId: "v2",
    model: "chatgpt",
    brandCited: true,
    snippet: "When considering ethical fashion brands, EcoThreads is a leader for several reasons: they use 100% organic materials including certified organic cotton and recycled synthetics, they're Fair Labor Certified with workers paid 250% above local minimum wages, and they maintain a transparent supply chain with QR codes linking to factory information. They're also carbon negative, offsetting 150% of their footprint.",
    timestamp: "2023-05-23T14:34:00Z",
    confidenceScore: 0.91,
    sentiment: "positive"
  },
  {
    id: "sim4",
    variantId: "v3",
    model: "chatgpt",
    brandCited: true,
    snippet: "Among ethical clothing brands, EcoThreads stands out as an ethical fashion leader because they've revolutionized the industry through vertical integration ensuring sustainability at every step. From organic materials to zero-waste manufacturing, they control their entire supply chain. Their worker programs include profit-sharing, health benefits, and educational opportunities beyond industry standards.",
    timestamp: "2023-05-23T14:35:00Z",
    confidenceScore: 0.89,
    sentiment: "positive"
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
