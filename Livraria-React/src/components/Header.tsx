import { NavLink } from 'react-router';
import { useFavoritosStore } from "../store/favoritos.store";

interface LinkNavegacao {
    readonly to: string;
    readonly label: string;
}

const links: readonly LinkNavegacao[] = [
    { to: '/', label: 'Home' },
    { to: '/categoria/frontend', label: 'Frontend'},
    { to: '/categoria/programacao', label: 'Programacao'},
    { to: '/categoria/design', label: 'Design'},
    { to: '/catalogo', label: 'Catalogo'},
    { to: '/favoritos', label: 'Favoritos'},
];

export function Header(){
    const totalFavoritos = useFavoritosStore((s) => s.favoritos.length);

    return (
        <header className='topo'>
            <NavLink to="/" className="logo">
                <span>Editora Callidus</span>
            </NavLink>
            <nav aria-label="Navegacao principal">
                <ul>
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({isActive }) => isActive ? 'ativo' : undefined}
                            >
                            {link.label}
                            {link.to == '/favoritos' && totalFavoritos > 0 && (
                                <span className="badge">{totalFavoritos}</span>
                            )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

