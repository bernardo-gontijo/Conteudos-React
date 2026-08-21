import type { CategoriaLivro, Livro } from "../types/livro";
import { ordenarLivrosPorTitulo } from "../utils/livros.utils";

const LIVROS_URL = '/api/todosOsLivros.json';

export async function buscarLivros(): Promise<readonly Livro[]> {
    const resposta = await fetch(LIVROS_URL);

    if(!resposta.ok){
        throw new Error('Não foi possível carregar o catalogo de livros');
    }

    const livros = (await resposta.json()) as Livro[];
    return ordenarLivrosPorTitulo(livros);
}

export async function buscarLivroPorSlug(
    slug: string
): Promise<Livro | undefined> {
    const livros = await buscarLivros();
    return livros.find((livro) => livro.slug === slug);
}

export async function buscarLivrosPorCategoria(
    categoria: CategoriaLivro
): Promise<readonly Livro[]> {
    const livros = await buscarLivros();
    return livros.filter((livro) => livro.categoria === categoria)
}