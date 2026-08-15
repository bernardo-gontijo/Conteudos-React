import { Link, useParams } from 'react-router';

import { Loading } from '../../../components/Loading';
import { MensagemErro } from '../../../components/MensagemErro';
import { useFavoritosStore } from '../../../store/favoritos.store';
import { useLivroPorSlug } from '../hooks/useLivros';

function formatarPreco(preco: string): string {
  const valor = Number(preco);

  if (Number.isNaN(valor)) {
    return `R$ ${preco}`;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

export function LivroDetalhePage() {
  const { slug } = useParams();

  const { data: livro, isLoading, isError } = useLivroPorSlug(slug);

  const alternarFavorito = useFavoritosStore((state) => state.alternarFavorito);
  const estaNosFavoritos = useFavoritosStore((state) => {
    if (!livro) {
      return false;
    }

    return state.estaNosFavoritos(livro.id);
  });

  if (isLoading) {
    return <Loading mensagem="Carregando detalhes do livro..." />;
  }

  if (isError) {
    return (
      <MensagemErro mensagem="Não foi possível carregar os detalhes do livro." />
    );
  }

  if (!livro) {
    return (
      <MensagemErro
        titulo="Livro não encontrado"
        mensagem="O livro solicitado não existe no catálogo."
      />
    );
  }

  const textoBotaoFavorito = estaNosFavoritos
    ? '★ Remover dos favoritos'
    : '☆ Favoritar livro';

  return (
    <main className="principal">
      <article className="pag-livro">
        <Link className="voltar" to="/catalogo">
          ← Voltar para o catálogo
        </Link>

        <div className="livro-detalhe">
          <img
            src={`/imagens/capas/${livro.id}.jpg`}
            alt={`Capa do livro ${livro.titulo}`}
          />

          <div className="livro-info">
            <p className="categoria">{livro.categoria}</p>
            <h2>{livro.titulo}</h2>
            <p className="autor">Autor: {livro.autor}</p>

            <ul className="metadados">
              <li>
                <strong>ISBN:</strong> {livro.isbn}
              </li>
              <li>
                <strong>Ano:</strong> {livro.ano}
              </li>
              <li>
                <strong>Páginas:</strong> {livro.paginas}
              </li>
              <li>
                <strong>Preço:</strong> {formatarPreco(livro.preco)}
              </li>
            </ul>

            <button
              type="button"
              className="botao-favorito botao-detalhe"
              onClick={() => alternarFavorito(livro.id)}
              aria-pressed={estaNosFavoritos}
            >
              {textoBotaoFavorito}
            </button>
          </div>
        </div>

        <section className="descricao-livro">
          <h3>Descrição do livro</h3>
          <p>{livro.descricao}</p>
        </section>
      </article>
    </main>
  );
}