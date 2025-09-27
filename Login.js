import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: "", contrasena: "" });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:80/api/users/login", inputs)
            .then((response) => {
                if (response.data.status === 1) {
                    alert("Login successful!");
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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th><label>Email: </label></th>
                            <td>
                                <input type="text" name="email" value={inputs.email} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th><label>Contraseña: </label></th>
                            <td>
                                <input type="text" name="contrasena" value={inputs.contrasena} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right">
                                <button type="submit">Log In</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}