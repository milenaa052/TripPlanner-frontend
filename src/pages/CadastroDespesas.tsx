function CadastroDespesas() {

    return (
        <div className="card">
            <h1 className="titulo">Cadastro de Despesas</h1>

            <form className="form">
                <div className="campos">
                    <label htmlFor="tipoDespesa" className="label">Tipo de Despesa</label>
                    <input type="text" id="tipoDespesa" name="tipoDespesa" className="input" placeholder="Insira a categoria da despesa. Ex: Alimentação"/>
                </div>
                
                <div className="campos">
                    <label htmlFor="gasto" className="label">Gasto</label>
                    <input type="number" id="gasto" name="gasto" className="input" placeholder="Insira o gasto do passeio"/>
                </div>

                <div className="campos">
                    <label htmlFor="data" className="label">Data</label>
                    <input type="date" id="data" name="data" className="input" placeholder="Insira a data da despesa"/>
                </div>

                <div className="submit">
                    <button type="submit" className="salvar">Salvar</button>
                </div>
            </form>
      </div>
    );
};

export default CadastroDespesas;