import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "./components/Header";
import CadastroUsuario from "./pages/CadastroUsuario"
import CadastroUsuarioAuth from "./pages/CadastroUsuarioAuth";
import Login from "./pages/Login";
import Usuario from "./pages/Usuario";
import Home from "./pages/Home";
import CadastroViagem from "./pages/CadastroViagem";
import TelasInfo from "./pages/TelasInfo";
import CadastroHospedagem from "./pages/CadastroHospedagem";
import CadastroTransporte from "./pages/CadastroTransporte";
import CadastroPasseio from "./pages/CadastroPasseio";
import CadastroDespesas from "./pages/CadastroDespesas";
//import MapaCidades from "./components/MapaCidades";
//import RotasMapa from "./components/RotasMapa";
import "./App.css"

function App() {
  return (
    <div>
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path="/cadastro-usuario-auth" element={<CadastroUsuarioAuth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/cadastro-viagem" element={<CadastroViagem />} />
          <Route path="/info-viagem/:id" element={<TelasInfo />} />
          <Route path="/cadastro-hospedagem/:id" element={<CadastroHospedagem />} />
          <Route path="/cadastro-transporte" element={<CadastroTransporte />} />
          <Route path="/cadastro-passeio" element={<CadastroPasseio />} />
          <Route path="/cadastro-despesas/:id" element={<CadastroDespesas />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;