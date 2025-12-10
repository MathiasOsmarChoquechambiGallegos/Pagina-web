import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ isMenuOpen, toggleMenu }) {
  return (
    <>
      <aside className={isMenuOpen ? "active" : ""}>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
            <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
            <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      <div
        className={isMenuOpen ? "overlay active" : "overlay"}
        onClick={toggleMenu}
      ></div>
    </>
  );
}