import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <div className="container">
      <SidebarProvider>
        <AppSidebar user={session?.user} />
        <main className="">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
