
import React from 'react';

interface OptimlyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'black' | 'teal' | 'white';
}

export const OptimlyLogo: React.FC<OptimlyLogoProps> = ({ 
  className = "", 
  size = 'md',
  variant = 'teal'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const logoSrc = {
    black: '/lovable-uploads/708090fb-593d-4d2d-bf1b-a5d87f1738df.png',
    teal: '/lovable-uploads/89c7c872-574c-4548-8a33-95d87cc96a01.png',
    white: '/lovable-uploads/c8cb558d-31b4-4fc7-9bb6-707efd594fc7.png'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img
        src={logoSrc[variant]}
        alt="Optimly Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
