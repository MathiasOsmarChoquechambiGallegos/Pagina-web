import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReelAtracciones from "./ReelAtracciones";
import ReseñasSection from "./ReseñasSection";
import "./ciudad.css";

import islay from './imagenes_f/islay.jpg';
import union from './imagenes_f/la_union.jpeg';
import camana from './imagenes_f/camana.jpg';
import cylloma from './imagenes_f/caylloma.jpeg';
import arequipa from './imagenes_f/arequipa.jpeg';
import caraveli from './imagenes_f/caraveli.jpeg';
import castilla from './imagenes_f/castilla.jpeg';

// --- Datos de ejemplo (asociados por ID de provincia) ---
const dataCiudades = {
  3: {
    nombre: "Islay",
    subtitulo: "Donde el mar se une con la historia...",
    imagenHeader: islay,
    descripcion:
      "Aparte de ser uno de los puertos más importantes en Arequipa, Islay ofrece una historia fascinante y paisajes que combinan mar, historia y cultura.",
  },
  4: {
    nombre: "Camaná",
    subtitulo: "Sol, playa y tradición costera.",
    imagenHeader: camana,
    descripcion:
      "Camaná es famosa por sus playas, su gastronomía marina y el ambiente tranquilo del sur peruano.",
  },
  7: {
    nombre: "Caravelí",
    subtitulo: "Entre valles, pisco y tradición.",
    imagenHeader: caraveli,
    descripcion:
      "Caravelí destaca por su producción de vino y pisco, además de sus paisajes de valle y desierto.",
  },
  5: {
    nombre: "Caylloma",
    subtitulo: "Naturaleza y cultura viva.",
    imagenHeader: cylloma,
    descripcion:
      "Hogar del famoso Valle del Colca, un lugar donde se puede ver el vuelo del cóndor y disfrutar de aguas termales.",
  },
  6: {
    nombre: "Castilla",
    subtitulo: "Tierra de montañas y tradiciones.",
    imagenHeader: castilla,
    descripcion:
      "Castilla ofrece un entorno natural impresionante, con pueblos tradicionales y valles escondidos.",
  },
  8: {
    nombre: "La Unión",
    subtitulo: "Aventura en los Andes arequipeños.",
    imagenHeader: union,
    descripcion:
      "La Unión combina naturaleza y arqueología, destacando por el Cañón de Cotahuasi, uno de los más profundos del mundo.",
  },
  1: {
    nombre: "Arequipa Ciudad",
    subtitulo: "La Ciudad Blanca del Perú.",
    imagenHeader: arequipa,
    descripcion:
      "Famosa por su arquitectura colonial de sillar, su gastronomía y el imponente volcán Misti.",
  },
};


export default function Busqueda({ provincia, user, atraccion, setAtraccion }) {
    const StarRating = ({ value }) => {
    // Calcula porcentaje (5 estrellas = 100%)
    const percentage = Math.min(Math.max(value / 5 * 100, 0), 100);

    return (
        <div className="stars" style={{ "--fill": `${percentage}%` }}>
        ★★★★★
        </div>
    );
    };

    const ciudad = dataCiudades[provincia.id];
    const [inputs, setInputs] = useState({ atraccion_nombre: "" });
    const [visited, setVisited] = useState(false);
    const location = useLocation();
    const [sugerencias, setSugerencias] = useState([]);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

    // ✅ Detect if we came here with a recommendation (e.g., /atraccion/search?nombre=Misti)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nombre = params.get("nombre");
        if (nombre) {
            // If redirected with a name, load it automatically
            axios.post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/busqueda", {
                atraccion_nombre: nombre
            })
            .then((response) => {
                if (response.data.status === 1) {
                    setAtraccion(response.data.atraccion);
                    setInputs({ atraccion_nombre: nombre });
                } else {
                    alert("No tenemos información para esa recomendación.");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error al buscar la recomendación.");
            });
        }
    }, [location.search, setAtraccion]);
    

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));

        // 🔍 Si hay más de 2 letras, busca sugerencias
        if (value.length >= 2) {
            try {
                const res = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/search/${value}`);
                if (res.data.status === 1) {
                    setSugerencias(res.data.atracciones);
                    setMostrarSugerencias(true);
                } else {
                    setSugerencias([]);
                    setMostrarSugerencias(false);
                }
            } catch (err) {
                console.error("Error buscando sugerencias:", err);
                setSugerencias([]);
            }
        } else {
            setSugerencias([]);
            setMostrarSugerencias(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/busqueda", inputs)
            .then((response) => {
                if (response.data.status === 1) {
                    setAtraccion(response.data.atraccion);
                } else {
                    alert("We don’t have that location");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Something went wrong.");
            });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (user && atraccion && atraccion.atraccion_id) {
            axios
                .get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/visitado/${user.id}/${atraccion.atraccion_id}`)
                .then(res => setVisited(res.data.visited))
                .catch(err => console.error("Error verificando visitado:", err));
        }
    }, [user, atraccion?.atraccion_id]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!ciudad) {
        return <h2 className="no-encontrado">Provincia no encontrada</h2>;
    }

    const handleVisitado = () => {
        if (!user || !atraccion) return;

        if (visited) {
            // ❌ Si ya estaba marcado, lo quitamos
            axios
                .delete(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/visitado/${user.id}/${atraccion.atraccion_id}`)
                .then((res) => {
                    if (res.data.status === 1) {
                        setVisited(false);
                    } else {
                        alert(res.data.message || "No se pudo desmarcar");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert("Error al quitar visitado");
                });
        } else {
            // ✅ Si no estaba marcado, lo agregamos
            axios
                .post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/visitado", {
                    user_id: user.id,
                    atraccion_id: atraccion.atraccion_id,
                })
                .then((res) => {
                    if (res.data.status === 1) {
                        setVisited(true);
                    } else {
                        alert(res.data.message || "No se pudo marcar como visitado");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert("Error en la conexión con el servidor");
                });
        }
    };


    return (
        <div className="ciudad-container">
            {/* --- HEADER --- */}
            <section
                className="ciudad-hero"
                style={{ backgroundImage: `url(${ciudad.imagenHeader})` }}
            >
                <div className="ciudad-overlay">
                <h1>{ciudad.nombre}</h1>
                <p>{ciudad.subtitulo}</p>
                </div>

            </section >
            {/* --- ATRACCIONES --- */}
            <section className="ciudad-atracciones">
                {atraccion && (
                    <div style={{ marginTop: "40px" }}>
                        <br></br>
                        <ReelAtracciones
                            provinciaId={provincia.id}
                            onSelectAtraccion={(atr) => setAtraccion(atr)}
                        />
                    </div>
                )}
            </section>
                
            
            {mostrarSugerencias && sugerencias.length > 0 && (
                <ul className="sugerencias-lista">
                    {sugerencias.map((a) => (
                        <li
                            key={a.atraccion_id}
                            onClick={() => {
                                setInputs({ atraccion_nombre: a.atraccion_nombre });
                                setMostrarSugerencias(false);
                            }}
                        >
                            {a.atraccion_nombre}
                        </li>
                    ))}
                </ul>
            )}


            {/* Show attraction info if found */}
            {atraccion && (
            <section className="resultado-container">
                <div className="resultado-card">
                <div className="resultado-imagen">
                    <img
                    src={atraccion.image_url}
                    alt={atraccion.atraccion_nombre}
                    />
                </div>

                <div className="resultado-info">
                    <h2>{atraccion.atraccion_nombre}</h2>
                    <p className="descripcion">{atraccion.descripcion}</p>

                    <div className="resultado-rating">
                    <div className="rating-item">
                        <span>Comida:</span>
                        <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span
                            key={i}
                            className={i < atraccion.comida ? "star filled" : "star"}
                            >
                            ★
                            </span>
                        ))}
                        </div>
                    </div>

                    <div className="rating-item">
                        <span>Transporte:</span>
                        <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span
                            key={i}
                            className={i < atraccion.transporte ? "star filled" : "star"}
                            >
                            ★
                            </span>
                        ))}
                        </div>
                    </div>

                    <div className="rating-item">
                        <span>General:</span>
                        <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span
                            key={i}
                            className={i < atraccion.atraccion ? "star filled" : "star"}
                            >
                            ★
                            </span>
                        ))}
                        </div>
                    </div>
                    </div>
                    {user && atraccion && (
                    <div className="visitado-container">
                    <button
                    onClick={handleVisitado}
                    className={`visitado-btn ${visited ? "visited" : ""}`}
                    title={visited ? "Ya visitado" : "Marcar como visitado"}
                    >
                    🎒
                    </button>
                </div>
                )}
                </div>
                
                </div>
            </section>
            )}


            
            {atraccion && (
                <ReseñasSection user={user} atraccion={atraccion} />
            )}

            <div className="descripcion-contenido">
                <div className="descripcion-imagen">
                <img src={ciudad.imagenHeader} alt={ciudad.nombre} />
                </div>

                <div className="descripcion-texto">
                <h2>Descubre {ciudad.nombre}</h2>
                <h3>{ciudad.subtitulo}</h3>
                <p>{ciudad.descripcion}</p>
                </div>

                <div className="descripcion-calificaciones">
                    <div className="calificacion-item">
                        <span>Comida:</span>
                        <StarRating value={provincia.calificacion_comida} />
                    </div>

                    <div className="calificacion-item">
                        <span>Transporte:</span>
                        <StarRating value={provincia.calificacion_transporte} />
                    </div>

                    <div className="calificacion-item">
                        <span>Hoteles:</span>
                        <StarRating value={provincia.calificacion_hoteles} />
                    </div>

                    <div className="calificacion-item">
                        <span>General:</span>
                        <StarRating value={provincia.calificacion_general} />
                    </div>

                    <div className="calificacion-item">
                        <span>Tipo de turismo:</span>
                        <p className="tipo-turismo">{provincia.tipo_turismo}</p>
                    </div>
                    </div>
                </div>
        </div>
    );
}
