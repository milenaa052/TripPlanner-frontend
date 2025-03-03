import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

function TelaPasseios() {
    const [diaSelecionado, setDiaSelecionado] = useState(Object);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [diasPorPagina, setDiasPorPagina] = useState(8);
    
    const viagens = {
        id: 1,
        destino: "Itália",
        inicio: "2025-03-01",
        fim: "2025-03-15"
    };
    
    const ajustarDiasPorPagina = () => {
        const larguraTela = window.innerWidth;

        if (larguraTela < 350) {
            setDiasPorPagina(3);
        } else if (larguraTela < 500) {
            setDiasPorPagina(4);
        } else if (larguraTela < 768) {
            setDiasPorPagina(6);
        } else if (larguraTela < 1024) {
            setDiasPorPagina(7);
        } else {
            setDiasPorPagina(8);
        }
    };

    useEffect(() => {
        ajustarDiasPorPagina();
        window.addEventListener("resize", ajustarDiasPorPagina);

        return () => {
            window.removeEventListener("resize", ajustarDiasPorPagina);
        };
    }, []);
    
    const gerarDias = () => {
        const dias = [];

        const [anoInicio, mesInicio, diaInicio] = viagens.inicio.split("-").map(Number);
        const [anoFim, mesFim, diaFim] = viagens.fim.split("-").map(Number);

        const dataAtual = new Date(anoInicio, mesInicio - 1, diaInicio);
        const dataFinal = new Date(anoFim, mesFim - 1, diaFim);

        while (dataAtual <= dataFinal) {
            dias.push(dataAtual.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })); // Formato YYYY-MM-DD
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
                        { dia }
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