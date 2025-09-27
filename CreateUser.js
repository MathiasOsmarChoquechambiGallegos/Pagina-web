import { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListUsers() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
    
        axios.post('http://localhost:80/api/users/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        console.log(inputs);
    
    }; 
    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Apellido: </label>
                            </th>
                            <td>
                                <input type="text" name="apellido" onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td>
                                <input type="text" name="email" onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Constrasena: </label>
                            </th>
                            <td>
                                <input type="text" name="contrasena" onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Pais: </label>
                            </th>
                            <td>
                                <input type="text" name="pais" onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right">
                                <button type="submit">Save</button> 
                            </td>
                        </tr>
                    </tbody>
                </table>

                
            </form>
        </div>
    )
}