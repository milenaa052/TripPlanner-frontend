import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

interface NominatimResposta {
  display_name: string;
  lat: string;
  lon: string;
}

const marcadorIcone = new Leaflet.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const mapa = useMap();
  mapa.setView(center, zoom);
  return null;
};

const MapaComponente: React.FC = () => {
  const [cidade, setCidade] = useState<string>("");
  const [posicao, setPosicao] = useState<[number, number]>([0, 0]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [sugestoes, setSugestoes] = useState<{ nome: string; lat: number; lon: number }[]>([]);

  const buscarSugestoes = async (input: string) => {
    if (input.length < 3) {
      setSugestoes([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${input}`
      );
      
      const data: NominatimResposta[] = await response.json();

      if (data.length > 0) {
        const opcoes = data.map((item: NominatimResposta) => ({
          nome: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
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

  const buscarCidade = async (cidadeNome: string) => {
    if (!cidadeNome.trim()) {
      alert("Digite o nome de uma cidade!");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${cidadeNome}`
      );

      const data: NominatimResposta[] = await response.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosicao([lat, lon]);
      } else {
        alert("Cidade não encontrada!");
      }
    } catch (error) {
      console.log("Erro na busca:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      <h1>Buscador de Cidades</h1>
      <input
        type="text" value={cidade}
        onChange={(e) => {
          setCidade(e.target.value);
          buscarSugestoes(e.target.value);
        }}
        list="sugestoes-cidades"
        placeholder="Digite o nome da cidade..."
      />
      
      <datalist id="sugestoes-cidades">
        {sugestoes.map((sugestao, index) => (
          <option key={index} value={sugestao.nome} />
        ))}
      </datalist>

      <button onClick={() => buscarCidade(cidade)} disabled={carregando}>
        {carregando ? "Buscando..." : "Buscar"}
      </button>

      <MapContainer
        center={[0, 0]} zoom={2}
        style={{ height: "500px", width: "80%", margin: "20px auto" }}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors' 
        />

        {posicao[0] !== 0 && (
          <>
            <ChangeView center={posicao} zoom={12} />
            <Marker position={posicao} icon={marcadorIcone}>
              <Popup>{cidade}</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapaComponente;