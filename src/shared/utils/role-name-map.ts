// src/shared/utils/role-name-map.ts

export function getDisplayRoleName(roleSystemName: string): string {
  if (ROLE_NAME_MAP[roleSystemName]) {
    return ROLE_NAME_MAP[roleSystemName];
  }

  const baseName = roleSystemName.split('_')[0];
  return `${baseName}`;
}

export const ROLE_NAME_MAP: Record<string, string> = {
  GESTOR_PPE: 'GESTOR(A)',
  MONITOR_PPE: 'MONITOR(A)',
  COORDENADOR_PPE: 'COORDENADOR(A)',
  SUPERVISOR_PPE: 'SUPERVISOR(A)',
  PROFESSOR_PPE: 'PROFESSOR(A)',
  ADMINISTRADOR: 'ADMINISTRADOR(A)',
};

export function formatRoleName(rawName: string): string {
  const [base] = rawName.split('_');

  const rolesWithSuffix = ['GESTOR', 'MONITOR'];

  const baseFormatted = base.charAt(0) + base.slice(1).toLowerCase(); // Ex: GESTOR → Gestor

  return rolesWithSuffix.includes(base) ? `${baseFormatted}(A)` : baseFormatted;
}
