import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Login () {
    const [mensagem, setMensagem] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const { login } = useAuth();
    const navigate = useNavigate();

    const enviarLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                senha
            })

            const token = response.data.token
            login(token)
            navigate("/")

            setMensagem("Login realizado com sucesso!")

            setEmail("")
            setSenha("")
        } catch (error) {
            setMensagem("Email ou senha inválidos")
            console.error(error)
        }
    }

    return (
        <div className="card">
            <h1 className="titulo">Login</h1>

            <form className="form" onSubmit={enviarLogin}>
                <div className="campos">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" id="email" name="email" className="input" autoComplete="off"
                       value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Insira o seu email"/>
                </div>

                <div className="campos">
                    <label htmlFor="senha" className="label">Senha</label>
                    <input type="password" id="senha" name="senha" className="input" autoComplete="off"
                       value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Insira a sua senha"/>
                </div>

                <div className="submitAuth">
                    <p>Não tem conta? <a href="/cadastro-usuario" className="link">Faça cadastro</a></p>
                    <button type="submit" className="entrar">Entrar</button>
                </div>
            </form>

            { mensagem ? <p>{ mensagem }</p> : "" }
      </div>
    );
};

export default Login;