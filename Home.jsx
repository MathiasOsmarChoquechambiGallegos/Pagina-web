import { Link} from 'react-router-dom';
import '../App.css';
import arequipa from './arequipa.jpg'
import turista from './turistas.jpeg'

export default function ListUser() {
    
    return (
        <main>
            <>
                <div className="hero">
                    <h1>¡Explora el Perú con nosotros!</h1>
                    <p>Anímate a descubrir los lugares más hermosos que el Perú te puede ofrecer y vive una experiencia única en tu travesía.</p>
                    <Link to="atraccion/search"><button className="explore-btn">Explorar</button></Link>
                </div>
            
                <div className="content-section">
                    <h2>Explora Arequipa!</h2>
                    <img src={arequipa} alt="Imagen turística de Arequipa"/><br></br>
                </div>
                
                <div className="content-section">
                    <h2>Comparte tu experiencia!</h2>
                    <img src={turista} alt="Representación del usuario escribiendo su opinión"/>
                </div>

            </>
        </main>
        
    )
}
