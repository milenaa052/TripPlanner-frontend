function Login () {
    return (
        <div className="card">
            <h1 className="titulo">Login</h1>

            <form className="form">
                <div className="campos">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" id="email" name="email" className="input" placeholder="Insira o seu email"/>
                </div>

                <div className="campos">
                    <label htmlFor="senha" className="label">Senha</label>
                    <input type="password" id="senha" name="senha" className="input" placeholder="Insira a sua senha"/>
                </div>

                <div className="submitAuth">
                    <p>Não tem conta? <a href="/cadastro-usuario" className="link">Faça cadastro</a></p>
                    <button type="submit" className="entrar">Entrar</button>
                </div>
            </form>
      </div>
    );
};

export default Login;