import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import logo from './logo.jpeg';
import { useNavigate } from "react-router-dom";
import './login.css';


export default function Login({ setUser }) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: "", contrasena: "" });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("https://unconsciously-ungovernmental-leon.ngrok-free.dev/api/users/login", inputs)
            .then((response) => {
                if (response.data.status === 1) {
                    setUser(response.data.user); 
                    navigate("/");
                } else {
                    alert("Incorrect email or password!");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Something went wrong.");
            });
    };

    return (
        <div className="login-page">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="login-card">
                <h2>Sign in to WildRoots</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="text" id="email" name="email" value={inputs.email} onChange={handleChange} />
                    </div>
                                
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="contrasena" value={inputs.contrasena} onChange={handleChange}/>
                    </div>

                    <button type="submit" className="btn-signin">Sign in</button>
                </form>
                <p className="signup-text">
                    New to WildRoots? <Link to="/user/create">Create an account</Link>.
                </p>
            </div>
        </div>
    );
}