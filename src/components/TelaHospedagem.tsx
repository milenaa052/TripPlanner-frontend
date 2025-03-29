import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalHospedagem from "./ModalHospedagem";
import MapaLocal from "./MapaLocal";
import { useParams } from "react-router";
import axios from "axios";

interface Hospedagens {
    idHospedagem: number;
    localHospedagem: string;
    dataCheckin: string;
    dataCheckout: string;
    gastoTotal: number;
}

function TelaHospedagem() {
    const [modal, setModal] = useState(false);
    const [hospedagens, setHospedagens] = useState<Hospedagens[]>([]);
    const [idHospedagem, setIdHospedagem] = useState<Hospedagens | null>(null);

    const { id } = useParams();

    useEffect(() => {
        carregarHospedagens();
    }, []);

    const carregarHospedagens = () => {
        axios.get("http://localhost:3000/hospedagens")
            .then((response) => {
                setHospedagens(response.data)
            })
            .catch((error) => {
                console.error("Erro ao buscar hospedagens ", error)
            })
    };

    const formatarData = (data: string) => {
        const date = new Date(data);
        const dia = String(date.getUTCDate()).padStart(2, '0');
        const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
        const ano = date.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const deletarHospedagem = (idHospedagem: number) => {
        axios.delete(`http://localhost:3000/hospedagem/${idHospedagem}`)
        .then(() => {
            carregarHospedagens();
        })
        .catch((error) => {
            console.error("Erro ao excluir hospedagem ", error);
        })
    };

    const abrirModal = (hospedagem: Hospedagens) => {
        setIdHospedagem(hospedagem);
        setModal(true);
    }

    return (
        <div>
            { hospedagens.map((hospedagens) => (
                <div className="listagens" key={hospedagens.idHospedagem}>
                    <div className="textoInfo">
                        <h3>{ hospedagens.localHospedagem } </h3>
                        <p>Checkin: { formatarData(hospedagens.dataCheckin) }</p>
                        <p>Checkout: { formatarData(hospedagens.dataCheckout) }</p>
                        <p>Gasto Total: { hospedagens.gastoTotal.toFixed(2) }</p>
                    </div>

                    <div className="mapa">
                        <MapaLocal local={hospedagens.localHospedagem} />
                    </div>

                    <div className="icone">
                        <button onClick={() => abrirModal(hospedagens)}>
                            <FontAwesomeIcon icon={faChevronRight} className="icone"/>
                        </button>
                    </div>
                </div>
            ))}

            <div className="botao">
                <div className="adicionar">
                    <a href={`/cadastro-hospedagem/${id}`} className="link">
                        <FontAwesomeIcon icon={faPlus} className="icone"/>
                    </a>
                </div>
            </div>

            {modal && idHospedagem && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <ModalHospedagem
                            hospedagem={idHospedagem}
                            onDelete={deletarHospedagem}
                            onClose={() => setModal(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TelaHospedagem;