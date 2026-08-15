import { Link } from 'react-router';

import { useFavoritosStore } from '../../../store/favoritos.store';
import type { Livro } from '../types/livro';

interface LivroCardProps {
  readonly livro: Livro;
  readonly compacto?: boolean;
}

function obterCaminhoCapa(livro: Livro): string {
  return `/imagens/capas/${livro.id}.jpg`;
}

function obterDescricaoCard(livro: Livro, compacto: boolean): string {
  if (!compacto) {
    return livro.descricao;
  }

  if (livro.descricao.length <= 130) {
    return livro.descricao;
  }

  return `${livro.descricao.slice(0, 130)}...`;
}

export function LivroCard({ livro, compacto = false }: LivroCardProps) {
  const alternarFavorito = useFavoritosStore((state) => state.alternarFavorito);
  const estaNosFavoritos = useFavoritosStore((state) =>
    state.estaNosFavoritos(livro.id)
  );

  const descricao = obterDescricaoCard(livro, compacto);
  const textoBotaoFavorito = estaNosFavoritos ? '★ Favorito' : '☆ Favoritar';
  const ariaLabelFavorito = estaNosFavoritos
    ? `Remover ${livro.titulo} dos favoritos`
    : `Adicionar ${livro.titulo} aos favoritos`;

  return (
    <article className="card">
      <div className="thumb">
        <img
          src={obterCaminhoCapa(livro)}
          alt={`Capa do livro ${livro.titulo}`}
          loading="lazy"
        />
      </div>

      <div className="detalhes">
        <header>
          <p className="categoria">{livro.categoria}</p>
          <h3>
            <Link to={`/livros/${livro.slug}`}>{livro.titulo}</Link>
          </h3>
        </header>

        <p>{descricao}</p>

        <div className="card-acoes">
          <Link className="link-leia-mais" to={`/livros/${livro.slug}`}>
            Leia mais
          </Link>

          <button
            type="button"
            className="botao-favorito"
            onClick={() => alternarFavorito(livro.id)}
            aria-pressed={estaNosFavoritos}
            aria-label={ariaLabelFavorito}
          >
            {textoBotaoFavorito}
          </button>
        </div>
      </div>
    </article>
  );
}