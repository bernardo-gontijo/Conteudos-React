import { useEffect, useState } from 'react';

/**
 * Retorna uma versão atrasada do valor recebido. O cleanup cancela a
 * atualização anterior quando o valor muda antes do fim do intervalo.
 */
export function useDebounce<T>(valor: T, atrasoMs = 300): T {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorDebounced(valor);
    }, atrasoMs);

    return () => clearTimeout(temporizador);
  }, [valor, atrasoMs]);

  return valorDebounced;
}
