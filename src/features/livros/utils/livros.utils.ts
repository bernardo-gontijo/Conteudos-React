export function normalizarTexto(texto: string): string{
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

}

export function filtrarlivrosPorTermo(
    livros: readonly Livro[],
    termo: string
): readonly Livro[] {
    const termoNormalizado = normalizarTexto(termo);

    if(termoNormalizado.length === 0){
        return livros;
    }

    return livros.filter((livro) => {
        const titulo = normalizarTexto(livro.titulo);
        const autor = normalizarTexto(livro.autor);
        return titulo.includes(termoNormalizado) || autor.includes(termoNormalizado)
    })
}