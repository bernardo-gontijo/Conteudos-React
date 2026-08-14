import type { Livro } from "../types/livro";

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
        return livros.filter((livro)=>
            normalizarTexto(livro.titulo).includes(termoNormalizado) ||
            normalizarTexto(livro.autor).includes(termoNormalizado ) ||
            normalizarTexto(livro.categoria).includes(termoNormalizado) ||
            normalizarTexto(livro.isbn).includes(termoNormalizado)
        );
    }

    return livros.filter((livro) => {
        const titulo = normalizarTexto(livro.titulo);
        const autor = normalizarTexto(livro.autor);
        return titulo.includes(termoNormalizado) || autor.includes(termoNormalizado)
    })
}

export function ordenarLivrosFavoritos(
    livros: readonly Livro[], idsFavoritos: readonly string[]
): readonly Livro[]{
    const favoritoSet = new Set(idsFavoritos);
    return livros.filter((livro) => favoritoSet.has(livro.id));
}

export function ordenarLivrosPorTitulo(
    livros: readonly Livro[]
): readonly Livro[] {
    return [...livros].sort((a, b) =>
    a.titulo.localeCompare(b.titulo, 'pt-BR')
);
}

