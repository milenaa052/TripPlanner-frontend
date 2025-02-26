import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPlus } from "@fortawesome/free-solid-svg-icons";
import TelaHospedagem from "../components/TelaHospedagem";
import TelaTransporte from "../components/TelaTransporte";
import TelaPasseios from "../components/TelaPasseios";
import TelaDespesas from "../components/TelaDespesas";

function TelasInfo() {
    const [tela, setTela] = useState("Hospedagem");

    return (
        <div className="planoViagem">
            <h1 className="titulo">Roma, IT</h1>
            <p><FontAwesomeIcon icon={faCalendarDays} className="icone"/> 01/03/2025 - 10/03/2025</p>

            <div className="telasInfo">
                <button className={`opcao ${tela === "Hospedagem" ? "ativo" : ""}`} 
                    onClick={() => setTela("Hospedagem")}>
                        Hospedagem
                </button>

                <button className={`opcao ${tela === "Transporte" ? "ativo" : ""}`} 
                    onClick={() => setTela("Transporte")}>
                        Transporte
                </button>

                <button className={`opcao ${tela === "Passeios" ? "ativo" : ""}`} 
                    onClick={() => setTela("Passeios")}>
                        Passeios
                </button>

                <button className={`opcao ${tela === "Despesas" ? "ativo" : ""}`} 
                    onClick={() => setTela("Despesas")}>
                        Despesas
                </button>
            </div>

            {tela === "Hospedagem" && <TelaHospedagem />}
            {tela === "Transporte" && <TelaTransporte />}
            {tela === "Passeios" && <TelaPasseios />}
            {tela === "Despesas" && <TelaDespesas />}

            <div className="botao">
                <div className="adicionar">
                    <a href="/" className="link">
                        <FontAwesomeIcon icon={faPlus} className="icone"/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TelasInfo;