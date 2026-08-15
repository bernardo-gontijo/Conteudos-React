import { LivroCard } from './LivroCard';
import type { Livro } from '../types/livro';

interface ListaLivrosProps {
  readonly livros: readonly Livro[];
  readonly titulo: string;
  readonly compacto?: boolean;
  readonly mensagemVazia?: string;
}

export function ListaLivros({
  livros,
  titulo,
  compacto = false,
  mensagemVazia = 'Nenhum livro encontrado.'
}: ListaLivrosProps) {
  return (
    <main className="principal">
      <h2>{titulo}</h2>

      {livros.length === 0 && <p className="mensagem-vazia">{mensagemVazia}</p>}

      {livros.length > 0 && (
        <section className="grade-livros" aria-label={titulo}>
          {livros.map((livro) => (
            <LivroCard key={livro.id} livro={livro} compacto={compacto} />
          ))}
        </section>
      )}
    </main>
  );
}