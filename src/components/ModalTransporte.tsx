import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";

function ModalTransporte() {;
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    return (
        <div className="card">
            <form className="form">
                <div className="campos">
                    <label htmlFor="tipoTransporte" className="label">Tipo de Transporte</label>
                    <select name="tipoTransporte" id="tipoTransporte" className="select">
                        <option value="">Selecione</option>
                        <option value="Aviao">Avião</option>
                        <option value="Barco">Barco</option>
                        <option value="Bicicleta">Bicicleta</option>
                        <option value="Caminhada">Caminhada</option>
                        <option value="Canoa">Canoa</option>
                        <option value="Carro">Carro</option>
                        <option value="Helicoptero">Helicóptero</option>
                        <option value="Metro">Metrô</option>
                        <option value="Moto">Moto</option>
                        <option value="Navio">Navio</option>
                        <option value="Onibus">Ônibus</option>
                        <option value="Submarino">Submarino</option>
                        <option value="Trem">Trem</option>
                    </select>
                </div>

                <div className="campos">
                    <label htmlFor="localOrigem" className="label">De:</label>
                    <input type="text" id="localOrigem" name="localOrigem" className="input" placeholder="Insira o local de origem"/>
                </div>
                
                <div className="campos">
                    <label htmlFor="localDestino" className="label">Até:</label>
                    <input type="text" id="localDestino" name="localDestino" className="input" placeholder="Insira o local de destino"/>
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto</label>
                    <input type="number" id="gasto" name="gasto" className="input" placeholder="Insira o gasto com o transporte"/>
                </div>

                <div className="campos">
                    <label htmlFor="data" className="label">Data</label>
                    <input type="date" id="data" name="data" className="input"/>
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

export default ModalTransporte;