import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalDespesa from "./ModalDespesa";
import { useParams } from "react-router";
import axios from "axios";

interface Despesa {
    idDespesa: number,
    tipoDespesa: string,
    gasto: number,
    dataDespesa: string,
}

function TelaDespesas() {
    const [modal, setModal] = useState(false);
    const [despesas, setDespesas] = useState<Despesa[]>([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:3000/despesas")
            .then((response) => {
                setDespesas(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar despesas:", error)
            })
    })

    const formatarData = (data: string) => { 
        const date = new Date(data);
        const dia = String(date.getUTCDate()).padStart(2, '0');
        const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
        const ano = date.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div>
            <h2>Total de Despesas: 0</h2>
            
            {despesas.map((despesa) => (
                <div className="listagens">
                        <div className="textoInfo">
                            <h3>{ despesa.tipoDespesa }</h3>
                            <p>{ despesa.gasto.toFixed(2)}</p>
                            <p>{ formatarData(despesa.dataDespesa) }</p>
                        </div>

                    <div className="icone">
                        <button onClick={() => setModal(true)}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </button>
                    </div>
                </div>
            ))}

            <div className="botao">
                <div className="adicionar">
                    <a href={`/cadastro-despesas/${id}`} className="link">
                        <FontAwesomeIcon icon={faPlus} className="icone"/>
                    </a>
                </div>
            </div>

            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <ModalDespesa />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TelaDespesas;