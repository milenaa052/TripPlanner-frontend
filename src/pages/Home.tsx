function Home() {
    return (
        <div className="home">
            <h1 className="titulo">Adicione o seu destino</h1>

            <div className="viagens">
                <div className="infoViagem">
                    <div className="adicionarViagem">
                        <p className="icone">+</p>
                    </div>
                    <p>Adicionar viagem</p>
                </div>

                <div className="infoViagem">
                    <div className="viagemCadastrada">
                        <p className="icone">+</p>
                    </div>
                    <p>Roma, IT</p>
                </div>
                
                <div className="infoViagem">
                    <div className="viagemCadastrada">
                        <p className="icone">+</p>
                    </div>
                    <p>Atenas, GR</p>
                </div>

                <div className="infoViagem">
                    <div className="viagemCadastrada">
                        <p className="icone">+</p>
                    </div>
                    <p>Cairo, EG</p>
                </div>
            </div>
        </div>
    );
};

export default Home;