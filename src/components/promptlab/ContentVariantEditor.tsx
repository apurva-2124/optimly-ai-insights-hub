
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentVariant } from '@/lib/types';
import { toast } from "sonner";

interface ContentVariantEditorProps {
  variants: ContentVariant[];
  onUpdateVariants: (variants: ContentVariant[]) => void;
  onSimulate: (selectedVariantIds: string[]) => void;
}

export const ContentVariantEditor: React.FC<ContentVariantEditorProps> = ({
  variants,
  onUpdateVariants,
  onSimulate
}) => {
  const [activeTab, setActiveTab] = useState<string>(variants[0]?.id || 'control');
  const [editContent, setEditContent] = useState<Record<string, string>>(
    variants.reduce((acc, variant) => ({ ...acc, [variant.id]: variant.content }), {})
  );
  const [selectedVariants, setSelectedVariants] = useState<string[]>(['control']);
  
  const handleContentChange = (variantId: string, content: string) => {
    setEditContent({ ...editContent, [variantId]: content });
  };
  
  const handleSaveVariant = (variant: ContentVariant) => {
    const updatedVariants = variants.map(v => 
      v.id === variant.id ? { ...v, content: editContent[variant.id] } : v
    );
    onUpdateVariants(updatedVariants);
    toast.success("Variant updated");
  };
  
  const handleVariantSelection = (variantId: string) => {
    if (selectedVariants.includes(variantId)) {
      if (variantId !== 'control' && selectedVariants.length > 1) {
        setSelectedVariants(selectedVariants.filter(id => id !== variantId));
      }
    } else {
      setSelectedVariants([...selectedVariants, variantId]);
    }
  };
  
  const formatContent = (content: string) => {
    // Handle markdown-like formatting
    if (content.includes('# ')) {
      return (
        <div className="markdown-preview">
          {content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h3 key={index} className="text-lg font-bold mb-2">{line.substring(2)}</h3>;
            } else if (line.startsWith('• ') || line.startsWith('* ')) {
              return <div key={index} className="flex mb-1"><span className="mr-2">•</span>{line.substring(2)}</div>;
            } else if (line.startsWith('**Q:')) {
              return <div key={index} className="font-bold mt-2">{line.replace(/\*\*/g, '')}</div>;
            } else if (line.startsWith('A:')) {
              return <div key={index} className="mt-1 mb-2">{line}</div>;
            } else {
              return <p key={index} className="mb-2">{line}</p>;
            }
          })}
        </div>
      );
    }
    
    return <p className="whitespace-pre-wrap">{content}</p>;
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Content Variants</CardTitle>
        <CardDescription>
          Select and edit content variants for testing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="control" className="relative">
              Control Version
              {selectedVariants.includes('control') && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
              )}
            </TabsTrigger>
            {variants.map((variant) => (
              <TabsTrigger 
                key={variant.id} 
                value={variant.id}
                className="relative"
              >
                {variant.format}
                {selectedVariants.includes(variant.id) && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="control">
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex gap-2 mb-3">
                <Badge>Topic: Ethical Fashion</Badge>
                <Badge>Persona: Eco-conscious consumer</Badge>
                <Badge>Query: best ethical clothing brands</Badge>
              </div>
              <div className="mb-4">
                <p className="text-sm leading-relaxed">
                  EcoThreads offers sustainable and ethical fashion choices with a focus on 
                  transparency and environmental responsibility. Our products are made from
                  eco-friendly materials and manufactured under fair labor conditions.
                </p>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant={selectedVariants.includes('control') ? "default" : "outline"}
                  onClick={() => handleVariantSelection('control')}
                >
                  {selectedVariants.includes('control') ? "Selected" : "Select for Testing"}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {variants.map((variant) => (
            <TabsContent key={variant.id} value={variant.id}>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge>Topic: {variant.topic}</Badge>
                  <Badge>Persona: {variant.persona}</Badge>
                  <Badge>Query: {variant.query}</Badge>
                  <Badge variant="outline">Format: {variant.format}</Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Edit Content</h3>
                    <Textarea 
                      value={editContent[variant.id]} 
                      onChange={(e) => handleContentChange(variant.id, e.target.value)}
                      className="min-h-[200px] font-mono text-sm"
                    />
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="outline" 
                        className="mr-2"
                        onClick={() => handleSaveVariant(variant)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Preview</h3>
                    <div className="border rounded-md p-4 bg-muted/30 min-h-[200px]">
                      {formatContent(editContent[variant.id])}
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant={selectedVariants.includes(variant.id) ? "default" : "outline"} 
                        onClick={() => handleVariantSelection(variant.id)}
                      >
                        {selectedVariants.includes(variant.id) ? "Selected" : "Select for Testing"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={() => onSimulate(selectedVariants)}
          disabled={selectedVariants.length === 0}
        >
          Run Simulation with Selected Variants ({selectedVariants.length})
        </Button>
      </CardFooter>
    </Card>
  );
};
