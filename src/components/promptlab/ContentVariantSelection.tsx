
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit3, Trash2, CheckCircle2, Target } from 'lucide-react';
import { ContentVariant } from '@/lib/types';

interface ContentVariantSelectionProps {
  contentVariants: ContentVariant[];
  selectedVariants: string[];
  brandContent: string;
  queryContext: {
    topic: string;
    persona: string;
    funnelStage: string;
  };
  onAddVariant: (variant: Omit<ContentVariant, 'id'>) => void;
  onUpdateVariant: (id: string, variant: Partial<ContentVariant>) => void;
  onDeleteVariant: (id: string) => void;
  onToggleVariant: (id: string) => void;
  onContinue: () => void;
  isLoading?: boolean;
}

export const ContentVariantSelection: React.FC<ContentVariantSelectionProps> = ({
  contentVariants,
  selectedVariants,
  brandContent,
  queryContext,
  onAddVariant,
  onUpdateVariant,
  onDeleteVariant,
  onToggleVariant,
  onContinue,
  isLoading = false
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<string | null>(null);
  const [newVariant, setNewVariant] = useState({
    name: '',
    content: '',
    persona: queryContext.persona,
    funnelStage: queryContext.funnelStage
  });

  const personas = ['Eco-conscious consumer', 'Adventure-seeking retiree', 'Affluent traveler', 'Luxury service seeker'];
  const funnelStages = ['Awareness', 'Consideration', 'Decision'];

  const handleAddVariant = () => {
    if (newVariant.name && newVariant.content) {
      onAddVariant({
        name: newVariant.name,
        content: newVariant.content,
        persona: newVariant.persona,
        funnelStage: newVariant.funnelStage,
        query: '',
        topic: queryContext.topic,
        format: 'Custom'
      });
      setNewVariant({
        name: '',
        content: '',
        persona: queryContext.persona,
        funnelStage: queryContext.funnelStage
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditVariant = (variantId: string, field: string, value: string) => {
    onUpdateVariant(variantId, { [field]: value });
  };

  const allVariants = [
    {
      id: 'control',
      name: 'Control Version',
      content: brandContent,
      persona: queryContext.persona,
      funnelStage: queryContext.funnelStage,
      isControl: true
    },
    ...contentVariants
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
          Choose Which Content Variants to Test
        </CardTitle>
        <CardDescription>
          Test how different versions of your copy perform in AI-generated answers. Use this to compare tone, positioning, and likelihood of being cited across assistants.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {allVariants.map((variant) => (
            <div key={variant.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
                      selectedVariants.includes(variant.id)
                        ? 'bg-primary border-primary'
                        : 'border-muted-foreground'
                    }`}
                    onClick={() => onToggleVariant(variant.id)}
                  >
                    {selectedVariants.includes(variant.id) && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                  </div>
                  {editingVariant === variant.id ? (
                    <Input
                      value={variant.name}
                      onChange={(e) => handleEditVariant(variant.id, 'name', e.target.value)}
                      onBlur={() => setEditingVariant(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingVariant(null)}
                      className="font-medium text-sm"
                    />
                  ) : (
                    <span className="font-medium">{variant.name}</span>
                  )}
                  {variant.isControl && (
                    <Badge variant="outline" className="text-xs">Control</Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {!variant.isControl && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingVariant(variant.id)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteVariant(variant.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  {variant.persona}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {variant.funnelStage}
                </Badge>
              </div>
              
              <div className="relative">
                {editingVariant === variant.id ? (
                  <Textarea
                    value={variant.content}
                    onChange={(e) => handleEditVariant(variant.id, 'content', e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                ) : (
                  <div className="p-3 bg-muted/30 rounded-md border text-sm leading-relaxed">
                    {variant.content.length > 150 
                      ? `${variant.content.substring(0, 150)}...`
                      : variant.content
                    }
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Variant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Content Variant</DialogTitle>
              <DialogDescription>
                Create a new version to test different messaging approaches
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Variant Name</label>
                <Input
                  value={newVariant.name}
                  onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                  placeholder="e.g., Emotional Appeal, Technical Focus, Premium Positioning"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Target Persona</label>
                  <Select value={newVariant.persona} onValueChange={(value) => setNewVariant({ ...newVariant, persona: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {personas.map((persona) => (
                        <SelectItem key={persona} value={persona}>{persona}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Funnel Stage</label>
                  <Select value={newVariant.funnelStage} onValueChange={(value) => setNewVariant({ ...newVariant, funnelStage: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {funnelStages.map((stage) => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <Textarea
                  value={newVariant.content}
                  onChange={(e) => setNewVariant({ ...newVariant, content: e.target.value })}
                  placeholder="Enter your variant content here..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddVariant}>
                Add Variant
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {contentVariants.length >= 5 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              💡 Limit reached: Focus on 3-5 variants for more meaningful comparison
            </p>
          </div>
        )}
        
        <Button 
          onClick={onContinue}
          disabled={selectedVariants.length === 0 || isLoading}
          className="w-full"
          size="lg"
        >
          <Target className="h-4 w-4 mr-2" />
          Run Visibility Test with Selected Variants ({selectedVariants.length})
        </Button>
      </CardContent>
    </Card>
  );
};
