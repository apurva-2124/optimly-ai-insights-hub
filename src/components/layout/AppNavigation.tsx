
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart3, FlaskConical, Database } from 'lucide-react';

const AppNavigation = () => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Optimly Index',
      href: '/',
      icon: BarChart3,
      current: location.pathname === '/'
    },
    {
      name: 'Discovery Dataset',
      href: '/discovery-dataset',
      icon: Database,
      current: location.pathname === '/discovery-dataset'
    },
    {
      name: 'Prompt Lab',
      href: '/promptlab',
      icon: FlaskConical,
      current: location.pathname === '/promptlab'
    }
  ];

  return (
    <nav className="flex space-x-8">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              item.current
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default AppNavigation;
