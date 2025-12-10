import './Header.css';
import { Link } from "react-router-dom";

export function Header({ toggleMenu }) {
  return (
    <header className="header">
      {/* Botón hamburguesa */}
      <button className="menu-button" onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      
      {/* Logo Wild Roots */}
      <div className="logo">
        <div className="logo-text">
          <span>Wild</span>
          <span>Roots</span>
        </div>
      </div>
      
      {/* Login */}
      <div className="login-section">
        <div className="user-icon">👤</div>
        <Link to="/user/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </header>
  );
}
