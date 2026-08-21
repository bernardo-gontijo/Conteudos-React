import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface FavoritosState{
    readonly favoritos: readonly string[];
    readonly alternarFavorito: (livroId: string) => void;
    readonly estaNosFavoritos: (livroId: string) => boolean;
    readonly limparFavoritos: () => void;
}

export const useFavoritosStore = create<FavoritosState>() => (
    persist((set, get) => ({
        favoritos: [],

        alternarFavorito: (livroId: string) => { 
            const atuais = get().favoritos;
            const jaFavoritado = atuais.includes(livroId);
            set({
                favoritos: jaFavoritado
                    ? atuais.filter((id) => id != livroId)
                    : [...atuais, livroId]
            });
        },

        estaNosFavoritos: (livroId: string) => get().favoritos.includes(livroId),
        limparFavoritos: () => set({favoritos: []})
    }),
    {name: 'livraria-favoritos'}
    )
);

const totalFavoritos = useFavoritosStore(
    (state) => state.favoritos.length
);
