import { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

interface NominatimResposta {
  display_name: string;
  lat: string;
  lon: string;
}

const RotasMapa: React.FC = () => {
  const [origem, setOrigem] = useState<string>("");
  const [destino, setDestino] = useState<string>("");
  const [rotas, setRotas] = useState<Array<{ origem: [number, number], destino: [number, number] }>>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [sugestoes, setSugestoes] = useState<{nome: string; lat: number; lon: number}[]>([]);
  const [erro, setErro] = useState<string>("");

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

  const buscarCoordenadas = async () => {
    if (!origem.trim() || !destino.trim()) {
      setErro("Por favor, preencha ambos os campos.");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const responseOrigem = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${origem}`
      );
      const dataOrigem: NominatimResposta[] = await responseOrigem.json();

      const responseDestino = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destino}`
      );
      const dataDestino: NominatimResposta[] = await responseDestino.json();

      if (dataOrigem.length > 0 && dataDestino.length > 0) {
        const latOrigem = parseFloat(dataOrigem[0].lat);
        const lonOrigem = parseFloat(dataOrigem[0].lon);
        const latDestino = parseFloat(dataDestino[0].lat);
        const lonDestino = parseFloat(dataDestino[0].lon);

        setRotas((prevRotas) => [
          ...prevRotas,
          { origem: [latOrigem, lonOrigem], destino: [latDestino, lonDestino] },
        ]);

      } else {
        setErro("Uma das cidades não foi encontrada!");
      }
    } catch (error) {
      console.log("Erro na busca:", error);
      setErro("Erro ao buscar as cidades.");
    } finally {
      setCarregando(false);
    }
  };

  const desenharRota = (map: Leaflet.Map, origem: [number, number], destino: [number, number]) => {
    map.eachLayer((layer) => {
      if (layer instanceof Leaflet.Routing.Control) {
        map.removeLayer(layer);
      }
    });

    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(origem[0], origem[1]),
        Leaflet.latLng(destino[0], destino[1]),
      ],
      routeWhileDragging: true,
      show: false,
    }).addTo(map);
  };

  const ChangeView = ({ origem, destino }: { origem: [number, number], destino: [number, number] }) => {
    const mapa = useMap();
    desenharRota(mapa, origem, destino);

    return null;
  };

  return (
    <div>
      <h1>Rota entre Cidades</h1>
      <div>
        <input
          type="text" value={origem}
          onChange={(e) => { 
            setOrigem(e.target.value); 
            buscarSugestoes(e.target.value);
          }}
          list="sugestoes-cidades" 
          placeholder="Cidade de origem"
        />

        <datalist id="sugestoes-cidades">
          {sugestoes.map((sugestao, index) => (
            <option key={index} value={sugestao.nome} />
          ))}
        </datalist>
      </div>

      <div>
        <input
          type="text" value={destino}
          onChange={(e) => {
            setDestino(e.target.value);
            buscarSugestoes(e.target.value);
          }}
          list="sugestoes-cidades"
          placeholder="Cidade de destino"
        />

        <datalist id="sugestoes-cidades">
          {sugestoes.map((sugestao, index) => (
            <option key={index} value={sugestao.nome} />
          ))}
        </datalist>
      </div>

      <div>
        <button onClick={buscarCoordenadas} disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar Rota"}
        </button>
      </div>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {rotas.map((rota, index) => (
        <MapContainer
          key={index} center={rota.origem} zoom={12}
          style={{ height: "500px", width: "100%", margin: "20px auto" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          <ChangeView origem={rota.origem} destino={rota.destino} />
        </MapContainer>
      ))}
    </div>
  );
};

export default RotasMapa;