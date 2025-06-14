
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart3, Search, Database } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { OptimlyLogo } from '@/components/branding/OptimlyLogo';

const navigation = [
  {
    name: 'Optimly Index',
    href: '/',
    icon: BarChart3,
  },
  {
    name: 'Discovery Dataset',
    href: '/discovery-dataset',
    icon: Database,
  },
  {
    name: 'AI Search Simulator',
    href: '/promptlab',
    icon: Search,
  }
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="w-60">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-2 text-lg font-semibold px-4 py-3">
            <OptimlyLogo size="sm" />
            <span className="font-noto">Optimly</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        to={item.href}
                        className={cn(
                          'flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors font-noto',
                          isActive
                            ? 'bg-optimly-teal-50 text-optimly-teal-700 border-r-2 border-optimly-teal'
                            : 'text-muted-foreground hover:text-foreground hover:bg-optimly-teal-25'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
