import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import type { Treino } from '../types';
import { TreinoCard } from './TreinoCard';

const treino: Treino = {
  id: 'treino-1',
  slug: 'peito-de-ferro',
  titulo: 'Peito de Ferro',
  categoria: 'forca',
  grupoMuscular: ['peito'],
  nivel: 'intermediario',
  duracaoMinutos: 45,
  descricao: 'Treino de força',
  exercicios: [],
  imagemUrl: '/imagem.svg',
};

function renderizarCard(ehFavorito = false, aoAlternarFavorito = vi.fn()) {
  render(
    <MemoryRouter>
      <TreinoCard
        treino={treino}
        ehFavorito={ehFavorito}
        aoAlternarFavorito={aoAlternarFavorito}
      />
    </MemoryRouter>
  );
  return aoAlternarFavorito;
}

describe('TreinoCard', () => {
  it('renderiza o título e a categoria', () => {
    renderizarCard();

    expect(screen.getByRole('heading', { name: 'Peito de Ferro' })).toBeInTheDocument();
    expect(screen.getByText('Força')).toBeInTheDocument();
  });

  it('reflete o estado de favorito em aria-pressed', () => {
    renderizarCard(true);

    expect(screen.getByRole('button', { name: 'Remover dos favoritos' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('chama a ação de favoritar com o id correto', () => {
    const aoAlternarFavorito = renderizarCard();

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar aos favoritos' }));

    expect(aoAlternarFavorito).toHaveBeenCalledOnce();
    expect(aoAlternarFavorito).toHaveBeenCalledWith('treino-1');
  });
});
