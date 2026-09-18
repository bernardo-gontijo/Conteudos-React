interface PaginacaoProps {
  totalPaginas: number;
  paginaAtual: number;
  onMudarPagina: (pagina: number) => void;
}

export function Paginacao({ totalPaginas, paginaAtual, onMudarPagina }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, indice) => indice + 1);

  return (
    <nav className="paginacao" aria-label="Paginação do catálogo">
      <button
        type="button"
        className="paginacao__botao"
        onClick={() => onMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        Anterior
      </button>

      {paginas.map((pagina) => (
        <button
          type="button"
          className={`paginacao__botao${pagina === paginaAtual ? ' paginacao__botao--ativo' : ''}`}
          key={pagina}
          aria-label={`Ir para a página ${pagina}`}
          aria-current={pagina === paginaAtual ? 'page' : undefined}
          onClick={() => onMudarPagina(pagina)}
        >
          {pagina}
        </button>
      ))}

      <button
        type="button"
        className="paginacao__botao"
        onClick={() => onMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Próxima
      </button>
    </nav>
  );
}
