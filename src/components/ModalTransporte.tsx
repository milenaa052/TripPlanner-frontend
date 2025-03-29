import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";
import InputLocal from "./InputLocal";
import axios from "axios";
import { useParams } from "react-router";

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
    const [mensagem, setMensagem] = useState("");

    const { id } = useParams();

    const atualizarTransporte = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/transporte/${transporte.idTransporte}`, {
                tipoTransporte,
                origemTransporte,
                destinoTransporte,
                gastoTransporte,
                dataTransporte,
                viagemId: Number(id)
            })

            setMensagem("Transporte atualizado com sucesso!");
            onClose();

        } catch (error) {
            setMensagem("Erro ao atualizar o transporte");
            console.error(error);
        }
    }

    const formatarData = (data: string) => {
        return data.slice(0, 10);
    }

    return (
        <div className="card">
            <form className="form" onSubmit={atualizarTransporte}>
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
                    <InputLocal local={origemTransporte} setLocal={setOrigemTransporte} className="input" />
                </div>
                
                <div className="campos">
                    <label htmlFor="localDestino" className="label">Até:</label>
                    <InputLocal local={destinoTransporte} setLocal={setDestinoTransporte} className="input" />
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto</label>
                    <input type="number" id="gasto" name="gasto" className="input" 
                       value={gastoTransporte} onChange={(e) => setGastoTransporte(e.target.value)} placeholder="Insira o gasto com o transporte"/>
                </div>

                <div className="campos">
                    <label htmlFor="data" className="label">Data</label>
                    <input type="date" id="data" name="data" className="input"
                       value={formatarData(dataTransporte)} onChange={(e) => setDataTransporte(e.target.value)} />
                </div>

                <div className="submit">
                    <button type="button" className="excluir" onClick={() => setMostrarConfirmacao(true)}>
                        <FontAwesomeIcon icon={faTrashCan} className="icone"/>
                    </button>
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>

            { mensagem ? <p>{ mensagem }</p> : "" }

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