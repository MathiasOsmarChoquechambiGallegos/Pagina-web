import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Busqueda({ user, atraccion, setAtraccion }) {
    const [inputs, setInputs] = useState({ atraccion_nombre: "" });
    const [visited, setVisited] = useState(false);
    const location = useLocation();

    // 🔹 Si llegas con ?nombre=Misti, busca automáticamente
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nombre = params.get("nombre");

        if (!nombre) return;

        axios.post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/busqueda", {
            atraccion_nombre: nombre
        })
        .then((res) => {
            if (res.data.status === 1) {
                setAtraccion(res.data.atraccion);
                setInputs({ atraccion_nombre: nombre });
            } else {
                alert("No tenemos información para esa recomendación.");
            }
        })
        .catch(() => alert("Error al buscar la recomendación."));
    }, [location.search, setAtraccion]);

    // 🔹 Manejador de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    // 🔹 Buscar atracción manualmente
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/busqueda", inputs)
            .then((res) => {
                if (res.data.status === 1) {
                    setAtraccion(res.data.atraccion);
                } else {
                    alert("No tenemos esa ubicación.");
                }
            })
            .catch(() => alert("Error en la búsqueda."));
    };

    // 🔹 Verificar si el usuario ya visitó esta atracción
    useEffect(() => {
        if (user && atraccion?.atraccion_id) {
            axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/visitado/${user.id}/${atraccion.atraccion_id}`)
                .then(res => setVisited(res.data.visited))
                .catch(err => console.error("Error verificando visitado:", err));
        }
    }, [user, atraccion?.atraccion_id]);

    // 🔹 Marcar como visitado
    const handleVisitado = () => {
        if (!user || !atraccion) return;

        axios.post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/visitado", {
            user_id: user.id,
            atraccion_id: atraccion.atraccion_id
        })
        .then((res) => {
            if (res.data.status === 1) {
                setVisited(true);
            }
            alert(res.data.message || "Marcado como visitado");
        })
        .catch(() => alert("Error en la conexión con el servidor"));
    };

    return (
        <div>
            <h1>Buscar Atracciones</h1>

            <form onSubmit={handleSubmit}>
                <label>Atracción:&nbsp;</label>
                <input
                    type="text"
                    name="atraccion_nombre"
                    value={inputs.atraccion_nombre}
                    onChange={handleChange}
                />
                <button type="submit">Buscar</button>
            </form>

            {/* Mostrar resultado */}
            {atraccion && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Resultado</h2>
                    <table border="1" cellPadding="10">
                        <tbody>
                            <tr><th>ID</th><td>{atraccion.atraccion_id}</td></tr>
                            <tr><th>Nombre</th><td>{atraccion.atraccion_nombre}</td></tr>
                            <tr><th>Descripción</th><td>{atraccion.descripcion}</td></tr>
                            <tr>
                                <th>Imagen</th>
                                <td>
                                    <img
                                        src={atraccion.image_url}
                                        alt={atraccion.atraccion_nombre}
                                        width="150"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Botón de "visitado" */}
            {user && atraccion && (
                <button
                    onClick={handleVisitado}
                    style={{
                        backgroundColor: visited ? "green" : "gray",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        marginTop: "10px",
                        cursor: "pointer"
                    }}
                >
                    {visited ? "Ya visitado" : "Marcar como visitado"}
                </button>
            )}
        </div>
    );
}
