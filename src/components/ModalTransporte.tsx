import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";

interface TransporteProps {
    idTransporte: number;
    tipoTransporte: string;
    origemTransporte: string;
    destinoTransporte: string;
    gastoTransporte: number;
    dataTransporte: string;
}

interface ModalTransporteProps {
    transporte: TransporteProps;
    onDelete: (idTransporte: number) => void;
    onClose: () => void;
}

function ModalTransporte({ transporte, onDelete, onClose }: ModalTransporteProps) {
    const [tipoTransporte, setTipoTransporte] = useState(transporte.tipoTransporte);
    const [origemTransporte, setOrigemTransporte] = useState(transporte.origemTransporte);
    const [destinoTransporte, setDestinoTransporte] = useState(transporte.destinoTransporte);
    const [gastoTransporte, setGastoTransporte] = useState(transporte.gastoTransporte.toString());
    const [dataTransporte, setDataTransporte] = useState(transporte.dataTransporte);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    return (
        <div className="card">
            <form className="form">
                <div className="campos">
                    <label htmlFor="tipoTransporte" className="label">Tipo de Transporte</label>
                    <select name="tipoTransporte" id="tipoTransporte" className="select"
                        value={tipoTransporte} onChange={(e) => setTipoTransporte(e.target.value)}>
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
                    <input type="text" id="localOrigem" name="localOrigem" className="input" 
                       value={origemTransporte} onChange={(e) => setOrigemTransporte(e.target.value)} placeholder="Insira o local de origem"/>
                </div>
                
                <div className="campos">
                    <label htmlFor="localDestino" className="label">Até:</label>
                    <input type="text" id="localDestino" name="localDestino" className="input" 
                       value={destinoTransporte} onChange={(e) => setDestinoTransporte(e.target.value)} placeholder="Insira o local de destino"/>
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto</label>
                    <input type="number" id="gasto" name="gasto" className="input" 
                       value={gastoTransporte} onChange={(e) => setGastoTransporte(e.target.value)} placeholder="Insira o gasto com o transporte"/>
                </div>

                <div className="campos">
                    <label htmlFor="data" className="label">Data</label>
                    <input type="date" id="data" name="data" className="input"
                       value={dataTransporte} onChange={(e) => setDataTransporte(e.target.value)} />
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
                        onDelete(transporte.idTransporte);
                        onClose();
                    }}
                />
            )}
      </div>
    );
};

export default ModalTransporte;