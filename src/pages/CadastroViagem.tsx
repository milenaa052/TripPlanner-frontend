import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CadastroViagem() {;
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);
    const [mensagem, setMensagem] = useState("");
    const [localOrigem, setLocalOrigem] = useState("");
    const [localDestino, setLocalDestino] = useState("");
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");

    const enviarForm = async () => {
        try {
            await axios.post(`http:localhost:3000/cadastro-viagem`, {
                localOrigem,
                localDestino,
                dataInicial,
                dataFinal
            })

            setMensagem("Cadastro realizado com sucesso.");

            setLocalOrigem("");
            setLocalDestino("");
            setDataInicial("");
            setDataFinal("");
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

            <form className="form">
                <div className="campos">
                    <label htmlFor="localOrigem" className="label">Local de Origem</label>
                    <input type="text" id="localOrigem" name="localOrigem" className="input" 
                        value={localOrigem} onChange={(e) => setLocalDestino(e.target.value)} placeholder="Insira a cidade de origem"/>
                </div>

                <div className="campos">
                    <label htmlFor="localDestino" className="label">Destino</label>
                    <input type="text" id="localDestino" name="localDestino" className="input" 
                       value={localDestino} onChange={(e) => setLocalDestino(e.target.value)} placeholder="Insira a cidade de destino"/>
                </div>
                
                <div className="campos">
                    <label htmlFor="data" className="label">Data de início e fim da viagem</label>
                    <DatePicker selected={dataInicio} onChange={manipularDatas} id="data" name="data"
                        startDate={dataInicio} endDate={dataFim} selectsRange className="input" placeholderText="dd/mm/yyyy - dd/mm/yyyy"/>
                </div>

                <div className="submit">
                    <button type="submit" className="salvar" onSubmit={enviarForm}>Salvar</button>
                </div>
            </form>

            { mensagem && <p>{mensagem}</p> }
      </div>
    );
};

export default CadastroViagem;