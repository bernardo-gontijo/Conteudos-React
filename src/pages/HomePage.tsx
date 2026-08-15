import { Link } from 'react-router';

import { Loading } from '../components/Loading';
import { MensagemErro } from '../components/MensagemErro';
import { ListaLivros } from '../features/livros/components/ListaLivros';
import { useLivros } from '../features/livros/hooks/useLivros';

export function HomePage() {
  const { data: livros = [], isLoading, isError } = useLivros();

  if (isLoading) {
    return <Loading mensagem="Carregando últimos lançamentos..." />;
  }

  if (isError) {
    return (
      <MensagemErro mensagem="Não foi possível carregar os livros da página inicial." />
    );
  }

  const ultimosLancamentos = livros.slice(0, 6);

  return (
    <>
      <section className="hero">
        <div>
          <p className="tag">React moderno na prática</p>
          <h1>Livraria React Moderna</h1>
          <p>
            Um projeto didático para aprender React com Vite, TypeScript,
            React Router, TanStack Query, Zustand, Vitest e PWA.
          </p>

          <div className="hero-acoes">
            <Link className="botao-primario" to="/catalogo">
              Ver catálogo
            </Link>
            <Link className="botao-secundario" to="/favoritos">
              Ver favoritos
            </Link>
          </div>
        </div>
      </section>

      <ListaLivros
        titulo="Últimos lançamentos"
        livros={ultimosLancamentos}
        compacto
      />
    </>
  );
}