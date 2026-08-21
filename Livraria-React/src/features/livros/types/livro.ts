export type CategoriaLivro = 'frontend' | 'programacao' | 'design';

export interface Livro{
    readonly id: string;
    readonly isbn: string;
    readonly titulo: string;
    readonly autor: string;
    readonly slug: string;
    readonly categoria: CategoriaLivro;
    readonly preco: string;
    readonly ano: string;
    readonly paginas: string;
    readonly descricao: string;
}