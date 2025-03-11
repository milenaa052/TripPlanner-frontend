import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";

function ModalPasseio() {;
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    return (
        <div className="card">
            <form className="form">
                <div className="campos">
                    <label htmlFor="localPasseio" className="label">Local</label>
                    <input type="text" id="localPasseio" name="localPasseio" className="input" placeholder="Insira o local do passeio"/>
                </div>
                
                <div className="camposHora">
                    <div className="camp">
                        <label htmlFor="horaInicial" className="label">Horário Inicial</label>
                        <input type="time" id="horaInicial" name="horaInicial" className="input" placeholder="Insira o horário de início"/>
                    </div>

                    <div className="camp">
                        <label htmlFor="horaFinal" className="label">Horário Final</label>
                        <input type="time" id="horaFinal" name="horaFinal" className="input" placeholder="Insira o horário final"/>
                    </div>
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto</label>
                    <input type="number" id="gasto" name="gasto" className="input" placeholder="Insira o gasto do passeio"/>
                </div>

                <div className="submit">
                    <button type="button" className="excluir" onClick={() => setMostrarConfirmacao(true)}>
                        <FontAwesomeIcon icon={faTrashCan} className="icone"/>
                    </button>
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>

            {mostrarConfirmacao && (
                <ConfirmaExclusao 
                    onClose={() => setMostrarConfirmacao(false)}
                    onConfirm={() => {
                        setMostrarConfirmacao(false);
                    }}
                />
            )}
      </div>
    );
};

export default ModalPasseio;