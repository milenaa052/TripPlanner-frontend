import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLocal from "../components/InputLocal";
import InputDestino from "../components/InputDestino";

function CadastroViagem() {
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);
    const [mensagem, setMensagem] = useState("");
    const [localOrigem, setLocalOrigem] = useState("");
    const [localDestino, setLocalDestino] = useState("");
    const [codigoPais, setCodigoPais] = useState("");

    const enviarForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!dataInicio || !dataFim) {
            setMensagem("Selecione uma data válida!");
            return;
        }

        const dataInicial = dataInicio.toISOString().split("T")[0];
        const dataFinal = dataFim.toISOString().split("T")[0];

        try {
            await axios.post("http://localhost:3000/cadastro-viagem", {
                localOrigem,
                localDestino,
                codigoPais,
                dataInicial,
                dataFinal
            })

            setMensagem("Cadastro realizado com sucesso.");

            setLocalOrigem("");
            setLocalDestino("");
            setCodigoPais("");
            setDataInicio(null);
            setDataFim(null);
        } catch (error) {
            setMensagem("Erro ao salvar dados");
            console.log(error)
        }
    }

    const manipularDatas = (range: [Date | null, Date | null]) => {
        const [startDate, endDate] = range;
        setDataInicio(startDate);
        setDataFim(endDate);
    };

    return (
        <div className="card">
            <h1 className="titulo">Criar Viagem</h1>

            <form className="form" onSubmit={enviarForm}>
                <div className="campos">
                    <label htmlFor="localOrigem" className="label">Local de Origem</label>
                    <InputLocal local={localOrigem} setLocal={setLocalOrigem} className="input" />
                </div>

                <div className="campos">
                    <label htmlFor="localDestino" className="label">Destino</label>
                    <InputDestino localDestino={localDestino} setLocalDestino={setLocalDestino} setCodigoPais={setCodigoPais} className="input" />
                </div>
                
                <div className="campos">
                    <label htmlFor="data" className="label">Data de início e fim da viagem</label>
                    <DatePicker selected={dataInicio} onChange={manipularDatas} id="data" name="data"
                        startDate={dataInicio} endDate={dataFim} selectsRange className="input" 
                        placeholderText="dd/mm/yyyy - dd/mm/yyyy" dateFormat="dd/MM/yyyy"/>
                </div>

                <div className="submit">
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>

            { mensagem && <p>{mensagem}</p> }
        </div>
    );
};

export default CadastroViagem;