import { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './registro.css';

export default function ListUsers() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [alert, setAlert] = useState(null);
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post('https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/users/save', inputs).then(function(response){

            if (response.data.status === 1) {
                setAlert({ type: "success", message: response.data.message });
                // redirect after short delay
                setTimeout(() => navigate('/user/login'), 1500);
            } else {
                setAlert({ type: "error", message: response.data.message });
            }
        });
    
    }; 
    return (
        <div className="register-page">
            <div className="register-card">
                <h2>Crea tu cuenta</h2>
                {/* 🔹 Show alert if exists */}
                {alert && (
                    <div style={{
                        color: alert.type === "error" ? "red" : "green",
                        marginBottom: "15px",
                        fontWeight: "bold"
                    }}>
                        {alert.message}
                    </div>
                )}
        <form onSubmit={handleSubmit}>
                    <div className="register-group">
                        <label>Nombre:</label>
                        <input type="text" name="name" onChange={handleChange} placeholder="Ingresa tu nombre" />
                    </div>
                    
                    <div className="register-group">
                        <label>Apellido:</label>
                        <input type="text" name="apellido" onChange={handleChange} placeholder="Ingresa tu apellido" />
                    </div>

                    <div className="register-group">
                        <label>Correo electrónico:</label><input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
                            title="Ingresa un correo válido, como ejemplo@correo.com"
                            placeholder="Ingresa tu correo"
                        />
                    </div>
                    
                    <div className="register-group">
                        <label>Contraseña:</label>
                        <input type="password" name="contrasena" onChange={handleChange} placeholder="Crea una contraseña" />
                    </div>

                    <div className="register-group">
                        <label>Pais:</label>
                        <input type="text" name="pais" onChange={handleChange} placeholder="Cual es tu pais" />
                    </div>
                    <button type="submit" className="btn-register">Crear cuenta</button>
            
                </form>
            </div>
        </div>
    )
}