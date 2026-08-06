export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {index: true, Component: HomePage},
            {path: 'catalogo', Component: CatalogoPage},
            {path: 'categoria/:categoria', Component: CategoriaPage},
            {path: 'livro/:slug', Component: LivroDetalhePage},
            {path: '/favoritos', Component: FavoritosPage},
            {path: '*', COmponent: NotFoundPage}
        ]
    }
]);