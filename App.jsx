import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { useState } from "react";
import './App.css';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import ListUsers from './components/ListUsers';
import Busqueda from './components/Busqueda';



function App() {
  const [user, setUser] = useState(null);
  const [atraccion, setAtraccion] = useState(null);

  return (
    <div className="App">

      <BrowserRouter>
        <nav>
              <Link to="/">Home</Link>
              <Link to="user/create">Create User</Link>

              {user ? (
                    <div>
                      <span>{user.name}{user.apellido}!</span>
                      <button onClick={() => setUser(null)}>Logout</button>
                      </div>
                      
                ) : (
                    <Link to="user/login">Login</Link>
                )}
              {atraccion ? (
                <div>
                  <span>{atraccion.atraccion_nombre}!</span>
                </div>
              ) : (
                <Link to="atraccion/search">Buscar Atracción</Link>
              )}

        </nav>
        <Routes>
          <Route index element={<ListUsers />} />
          <Route path="user/create" element={<CreateUser />}/>
          <Route path="user/login" element={<Login setUser={setUser} />} />
          <Route path="atraccion/search" element={<Busqueda setAtraccion={setAtraccion} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

