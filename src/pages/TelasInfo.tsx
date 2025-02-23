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
            <p><FontAwesomeIcon icon={faCalendarDays} /> 01/03/2025 - 10/03/2025</p>

            <div className="telasInfo">
                <button className="opcao" type="submit" onClick={() => setTela("Hospedagem")}>Hospedagem</button>
                <button className="opcao" type="submit" onClick={() => setTela("Transporte")}>Transporte</button>
                <button className="opcao" type="submit" onClick={() => setTela("Passeios")}>Passeios</button>
                <button className="opcao" type="submit" onClick={() => setTela("Despesas")}>Despesas</button>
            </div>

            {tela === "Hospedagem" && <TelaHospedagem />}
            {tela === "Transporte" && <TelaTransporte />}
            {tela === "Passeios" && <TelaPasseios />}
            {tela === "Despesas" && <TelaDespesas />}

            <div className="submit">
                <a href="" className="adicionar">
                    <FontAwesomeIcon icon={faPlus}/>
                </a>
            </div>
        </div>
    );
};

export default TelasInfo;