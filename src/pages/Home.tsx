import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Home() {
    const [busca, setBusca] = useState("");

    const viagens = [
        "Roma, IT",
        "Rio de Janeiro, BR",
        "Cairo, EG",
        "Atenas, GR",
        "Teste 1",
        "Teste 2",
        "Teste 3"
    ]

    const viagensFiltradas = viagens.filter((cidade) => 
        cidade.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="home">
            <div className="fileira">
                <h1 className="titulo">Adicione o seu destino</h1>
                <input type="text" placeholder="Procure sua viagem" className="input" 
                    value={busca} onChange={(e) => setBusca(e.target.value)}/>
            </div>

            <div className="viagens">
                <div className="infoViagem">
                    <div className="adicionarViagem" style={{border: '5px solid #F58E27'}}>
                        <a href="/cadastro-viagem" className="icone">
                            <FontAwesomeIcon icon={faPlus}/>
                        </a>
                    </div>
                    <p>Adicionar viagem</p>
                </div>

                {viagensFiltradas.length > 0 ? (
                    viagensFiltradas.map((cidade) => (
                        <div className="infoViagem">
                            <div className="viagemCadastrada">
                                <p className="icone"></p>
                            </div>
                            <p>{ cidade }</p>
                        </div>
                    ))
                ) : (
                    <p>Não existe viagem cadastrada!</p>
                )}
            </div>
        </div>
    );
};

export default Home;