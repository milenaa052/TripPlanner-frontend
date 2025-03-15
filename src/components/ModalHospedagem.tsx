import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";

function ModalHospedagem() {;
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    const manipularDatas = (range: [Date | null, Date | null]) => {
        const [startDate, endDate] = range;
        setDataInicio(startDate);
        setDataFim(endDate);
    };

    return (
        <div className="card">
            <form className="form">
                <div className="campos">
                    <label htmlFor="hotel" className="label">Hotel / Airnb</label>
                    <input type="text" id="hotel" name="hotel" className="input" placeholder="Insira o local da sua hospedagem"/>
                </div>
                
                <div className="campos">
                    <label htmlFor="data" className="label">Data de chekin e chekout</label>
                    <DatePicker selected={dataInicio} onChange={manipularDatas} id="data" name="data"
                        startDate={dataInicio} endDate={dataFim} selectsRange className="input" placeholderText="dd/mm/yyyy - dd/mm/yyyy"/>
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto Total</label>
                    <input type="number" id="gasto" name="gasto" className="input" placeholder="Insira o gasto total com hospedagem"/>
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

export default ModalHospedagem;