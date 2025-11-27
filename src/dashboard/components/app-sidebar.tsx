import * as React from "react"
import { NavMain } from "@/dashboard/components/sidebar/nav-main"
import { NavSecondary } from "@/dashboard/components/sidebar/nav-secondary"
import { NavUser } from "@/dashboard/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  navMainCollapse, 
  navSimpleMain, 
  navMainOptions, 
} from "@/shared/site"
import {routes} from "@/shared/site";
import { useAuth } from "@/dashboard/hooks/useAuth";

interface User {
  first_name?: string;
  last_name?: string,
  email?: string;
  avatar?: string;
  role?: string | string[];
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  token?: string | null;
  user?: User | null;
};

export function AppSidebar({ token, user, ...props }: AppSidebarProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const { role } = useAuth();

  const filterItemsByRole = (items: any[]) => {
    if (!role) return items;
    
    return items.filter(item => {
      if (!item.allowedRoles) return true;
      
      return item.allowedRoles.includes(role);
    });
  };

  const shownUser = {
    name: `${user?.first_name ?? "Invitado"} ${user?.last_name ?? ""}`,
    email: user?.email ?? "—",
    avatar: user?.avatar ?? `${routes.base}9440461.webp`,
    token: token ?? "token_invalido"
  };

  const filteredNavSimpleMain = filterItemsByRole(navSimpleMain);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href={routes.dashboard.index} title="Dashboard" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <span><img src="/logo-gismondi.webp" alt="Logotipo Gismondi" title="Logotipo Gismondi"/></span>
                </div>
                <span className="text-xl font-bold">Gismondi</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainCollapse} searchTerm={searchTerm} />
        
        <NavSecondary items={filteredNavSimpleMain}/>
        
        <NavSecondary 
          items={navMainOptions} 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          className="mt-auto" 
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={shownUser} />
      </SidebarFooter>
    </Sidebar>
  )
}