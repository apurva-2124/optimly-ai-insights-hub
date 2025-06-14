
import { useState } from 'react';
import { ContentVariant } from '@/lib/types';
import { toast } from 'sonner';

export const useContentVariants = () => {
  const [contentVariants, setContentVariants] = useState<ContentVariant[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<string[]>(['control']);

  const handleAddVariant = (variant: Omit<ContentVariant, 'id'>) => {
    const newVariant: ContentVariant = {
      ...variant,
      id: `variant-${Date.now()}`
    };
    setContentVariants(prev => [...prev, newVariant]);
    setSelectedVariants(prev => [...prev, newVariant.id]);
    toast.success("Variant added");
  };

  const handleUpdateVariant = (id: string, updates: Partial<ContentVariant>) => {
    setContentVariants(prev => 
      prev.map(variant => 
        variant.id === id ? { ...variant, ...updates } : variant
      )
    );
  };

  const handleDeleteVariant = (id: string) => {
    setContentVariants(prev => prev.filter(variant => variant.id !== id));
    setSelectedVariants(prev => prev.filter(variantId => variantId !== id));
    toast.success("Variant deleted");
  };

  const handleToggleVariant = (id: string) => {
    setSelectedVariants(prev => {
      if (id === 'control') {
        // Control cannot be deselected if it's the only one
        if (prev.includes('control') && prev.length === 1) {
          return prev;
        }
        return prev.includes('control') 
          ? prev.filter(variantId => variantId !== 'control')
          : [...prev, 'control'];
      }
      
      return prev.includes(id)
        ? prev.filter(variantId => variantId !== id)
        : [...prev, id];
    });
  };

  return {
    contentVariants,
    selectedVariants,
    setContentVariants,
    setSelectedVariants,
    handleAddVariant,
    handleUpdateVariant,
    handleDeleteVariant,
    handleToggleVariant
  };
};
