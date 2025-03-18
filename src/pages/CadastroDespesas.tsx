import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

function CadastroDespesas() {
    const [mensagem, setMensagem] = useState("");
    const [tipoDespesa, setTipoDespesa] = useState("");
    const [gasto, setGasto] = useState("");
    const [dataDespesa, setDataDespesa] = useState("");

    const { id } = useParams();

    const enviarForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/cadastro-despesa", {
                tipoDespesa,
                gasto,
                dataDespesa,
                viagemId: Number(id)
            })

            setMensagem("Cadastro efetuado com sucesso!");

            setTipoDespesa("");
            setGasto("");
            setDataDespesa("");

        } catch (error) {
            setMensagem("Erro ao cadastrar a despesa");
            console.error(error);
        }
    }
    return (
        <div className="card">
            <h1 className="titulo">Cadastro de Despesas</h1>

            <form className="form" onSubmit={enviarForm}>
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
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>

            { mensagem ? <p>{ mensagem }</p> : "" }
      </div>
    );
};

export default CadastroDespesas;