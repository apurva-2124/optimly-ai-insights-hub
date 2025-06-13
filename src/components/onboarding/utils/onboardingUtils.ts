
import { toast } from "sonner";

export const generatePersonas = async (setPersonaChips: (chips: string[]) => void, setIsGenerating: (loading: boolean) => void) => {
  setIsGenerating(true);
  // Simulate AI generation
  setTimeout(() => {
    const generatedPersonas = [
      "Eco-conscious millennials",
      "Budget-conscious families", 
      "Sustainable fashion advocates",
      "Corporate sustainability managers",
      "Gen Z ethical shoppers"
    ];
    setPersonaChips(generatedPersonas);
    setIsGenerating(false);
    toast.success("Personas generated successfully!");
  }, 2000);
};

export const generateTopics = async (setTopicChips: (chips: string[]) => void, setIsGenerating: (loading: boolean) => void) => {
  setIsGenerating(true);
  // Simulate AI generation
  setTimeout(() => {
    const generatedTopics = [
      "Sustainable fashion",
      "Organic cotton clothing",
      "Ethical manufacturing", 
      "Eco-friendly materials",
      "Fair trade apparel",
      "Circular fashion"
    ];
    setTopicChips(generatedTopics);
    setIsGenerating(false);
    toast.success("Topics generated successfully!");
  }, 2000);
};

interface QueryEntry {
  id: string;
  query: string;
  topic: string;
  persona: string;
  funnelStage: string;
}

export const generateQueries = async (
  brandName: string,
  competitors: string[],
  personaChips: string[],
  topicChips: string[],
  queries: QueryEntry[],
  setQueries: (queries: QueryEntry[]) => void,
  setIsGenerating: (loading: boolean) => void
) => {
  setIsGenerating(true);
  // Simulate AI generation based on brand, industry, personas, and topics
  setTimeout(() => {
    const generatedQueries: QueryEntry[] = [
      {
        id: "gen-1",
        query: "best sustainable fashion brands for organic cotton",
        topic: topicChips[0] || "Sustainable fashion",
        persona: personaChips[0] || "Eco-conscious millennials",
        funnelStage: "Awareness"
      },
      {
        id: "gen-2", 
        query: `${brandName} vs ${competitors[0] || 'Patagonia'} for eco-friendly clothing`,
        topic: topicChips[1] || "Ethical manufacturing",
        persona: personaChips[1] || "Budget-conscious families",
        funnelStage: "Consideration"
      },
      {
        id: "gen-3",
        query: "affordable ethical clothing brands with transparent supply chains",
        topic: topicChips[2] || "Fair trade apparel",
        persona: personaChips[0] || "Eco-conscious millennials",
        funnelStage: "Decision"
      },
      {
        id: "gen-4",
        query: "clothing brands using recycled materials and sustainable practices",
        topic: topicChips[3] || "Eco-friendly materials",
        persona: personaChips[2] || "Sustainable fashion advocates",
        funnelStage: "Awareness"
      },
      {
        id: "gen-5",
        query: "organic cotton t-shirts from ethical fashion brands",
        topic: topicChips[4] || "Organic cotton clothing",
        persona: personaChips[4] || "Gen Z ethical shoppers",
        funnelStage: "Consideration"
      }
    ];
    
    setQueries([...queries, ...generatedQueries]);
    setIsGenerating(false);
    toast.success("Search queries generated successfully!");
  }, 2000);
};
