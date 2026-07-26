import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";
import MascotasDetail from "./components/mascotas/MascotasDetail";
import Inicio from "./pages/Inicio";
import NuevaMascotaPage from "./pages/NuevaMascotaPage";

function App() {

  return (
    <>
      <Router>
        < nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">

              <span className="navbar-brand">
                  MascotasApp 🐶
              </span>

              <div className="navbar-nav flex-row">

                  <NavLink className="nav-link me-3" to="/">
                      Inicio
                  </NavLink>

                  <NavLink className="nav-link me-3" to="/mascotas">
                      Mascotas
                  </NavLink>

                  <NavLink className="nav-link" to="/mascotas/nueva">
                      Nueva mascota
                  </NavLink>

              </div>

          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/mascotas" element={<MascotasPage />} />
          <Route path="/mascotas/nueva" element={<NuevaMascotaPage />} />
          <Route path="/mascotas/:id" element={<MascotasDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
