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
    title: "Grupos Disponibles",
    url: "/academico/grupos/disponible",
    icon: IconUsersPlus,
    allowedRoles: ["student"]
  },
  {
    title: "Mis Grupos Académicos", 
    url: "/academico/grupos/joined",
    icon: IconUserCheck,
    allowedRoles: ["student"]
  },
  {
    title: "Grupos Terminados",
    url: "/academico/grupos/completado",
    icon: IconCircleCheck,
    allowedRoles: ["student"]
  },
  {
    title: "Grupos Académicos",
    url: "/academico/grupos/teach", 
    icon: IconChalkboard,
    allowedRoles: ["teacher"]
  },
  {
    title: "Encuestas",
    url: "/academico/encuesta",
    icon: IconChecklist,
    allowedRoles: ["student"]
  },
  {
    title: "Tutorias",
    url: "/academico/tutoria",
    icon: IconSchool,
    allowedRoles: ["student"]
  },
  {
    title: "Foros",
    url: "/academico/foros",
    icon: IconSchool,
    allowedRoles: ["student"]
  },
  {
    title: "Atención",
    url: "/academico/atencion",
    icon: IconReport,
    allowedRoles: ["student"]
  },
];

export const navMainOptions: NavSimpleItem[] = [
   {
    title: "Configuración",
    url: "/academico/configuracion",
    icon: IconSettings,
    type: 'link'
  },
  {
    title: "Ayuda", 
    url: "/academico/ayuda",
    icon: IconHelp,
    type: 'link'
  },
  {
    title: "Search",
    url: "#",
    icon: IconSearch,
  },
];