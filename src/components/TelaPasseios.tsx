import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

function TelaPasseios() {
    const [diaSelecionado, setDiaSelecionado] = useState(Object);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const diasPorPagina = 5;
    
    const viagens = {
        id: 1,
        destino: "Itália",
        inicio: "2025-03-01",
        fim: "2025-03-10"
    };    
    
    const gerarDias = () => {
        const dias = [];
        const dataAtual = new Date(viagens.inicio);
        const dataFinal = new Date(viagens.fim);

        while (dataAtual <= dataFinal) {
            dias.push(new Date(dataAtual).toISOString().split("T")[0]); // Formato YYYY-MM-DD
            dataAtual.setDate(dataAtual.getDate() + 1);
        }

        return dias;
        
    };

    const diasViagem = gerarDias();

    const indexInicial = (paginaAtual - 1) * diasPorPagina;
    const indexFinal = indexInicial + diasPorPagina;
    const diasExibidos = diasViagem.slice(indexInicial, indexFinal);

    const proximaPagina = () => {
        if (indexFinal < diasViagem.length) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    return (
        <div>
            <div className="agenda">
                {diasExibidos.map((dia) => (
                    <button key={dia} className={`dia ${diaSelecionado === dia ? "ativo" : ""}`} 
                        onClick={() => setDiaSelecionado(dia)}>
                        {dia}
                    </button>
                ))}
            </div>

            <div className="paginacao">
                <button onClick={paginaAnterior} disabled={paginaAtual === 1} className="botao">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                <span>Página {paginaAtual}</span>

                <button onClick={proximaPagina} disabled={indexFinal >= diasViagem.length} className="botao">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>

            <div className="listagens">
                <div className="textoInfo">
                    <h3>Coliseu</h3>
                    <p>08:00 - 10:00</p>
                    <p>Gasto: 20,00</p>
                </div>

                <div className="mapa">
                    mapa
                </div>

                <div className="icone">
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </div>

            <div className="botao">
                <div className="adicionar">
                    <a href="/cadastro-passeio" className="link">
                        <FontAwesomeIcon icon={faPlus} className="icone"/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TelaPasseios;