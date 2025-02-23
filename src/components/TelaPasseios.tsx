import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function TelaPasseios() {
    return (
        <div>
            <div className="agenda">
                <button className="dia">01/03</button>
                <button className="dia">02/03</button>
                <button className="dia">03/03</button>
                <button className="dia">04/03</button>
                <button className="dia">05/03</button>
                <button className="dia">06/03</button>
                <button className="dia">07/03</button>
                <button className="dia">08/03</button>
                <button className="dia">09/03</button>
                <button className="dia">10/03</button>
            </div>

            <div className="listaPasseios">
                <div className="textoInfo">
                    <h3>Coliseu</h3>
                    <p>08:00 - 10:00</p>
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

export default TelaPasseios;