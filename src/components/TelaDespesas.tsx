import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function TelaDespesas() {
    return (
        <div>
            <h2>Total de Despesas: 80,00</h2>

            <div className="listaDespesas">
                <div className="textoInfo">
                    <h3>Alimentação</h3>
                    <p>50,00</p>
                    <p>01/03/2025</p>
                </div>

                <div className="mapa">
                    ícone
                </div>
            </div>

            <div className="listaDespesas">
                <div className="textoInfo">
                    <h3>Passeio Coliseu</h3>
                    <p>30,00</p>
                    <p>01/03/2025</p>
                </div>

                <div className="mapa">
                    ícone
                </div>

                <div className="icone">
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </div>
        </div>
    );
};

export default TelaDespesas;