# Conjunto de Projetos React

## TrilhaFit — mudanças implementadas

Esta seção documenta somente as alterações realizadas no projeto `trilhafit` durante os exercícios e desafios atuais.

### Catálogo de treinos

- Adicionada ordenação por título (A–Z), duração crescente e nível.
- Criadas funções puras para cada tipo de ordenação em `treinos.utils.ts`, sem alterar o array original.
- Criado o filtro puro `filtrarPorNivel`, com suporte aos níveis iniciante, intermediário e avançado.
- Busca, filtro por grupo, filtro por nível e ordenação passaram a ser aplicados em sequência com `useMemo`.
- A ordenação retorna ao padrão por título quando o termo de busca é limpo.
- Implementada paginação client-side com oito treinos por página.
- Criado o componente reutilizável `Paginacao`, com botões anterior, próxima e páginas numeradas.
- A página atual retorna para a primeira página quando a busca ou outro critério do catálogo muda.

### Busca com debounce

- O hook genérico `useDebounce<T>` foi consolidado em `src/hooks/useDebounce.ts`.
- A busca do catálogo utiliza o valor atrasado em 300 ms no processamento com `useMemo`.
- O hook usa `setTimeout` e cleanup com `clearTimeout`, reiniciando o intervalo após cada alteração.
- Foram adicionados testes com fake timers para atualização, atraso e cleanup.

### Cards e cronômetro

- Adicionado ao `TreinoCard` um badge de duração sobre a imagem da capa.
- O badge usa posicionamento absoluto e tokens da paleta de cores.
- A memoização com `React.memo` foi preservada, pois o badge utiliza somente dados do objeto `treino` já recebido pelo componente.
- Criados testes do cronômetro com fake timers para iniciar, pausar e zerar sem aguardar tempo real.

### Histórico dos favoritos

- A `FavoritosPage` passou a consumir simultaneamente os stores Zustand de favoritos e registros.
- Os registros concluídos são contabilizados por `treinoId`.
- Os favoritos são exibidos do mais treinado para o menos treinado.
- Treinos favoritos ainda não registrados aparecem corretamente com `0 vezes`.
- Foi criada uma seção de histórico separada da grade de cards favoritos.

### Registro de treino

- Após uma submissão válida, o registro é salvo e o usuário é direcionado ao Dashboard.
- Foram adicionados testes para mensagens de validação, chamada da função de salvamento e navegação após sucesso.

### Meta semanal

- Criado o `MetaSemanalContext`, com meta padrão de três treinos por semana.
- A configuração é editável pelo usuário e persistida no `localStorage`.
- O provider foi adicionado à árvore principal da aplicação.
- O Dashboard compara os registros da semana atual com a meta configurada.
- Quando a meta é alcançada, uma mensagem de parabéns é exibida.
- O cálculo foi extraído para a função pura `calcularProgressoMetaSemanal`, considerando a semana de segunda a domingo.
- Context foi escolhido por se tratar de uma configuração global pequena e pouco atualizada. Zustand continua responsável pelos estados com coleções, ações e múltiplos consumidores, como favoritos e registros.

### Testes adicionados

- `TreinoCard.test.tsx`: título, categoria, `aria-pressed` e callback de favorito.
- `FormularioRegistro.test.tsx`: validação, salvamento e navegação.
- `ErrorBoundary.test.tsx`: renderização do fallback após erro de um componente filho.
- `useDebounce.test.ts`: comportamento com fake timers e cleanup.
- `Cronometro.test.tsx`: contagem, pausa e zeragem com fake timers.
- `treinos.utils.test.ts`: filtro por nível, ordenações puras e progresso da meta semanal.

### Validação

- 8 arquivos de teste executados com sucesso.
- 30 testes aprovados.
- Build de produção concluído sem erros.
- Lint executado sem erros.
