
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Brand } from '@/lib/types';
import { toast } from "sonner";

interface BrandProfileProps {
  brand: Brand;
  onUpdateBrand: (brand: Brand) => void;
}

export const BrandProfile: React.FC<BrandProfileProps> = ({ brand, onUpdateBrand }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(brand.name);
  const [industry, setIndustry] = useState(brand.industry);
  const [competitors, setCompetitors] = useState<string[]>(brand.competitors || []);
  const [newCompetitor, setNewCompetitor] = useState("");
  
  const handleSave = () => {
    if (!name || !industry) {
      toast.error("Brand name and industry are required");
      return;
    }
    
    onUpdateBrand({
      name,
      industry,
      competitors
    });
    
    setIsEditing(false);
    toast.success("Brand profile updated successfully");
  };
  
  const handleAddCompetitor = () => {
    if (!newCompetitor) return;
    if (competitors.includes(newCompetitor)) {
      toast.error("Competitor already added");
      return;
    }
    setCompetitors([...competitors, newCompetitor]);
    setNewCompetitor("");
  };
  
  const handleRemoveCompetitor = (competitor: string) => {
    setCompetitors(competitors.filter(c => c !== competitor));
  };
  
  const handleCancel = () => {
    setName(brand.name);
    setIndustry(brand.industry);
    setCompetitors(brand.competitors || []);
    setIsEditing(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Brand Profile</CardTitle>
            <CardDescription>
              Details about your brand and competitors
            </CardDescription>
          </div>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Brand Name</h4>
              <p className="font-medium">{brand.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Industry</h4>
              <p>{brand.industry}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Competitors</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {competitors.map((competitor) => (
                  <Badge key={competitor} variant="secondary">
                    {competitor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Brand Name
              </label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Industry
              </label>
              <Input 
                value={industry} 
                onChange={(e) => setIndustry(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Competitors
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {competitors.map((competitor) => (
                  <Badge key={competitor} variant="secondary" className="flex items-center gap-1">
                    {competitor}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveCompetitor(competitor)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input 
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                  placeholder="Add competitor"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
                />
                <Button type="button" onClick={handleAddCompetitor}>Add</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
