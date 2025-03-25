import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalTransporte from "./ModalTransporte";
import { useParams } from "react-router";
import axios from "axios";
import MapaRotas from "./MapaRotas";
import RotasMapa from "./RotasMapa";

interface Transporte {
    idTransporte: number;
    tipoTransporte: string;
    origemTransporte: string;
    destinoTransporte: string;
    gastoTransporte: number;
    dataTransporte: string;
    viagemId: number;
}

function TelaTransporte() {
    const [modal, setModal] = useState(false);
    const [transporte, setTransporte] = useState<Transporte[]>([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:3000/transportes")
        .then((response) => {
            setTransporte(response.data)
        })
        .catch((error) => {
            console.error("Erro ao buscar transportes " + error)
        })
    })

    const formatarData = (data: string) => {
        const date = new Date(data);
        const dia = String(date.getUTCDate()).padStart(2, '0');
        const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
        const ano = date.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div>
            {transporte.length > 0 ? ( 
                transporte.map((transportes) => (
                    <div className="listagens">
                        <div className="textoInfo">
                            <h3>{ transportes.tipoTransporte }</h3>
                            <p>De: { transportes.origemTransporte }</p>
                            <p>Até: { transportes.destinoTransporte }</p>
                            <p>Gasto: { transportes.gastoTransporte.toFixed(2) }</p>
                            <p>Data: { formatarData(transportes.dataTransporte) }</p>
                        </div>
                        
                        <div className="mapa">
                            <MapaRotas origem={transportes.origemTransporte} destino={transportes.destinoTransporte} />
                        </div>

                        <div className="icone">
                            <button onClick={() => setModal(true)}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nenhum transporte cadastrado.</p>
            )}

            <RotasMapa />

            <div className="botao">
                <div className="adicionar">
                    <a href={`/cadastro-transporte/${id}`} className="link">
                        <FontAwesomeIcon icon={faPlus} className="icone"/>
                    </a>
                </div>
            </div>

            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <ModalTransporte />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TelaTransporte;