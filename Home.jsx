import chicogg from './assets/ggez.jpg'
import gato from './assets/gatojeje.png'

export default function Home() {
  return (
    <main>
      <div className="hero">
        <h1>¡Explora el Perú con nosotros!</h1>
        <p>Anímate a descubrir los lugares más hermosos que el Perú te puede ofrecer y vive una experiencia única en tu travesía.</p>
        <button className="explore-btn">Explorar</button>
      </div>
      
      <div className="content-section">
        <h2>Explora Arequipa!</h2>
        <img src={gato} alt="Imagen turística de Arequipa"/>
      </div>
      
      <div className="content-section">
        <h2>Comparte tu experiencia!</h2>
        <img src={chicogg} alt="Representación del usuario escribiendo su opinión"/>
      </div>
    </main>
  )
}
