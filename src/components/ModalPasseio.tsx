import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";

interface PasseioProps {
    idPasseio: number;
    dataPasseio: string;
    localPasseio: string;
    horaInicial: string;
    horaFinal: string;
    gastoPasseio: number;
}

interface ModalPasseioProps {
    passeio: PasseioProps;
    onDelete: (idPasseio: number) => void;
    onClose: () => void;
}

function ModalPasseio({ passeio, onDelete, onClose }: ModalPasseioProps) {
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [localPasseio, setLocalPasseio] = useState("");
    const [horaInicial, setHoraInicial] = useState("");
    const [horaFinal, setHoraFinal] = useState("");
    const [gastoPasseio, setGastoPasseio] = useState("");

    return (
        <div className="card">
            <form className="form">
                <div className="campos">
                    <label htmlFor="localPasseio" className="label">Local</label>
                    <input type="text" id="localPasseio" name="localPasseio" className="input" 
                       value={localPasseio} onChange={(e) => setLocalPasseio(e.target.value)} placeholder="Insira o local do passeio"/>
                </div>
                
                <div className="camposHora">
                    <div className="camp">
                        <label htmlFor="horaInicial" className="label">Horário Inicial</label>
                        <input type="time" id="horaInicial" name="horaInicial" className="input" 
                           value={horaInicial} onChange={(e) => setHoraInicial(e.target.value)} placeholder="Insira o horário de início"/>
                    </div>

                    <div className="camp">
                        <label htmlFor="horaFinal" className="label">Horário Final</label>
                        <input type="time" id="horaFinal" name="horaFinal" className="input" 
                           value={horaFinal} onChange={(e) => setHoraFinal(e.target.value)} placeholder="Insira o horário final"/>
                    </div>
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto</label>
                    <input type="number" id="gasto" name="gasto" className="input" 
                       value={gastoPasseio} onChange={(e) => setGastoPasseio(e.target.value)} placeholder="Insira o gasto do passeio"/>
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
                        onDelete(passeio.idPasseio);
                        onClose();
                    }}
                />
            )}
      </div>
    );
};

export default ModalPasseio;