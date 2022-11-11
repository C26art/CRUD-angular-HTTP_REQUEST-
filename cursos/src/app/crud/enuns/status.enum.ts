export enum CursoStatus {
  PENDENTE,
  EM_ANDAMENTO,
  CONCLUIDO
}

export const CrudStatusLabel = new Map<number, string>([
  [CursoStatus.PENDENTE, 'Pendente'],
  [CursoStatus.EM_ANDAMENTO, 'Em andamento'],
  [CursoStatus.CONCLUIDO, 'Concluido'],
]);
