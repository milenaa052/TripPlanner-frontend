import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function TelaHospedagem() {
    return (
        <div>
            <div className="listaHospedagens">
                <div className="textoInfo">
                    <h3>Hotel Quirinale</h3>
                    <p>Checkin: 01/03/2025</p>
                    <p>Checkout: 10/03/2025</p>
                </div>

                <div className="mapa">
                    mapa
                </div>

                <div className="icone">
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </div>
        </div>
    );
};

export default TelaHospedagem;