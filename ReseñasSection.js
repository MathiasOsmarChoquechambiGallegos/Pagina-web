import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './resena.css'

export default function ReseñasSection({ user, atraccion }) {
    const [reseñas, setReseñas] = useState([]);
    const [texto, setTexto] = useState("");
    const [estrellas, setEstrellas] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    const [likes, setLikes] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/me_gusta/${atraccion.atraccion_id}`)
            .then(res => {
                setLikes(res.data);
            })
            .catch(err => console.error("Error cargando likes", err));
    }, [atraccion]);
    

    const handleLike = (resenaId) => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        axios.post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/me_gusta", {
            usuario_id: user.id,
            resena_id: resenaId
        })
        .then(res => {
            if (res.data.status === 1) {
                setLikes(prev => {
                    const actual = prev[resenaId] || [];
                    let updated;

                    // si ya dio like → quitarlo
                    if (actual.includes(user.id)) {
                        updated = actual.filter(u => u !== user.id);
                    } else {
                        updated = [...actual, user.id];
                    }

                    return { ...prev, [resenaId]: updated };
                });
            }
        })
        .catch(() => alert("Error al actualizar el me gusta"));
    };


    // 🔹 Cargar reseñas cuando cambia la atracción
    useEffect(() => {
        if (!atraccion || !atraccion.atraccion_id) return; // 👈 evita llamadas vacías

        axios
            .get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/resenas/${atraccion.atraccion_id}`)
            .then((res) => {
                if (Array.isArray(res.data)) setReseñas(res.data);
                else setReseñas([]);
            })
            .catch((err) => console.error("Error cargando reseñas:", err));
    }, [atraccion]); // 👈 se actualiza solo cuando cambia toda la atracción

    const handleDeleteResena = (id) => {
        setSelectedDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        axios
            .delete(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/resenas/${selectedDeleteId}`)
            .then((res) => {
                if (res.data.status === 1) {
                    setReseñas(reseñas.filter((r) => r.id !== selectedDeleteId));
                } else {
                    alert("No se pudo borrar la reseña");
                }
            })
            .catch((err) => console.error("Error borrando reseña:", err))
            .finally(() => {
                setSelectedDeleteId(null);
                setShowModal(false);
            });
    };




    // 🔹 Enviar nueva reseña
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return alert("Inicia sesión para dejar una reseña");
        if (!texto.trim()) return;

        axios
            .post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/resenas", {
                usuario_id: user.id,
                atraccion_id: atraccion.atraccion_id,
                reseña: texto,
                estrellas,
            })
            .then((res) => {
                if (res.data && res.data.id) {
                    // Inserta la nueva reseña al principio de la lista
                    setReseñas([res.data, ...reseñas]);
                    setTexto("");
                    setEstrellas(5);
                } else {
                    // Si la API devuelve algo distinto (como status), recargar la lista
                    axios
                        .get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/resenas/${atraccion.atraccion_id}`)
                        .then((r) => setReseñas(Array.isArray(r.data) ? r.data : []));
                }
            })
            .catch((err) => console.error("Error enviando reseña:", err));
    };

    return (
        <div>
              {/* 🔹 Formulario (solo si el usuario está logueado) */}               
                {user && atraccion?.atraccion_id && (
                <div className="reseña-form-container"> 
                <form onSubmit={handleSubmit} className="reseña-form">
                <label>Tu calificación:</label>
                <div className="star-selector">
                    {Array.from({ length: 5 }).map((_, i) => (
                    <span
                        key={i}
                        className={
                        i < estrellas ? "star filled clickable" : "star clickable"
                        }
                        onMouseEnter={() => setEstrellas(i + 1)}
                        onClick={() => setEstrellas(i + 1)}
                    >
                        ★
                    </span>
                    ))}
                </div>

                <textarea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escribe tu reseña..."
                    rows="4"
                />

                <button type="submit">Enviar reseña</button>
                </form>
                </div>
            )}
            <h3>Reseñas de otros usuarios</h3>

            {/* 🔹 Mostrar reseñas existentes */}
            <div className="reseñas-container">
            {reseñas.length > 0 ? (
            reseñas.map((r) => (
                <div key={r.id} className="reseña-card">

                    <div className="reseña-header">
                        <strong>{r.user_nombre || "Usuario anónimo"}</strong>
                        <div className="reseña-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={i < r.estrellas ? "star filled" : "star"}>
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="corazon-like" onClick={() => handleLike(r.id)}>
    <svg
        className={`heart ${likes[r.id]?.includes(user?.id) ? "active" : ""}`}
        viewBox="0 0 24 24"
        width="20"
        height="20"
    >
        <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3
               19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={likes[r.id]?.includes(user?.id) ? "#ff2e63" : "#bbb"}
        />
    </svg>
    <span className="like-count">{likes[r.id]?.length || 0}</span>
</div>









                    <p className="reseña-texto">{r.reseña}</p>
                    {/* 🗑️ Mostrar solo si pertenece al usuario logueado */}
                    {user && r.usuario_id === user.id && (
                        <span
                            className="trash-icon"
                            onClick={() => handleDeleteResena(r.id)}
                            title="Eliminar reseña"
                        >
                            🗑️
                        </span>
                    )}
                    <small className="reseña-fecha">
                        {new Date(r.fecha).toLocaleString()}
                    </small>
                </div>
            ))
        ) : (
            <p className="reseña-vacia">No hay reseñas todavía.</p>
        )}

            </div>
            {/* Popup para confirmar eliminación */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p className="modal-text">¿Seguro que quieres borrar esta reseña?</p>

                        <div className="modal-actions">
                            <button className="yes" onClick={confirmDelete}>Sí</button>
                            <button className="no" onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Popup si el usuario no ha iniciado sesión */}
            {showLoginModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p className="modal-text">
                            Debes iniciar sesión para continuar 😢
                        </p>

                        <div className="modal-actions">
                            <button className="yes" onClick={() => navigate("/user/login")}>
                                Iniciar sesión
                            </button>

                            <button className="no" onClick={() => setShowLoginModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

