import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../App.css";

export default function ReelAtracciones({ provinciaId, onSelectAtraccion }) {
    const [atracciones, setAtracciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const reelRef = useRef(null); // 🔹 referencia al contenedor del reel

    useEffect(() => {
        const fetchAtracciones = async () => {
            if (!provinciaId) {
                setAtracciones([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atracciones/byProvincia/${provinciaId}`);
                
                if (res.data && res.data.status === 1 && Array.isArray(res.data.atracciones)) {
                    setAtracciones(res.data.atracciones);
                } else {
                    setAtracciones([]);
                }
            } catch (err) {
                console.error("Error cargando atracciones:", err);
                setAtracciones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAtracciones();
    }, [provinciaId]);

    const scrollLeft = () => {
        reelRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        reelRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    if (loading) return <p>Cargando atracciones...</p>;
    if (!Array.isArray(atracciones) || atracciones.length === 0)
        return <p>No hay atracciones registradas para esta provincia.</p>;

    return (
        <div className="reel-container">
            <button className="arrow left" onClick={scrollLeft}>❮</button>

            <div className="reel" ref={reelRef}>
                {atracciones.map((a) => (
                    <div
                        key={a.atraccion_id}
                        className="reel-item"
                        onClick={() => onSelectAtraccion(a)}
                    >
                        <img
                            src={a.image_url || "/placeholder.jpg"}
                            alt={a.atraccion_nombre}
                        />
                        <p>{a.atraccion_nombre}</p>
                    </div>
                ))}
            </div>

            <button className="arrow right" onClick={scrollRight}>❯</button>
        </div>
    );
}
