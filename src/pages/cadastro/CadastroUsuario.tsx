import { useState } from "react";
import { useNavigate } from "react-router";

function CadastroUsuario () {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [mensagemFalha, setMensagemFalha] = useState("")
    const [mensagemSucesso, setMensagemSucesso] = useState("")
    const navigate = useNavigate()

    const cadastroUsuario = (e: React.FormEvent) => {
        e.preventDefault();

        if(!nome || !cpf) {
            setMensagemFalha("Nome ou CPF não preenchido")

            setTimeout(() => {
                setMensagemFalha("")
            }, 1500)

        } else {
            localStorage.setItem("nome", nome);
            localStorage.setItem("cpf", cpf);

            setMensagemSucesso("Redirecionando para a próxima tela...")

            setTimeout(() => {
                navigate("/cadastro-usuario-auth")
            }, 2000)
        }
    }

    return (
        <div className="card">
            <h1 className="titulo">Cadastro de Usuário</h1>

            <form className="form" onSubmit={cadastroUsuario}>
                <div className="campos">
                    <label htmlFor="nome" className="label">Nome Completo</label>
                    <input type="text" id="nome" name="nome" className="input" placeholder="Insira o seu nome completo"
                        value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="off"/>
                </div>
                
                <div className="campos">
                    <label htmlFor="cpf" className="label">CPF</label>
                    <input type="text" id="cpf" name="cpf" className="input" placeholder="Insira o seu cpf"
                        value={cpf} onChange={(e) => setCpf(e.target.value)} autoComplete="off"/>
                </div>

                <div className="submitAuth">
                    <p>Já tem cadastro? <a href="/login" className="link">Faça login</a></p>
                    <button type="submit" className="proximo">Próximo</button>
                </div>
            </form>

            { mensagemFalha ? <p className="mensagemFalha">{ mensagemFalha }</p> : "" }
            { mensagemSucesso ? <p className="mensagemSucesso">{ mensagemSucesso }</p> : "" }
      </div>
    );
};

export default CadastroUsuario;