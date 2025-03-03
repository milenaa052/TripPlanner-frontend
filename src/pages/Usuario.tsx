import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";

function CadastroTransporte() {
    const [nomeUsuario, setNomeUsuario] = useState("Milena Santos de Oliveira");
    const [editando, setEditando] = useState(false);

    const handleEditar = () => {
        setEditando(true);
    };

    const handleSalvar = () => {
        setEditando(false);
    };

    return (
        <div className="usuario">
            <div className="infoUsuario">
            <h1 className="titulo">
                    {editando ? (
                        <input type="text" value={nomeUsuario}
                            onChange={(e) => setNomeUsuario(e.target.value)} className="input"/>
                    ) : (
                        <>Olá, {nomeUsuario}</>
                    )}

                    <FontAwesomeIcon 
                        icon={editando ? faCheck : faPenToSquare} 
                        className="icone" onClick={editando ? handleSalvar : handleEditar}/>
                </h1>
                <p className="email">milenasantosdeoliveira40@gmai.com</p>
            </div>

            <div className="cardUser">
                <form className="form">
                    <div className="campos">
                        <label htmlFor="cpf" className="label">CPF</label>
                        <input type="text" id="cpf" name="cpf" className="input" placeholder="Insira o seu CPF"/>
                    </div>

                    <div className="campos">
                        <label htmlFor="senhaAtual" className="label">Senha Atual</label>
                        <input type="password" id="senhaAtual" name="senhaAtual" className="input" placeholder="Insira a sua senha atual"/>
                    </div>

                    <div className="campos">
                        <label htmlFor="novaSenha" className="label">Nova Senha</label>
                        <input type="password" id="novaSenha" name="novaSenha" className="input" placeholder="Insira a sua nova senha"/>
                    </div>

                    <div className="campos">
                        <label htmlFor="confimaSenha" className="label">Confirme a sua senha</label>
                        <input type="password" id="confimaSenha" name="confimaSenha" className="input" placeholder="Confime a sua senha"/>
                    </div>

                    <div className="submit">
                        <button type="submit" className="salvar">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroTransporte;