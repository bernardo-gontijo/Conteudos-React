import { Navigate, useParams } from 'react-router';

import { Loading } from '../../../components/Loading';
import { MensagemErro } from '../../../components/MensagemErro';
import { ListaLivros } from '../components/ListaLivros';
import { useLivrosPorCategoria } from '../hooks/useLivros';
import type { CategoriaLivro } from '../types/livro';

const categoriasValidas = new Set<CategoriaLivro>(['frontend', 'programacao', 'design']);

const nomesCategorias: Readonly<Record<CategoriaLivro, string>> = {
  frontend: 'Frontend',
  programacao: 'Programação',
  design: 'Design'
};

function normalizarCategoria(categoria: string | undefined): CategoriaLivro | undefined {
  if (!categoria) {
    return undefined;
  }

  if (categoriasValidas.has(categoria as CategoriaLivro)) {
    return categoria as CategoriaLivro;
  }

  return undefined;
}

export function CategoriaPage() {
  const { categoria: categoriaParam } = useParams<{ categoria: string }>();
  const categoria = normalizarCategoria(categoriaParam);

  const { data: livros = [], isLoading, isError } =
    useLivrosPorCategoria(categoria);

  if (!categoria) {
    return <Navigate to="/catalogo" replace />;
  }

  if (isLoading) {
    return <Loading mensagem={`Carregando livros de ${nomesCategorias[categoria]}...`} />;
  }

  if (isError) {
    return (
      <MensagemErro mensagem="Não foi possível carregar os livros dessa categoria." />
    );
  }

  return (
    <ListaLivros
      titulo={`Livros de ${nomesCategorias[categoria]}`}
      livros={livros}
      compacto
      mensagemVazia="Nenhum livro encontrado nesta categoria."
    />
  );
}