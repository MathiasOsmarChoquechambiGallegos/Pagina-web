import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Login from "./login";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}
