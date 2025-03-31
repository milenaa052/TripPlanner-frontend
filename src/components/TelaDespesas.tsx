import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalDespesa from "./ModalDespesa";
import { useParams } from "react-router";
import axios from "axios";

interface Despesa {
  idDespesa: number;
  tipoDespesa: string;
  gasto: number;
  dataDespesa: string;
}

function TelaDespesas() {
  const [modal, setModal] = useState(false);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [idDespesa, setIdDespesa] = useState<Despesa | null>(null);

  const { id } = useParams();

  useEffect(() => {
    carregarDespesas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carregarDespesas = () => {
    axios.get(`http://localhost:3000/despesas/?viagemId=${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
      setDespesas(response.data);
    })
    .catch((error) => {
      console.error("Erro ao buscar despesas:", error);
    });
  }

  const formatarData = (data: string) => {
    const date = new Date(data);
    const dia = String(date.getUTCDate()).padStart(2, "0");
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0");
    const ano = date.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const deletarDespesa = (idDespesa: number) => {
    axios.delete(`http://localhost:3000/despesa/${idDespesa}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    .then(() => {
      carregarDespesas();
    })
    .catch((error) => {
      console.error("Erro ao excluir despesa ", error);
    })
  };

  const abrirModal = (despesa: Despesa) => {
    setIdDespesa(despesa);
    setModal(true);
  };

  const totalDespesas = despesas.reduce((total, despesa) => total + despesa.gasto, 0);

  return (
    <div>
      <h2>Total de Despesas: { totalDespesas.toFixed(2) }</h2>

      {despesas.length > 0 ? (
        despesas.map((despesa) => (
          <div className="listagens" key={ despesa.idDespesa }>
            <div className="textoInfo">
              <h3>{despesa.tipoDespesa}</h3>
              <p>{despesa.gasto.toFixed(2)}</p>
              <p>{formatarData(despesa.dataDespesa)}</p>
            </div>

            <div className="icone">
              <button onClick={() => abrirModal(despesa)}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhuma despesa cadastrada!</p>
      )}

      <div className="botao">
        <div className="adicionar">
          <a href={`/cadastro-despesas/${id}`} className="link">
            <FontAwesomeIcon icon={faPlus} className="icone" />
          </a>
        </div>
      </div>

      {modal && idDespesa && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <ModalDespesa
              despesa={idDespesa}
              onDelete={deletarDespesa}
              onClose={() => setModal(false)}
              onUpdate={carregarDespesas}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TelaDespesas;