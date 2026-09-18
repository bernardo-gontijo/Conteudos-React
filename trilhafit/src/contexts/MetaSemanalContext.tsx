import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ValorMetaSemanalContext {
  metaSemanal: number;
  atualizarMetaSemanal: (novaMeta: number) => void;
}

const MetaSemanalContext = createContext<ValorMetaSemanalContext | undefined>(undefined);
const CHAVE_STORAGE = 'trilhafit-meta-semanal';
const META_PADRAO = 3;

function lerMetaSalva(): number {
  if (typeof window === 'undefined') return META_PADRAO;
  const valorSalvo = Number(window.localStorage.getItem(CHAVE_STORAGE));
  return Number.isInteger(valorSalvo) && valorSalvo > 0 ? valorSalvo : META_PADRAO;
}

export function MetaSemanalProvider({ children }: { children: ReactNode }) {
  const [metaSemanal, setMetaSemanal] = useState(lerMetaSalva);

  useEffect(() => {
    window.localStorage.setItem(CHAVE_STORAGE, String(metaSemanal));
  }, [metaSemanal]);

  function atualizarMetaSemanal(novaMeta: number) {
    if (Number.isInteger(novaMeta) && novaMeta > 0) setMetaSemanal(novaMeta);
  }

  return (
    <MetaSemanalContext.Provider value={{ metaSemanal, atualizarMetaSemanal }}>
      {children}
    </MetaSemanalContext.Provider>
  );
}

export function useMetaSemanal(): ValorMetaSemanalContext {
  const contexto = useContext(MetaSemanalContext);
  if (!contexto) {
    throw new Error('useMetaSemanal precisa ser usado dentro de um <MetaSemanalProvider>');
  }
  return contexto;
}
