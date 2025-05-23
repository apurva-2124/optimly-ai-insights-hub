
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, BarChart2, Zap, PenTool, Database } from 'lucide-react';

export const AppNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleNavigation = (path: string) => {
    navigate(path);
    setActiveItem(path);
  };

  const isActive = (path: string) => activeItem === path;

  return (
    <nav className="w-64 bg-sidebar p-4 flex flex-col space-y-8 border-r border-border">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-sidebar-foreground/70 px-2 mb-3">
          MODULES
        </h3>
        <Button
          variant={isActive('/') ? "secondary" : "ghost"}
          onClick={() => handleNavigation('/')}
          className={`w-full justify-start text-left ${
            isActive('/') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'
          }`}
        >
          <BarChart2 className="h-5 w-5 mr-3" />
          Optimly Index
        </Button>
        <Button
          variant={isActive('/promptlab') ? "secondary" : "ghost"}
          onClick={() => handleNavigation('/promptlab')}
          className={`w-full justify-start text-left ${
            isActive('/promptlab') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'
          }`}
        >
          <Zap className="h-5 w-5 mr-3" />
          PromptLab
        </Button>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-sidebar-foreground/70 px-2 mb-3">
          TOOLS
        </h3>
        <Button
          variant="ghost"
          className="w-full justify-start text-left text-sidebar-foreground"
        >
          <Search className="h-5 w-5 mr-3" />
          Discovery
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-left text-sidebar-foreground"
        >
          <PenTool className="h-5 w-5 mr-3" />
          Content Studio
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-left text-sidebar-foreground"
        >
          <Database className="h-5 w-5 mr-3" />
          Knowledge Base
        </Button>
      </div>
      
      <div className="mt-auto">
        <div className="bg-sidebar-accent/20 rounded-lg p-3 mt-4">
          <p className="text-sm text-sidebar-foreground/90 font-medium">Demo Mode</p>
          <p className="text-xs text-sidebar-foreground/70 mt-1">
            Using sample data for EcoThreads
          </p>
        </div>
      </div>
    </nav>
  );
};
