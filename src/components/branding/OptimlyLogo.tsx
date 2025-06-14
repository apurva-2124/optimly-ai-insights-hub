
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
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Geometric logo design based on the brand imagery */}
        <rect 
          x="4" 
          y="4" 
          width="24" 
          height="24" 
          rx="6" 
          fill="currentColor" 
          className="text-optimly-teal"
        />
        <rect 
          x="8" 
          y="8" 
          width="8" 
          height="8" 
          rx="2" 
          fill="white"
        />
        <rect 
          x="18" 
          y="8" 
          width="6" 
          height="6" 
          rx="1" 
          fill="white"
        />
        <rect 
          x="8" 
          y="18" 
          width="16" 
          height="6" 
          rx="2" 
          fill="white"
        />
      </svg>
    </div>
  );
};
