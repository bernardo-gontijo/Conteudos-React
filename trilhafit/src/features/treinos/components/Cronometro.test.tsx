import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Cronometro } from './Cronometro';

describe('Cronometro', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('conta três segundos sem aguardar o tempo real', () => {
    render(<Cronometro />);

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar' }));
    act(() => vi.advanceTimersByTime(3000));

    expect(screen.getByText('00:03')).toBeInTheDocument();
  });

  it('interrompe a contagem ao pausar', () => {
    render(<Cronometro />);

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar' }));
    act(() => vi.advanceTimersByTime(2000));
    fireEvent.click(screen.getByRole('button', { name: 'Pausar' }));
    act(() => vi.advanceTimersByTime(3000));

    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('volta o display para 00:00 ao zerar', () => {
    render(<Cronometro />);

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar' }));
    act(() => vi.advanceTimersByTime(3000));
    fireEvent.click(screen.getByRole('button', { name: 'Zerar' }));

    expect(screen.getByText('00:00')).toBeInTheDocument();
  });
});
