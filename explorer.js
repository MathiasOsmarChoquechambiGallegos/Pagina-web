import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./explorer.css";

import arequipa from "./imagenes_f/arequipa.jpeg";
import islay from "./imagenes_f/islay.jpg";
import union from "./imagenes_f/la_union.jpeg";
import camana from "./imagenes_f/camana.jpg";
import cylloma from "./imagenes_f/caylloma.jpeg";
import caraveli from "./imagenes_f/caraveli.jpeg";
import castilla from "./imagenes_f/castilla.jpeg";

// --- Datos de ejemplo (asociados por ID de provincia) ---
const dataCiudades = {
  3: { nombre: "Islay", imagenHeader: islay },
  4: { nombre: "Camaná", imagenHeader: camana },
  7: { nombre: "Caravelí", imagenHeader: caraveli },
  5: { nombre: "Caylloma", imagenHeader: cylloma },
  6: { nombre: "Castilla", imagenHeader: castilla },
  8: { nombre: "La Unión", imagenHeader: union },
  1: { nombre: "Arequipa Ciudad", imagenHeader: arequipa },
};

export function Explorer({ setProvincia, setAtraccion }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleExploreClick = async (id) => {
    setLoading(true);

    try {
      // Guardar ID
      // Obtener provincia
      const provinciaRes = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/provincia/${id}`);

      const provinciaData = provinciaRes.data.provincia;
      if (!provinciaData) {
        return;
      }

      setProvincia(provinciaData);

      // Obtener atracción asociada
      const atraccionRes = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/oneByProvincia/${id}`);

      if (atraccionRes.data && atraccionRes.data.status === 1) {
        setAtraccion(atraccionRes.data.atraccion);
      } else {
        console.warn("⚠️ [6.1] No se encontró atracción en esa provincia.");
      }

      // Redirigir
      navigate("/atraccion/search");

    } catch (error) {
      alert("No se pudo cargar la provincia seleccionada.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="explore-section">
      <div className="container">
        <h2>¡Explora las provincias de Arequipa con nosotros!</h2>

        <div className="reel">
          {Object.entries(dataCiudades).map(([id, ciudad]) => (
            <div
              key={id}
              className="reel-item"
              onClick={() => handleExploreClick(id)}
              style={{
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              <img src={ciudad.imagenHeader} alt={ciudad.nombre} />
              <p>{ciudad.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
