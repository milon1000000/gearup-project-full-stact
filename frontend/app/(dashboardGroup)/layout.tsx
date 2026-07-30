import React from "react";
import { getMe } from "@/service/getMe";
import { Navbar } from "@/shared/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/Dashboard";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background flex items-center px-4 h-16 gap-4">
          <SidebarTrigger className="md:hidden" />

          <div className="flex-1">
            <Navbar user={user} />
          </div>
        </header>

        <div className="flex flex-1 w-full overflow-hidden">
          <div className="shrink-0">
            {user?.success && <DashboardSidebar user={user} />}
          </div>

          <main className="flex-1 flex flex-col p-6 overflow-y-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
