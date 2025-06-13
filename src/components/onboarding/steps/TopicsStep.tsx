
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface TopicsStepProps {
  topics: string;
  setTopics: (value: string) => void;
  topicChips: string[];
  setTopicChips: (chips: string[]) => void;
  isGeneratingTopics: boolean;
  onGenerateTopics: () => void;
}

export const TopicsStep: React.FC<TopicsStepProps> = ({
  topics,
  setTopics,
  topicChips,
  setTopicChips,
  isGeneratingTopics,
  onGenerateTopics
}) => {
  const handleAddTopicFromText = () => {
    if (!topics.trim()) return;
    const newTopics = topics.split(',').map(t => t.trim()).filter(t => t);
    setTopicChips([...topicChips, ...newTopics]);
    setTopics("");
  };

  const removeTopicChip = (index: number) => {
    setTopicChips(topicChips.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">What topics matter most to your customers?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        List key categories or content themes your brand wants to show up for in AI search results. These help define your visibility strategy.
      </p>
      
      <Textarea
        placeholder="e.g. Sustainable fashion, Organic cotton clothing, Ethical manufacturing, Eco-friendly materials"
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
          onClick={onGenerateTopics}
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
  );
};
