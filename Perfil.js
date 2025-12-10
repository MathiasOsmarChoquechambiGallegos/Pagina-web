import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserPerfil.css';


export default function Perfil({ user, setUser, setAtraccion, setProvincia }) {
    const navigate = useNavigate();
    const [visitadas, setVisitadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNoUser, setShowNoUser] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirm(true); // Mostrar mensaje  
    };

    const confirmDelete = async () => {

        try {
            const url = `https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/users/${user.id}`;

            const response = await axios.delete(url);

            if (response.data.status === 1) {
            alert("Your account has been deleted 😢");
            setUser(null);
            navigate("/");
            } else {
            alert("No se pudo eliminar la cuenta.");
            }

        } catch (error) {
            alert("Error eliminando cuenta.");
        }
        };



    // NEW: local editable fields
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingApellido, setIsEditingApellido] = useState(false);
    const [isEditingPais, setIsEditingPais] = useState(false);
    const [tempName, setTempName] = useState("");
    const [tempApellido, setTempApellido] = useState("");
    const [tempPais, setTempPais] = useState("");

    const handleVisitadaClick = async (atraccion) => {
    const id = atraccion.atraccion_id;        // id de la atracción clickeada
    const provinciaId = atraccion.provincia_id;

    try {
        // 1️⃣ Cargar provincia
        const provinciaRes = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/provincia/${provinciaId}`);
        const provincia = provinciaRes.data.provincia;

        // 2️⃣ Cargar información COMPLETA de la atracción desde backend
        const atraccionRes = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/atraccion/${id}`);
        const atraccionCompleta = atraccionRes.data.atraccion;

        // 3️⃣ Guardar en tus variables de estado
        setProvincia(provincia);
        setAtraccion(atraccionCompleta);

        // 4️⃣ Navegar a la pantalla
        navigate("/atraccion/search");

    } catch (error) {
        console.error(error);
        alert("Error cargando información.");
    }
};





    useEffect(() => {
        if (!user) {
            setShowNoUser(true);
            const timer = setTimeout(() => {
                navigate("/"); // redirige después de 1.5 segundos
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchVisitadas = async () => {
            if (!user?.id) return;

            try {
                const res = await axios.get(`https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/visitadas/${user.id}`);
                if (res.data && res.data.status === 1 && Array.isArray(res.data.visitadas)) {
                    setVisitadas(res.data.visitadas);
                } else {
                    setVisitadas([]);
                }
            } catch (err) {
                console.error("Error cargando lugares visitados:", err);
                setVisitadas([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitadas();
    }, [user]);

    if (showNoUser) return <h2>No user logged in</h2>;

    if (!user) return null; // evita mostrarlo de nuevo en otras páginas

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

     // 💾 Save updated field
    const saveField = async (field, value) => {
        try {
            const res = await axios.post(
                "https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/update-user",
                {
                    id: user.id,
                    field,
                    value
                }
            );

            if (res.data.status === 1) {
                // update local user state
                setUser({ ...user, [field]: value });
            }
        } catch (err) {
            console.error("Error updating", field, err);
        }
    };

    return (
        <div className="user-profile">
            <h2>Mi Perfil</h2>

            <div className="profile-card">
                <div className="no">
                <div className="avatar">👤</div>
                <button className="delete-btn" onClick={handleDeleteClick}>Delete</button>
                </div>
                <div className="info">
                {/* NOMBRE */}
                    <p>
                        <strong>Nombre:</strong>{" "}
                        {isEditingName ? (
                            <>
                                <input
                                    value={tempName}
                                    autoFocus
                                    onChange={(e) => setTempName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveField("name", tempName);
                                            setIsEditingName(false);
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        saveField("name", tempName);
                                        setIsEditingName(false);
                                    }}>
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                {user.name}{" "}
                                <span
                                    className="edit-icon-b2"
                                    onClick={() => {
                                        setTempName(user.name);
                                        setIsEditingName(true);
                                    }}>
                                    ✏️
                                </span>
                            </>
                        )}
                    </p>

                    {/* APELLIDO */}
                    <p>
                        <strong>Apellido:</strong>{" "}
                        {isEditingApellido ? (
                            <>
                                <input
                                    value={tempApellido}
                                    autoFocus
                                    onChange={(e) => setTempApellido(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveField("apellido", tempApellido);
                                            setIsEditingApellido(false);
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        saveField("apellido", tempApellido);
                                        setIsEditingApellido(false);
                                    }}>
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                {user.apellido}{" "}
                                <span
                                    className="edit-icon-b2"
                                    onClick={() => {
                                        setTempApellido(user.apellido);
                                        setIsEditingApellido(true);
                                    }}>
                                    ✏️
                                </span>
                            </>
                        )}
                    </p>
                    {/* PAIS */}
                    <p>
                        <strong>Pais:</strong>{" "}
                        {isEditingPais ? (
                            <>
                                <input
                                    value={tempPais}
                                    autoFocus
                                    onChange={(e) => setTempPais(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveField("pais", tempPais);
                                            setIsEditingPais(false);
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        saveField("pais", tempPais);
                                        setIsEditingPais(false);
                                    }}>
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                {user.pais}{" "}
                                <span
                                    className="edit-icon-b2"
                                    onClick={() => {
                                        setTempPais(user.pais);
                                        setIsEditingPais(true);
                                    }}>
                                    ✏️
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>

            <button onClick={handleLogout}>Logout</button>

            {visitadas.length > 0 && <h2>🏝️ Lugares visitados</h2>}

            {loading ? (
                <p>Cargando lugares visitados...</p>
            ) : visitadas.length === 0 ? (
                <p>No has marcado ningún lugar como visitado aún.</p>
            ) : (
                <div className="reel">
                    {visitadas.map((a) => (
                        <div
                            key={a.atraccion_id}
                            className="reel-item"
                            onClick={() => handleVisitadaClick(a)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={a.image_url || "/placeholder.jpg"}
                                alt={a.atraccion_nombre}
                                width="150"
                            />
                            <p>{a.atraccion_nombre}</p>
                        </div>
                    ))}
                </div>
                
            )}
            {showConfirm && (
                <div className="modal-overlay">
                <div className="modal-box">
                    <p className="modal-text">
                    ¿Seguro que quieres borrar tu cuenta? 😢
                    </p>

                    <div className="modal-actions">
                    <button className="yes" onClick={confirmDelete}>Sí, borrar</button>
                    <button className="no" onClick={() => setShowConfirm(false)}>Cancelar</button>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
}
