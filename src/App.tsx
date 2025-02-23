import Header from "./components/Header";
//import MapaCidades from "./components/MapaCidades";
//import RotasMapa from "./components/RotasMapa";
//import Home from "./components/Home";
//import TelasInfo from "./components/TelasInfo";
//import CadastroViagem from "./components/CadastroViagem";
//import CadastroHospedagem from "./components/CadastroHospedagem";
//import CadastroTransporte from "./components/CadastroTransporte";
//import CadastroPasseio from "./components/CadastroPasseio";
//import CadastroDespesas from "./components/CadastroDespesas";
//import CadastroUsuario from "./components/CadastroUsuario"
import CadastroUsuarioAuth from "./components/CadastroUsuarioAuth";
import "./App.css"

function App() {
  return (
    <div>
      <Header />
      <CadastroUsuarioAuth />
    </div>
  );
}

export default App;