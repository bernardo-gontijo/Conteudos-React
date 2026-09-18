import type { Categoria, GrupoMuscular, Nivel, RegistroTreino, Treino } from './types';

export type OrdenacaoTreinos = 'titulo' | 'duracao' | 'nivel';

const ORDEM_NIVEIS: Record<Nivel, number> = {
  iniciante: 0,
  intermediario: 1,
  avancado: 2,
};

/**
 * Filtra treinos por um termo de busca livre (título) e, opcionalmente,
 * por grupo muscular e nível. Função pura — sem dependências externas —
 * para ser fácil de testar isoladamente.
 */
export function filtrarTreinos(
  treinos: Treino[],
  termo: string,
  grupoMuscular?: GrupoMuscular | 'todos',
  nivel?: Nivel | 'todos'
): Treino[] {
  const termoNormalizado = termo.trim().toLowerCase();

  return treinos.filter((treino) => {
    const combinaTermo =
      termoNormalizado.length === 0 ||
      treino.titulo.toLowerCase().includes(termoNormalizado) ||
      treino.grupoMuscular.some((g) => g.includes(termoNormalizado)) ||
      treino.nivel.includes(termoNormalizado);

    const combinaGrupo =
      !grupoMuscular || grupoMuscular === 'todos' || treino.grupoMuscular.includes(grupoMuscular);

    const combinaNivel = !nivel || nivel === 'todos' || treino.nivel === nivel;

    return combinaTermo && combinaGrupo && combinaNivel;
  });
}

/**
 * Filtra exclusivamente pelo nível escolhido. A opção "todos" mantém a
 * coleção completa e uma nova lista é sempre devolvida.
 */
export function filtrarPorNivel(
  treinos: Treino[],
  nivel: Nivel | 'todos' = 'todos'
): Treino[] {
  if (nivel === 'todos') return [...treinos];
  return treinos.filter((treino) => treino.nivel === nivel);
}

/** Ordena alfabeticamente por título sem alterar a lista original. */
export function ordenarPorTitulo(treinos: Treino[]): Treino[] {
  return [...treinos].sort((a, b) =>
    a.titulo.localeCompare(b.titulo, 'pt-BR', { sensitivity: 'base' })
  );
}

/** Ordena da menor para a maior duração sem alterar a lista original. */
export function ordenarPorDuracao(treinos: Treino[]): Treino[] {
  return [...treinos].sort((a, b) => a.duracaoMinutos - b.duracaoMinutos);
}

/** Ordena de iniciante para avançado sem alterar a lista original. */
export function ordenarPorNivel(treinos: Treino[]): Treino[] {
  return [...treinos].sort((a, b) => ORDEM_NIVEIS[a.nivel] - ORDEM_NIVEIS[b.nivel]);
}

/** Aplica a estratégia escolhida mantendo todas as ordenações puras. */
export function ordenarTreinos(treinos: Treino[], ordenacao: OrdenacaoTreinos): Treino[] {
  switch (ordenacao) {
    case 'duracao':
      return ordenarPorDuracao(treinos);
    case 'nivel':
      return ordenarPorNivel(treinos);
    case 'titulo':
      return ordenarPorTitulo(treinos);
  }
}

/**
 * Filtra treinos por categoria (força, cardio, mobilidade).
 */
export function filtrarPorCategoria(treinos: Treino[], categoria: Categoria): Treino[] {
  return treinos.filter((treino) => treino.categoria === categoria);
}

/**
 * Formata segundos totais em uma string mm:ss, usada pelo cronômetro.
 */
export function formatarTempo(segundosTotais: number): string {
  const minutos = Math.floor(segundosTotais / 60);
  const segundos = segundosTotais % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

/**
 * Retorna os N treinos mais recentes (assumindo que o array já vem em
 * ordem de inserção) — usado para os "destaques" da HomePage.
 */
export function obterTreinosRecentes(treinos: Treino[], quantidade = 4): Treino[] {
  return [...treinos].slice(-quantidade).reverse();
}

/**
 * Agrupa registros de treino concluídos por semana (ISO week),
 * somando a carga total de cada semana — usado no dashboard.
 */
export function agruparCargaPorSemana(
  registros: RegistroTreino[]
): { semana: string; cargaTotal: number }[] {
  const grupos = new Map<string, number>();

  for (const registro of registros) {
    const data = new Date(registro.data);
    const chave = obterChaveSemana(data);
    grupos.set(chave, (grupos.get(chave) ?? 0) + registro.cargaTotal);
  }

  return Array.from(grupos.entries())
    .map(([semana, cargaTotal]) => ({ semana, cargaTotal }))
    .sort((a, b) => (a.semana > b.semana ? 1 : -1));
}

function obterChaveSemana(data: Date): string {
  const copia = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()));
  const diaSemana = copia.getUTCDay() || 7;
  copia.setUTCDate(copia.getUTCDate() + 4 - diaSemana);
  const inicioAno = new Date(Date.UTC(copia.getUTCFullYear(), 0, 1));
  const numeroSemana = Math.ceil(((copia.getTime() - inicioAno.getTime()) / 86400000 + 1) / 7);
  return `${copia.getUTCFullYear()}-S${String(numeroSemana).padStart(2, '0')}`;
}
