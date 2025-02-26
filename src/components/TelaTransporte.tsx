import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function TelaTransporte() {
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
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </div>
        </div>
    );
};

export default TelaTransporte;