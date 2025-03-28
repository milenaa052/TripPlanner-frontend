import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";

interface DespesaProps {
    idDespesa: number;
    tipoDespesa: string;
    gasto: number;
    dataDespesa: string;
}

interface ModalDespesaProps {
    despesa: DespesaProps;
    onDelete: (idDespesa: number) => void;
    onClose: () => void;
}

function ModalDespesa({ despesa, onDelete, onClose }: ModalDespesaProps) {;
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [tipoDespesa, setTipoDespesa] = useState(despesa.tipoDespesa);
    const [gasto, setGasto] = useState(despesa.gasto.toString());
    const [dataDespesa, setDataDespesa] = useState(despesa.dataDespesa);

    return (
        <div className="card">
            <form className="form">
                <div className="campos">
                    <label htmlFor="tipoDespesa" className="label">Tipo de Despesa</label>
                    <input type="text" id="tipoDespesa" name="tipoDespesa" className="input" 
                       value={tipoDespesa} onChange={(e) => setTipoDespesa(e.target.value)} placeholder="Insira a categoria da despesa. Ex: Alimentação"/>
                </div>
                
                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto</label>
                    <input type="number" id="gasto" name="gasto" className="input" 
                       value={gasto} onChange={(e) => setGasto(e.target.value)} placeholder="Insira o gasto do passeio"/>
                </div>

                <div className="campos">
                    <label htmlFor="data" className="label">Data</label>
                    <input type="date" id="data" name="data" className="input" 
                       value={dataDespesa} onChange={(e) => setDataDespesa(e.target.value)} placeholder="Insira a data da despesa"/>
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
                        onDelete(despesa.idDespesa);
                        onClose();
                    }}
                />
            )}
      </div>
    );
};

export default ModalDespesa;