import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import ModalPasseio from "./ModalPasseio";
import axios from "axios";
import MapaLocal from "./MapaLocal";

interface Viagem {
    idViagem: number;
    localOrigem: string;
    localDestino: string;
    codigoPais: string;
    dataInicial: string;
    dataFinal: string;
}

interface Passeio {
    idPasseio: number;
    dataPasseio: string;
    localPasseio: string;
    horaInicial: string;
    horaFinal: string;
    gastoPasseio: number;
}

function TelaPasseios() {
    const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [diasPorPagina, setDiasPorPagina] = useState(8);
    const [modal, setModal] = useState(false);
    const [viagem, setViagem] = useState<Viagem | null>(null);
    const [passeio, setPasseio] = useState<Passeio[]>([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/viagem/${id}`)
        .then((response) => {
            setViagem(response.data)
        })
        .catch((error) => {
            console.error("Erro ao buscar a viagem " + error)
        })
    }, [id]);

    useEffect(() => {
        axios.get("http://localhost:3000/passeios")
        .then((response) => {
            setPasseio(response.data)
        })
        .catch((error) => {
            console.error("Erro ao buscar passeios " + error)
        })
    }, [])
    
    const ajustarDiasPorPagina = () => {
        const larguraTela = window.innerWidth;

        if (larguraTela < 390) {
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
        const dias: string[] = [];

        if (!viagem) {
            return dias;
        }

        const dataInicial = new Date(viagem.dataInicial);
        const dataFinal = new Date(viagem.dataFinal);
    
        const dataAtual = new Date(dataInicial);

        while (dataAtual <= dataFinal) {
            const dia = String(dataAtual.getUTCDate()).padStart(2, '0');
            const mes = String(dataAtual.getUTCMonth() + 1).padStart(2, '0');

            dias.push(`${dia}/${mes}`);
    
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

    const converterData = (dataSelecionada: string | null): string => {
        if (!dataSelecionada || !viagem) return "";
    
        const [dia, mes] = dataSelecionada.split("/").map(Number);
        const ano = new Date(viagem.dataInicial).getFullYear();
    
        return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")} 00:00:00`;
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

            { passeio.some((passeioData) => {
                const dataApi = new Date(passeioData.dataPasseio);
                const dia = String(dataApi.getUTCDate()).padStart(2, '0');
                const mes = String(dataApi.getUTCMonth() + 1).padStart(2, '0');
                const dataFormatada = `${dia}/${mes}`;
                return dataFormatada === diaSelecionado;
            }) ? (
                passeio.filter((passeioData) => {
                    const dataApi = new Date(passeioData.dataPasseio);
                    const dia = String(dataApi.getUTCDate()).padStart(2, '0');
                    const mes = String(dataApi.getUTCMonth() + 1).padStart(2, '0');
                    const dataFormatada = `${dia}/${mes}`;
            
                    return dataFormatada === diaSelecionado;
                })
                .map((passeios) => (
                    <div className="listagens">
                        <div className="textoInfo">
                            <h3>{ passeios.localPasseio }</h3>
                            <p>{ passeios.horaInicial } - { passeios.horaFinal }</p>
                            <p>Gasto: { passeios.gastoPasseio.toFixed(2) }</p>
                        </div>

                        <div className="mapa">
                            <MapaLocal local={passeios.localPasseio}/>
                        </div>

                        <div className="icone">
                            <button onClick={() => setModal(true)}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </button>
                        </div>
                    </div>
            ))) : (
                <p>Nenhum passeio cadastrado na data {diaSelecionado}</p>
            )}

            <div className="botao">
                <div className="adicionar">
                    <a href={`/cadastro-passeio/${id}?data=${converterData(diaSelecionado)}`} className="link">
                        <FontAwesomeIcon icon={faPlus} className="icone"/>
                    </a>
                </div>
            </div>

            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <ModalPasseio />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TelaPasseios;