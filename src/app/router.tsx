import { crateBrowserRouter } from 'react-router';
import { Layout } from '../components/Layout';
import { CatalogoPage }  from '../features/livros/pages/CatalogoPage';
import { CategoriaPage } from '../features/livros/pages/CategoriaPage';
import { FavoritosPage } from '../features/livros/pages/FavoritosPage';
import { LivroDetalhePage } from '../features/livros/pages/LivroDetalhePage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';

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