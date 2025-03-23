import axios from "axios";
import { useState } from "react";
import { useParams, useLocation } from "react-router";
import InputLocal from "../components/InputLocal";

function CadastroPasseio() {
    const [localPasseio, setLocalPasseio] = useState("");
    const [horaInicial, setHoraInicial] = useState("");
    const [horaFinal, setHoraFinal] = useState("");
    const [gastoPasseio, setGastoPasseio] = useState("");
    const [mensagem, setMensagem] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dataPasseio = queryParams.get("data");

    const { id } = useParams();

    const enviarForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/cadastro-passeio", {
                dataPasseio,
                localPasseio,
                horaInicial,
                horaFinal,
                gastoPasseio,
                viagemId: Number(id)
            })

            setMensagem("Passeio cadastrado com sucesso!");

            setLocalPasseio("");
            setHoraInicial("");
            setHoraFinal("");
            setGastoPasseio("");

        } catch (error) {
            setMensagem("Erro ao cadastrar passeio");
            console.error(error);
        }
    }

    return (
        <div className="card">
            <h1 className="titulo">Cadastrar Passeio</h1>

            <form className="form" onSubmit={enviarForm}>
                <div className="campos">
                    <label htmlFor="localPasseio" className="label">Local</label>
                    <InputLocal local={localPasseio} setLocal={setLocalPasseio} className="input" />
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
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>

            { mensagem && <p>{ mensagem }</p> }
      </div>
    );
};

export default CadastroPasseio;