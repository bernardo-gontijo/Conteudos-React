import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import type { Treino } from '../types';
import { FormularioRegistro } from './FormularioRegistro';

const treinos: Treino[] = [
  {
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
  },
];

function renderizarFormulario(aoSalvar = vi.fn()) {
  render(
    <MemoryRouter initialEntries={['/registro']}>
      <Routes>
        <Route
          path="/registro"
          element={<FormularioRegistro treinos={treinos} aoSalvar={aoSalvar} />}
        />
        <Route path="/dashboard" element={<p>Dashboard acessado</p>} />
      </Routes>
    </MemoryRouter>
  );
  return aoSalvar;
}

describe('FormularioRegistro', () => {
  it('mostra mensagens de erro ao submeter campos inválidos', async () => {
    const usuario = userEvent.setup();
    const aoSalvar = renderizarFormulario();

    await usuario.clear(screen.getByLabelText('Data'));
    await usuario.click(screen.getByRole('button', { name: 'Salvar registro' }));

    expect(screen.getByText('Selecione um treino.')).toBeInTheDocument();
    expect(screen.getByText('Informe a data do treino.')).toBeInTheDocument();
    expect(screen.getByText('A duração precisa ser maior que zero.')).toBeInTheDocument();
    expect(screen.getByText('A carga total não pode ser negativa.')).toBeInTheDocument();
    expect(aoSalvar).not.toHaveBeenCalled();
  });

  it('salva um registro válido e navega para o dashboard', async () => {
    const usuario = userEvent.setup();
    const adicionarRegistro = renderizarFormulario();

    await usuario.selectOptions(screen.getByLabelText('Treino concluído'), 'treino-1');
    await usuario.type(screen.getByLabelText('Duração (minutos)'), '45');
    await usuario.type(screen.getByLabelText('Carga total (kg)'), '120');
    await usuario.click(screen.getByRole('button', { name: 'Salvar registro' }));

    expect(adicionarRegistro).toHaveBeenCalledWith(
      expect.objectContaining({
        treinoId: 'treino-1',
        duracaoMinutos: 45,
        cargaTotal: 120,
      })
    );
    expect(await screen.findByText('Dashboard acessado')).toBeInTheDocument();
  });
});
