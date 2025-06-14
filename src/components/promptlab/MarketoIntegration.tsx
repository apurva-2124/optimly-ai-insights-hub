
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SimulationResult, ModelWinners } from '@/lib/types';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface MarketoIntegrationProps {
  results: SimulationResult[];
  modelWinners: ModelWinners;
  contentVariants: Array<{ id: string; name: string; content: string; }>;
}

export const MarketoIntegration: React.FC<MarketoIntegrationProps> = ({
  results,
  modelWinners,
  contentVariants
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isShipping, setIsShipping] = useState(false);

  const getWinnerContent = () => {
    const winners = [];
    
    Object.entries(modelWinners).forEach(([model, winnerId]) => {
      if (winnerId) {
        const result = results.find(r => r.id === winnerId);
        if (result) {
          const variant = contentVariants.find(v => v.id === result.variantId);
          if (variant) {
            winners.push({
              model,
              variantName: variant.name,
              content: variant.content,
              confidenceScore: result.confidenceScore
            });
          }
        }
      }
    });
    
    return winners;
  };

  const handleShipToMarketo = async () => {
    if (!webhookUrl) {
      toast.error("Please enter your Marketo webhook URL");
      return;
    }

    const winners = getWinnerContent();
    if (winners.length === 0) {
      toast.error("Please select winners for at least one model");
      return;
    }

    setIsShipping(true);

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        source: "PromptLab_AIVisibility",
        winning_variants: winners,
        summary: {
          total_models: Object.keys(modelWinners).length,
          winners_selected: winners.length,
          avg_confidence: winners.reduce((acc, w) => acc + w.confidenceScore, 0) / winners.length
        }
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      toast.success(`Successfully shipped ${winners.length} winning variants to Marketo`);
      setIsOpen(false);
    } catch (error) {
      console.error("Error shipping to Marketo:", error);
      toast.error("Failed to ship content to Marketo. Please check the webhook URL.");
    } finally {
      setIsShipping(false);
    }
  };

  const winners = getWinnerContent();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Ship to Marketo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ship Content to Marketo</DialogTitle>
          <DialogDescription>
            Export winning variants to your Marketo CMS via webhook
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook">Marketo Webhook URL</Label>
            <Input
              id="webhook"
              placeholder="https://your-marketo-instance.mktorest.com/webhook..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </div>
          
          <div>
            <Label>Content to Ship ({winners.length} variants)</Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
              {winners.length > 0 ? (
                winners.map((winner, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{winner.model}</span>
                    </div>
                    <Badge variant="outline">{winner.variantName}</Badge>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 p-2 text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">No winners selected yet</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleShipToMarketo} 
              disabled={!webhookUrl || winners.length === 0 || isShipping}
              className="flex-1"
            >
              {isShipping ? "Shipping..." : "Ship Content"}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
