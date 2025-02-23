import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CadastroHospedagem() {;
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);

    const manipularDatas = (range: [Date | null, Date | null]) => {
        const [startDate, endDate] = range;
        setDataInicio(startDate);
        setDataFim(endDate);
    };

    return (
        <div className="card">
            <h1 className="titulo">Cadastrar Hospedagem</h1>

            <form className="form">
                <div className="campos">
                    <label htmlFor="hotel" className="label">Hotel / Airnb</label>
                    <input type="text" id="hotel" name="hotel" className="input" placeholder="Insira o local da sua hospedagem"/>
                </div>
                
                <div className="campos">
                    <label htmlFor="data" className="label">Data de chekin e chekout</label>
                    <DatePicker selected={dataInicio} onChange={manipularDatas} id="data" name="data"
                        startDate={dataInicio} endDate={dataFim} selectsRange className="input" placeholderText="dd/mm/yyyy - dd/mm/yyyy"/>
                </div>

                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto Total</label>
                    <input type="number" id="gasto" name="gasto" className="input" placeholder="Insira o gasto total com hospedagem"/>
                </div>

                <div className="submit">
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>
      </div>
    );
};

export default CadastroHospedagem;