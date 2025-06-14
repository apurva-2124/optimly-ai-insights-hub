
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Settings, HelpCircle } from 'lucide-react';
import { OptimlyLogo } from '@/components/branding/OptimlyLogo';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <OptimlyLogo size="md" className="transition-transform group-hover:scale-105" />
            <div className="font-bold text-xl text-primary font-noto">
              optimly
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hover:bg-optimly-teal-50">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-optimly-teal-50">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-optimly-teal-50">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-optimly-teal flex items-center justify-center text-white font-medium">
            M
          </div>
        </div>
      </div>
    </header>
  );
};
