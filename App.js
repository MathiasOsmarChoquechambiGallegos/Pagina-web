import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import './App.css';
import CreateUser from './components/CreateUser';
import ListUsers from './components/ListUsers';
import Busqueda from './components/Busqueda';
import Provincia from './components/Provincia';
import Perfil from './components/Perfil';
import Login from './components/Login';
import RDFPage from './components/RDFPage';
import './components/Header.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const [atraccion, setAtraccion] = useState(null);
  const [provincia, setProvincia] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Determinar la ruta activa
  const path = location.pathname.startsWith("atraccion/search") ? "ciudad" : location.pathname.replace("/", "") || "home";

  const handleClear = () => {
    setAtraccion(null);
  };

  return (
    <>
      {/* --- HEADER --- */}
      <header className="header">
        {/* Botón hamburguesa */}
        <button className="menu-button" onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Logo Wild Roots */}
        <div className="logo">
          <Link to="/" >
          <div className="logo-text">
            <span>Wild</span>
            <span>Roots</span>
          </div>
          </Link>
        </div>

        {/* Login */}
        {user ? (
          <div className="login-section">
            <Link  className="nav-link login-button" to="user/perfil">{user.name}</Link>
          </div>
        ) : (
          <div className="login-section">
            <Link  to="user/login">
              <button className="login-button">Login</button>
            </Link>
          </div>
        )}
      </header>

      {/* --- SIDEBAR --- */}
      <aside className={isMenuOpen ? "active" : ""}>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMenu} >Inicio</Link></li>
            {!user && (
              <li>
                <Link to="user/login" onClick={toggleMenu}>Login</Link>
              </li>
            )}
            <li><Link to="user/perfil" onClick={toggleMenu}>Profile</Link></li>
            <li><Link to="atraccion/provincia" onClick={toggleMenu}>Explorar</Link></li>
            <li><Link to="rdf" onClick={toggleMenu}>Ver RDF</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      <div
        className={isMenuOpen ? "overlay active" : "overlay"}
        onClick={toggleMenu}
      ></div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className={`${isMenuOpen ? "menu-active" : ""} ${path}`}>
        <Routes>
          <Route index element={<ListUsers setAtraccion={setAtraccion} setProvincia={setProvincia} user={user} atraccion={atraccion}/>} />
          <Route path="user/create" element={<CreateUser />}/>
          <Route path="user/login" element={<Login setUser={setUser} />} />
          <Route path="atraccion/search" element={<Busqueda provincia={provincia} user={user} atraccion={atraccion} setAtraccion={setAtraccion} />} />
          <Route path="user/perfil" element={<Perfil user={user} setUser={setUser} setAtraccion={setAtraccion} setProvincia={setProvincia}/>}/>
          <Route path="atraccion/provincia" element={<Provincia provincia={provincia} atraccion={atraccion} setAtraccion={setAtraccion} setProvincia={setProvincia}  user={user} />}/>
          <Route path="rdf" element={<RDFPage user={user} />} />
           
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router basename="/wildroots">
      <AppContent />
    </Router>
  );
}
