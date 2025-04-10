import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faCheck, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../contexts/AuthContext"
import { useUsuario } from "../contexts/UsuarioContext"

function Usuario() {
    const [editando, setEditando] = useState(false)
    const { logout } = useAuth()
    const { usuario, updateUsuario } = useUsuario()

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome)
            setEmail(usuario.email)
            setCpf(usuario.cpfUsuario || "")
        }
    }, [usuario])

    const editar = () => setEditando(true)

    const salvar = async () => {
        if (usuario) {
            try {
                await updateUsuario({
                    nome: nome,
                    email: email,
                    cpfUsuario: cpf
                })

                setEditando(false)

            } catch (error) {
                console.error("Erro ao atualizar usuário", error)
            }
        }
    }

    if (!usuario) {
        return <div>Carregando...</div>
    }

    return (
        <div className="usuario">
            <div className="infoUsuario">
                <h1 className="titulo">
                    {editando ? (
                        <input 
                            type="text" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} 
                            className="input"
                        />
                    ) : (
                        <>Olá, {usuario.nome}</>
                    )}
                    <FontAwesomeIcon 
                        icon={editando ? faCheck : faPenToSquare} 
                        className="icone" onClick={editando ? salvar : editar}
                    />
                </h1>
                <p className="email">{usuario.email}</p>
            </div>

            <div className="cardUser">
                <form className="form">
                    <div className="campos">
                        <label htmlFor="cpf" className="label">CPF</label>
                        <input 
                            type="text" 
                            id="cpf" 
                            name="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            className="input" 
                            placeholder="Insira o seu CPF"
                        />
                    </div>

                    <div className="campos">
                        <label htmlFor="senhaAtual" className="label">Senha Atual</label>
                        <input 
                            type="password" 
                            id="senhaAtual" 
                            name="senhaAtual" 
                            className="input" 
                            placeholder="Insira a sua senha atual"
                        />
                    </div>

                    <div className="campos">
                        <label htmlFor="novaSenha" className="label">Nova Senha</label>
                        <input 
                            type="password" 
                            id="novaSenha" 
                            name="novaSenha" 
                            className="input" 
                            placeholder="Insira a sua nova senha"
                        />
                    </div>

                    <div className="campos">
                        <label htmlFor="confimaSenha" className="label">Confirme a sua senha</label>
                        <input 
                            type="password" 
                            id="confimaSenha" 
                            name="confimaSenha" 
                            className="input" 
                            placeholder="Confime a sua senha"
                        />
                    </div>

                    <div className="submitAuth">
                        <button className="sair" type="button" onClick={logout}>
                            Logout <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </button>

                        {editando && (
                            <button type="button" className="salvar" onClick={salvar}>
                                Salvar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Usuario