import { useState } from "react";
import { useNavigate } from "react-router";

function CadastroUsuario () {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    const manipularEnvio = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if(!nome || !cpf) {
            console.log("não enviado.")
        } else {
            setNome("");
            setCpf("");
            navigate("/cadastro-auth");
        }
    }

    return (
        <div className="card">
            <h1 className="titulo">Cadastro de Usuário</h1>

            <form className="form" onSubmit={manipularEnvio}>
                <div className="campos">
                    <label htmlFor="nome" className="label">Nome Completo</label>
                    <input type="text" id="nome" name="nome" className="input" placeholder="Insira o seu nome completo"
                        value={nome} onChange={(e) => setNome(e.target.value)}/>
                </div>
                
                <div className="campos">
                    <label htmlFor="cpf" className="label">CPF</label>
                    <input type="text" id="cpf" name="cpf" className="input" placeholder="Insira o seu cpf"
                        value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                </div>

                <div className="submit">
                    <button type="submit" className="proximo">Próximo</button>
                </div>
            </form>
      </div>
    );
};

export default CadastroUsuario;