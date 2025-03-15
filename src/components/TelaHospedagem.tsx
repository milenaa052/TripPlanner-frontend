import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalHospedagem from "./ModalHospedagem";

function TelaHospedagem() {
    const [modal, setModal] = useState(false);

    return (
        <div>
            <div className="listagens">
                <div className="textoInfo">
                    <h3>Hotel Quirinale</h3>
                    <p>Checkin: 01/03/2025</p>
                    <p>Checkout: 10/03/2025</p>
                    <p>Gasto Total: 550,00</p>
                </div>

                <div className="mapa">
                    mapa
                </div>

                <div className="icone">
                    <button onClick={() => setModal(true)}>
                        <FontAwesomeIcon icon={faChevronRight} className="icone"/>
                    </button>
                </div>
            </div>

            <div className="botao">
                <div className="adicionar">
                    <a href="/cadastro-hospedagem" className="link">
                        <FontAwesomeIcon icon={faPlus} className="icone"/>
                    </a>
                </div>
            </div>

            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <ModalHospedagem />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TelaHospedagem;