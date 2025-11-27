import {
  type LucideIcon,
} from "lucide-react"
import {
  IconDatabase,
  IconReport,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUsersPlus,
  IconUserCheck,
  IconCircleCheck,
  IconChalkboard,
  IconChecklist,
  IconSchool,
  type Icon
} from "@tabler/icons-react"

export const routes = {
  base: "/",
  general: {
    login: "/login",
    register: "/register",
  },
  dashboard:{
    index: "/dashboard",
  }
};

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    adminOnly?: boolean;
  }[];
  adminOnly?: boolean;
}

export interface NavSimpleItem {
  title: string;
  url: string;
  icon: Icon;
  type?: 'link' | 'search';
  allowedRoles?: string[];
}

export const navMainCollapse: NavItem[] = [];

export const navSimpleMain: NavSimpleItem[] = [
  {
    title: "Ver Diagnostico",
    url: "/patient/diagnostico",
    icon: IconUsersPlus,
    allowedRoles: ["patient"]
  },
  {
    title: "Ver Predicción",
    url: "/patient/prediccion",
    icon: IconUsersPlus,
    allowedRoles: ["patient"]
  },
  {
    title: "Realizar Predicción",
    url: "/doctor/prediccion",
    icon: IconUsersPlus,
    allowedRoles: ["doctor"]
  },
  {
    title: "Ver Historial médico",
    url: "/doctor/historial-medico",
    icon: IconUsersPlus,
    allowedRoles: ["doctor"]
  },
];

export const navMainOptions: NavSimpleItem[] = [
   {
    title: "Configuración",
    url: "#",
    icon: IconSettings,
    type: 'link'
  },
  {
    title: "Ayuda", 
    url: "#",
    icon: IconHelp,
    type: 'link'
  },
  {
    title: "Search",
    url: "#",
    icon: IconSearch,
  },
];