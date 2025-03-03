import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";

function TelaHospedagem() {
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
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </div>

            <div className="botao">
                <div className="adicionar">
                    <a href="/cadastro-hospedagem" className="link">
                        <FontAwesomeIcon icon={faPlus} className="icone"/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TelaHospedagem;