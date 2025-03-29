import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router";
import InputLocal from "../components/InputLocal";

function CadastroHospedagem() {;
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);
    const [mensagem, setMensagem] = useState("");
    const [localHospedagem, setLocalHospedagem] = useState("");
    const [gastoTotal, setGastoTotal] = useState("");

    const { id } = useParams();

    const enviarForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!dataInicio || !dataFim) {
            setMensagem("Selecione uma data válida!");
            return;
        }

        const dataCheckin = dataInicio.toISOString().split("T")[0];
        const dataCheckout = dataFim.toISOString().split("T")[0];

        try {
            await axios.post("http://localhost:3000/cadastro-hospedagem", {
                localHospedagem,
                dataCheckin,
                dataCheckout,
                gastoTotal,
                viagemId: Number(id)
            })
    
            setMensagem("Cadastro realizado com sucesso!");
    
            setLocalHospedagem("");
            setDataInicio(null);
            setDataFim(null);
            setGastoTotal("");
    
        } catch (error) {
            setMensagem("Erro ao realizar o cadastro de Hospedagem");
            console.error(error);
        }
    }

    const manipularDatas = (range: [Date | null, Date | null]) => {
        const [startDate, endDate] = range;
        setDataInicio(startDate);
        setDataFim(endDate);
    };

    return (
        <div className="card">
            <h1 className="titulo">Cadastrar Hospedagem</h1>

            <form className="form" onSubmit={enviarForm}>
                <div className="campos">
                    <label htmlFor="hotel" className="label">Hotel / Airnb</label>
                    <InputLocal local={localHospedagem} setLocal={setLocalHospedagem} className="input" />
                </div>
                
                <div className="campos">
                    <label htmlFor="data" className="label">Data de chekin e chekout</label>
                    <DatePicker selected={dataInicio} onChange={manipularDatas} id="data" name="data"
                        startDate={dataInicio} endDate={dataFim} selectsRange className="input" 
                        placeholderText="dd/mm/yyyy - dd/mm/yyyy" dateFormat="dd/MM/yyyy"/>
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto Total</label>
                    <input type="number" id="gasto" name="gasto" className="input" 
                        value={gastoTotal} onChange={(e) => setGastoTotal(e.target.value)} placeholder="Insira o gasto total com hospedagem"/>
                </div>

                <div className="submit">
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>

            { mensagem ? <p>{ mensagem }</p> : "" }
      </div>
    );
};

export default CadastroHospedagem;