import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./explorar.css";
import Caraveli from './imagenes_f/caraveli.jpeg';
import Mollendo from './imagenes_f/islay.jpg';
import CiudadAqp from './imagenes_f/arequipa.jpeg';
import Camana from './imagenes_f/camana.jpg';
import Caylloma from './imagenes_f/caylloma.jpeg';
import Castilla from './imagenes_f/castilla.jpeg';
import Union from './imagenes_f/la_union.jpeg';

export default function ListUser({ setAtraccion, setProvincia }) {
    const navigate = useNavigate();
    const [provinciaId, setProvinciaId] = useState(null); // 🔹 Guarda el id seleccionado

    const [inputs, setInputs] = useState({ atraccion_nombre: "" });
    const location = useLocation();
    const [sugerencias, setSugerencias] = useState([]);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!inputs.atraccion_nombre.trim()) {
            alert("Por favor, escribe una atracción para buscar.");
            return;
        }

        try {
            // 🔹 1. Buscar la atracción completa
            const atrRes = await axios.post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/busqueda", {
                atraccion_nombre: inputs.atraccion_nombre,
                });

                if (atrRes.data.status === 1) {
                    const atr = atrRes.data.atraccion;
                    setAtraccion(atr);

                    // 🔹 2. Buscar la provincia asociada
                    if (atr.provincia_id) {
                        const provRes = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/provincia/${atr.provincia_id}`);
                        setProvincia(provRes.data.provincia);
                    }

                    // 🔹 3. Redirigir
                    navigate("/atraccion/search");
                } else {
                    alert("No se encontró esa atracción.");
                }
            } catch (error) {
                console.error(error);
                alert("Error al buscar la atracción.");
            }
        };


    const handleExploreClick = async (id) => {
        try {
            setProvinciaId(id); // 🔹 Guardamos el número de la provincia

            // 1️⃣ Obtener información de la provincia según el número guardado
            const provinciaRes = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/provincia/${id}`);
            setProvincia(provinciaRes.data.provincia);

            // 2️⃣ Obtener la primera atracción de esa provincia
            const atraccionRes = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/oneByProvincia/${id}`);
            if (atraccionRes.data.atraccion) {
                setAtraccion(atraccionRes.data.atraccion);
            }

            // 3️⃣ Redirigir

            navigate("/atraccion/search");
        } catch (error) {
            console.error("Error cargando provincia:", error);
            alert("No se pudo cargar la provincia seleccionada");
        }
    };

    return (
            <div className="explorar-container">
                {/* --- HERO CON IMAGEN DE FONDO --- */}
                <section className="explorar-hero">
                    <form className="explorar-buscador" onSubmit={handleSubmit}>
                        <input
                        type="text"
                        name="atraccion_nombre"
                        placeholder="Buscar destino..."
                        value={inputs.atraccion_nombre}
                        onChange={handleChange}
                        />
                        <button type="submit" className="fa fa-search"></button>

                        {/* 🔹 Mueve la lista AQUÍ, dentro del form */}
                        {mostrarSugerencias && sugerencias.length > 0 && (
                        <ul className="sugerencias-lista">
                            {sugerencias.map((a) => (
                            <li
                                key={a.atraccion_id}
                                onClick={async () => {
                                try {
                                    setInputs({ atraccion_nombre: a.atraccion_nombre });
                                    setMostrarSugerencias(false);

                                    const atrRes = await axios.post(
                                    "https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/busqueda",
                                    { atraccion_nombre: a.atraccion_nombre }
                                    );

                                    if (atrRes.data.status === 1) {
                                    const atr = atrRes.data.atraccion;
                                    setAtraccion(atr);

                                    if (atr.provincia_id) {
                                        const provRes = await axios.get(
                                        `https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/provincia/${atr.provincia_id}`
                                        );
                                        setProvincia(provRes.data.provincia);
                                    }

                                    navigate("/atraccion/search");
                                    } else {
                                    alert("No se encontró la atracción seleccionada.");
                                    }
                                } catch (error) {
                                    console.error("Error al procesar la sugerencia:", error);
                                    alert("Error cargando la información de la atracción.");
                                }
                                }}
                            >
                                {a.atraccion_nombre}
                            </li>
                            ))}
                        </ul>
                        )}
                    </form>

                    <h1>Explora</h1>
                    <p>Descubre los destinos más fascinantes de Arequipa...</p>
                    </section>


            {/* --- SOL Y PLAYA --- */}
            <section className="categoria">
                <div className="texto">
                <h2>Sol y Playa</h2>
                <p>
                    Arequipa cuenta con un litoral repleto de destinos con sol y playa
                    que atrae a gente de todas partes del mundo. Playas amplias, arena
                    suave y el encanto del Pacífico peruano.
                </p>
                </div>

                <div className="collage">
                <div className="collage-item img1" onClick={() => handleExploreClick(7)}>
                <img src={Caraveli} alt="Caravelí"/>
                <div className="collage-overlay">
                    <h4>Caravelí</h4>
                </div>
                </div>
                <div className="collage-item img2" onClick={() => handleExploreClick(3)}>
                <img src={Mollendo} alt="Mollendo"/>
                <div className="collage-overlay"><h4>Islay</h4></div>
                </div>
                <div className="collage-item img3" onClick={() => handleExploreClick(4)}>
                <img src={Camana} alt="Camaná"/>
                <div className="collage-overlay">
                    <h4>Camaná</h4>
                </div>
                </div>
                </div>
            </section>
            {/* --- NATURALEZA --- */}
            <section className="categoria">
                <div className="texto">
                <h2>Naturaleza</h2>
                <p>
                    Desde el majestuoso Cañón del Colca hasta las formaciones del Sillar,
                    la naturaleza arequipeña ofrece paisajes únicos llenos de historia y
                    vida.
                </p>
                </div>

                <div className="collage">
                <div className="collage-item img1" onClick={() => handleExploreClick(5)}>
                <img src={Caylloma} alt="Caylloma"/>
                <div className="collage-overlay">
                    <h4>Caylloma - Colca</h4>
                </div>
                </div>
                <div className="collage-item img2" onClick={() => handleExploreClick(6)}>
                <img src={Castilla} alt="Ciudad de Castilla"/>
                <div className="collage-overlay">
                    <h4>Castilla</h4>
                </div>
                </div>
                <div className="collage-item img3" onClick={() => handleExploreClick(8)}>
                <img src={Union} alt="La union"/>
                <div className="collage-overlay">
                    <h4>La Unión</h4>
                </div>
                </div>
                </div>
            </section>

            <section className="categoria">
                <div className="texto">
                <h2>Arquitectura</h2>
                <p>
                    Arequipa, conocida como la Ciudad Blanca, cautiva con su elegante arquitectura colonial construida en sillar una piedra volcánica de color claro que le da su característico brillo bajo el sol andino.
                </p>
                </div>

                <div className="collage">
                <div className="collage-item img4" onClick={() => handleExploreClick(1)}>
                <img src={CiudadAqp} alt="CiudadAQP"/>
                <div className="collage-overlay">
                    <h4>Ciudad de Arequipa</h4>
                </div>
                </div>
                </div>
            </section>
        </div>
    );
}
