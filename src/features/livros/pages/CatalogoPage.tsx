import { useMemo, useState } from 'react';

import { CampoBusca } from '../../../components/CampoBusca';
import { Loading } from '../../../components/Loading';
import { MensagemErro } from '../../../components/MensagemErro';
import { ListaLivros } from '../components/ListaLivros';
import { useLivros } from '../hooks/useLivros';
import { filtrarLivrosPorTermo } from '../utils/livros.utils';

export function CatalogoPage() {
  const [termoBusca, setTermoBusca] = useState('');

  const { data: livros = [], isLoading, isError } = useLivros();

  const livrosFiltrados = useMemo(() => {
    return filtrarLivrosPorTermo(livros, termoBusca);
  }, [livros, termoBusca]);

  if (isLoading) {
    return <Loading mensagem="Carregando catálogo completo..." />;
  }

  if (isError) {
    return (
      <MensagemErro mensagem="Não foi possível carregar o catálogo de livros." />
    );
  }

  return (
    <>
      <main className="principal">
        <h2>Catálogo completo</h2>

        <CampoBusca
          valor={termoBusca}
          rotulo="Buscar no catálogo"
          placeholder="Busque por título, autor, categoria ou ISBN"
          onChange={setTermoBusca}
        />

        <p className="resumo-busca">
          {livrosFiltrados.length} de {livros.length} livro(s) encontrado(s).
        </p>
      </main>

      <ListaLivros
        titulo="Resultado da busca"
        livros={livrosFiltrados}
        compacto
        mensagemVazia="Nenhum livro corresponde à busca realizada."
      />
    </>
  );
}