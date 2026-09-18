import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

function ComponenteComErro(): never {
  throw new Error('Erro proposital para o teste');
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mostra a mensagem de fallback quando um filho lança um erro', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ComponenteComErro />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Algo deu errado ao exibir este conteúdo'
    );
  });
});
