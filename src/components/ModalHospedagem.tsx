import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";
import InputLocal from "./InputLocal";
import { useParams } from "react-router";
import axios from "axios";

interface HospedagemProps {
    idHospedagem: number;
    localHospedagem: string;
    dataCheckin: string;
    dataCheckout: string;
    gastoTotal: number;
}

interface ModalHospedagemProps {
    hospedagem: HospedagemProps;
    onDelete: (idHospedagem: number) => void;
    onClose: () => void;
}

function ModalHospedagem({ hospedagem, onDelete, onClose }: ModalHospedagemProps) {
    const [dataInicio, setDataInicio] = useState<Date | null>(new Date(hospedagem.dataCheckin));
    const [dataFim, setDataFim] = useState<Date | null>(new Date(hospedagem.dataCheckout));
    const [localHospedagem, setLocalHospedagem] = useState(hospedagem.localHospedagem);
    const [gastoTotal, setGastoTotal] = useState(hospedagem.gastoTotal.toString());
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const { id } = useParams();

    const manipularDatas = (range: [Date | null, Date | null]) => {
        const [startDate, endDate] = range;
        setDataInicio(startDate);
        setDataFim(endDate);
    };

    const atualizarHospedagem = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!dataInicio || !dataFim) {
            setMensagem("Selecione uma data válida!");
            return;
        }

        const dataCheckin = dataInicio.toISOString().split("T")[0];
        const dataCheckout = dataFim.toISOString().split("T")[0];

        try {
            await axios.put(`http://localhost:3000/hospedagem/${hospedagem.idHospedagem}`, {
                localHospedagem,
                dataCheckin,
                dataCheckout,
                gastoTotal: parseFloat(gastoTotal),
                viagemId: Number(id)
            })

            setMensagem("Hospedagem atualizada com sucesso!!");
            onClose();

        } catch (error) {
            setMensagem("Erro ao atualizar a hospedagem");
            console.error(error);
        }
    }

    return (
        <div className="card">
            <form className="form" onSubmit={atualizarHospedagem}>
                <div className="campos">
                    <label htmlFor="hotel" className="label">Hotel / Airnb</label>
                    <InputLocal local={localHospedagem} setLocal={setLocalHospedagem} className="input" />
                </div>
                
                <div className="campos">
                    <label htmlFor="data" className="label">Data de chekin e chekout</label>
                    <DatePicker selected={dataInicio} onChange={manipularDatas} id="data" name="data"
                        startDate={dataInicio} endDate={dataFim} selectsRange className="input" placeholderText="dd/mm/yyyy - dd/mm/yyyy"/>
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto Total</label>
                    <input type="number" id="gasto" name="gasto" className="input" 
                       value={gastoTotal} onChange={(e) => setGastoTotal(e.target.value)} placeholder="Insira o gasto total com hospedagem"/>
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
                        onDelete(hospedagem.idHospedagem);
                        onClose();
                    }}
                />
            )}
      </div>
    );
};

export default ModalHospedagem;