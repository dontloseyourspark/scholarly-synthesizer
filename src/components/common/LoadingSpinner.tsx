
import React from 'react';
import { Loader2 } from 'lucide-react';

type LoadingSpinnerProps = {
  message?: string;
  className?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...", 
  className = "py-8" 
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
      <span>{message}</span>
    </div>
  );
};

export default LoadingSpinner;
