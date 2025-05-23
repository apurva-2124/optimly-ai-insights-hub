
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Settings, HelpCircle } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div 
            className="font-bold text-xl cursor-pointer text-primary" 
            onClick={() => navigate('/')}
          >
            optimly
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-optimly-teal flex items-center justify-center text-white">
            M
          </div>
        </div>
      </div>
    </header>
  );
};
