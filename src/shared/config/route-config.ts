// src/shares/config/route-config.ts

import { FileText, House, LucideIcon } from 'lucide-react';

import { FeatureFlag } from '@/shared/config/feature-flags';

/**
 * Interface para configuração de rotas com controle de acesso
 */

export interface RouteConfig {
  path: string;
  title: string;
  icon?: LucideIcon;
  requiredRoles?: string[];
  requiredModules?: number[];
  requiredPermissions?: string[];
  requiredAttributes?: {
    key: string;
    value: string | number | boolean;
    operator?: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
  }[];
  featureFlags?: FeatureFlag[];
  strictMode?: boolean;
  children?: RouteConfig[];
  showInSidebar?: boolean;
}
/**
 * Configuração central de todas as rotas da aplicação
 * Usada para gerar menus, sidebars e verificar permissões
 */

/**
 * Abaixo têm-se dispostas apenas "rotas exemplo". Ao utilizar o boilerplate,
 * deve-se ajustar as rotas para as rotas existentes no sistema atentando-se
 * para as permissões.
 */

export const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: House,
    showInSidebar: true,
    requiredRoles: ['GESTOR_PPE', 'MONITOR_PPE', 'APOIO_PPE', 'NAPS_PPE', 'TE_PPE'],
  },
  {
    path: '/documentation',
    title: 'Documentação Boilerplate',
    icon: FileText,
    showInSidebar: true,
    requiredRoles: ['GESTOR_PPE'],
  },
];
