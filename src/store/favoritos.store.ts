interface FavoritosState{
    readonly favoritos: readonly string[];
    readonly alternatFavorito: (livroId: string) => void;
    readonly estaNosFavoritos: (livroId: string) => boolean;
    readonly limparFavoritos: () => void;
}

export const useFavoritosStore = create<FavoritosState>() => (
    persist((set, get) => ({
        favoritos: [],
        alternatFavorito: (livroId: string) => { },
        estaNosFavoritos: (livroId: string) => get().favoritos.includes(livroId),
        limparFavoritos: () => set({favoritos: []})
    }),{name: 'livraria-favoritos'})
);