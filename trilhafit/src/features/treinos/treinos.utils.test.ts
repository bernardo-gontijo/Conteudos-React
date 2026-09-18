import { describe, expect, it } from 'vitest';
import {
  filtrarPorNivel,
  filtrarTreinos,
  formatarTempo,
  calcularProgressoMetaSemanal,
  ordenarPorDuracao,
  ordenarPorNivel,
  ordenarPorTitulo,
} from './treinos.utils';
import type { Treino } from './types';
import type { RegistroTreino } from './types';

const treinosFalsos: Treino[] = [
  {
    id: '1',
    slug: 'peito-de-ferro',
    titulo: 'Peito de Ferro',
    categoria: 'forca',
    grupoMuscular: ['peito', 'bracos'],
    nivel: 'intermediario',
    duracaoMinutos: 50,
    descricao: 'Treino de peito',
    exercicios: [],
    imagemUrl: '',
  },
  {
    id: '2',
    slug: 'cardio-leve',
    titulo: 'Cardio Leve',
    categoria: 'cardio',
    grupoMuscular: ['cardio'],
    nivel: 'iniciante',
    duracaoMinutos: 25,
    descricao: 'Treino leve',
    exercicios: [],
    imagemUrl: '',
  },
];

describe('formatarTempo', () => {
  it('formata segundos em mm:ss com padding de zero', () => {
    expect(formatarTempo(0)).toBe('00:00');
    expect(formatarTempo(5)).toBe('00:05');
    expect(formatarTempo(65)).toBe('01:05');
    expect(formatarTempo(600)).toBe('10:00');
  });
});

describe('filtrarTreinos', () => {
  it('retorna todos os treinos quando o termo está vazio', () => {
    expect(filtrarTreinos(treinosFalsos, '')).toHaveLength(2);
  });

  it('filtra por título (case-insensitive)', () => {
    const resultado = filtrarTreinos(treinosFalsos, 'ferro');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe('Peito de Ferro');
  });

  it('filtra por grupo muscular', () => {
    const resultado = filtrarTreinos(treinosFalsos, '', 'cardio');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe('2');
  });

  it('filtra por nível', () => {
    const resultado = filtrarTreinos(treinosFalsos, '', 'todos', 'iniciante');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nivel).toBe('iniciante');
  });

  it('combina termo, grupo e nível', () => {
    const resultado = filtrarTreinos(treinosFalsos, 'peito', 'peito', 'intermediario');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe('1');
  });
});

describe('filtrarPorNivel', () => {
  it('retorna somente os treinos do nível selecionado', () => {
    const resultado = filtrarPorNivel(treinosFalsos, 'iniciante');

    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe('2');
  });

  it('retorna todos os treinos quando o nível é "todos"', () => {
    expect(filtrarPorNivel(treinosFalsos, 'todos')).toEqual(treinosFalsos);
  });
});

describe('ordenação de treinos', () => {
  it('ordena por título, duração e nível sem alterar a lista original', () => {
    const original = [...treinosFalsos];

    expect(ordenarPorTitulo(treinosFalsos).map((treino) => treino.id)).toEqual(['2', '1']);
    expect(ordenarPorDuracao(treinosFalsos).map((treino) => treino.id)).toEqual(['2', '1']);
    expect(ordenarPorNivel(treinosFalsos).map((treino) => treino.id)).toEqual(['2', '1']);
    expect(treinosFalsos).toEqual(original);
  });
});

describe('calcularProgressoMetaSemanal', () => {
  const registros: RegistroTreino[] = [
    {
      id: 'r1',
      treinoId: '1',
      data: '2026-09-14',
      duracaoMinutos: 30,
      cargaTotal: 100,
    },
    {
      id: 'r2',
      treinoId: '2',
      data: '2026-09-18',
      duracaoMinutos: 25,
      cargaTotal: 80,
    },
    {
      id: 'r3',
      treinoId: '1',
      data: '2026-09-13',
      duracaoMinutos: 30,
      cargaTotal: 100,
    },
  ];

  it('conta apenas os registros da semana atual e informa quando a meta foi atingida', () => {
    const resultado = calcularProgressoMetaSemanal(
      registros,
      2,
      new Date(2026, 8, 18, 12)
    );

    expect(resultado).toEqual({ quantidade: 2, atingida: true });
  });

  it('informa quando a meta ainda não foi atingida', () => {
    const resultado = calcularProgressoMetaSemanal(
      registros,
      3,
      new Date(2026, 8, 18, 12)
    );

    expect(resultado).toEqual({ quantidade: 2, atingida: false });
  });
});
