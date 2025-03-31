import { useState } from "react";

interface NominatimResposta {
  display_name: string;
  countryCode: string;
}

interface InputDestinoProps {
  localDestino: string;
  setLocalDestino: (cidade: string) => void;
  setCodigoPais: (codigo: string) => void;
  className: string;
}

const InputDestino: React.FC<InputDestinoProps> = ({  localDestino, setLocalDestino, setCodigoPais, className }) => {
  const [sugestoes, setSugestoes] = useState<{ nome: string; codigoPais: string }[]>([]);

  const buscarSugestoes = async (input: string) => {
    if (input.length < 3) {
      setSugestoes([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(input)}&format=json`,
        {
          headers: {
            "User-Agent": "SeuApp/1.0 (milenasantosdeoliveira40@gmail.com)",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: NominatimResposta[] = await response.json();

      if (data.length > 0) {
        const opcoes = data.map((item) => ({
          nome: item.display_name,
          codigoPais: item.countryCode,
        }));

        setSugestoes(opcoes);
      } else {
        setSugestoes([]);
      }
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
      setSugestoes([]);
    }
  };

  const selecionarCidade = (cidadeNome: string) => {
    setLocalDestino(cidadeNome);

    const cidadeEncontrada = sugestoes.find((sugestao) => sugestao.nome === cidadeNome);

    if (cidadeEncontrada) {
      setCodigoPais(cidadeEncontrada.codigoPais);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={localDestino}
        onChange={(e) => {
          setLocalDestino(e.target.value);
          buscarSugestoes(e.target.value);
        }}
        onBlur={() => selecionarCidade(localDestino)}
        list="sugestoes-cidades"
        placeholder="Insira a cidade de destino"
        className={className}
      />
      
      <datalist id="sugestoes-cidades">
        {sugestoes.map((sugestao, index) => (
          <option key={index} value={sugestao.nome} />
        ))}
      </datalist>
    </div>
  );
};

export default InputDestino;