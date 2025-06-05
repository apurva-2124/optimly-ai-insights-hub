
import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface MainDashboardLayoutProps {
  children: ReactNode;
}

export const MainDashboardLayout: React.FC<MainDashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full">
            <AppHeader />
            <main className="flex-1 px-8 py-6 max-w-screen-xl mx-auto w-full overflow-auto">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
