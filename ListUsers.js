import { Link } from 'react-router-dom';
import { useEffect } from "react";
import arequipa from './imagenes_f/principal.jpeg';
import FormularioBusqueda from './FormularioBusqueda';
import { Explorer } from './explorer';
import ReseñasSection from "./ReseñasSection";
import './AboutUs.css';


export default function ListUser({  user, atraccion, setAtraccion, setProvincia }) {
    useEffect(() => {
    // Asignamos la atracción con ID 107 solo al cargar la página
        setAtraccion({ atraccion_id: 107 });
    }, [setAtraccion]);
    return (
        <main>
            <>
                <div className="hero">
                    <h1>¡Explora el Perú con nosotros!</h1>
                    <p>Anímate a descubrir los lugares más hermosos que el Perú te puede ofrecer y vive una experiencia única en tu travesía.</p>
                    <Link to="/atraccion/provincia" className="explore-btn">Explorar</Link>
                </div>
                
                <Explorer
                    setProvincia={setProvincia}
                    setAtraccion={setAtraccion}
                />
            
                <div className="about-section" id="about">
                    <div className="about-image">
                    <img src={arequipa} alt="Paisaje arequipai"/>
                    </div>
                    <div className="about-text">
                        <h2>Sobre Nosotros</h2>
                        <p>
                        Bienvenido a <strong>Wild Roots</strong>, un espacio donde exploramos la
                        conexión entre la naturaleza y el bienestar. Nuestro objetivo es crear
                        experiencias únicas que fortalezcan el vínculo con nuestras raíces
                        naturales.
                        </p>
                        <p>
                        Creemos que regresar a lo esencial es la clave para una vida más
                        equilibrada, saludable y consciente.
                        </p>
                    </div>
                </div>
                <div className="experience-section" id="experience">

                    <div className="content-section">
                        <div className="comment-box">


                        {/* 🔹 Aquí mostramos las reseñas reales si existe una atracción */}
                        {atraccion && (
                        <div className="reseñas-contenedor">
                            <h2>Experiencias de Usuarios</h2>
                            <ReseñasSection user={user} atraccion={atraccion} />
                        </div>
                        )}
                        </div>
                    </div>
                </div>
                <FormularioBusqueda setAtraccion={setAtraccion} setProvincia={setProvincia} />
            </>
        </main>
        
    )
}