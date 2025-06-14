
import React from 'react';

interface OptimlyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OptimlyLogo: React.FC<OptimlyLogoProps> = ({ 
  className = "", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img
        src="/lovable-uploads/4acc5dd0-5bfb-48c7-8be2-fcf24cc56bbf.png"
        alt="Optimly Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
