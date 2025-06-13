
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PersonasStepProps {
  personas: string;
  setPersonas: (value: string) => void;
  personaChips: string[];
  setPersonaChips: (chips: string[]) => void;
  isGeneratingPersonas: boolean;
  onGeneratePersonas: () => void;
}

export const PersonasStep: React.FC<PersonasStepProps> = ({
  personas,
  setPersonas,
  personaChips,
  setPersonaChips,
  isGeneratingPersonas,
  onGeneratePersonas
}) => {
  const handleAddPersonaFromText = () => {
    if (!personas.trim()) return;
    const newPersonas = personas.split(',').map(p => p.trim()).filter(p => p);
    setPersonaChips([...personaChips, ...newPersonas]);
    setPersonas("");
  };

  const removePersonaChip = (index: number) => {
    setPersonaChips(personaChips.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">Who are you trying to reach?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Tell us the customer types you want AI assistants to influence. These personas help us evaluate your brand's visibility and alignment with user intent.
      </p>
      
      <Textarea
        placeholder="e.g. Eco-conscious millennials, Budget-conscious families, Sustainable fashion advocates"
        value={personas}
        onChange={(e) => setPersonas(e.target.value)}
        className="min-h-[100px]"
      />
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={handleAddPersonaFromText}
          disabled={!personas.trim()}
        >
          Add Personas
        </Button>
        <Button 
          variant="default" 
          onClick={onGeneratePersonas}
          disabled={isGeneratingPersonas}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isGeneratingPersonas ? "Generating..." : "✨ Suggest Personas with AI"}
        </Button>
      </div>

      {personaChips.length > 0 && (
        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block">Your personas:</label>
          <div className="flex flex-wrap gap-2">
            {personaChips.map((persona, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {persona}
                <button 
                  className="ml-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removePersonaChip(index)}
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
