import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../../components/Loading';
import { MensagemErro } from '../../../components/MensagemErro';
import { ListaTreinos } from '../components/ListaTreinos';
import { useTreinos } from '../hooks/useTreinos';
import { useFavoritosStore } from '../store/favoritos.store';
import { useRegistrosStore } from '../store/registros.store';

export function FavoritosPage() {
  const { data: treinos, isLoading, isError, refetch } = useTreinos();
  const favoritosIds = useFavoritosStore((estado) => estado.favoritosIds);
  const registros = useRegistrosStore((estado) => estado.registros);

  const totalRegistrosPorTreino = useMemo(() => {
    const totais = new Map<string, number>();
    for (const registro of registros) {
      totais.set(registro.treinoId, (totais.get(registro.treinoId) ?? 0) + 1);
    }
    return totais;
  }, [registros]);

  const treinosFavoritos = useMemo(() => {
    if (!treinos) return [];
    return treinos
      .filter((treino) => favoritosIds.includes(treino.id))
      .sort(
        (a, b) =>
          (totalRegistrosPorTreino.get(b.id) ?? 0) -
          (totalRegistrosPorTreino.get(a.id) ?? 0)
      );
  }, [treinos, favoritosIds, totalRegistrosPorTreino]);

  return (
    <div className="pagina">
      <header className="pagina__cabecalho">
        <h1>Meus favoritos</h1>
        <p>Treinos salvos para acesso rápido — persistem mesmo depois de recarregar a página.</p>
      </header>

      {isLoading && <Loading rotulo="Carregando favoritos..." />}
      {isError && (
        <MensagemErro
          detalhe="Não foi possível carregar seus treinos favoritos."
          aoTentarNovamente={() => refetch()}
        />
      )}
      {treinos && treinosFavoritos.length === 0 && (
        <p className="lista-treinos__vazio" role="status">
          Você ainda não favoritou nenhum treino.{' '}
          <Link to="/treinos">Explore o catálogo</Link> e clique na estrela de um treino para
          salvá-lo aqui.
        </p>
      )}
      {treinos && treinosFavoritos.length > 0 && (
        <>
          <section className="secao historico-favoritos" aria-labelledby="historico-favoritos">
            <h2 id="historico-favoritos" className="secao__titulo">
              Histórico dos favoritos
            </h2>
            <ol className="historico-favoritos__lista">
              {treinosFavoritos.map((treino) => {
                const total = totalRegistrosPorTreino.get(treino.id) ?? 0;
                return (
                  <li key={treino.id} className="historico-favoritos__item">
                    <span>{treino.titulo}</span>
                    <strong>
                      {total} {total === 1 ? 'vez' : 'vezes'}
                    </strong>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="secao" aria-labelledby="lista-favoritos">
            <h2 id="lista-favoritos" className="secao__titulo">
              Treinos favoritos
            </h2>
            <ListaTreinos treinos={treinosFavoritos} />
          </section>
        </>
      )}
    </div>
  );
}
