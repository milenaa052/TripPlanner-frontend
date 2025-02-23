import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function TelaTransporte() {
    return (
        <div>
            <div className="listaTransporte">
                <div className="textoInfo">
                    <h3>Carro</h3>
                    <p>De: Hotel Quirinale</p>
                    <p>Até: Coliseu</p>
                    <p>Gasto: 20,00</p>
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