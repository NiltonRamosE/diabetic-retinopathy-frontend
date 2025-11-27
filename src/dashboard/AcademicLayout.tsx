import { useEffect, useState } from "react";
import { AppSidebar } from "@/dashboard/components/app-sidebar"
import { SiteHeader } from "@/dashboard/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface AcademicLayoutProps {
  children: React.ReactNode;
  title?: string;
}
import { useAuth } from "@/dashboard/hooks/useAuth";
export default function AcademicLayout({ children, title = "Dashboard: Clínica Oftalmológica Gismondi" }: AcademicLayoutProps) {
  const { token, user, mounted } = useAuth();

  if (!mounted) return null;

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" token={token} user={user}/>
        <SidebarInset>
          <SiteHeader title={title}/>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}