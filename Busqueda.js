import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Busqueda({ setAtraccion }) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ atraccion_nombre: ""});
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:80/api/atracciones/busqueda", inputs)
            .then((response) => {
                if (response.data.status === 1) {
                    alert("Found!");
                    setAtraccion(response.data.atraccion); 
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
            <h1>Buscar Atraccionnes</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th><label>Atraccion: </label></th>
                            <td>
                                <input type="text" name="atraccion_nombre" value={inputs.atraccion_nombre} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right">
                                <button type="submit">Buscar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}