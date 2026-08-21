import { useQuery } from '@tanstack/react-query';
import { buscarLivroPorSlug, buscarLivros, buscarLivrosPorCategoria }
    from '../api/livros.service';
import type { CategoriaLivro } from '../types/livro';

export function useLivros() {
    return useQuery({
        queryKey: ['livros'],
        queryFn: buscarLivros
    });
}

export function useLivroPorSlug(slug: string | undefined) {
    return useQuery({
        queryKey: ['livros', 'slug', slug],
        queryFn: () => buscarLivroPorSlug(slug ?? ''),
        enabled: Boolean(slug)
    });;
}

export function useLivrosPorCategoria(categoria: CategoriaLivro | undefined) {
    return useQuery({
        queryKey: ['livros', 'categoria', categoria],
        queryFn: () => buscarLivrosPorCategoria(categoria as CategoriaLivro),
        enabled: Boolean(categoria)
    });
}