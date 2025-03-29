import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import InputLocal from "../components/InputLocal";

function CadastroTransporte() {
    const [tipoTransporte, setTipoTransporte] = useState("");
    const [origemTransporte, setOrigemTransporte] = useState("");
    const [destinoTransporte, setDestinoTransporte] = useState("");
    const [gastoTransporte, setGastoTransporte] = useState("");
    const [dataTransporte, setDataTransporte] = useState("");
    const [mensagem, setMensagem] = useState("");

    const { id } = useParams();

    const enviarForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/cadastro-transporte", {
                tipoTransporte,
                origemTransporte,
                destinoTransporte,
                gastoTransporte,
                dataTransporte,
                viagemId: Number(id)
            })

            setMensagem("Transporte cadastrado com sucesso!!");

            setTipoTransporte("");
            setOrigemTransporte("");
            setDestinoTransporte("");
            setGastoTransporte("");
            setDataTransporte("");

        } catch (error) {
            setMensagem("Erro ao cadastrar o transporte!");
            console.error(error);            
        }
    }

    return (
        <div className="card">
            <h1 className="titulo">Cadastrar Transporte</h1>

            <form className="form" onSubmit={enviarForm}>
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
                       value={dataTransporte} onChange={(e) => setDataTransporte(e.target.value)} />
                </div>

                <div className="submit">
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>

            { mensagem ? <p>{ mensagem }</p> : "" }
      </div>
    );
};

export default CadastroTransporte;