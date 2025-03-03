function CadastroUsuarioAuth () {
    return (
        <div className="card">
            <h1 className="titulo">Cadastro de Usuário</h1>

            <form className="form">
                <div className="campos">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" id="email" name="email" className="input" placeholder="Insira um email válido"/>
                </div>

                <div className="campos">
                    <label htmlFor="senha" className="label">Senha</label>
                    <input type="password" id="senha" name="senha" className="input" placeholder="Insira a sua senha"/>
                </div>

                <div className="campos">
                    <label htmlFor="confirmaSenha" className="label">Confirme a sua senha</label>
                    <input type="password" id="confirmaSenha" name="confirmaSenha" className="input" placeholder="Confime a sua senha"/>
                </div>

                <div className="submitAuth">
                    <p>Já tem cadastro? <a href="/login" className="link">Faça login</a></p>
                    <div className="botoes">
                        <a href="/cadastro-usuario" className="voltar">Voltar</a>
                        <button type="submit" className="salvar">Salvar</button>
                    </div>
                </div>
            </form>
      </div>
    );
};

export default CadastroUsuarioAuth;