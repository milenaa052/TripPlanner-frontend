import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import TelaHospedagem from "../components/telas/TelaHospedagem"
import TelaTransporte from "../components/telas/TelaTransporte"
import TelaPasseios from "../components/telas/TelaPasseios"
import TelaDespesas from "../components/telas/TelaDespesas"

interface Viagem {
  idViagem: number
  localOrigem: string
  localDestino: string
  codigoPais: string
  dataInicial: string
  dataFinal: string
  usuarioId: number
}

function TelasInfo() {
  const [viagem, setViagem] = useState<Viagem | null>(null)
  const [tela, setTela] = useState("Hospedagem")

  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3000/viagem/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    })
    .then((response) => {
      setViagem(response.data)
    })
    .catch((error) => {
      console.error("Erro ao buscar viagem", error)
    })
  }, [id])

  const formatarData = (data: string) => {
    const date = new Date(data)
    const dia = String(date.getUTCDate()).padStart(2, "0")
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0")
    const ano = date.getUTCFullYear()
    return `${dia}/${mes}/${ano}`
  }

  return (
    <div className="planoViagem">
      <h1 className="titulo">
        {viagem ? `${viagem.localDestino}, ${viagem.codigoPais.toUpperCase()}` : ""}
      </h1>

      <p>
        <FontAwesomeIcon icon={faCalendarDays} className="icone" />
        {viagem ? `${formatarData(viagem.dataInicial)} - ${formatarData(viagem.dataFinal)}` : ""}
      </p>

      <div className="telasInfo">
        <button 
          className={`opcao ${tela === "Hospedagem" ? "ativo" : ""}`} 
          onClick={() => setTela("Hospedagem")}
        >
          Hospedagem
        </button>

        <button 
          className={`opcao ${tela === "Transporte" ? "ativo" : ""}`} 
          onClick={() => setTela("Transporte")}
        >
          Transporte
        </button>

        <button 
          className={`opcao ${tela === "Passeios" ? "ativo" : ""}`} 
          onClick={() => setTela("Passeios")}
        >
          Passeios
        </button>

        <button 
          className={`opcao ${tela === "Despesas" ? "ativo" : ""}`} 
          onClick={() => setTela("Despesas")}
        >
          Despesas
        </button>
      </div>

      {tela === "Hospedagem" && <TelaHospedagem />}
      {tela === "Transporte" && <TelaTransporte />}
      {tela === "Passeios" && <TelaPasseios />}
      {tela === "Despesas" && <TelaDespesas />}
    </div>
  )
}

export default TelasInfo