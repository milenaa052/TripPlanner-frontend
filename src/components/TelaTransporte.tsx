import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalTransporte from "./ModalTransporte";

function TelaTransporte() {
    const [modal, setModal] = useState(false);

    return (
        <div>
            <div className="listagens">
                <div className="textoInfo">
                    <h3>Carro</h3>
                    <p>De: Hotel Quirinale</p>
                    <p>Até: Coliseu</p>
                    <p>Gasto: 20,00</p>
                    <p>Data: 01/03/2025</p>
                </div>
                
                <div className="mapa">
                    mapa
                </div>

                <div className="icone">
                    <button onClick={() => setModal(true)}>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </button>
                </div>
            </div>

            <div className="botao">
                <div className="adicionar">
                    <a href="/cadastro-transporte" className="link">
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