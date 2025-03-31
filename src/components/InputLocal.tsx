import { useState } from "react";

interface NominatimResposta {
  display_name: string;
}

interface InputLocalProps {
  local: string;
  setLocal: (cidade: string) => void;
  className: string;
}

const InputLocal: React.FC<InputLocalProps> = ({ local, setLocal, className }) => {
  const [sugestoes, setSugestoes] = useState<{ nome: string }[]>([]);

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

  return (
    <div>
      <input
        type="text"
        value={local}
        onChange={(e) => {
          setLocal(e.target.value);
          buscarSugestoes(e.target.value);
        }}
        list="sugestoes-cidades"
        placeholder="Insira o local"
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

export default InputLocal;