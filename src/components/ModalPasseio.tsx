import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmaExclusao from "./ConfirmaExclusao";
import InputLocal from "./InputLocal";
import axios from "axios";
import { useParams, useLocation } from "react-router";

interface PasseioProps {
    idPasseio: number;
    dataPasseio: string;
    localPasseio: string;
    horaInicial: string;
    horaFinal: string;
    gastoPasseio: number;
}

interface ModalPasseioProps {
    passeio: PasseioProps;
    onDelete: (idPasseio: number) => void;
    onClose: () => void;
}

function ModalPasseio({ passeio, onDelete, onClose }: ModalPasseioProps) {
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [localPasseio, setLocalPasseio] = useState(passeio.localPasseio);
    const [horaInicial, setHoraInicial] = useState(passeio.horaInicial);
    const [horaFinal, setHoraFinal] = useState(passeio.horaFinal);
    const [gastoPasseio, setGastoPasseio] = useState(passeio.gastoPasseio.toString());
    const [mensagem, setMensagem] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [dataPasseio, setDataPasseio] = useState(queryParams.get("data") || passeio.dataPasseio);

    const { id } = useParams();

    const formatarHora = (hora: string) => {
        return `${hora}:00`;
    };

    const atualizarPasseio = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/passeio/${passeio.idPasseio}`, {
                dataPasseio,
                localPasseio,
                horaInicial: formatarHora(horaInicial),
                horaFinal: formatarHora(horaFinal),
                gastoPasseio,
                viagemId: Number(id)
            })

            setMensagem("Passeio atualizado com sucesso!");
            onClose();
            setDataPasseio("");

        } catch (error) {
            setMensagem("Erro ao atualizar o passeio.");
            console.error(error);
        }
    }

    return (
        <div className="card">
            <form className="form" onSubmit={atualizarPasseio}>
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
                        onDelete(passeio.idPasseio);
                        onClose();
                    }}
                />
            )}
      </div>
    );
};

export default ModalPasseio;