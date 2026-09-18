import { useMemo, useState } from 'react';
import { CampoBusca } from '../../../components/CampoBusca';
import { useDebounce } from '../../../hooks/useDebounce';
import { Loading } from '../../../components/Loading';
import { MensagemErro } from '../../../components/MensagemErro';
import { ListaTreinos } from '../components/ListaTreinos';
import { Paginacao } from '../components/Paginacao';
import { useTreinos } from '../hooks/useTreinos';
import {
  filtrarPorNivel,
  filtrarTreinos,
  ordenarTreinos,
  type OrdenacaoTreinos,
} from '../treinos.utils';
import { GRUPOS_MUSCULARES, NIVEIS, ROTULO_GRUPO, ROTULO_NIVEL } from '../types';
import type { GrupoMuscular, Nivel } from '../types';

export function CatalogoPage() {
  const TREINOS_POR_PAGINA = 8;
  const { data: treinos, isLoading, isError, refetch } = useTreinos();
  const [termoBusca, setTermoBusca] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState<GrupoMuscular | 'todos'>('todos');
  const [nivelSelecionado, setNivelSelecionado] = useState<Nivel | 'todos'>('todos');
  const [ordenacao, setOrdenacao] = useState<OrdenacaoTreinos>('titulo');
  const [paginaAtual, setPaginaAtual] = useState(1);

  const termoDebounced = useDebounce(termoBusca, 300);

  // useMemo evita refazer o filtro em toda renderização — só recalcula
  // quando a lista de treinos ou algum dos critérios de fato muda.
  const treinosFiltradosEOrdenados = useMemo(() => {
    if (!treinos) return [];
    const filtradosPorBusca = filtrarTreinos(treinos, termoDebounced, grupoSelecionado);
    const filtradosPorNivel = filtrarPorNivel(filtradosPorBusca, nivelSelecionado);
    return ordenarTreinos(filtradosPorNivel, ordenacao);
  }, [treinos, termoDebounced, grupoSelecionado, nivelSelecionado, ordenacao]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(treinosFiltradosEOrdenados.length / TREINOS_POR_PAGINA)
  );

  const treinosDaPagina = useMemo(() => {
    const inicio = (paginaAtual - 1) * TREINOS_POR_PAGINA;
    return treinosFiltradosEOrdenados.slice(inicio, inicio + TREINOS_POR_PAGINA);
  }, [treinosFiltradosEOrdenados, paginaAtual]);

  function alterarTermoBusca(novoTermo: string) {
    setTermoBusca(novoTermo);
    setPaginaAtual(1);
    if (novoTermo.trim() === '') setOrdenacao('titulo');
  }

  return (
    <div className="pagina">
      <header className="pagina__cabecalho">
        <h1>Catálogo de treinos</h1>
        <p>Busque por título, grupo muscular ou nível de dificuldade.</p>
      </header>

      <div className="filtros">
        <CampoBusca valor={termoBusca} aoAlterar={alterarTermoBusca} />

        <select
          value={grupoSelecionado}
          onChange={(e) => {
            setGrupoSelecionado(e.target.value as GrupoMuscular | 'todos');
            setPaginaAtual(1);
          }}
          aria-label="Filtrar por grupo muscular"
        >
          <option value="todos">Todos os grupos</option>
          {GRUPOS_MUSCULARES.map((grupo) => (
            <option key={grupo} value={grupo}>
              {ROTULO_GRUPO[grupo]}
            </option>
          ))}
        </select>

        <select
          value={nivelSelecionado}
          onChange={(e) => {
            setNivelSelecionado(e.target.value as Nivel | 'todos');
            setPaginaAtual(1);
          }}
          aria-label="Filtrar por nível"
        >
          <option value="todos">Todos os níveis</option>
          {NIVEIS.map((nivel) => (
            <option key={nivel} value={nivel}>
              {ROTULO_NIVEL[nivel]}
            </option>
          ))}
        </select>

        <select
          value={ordenacao}
          onChange={(e) => {
            setOrdenacao(e.target.value as OrdenacaoTreinos);
            setPaginaAtual(1);
          }}
          aria-label="Ordenar treinos"
        >
          <option value="titulo">Título (A–Z)</option>
          <option value="duracao">Duração (menor primeiro)</option>
          <option value="nivel">Nível</option>
        </select>
      </div>

      {isLoading && <Loading rotulo="Carregando catálogo..." />}
      {isError && (
        <MensagemErro
          detalhe="Não foi possível carregar o catálogo de treinos."
          aoTentarNovamente={() => refetch()}
        />
      )}
      {treinos && (
        <>
          <p className="filtros__resultado" aria-live="polite">
            {treinosFiltradosEOrdenados.length}{' '}
            {treinosFiltradosEOrdenados.length === 1
              ? 'treino encontrado'
              : 'treinos encontrados'}
          </p>
          <ListaTreinos treinos={treinosDaPagina} />
          <Paginacao
            totalPaginas={totalPaginas}
            paginaAtual={paginaAtual}
            onMudarPagina={setPaginaAtual}
          />
        </>
      )}
    </div>
  );
}
