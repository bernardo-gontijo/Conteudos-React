import { Link } from 'react-router';

import { Loading } from '../../../components/Loading';
import { MensagemErro } from '../../../components/MensagemErro';
import { useFavoritosStore } from '../../../store/favoritos.store';
import { ListaLivros } from '../components/ListaLivros';
import { useLivros } from '../hooks/useLivros';
import { obterLivrosFavoritos } from '../utils/livros.utils';

export function FavoritosPage() {
  const favoritos = useFavoritosStore((state) => state.favoritos);
  const limparFavoritos = useFavoritosStore((state) => state.limparFavoritos);

  const { data: livros = [], isLoading, isError } = useLivros();

  if (isLoading) {
    return <Loading mensagem="Carregando seus favoritos..." />;
  }

  if (isError) {
    return <MensagemErro mensagem="Não foi possível carregar seus favoritos." />;
  }

  const livrosFavoritos = obterLivrosFavoritos(livros, favoritos);

  return (
    <>
      <main className="principal">
        <h2>Meus favoritos</h2>

        <p className="texto-suave">
          Você possui {livrosFavoritos.length} livro(s) favoritado(s).
        </p>

        <div className="acoes-pagina">
          <Link className="botao-secundario" to="/catalogo">
            Explorar catálogo
          </Link>

          {livrosFavoritos.length > 0 && (
            <button
              type="button"
              className="botao-perigo"
              onClick={limparFavoritos}
            >
              Limpar favoritos
            </button>
          )}
        </div>
      </main>

      <ListaLivros
        titulo="Livros favoritos"
        livros={livrosFavoritos}
        compacto
        mensagemVazia="Você ainda não adicionou livros aos favoritos."
      />
    </>
  );
}