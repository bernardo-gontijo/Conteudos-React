import {Livro} from '../types/livro'
interface LivroCArdProps{
    readonly livro: Livro;
    readonly compacto?: boolean;
}

export function LivroCard({livro, compacto = false}: LivroCArdProps){
    const descricao = obterDescricaoCard(livro, compacto);

    return(
        <article className="card">
            <img src={`/imagens/capas/${livro.id}.jpg`} alt={`Capa do livro ${livro.titulo}`}/>
            <h3>{livro.titulo}</h3>
            <p>{descricao}</p>        
        </article>
    );
}