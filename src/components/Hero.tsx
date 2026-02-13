import Image from "next/image";
import TypewriterText from "./TypewriterText";

export default function Hero() {
  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center"
      style={{ minHeight: '100vh' }}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/assets/images/aereo_las_piedras_hero_4k.jpg"
          alt="Vista aérea de Las Piedras"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlay para mejorar legibilidad */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backgroundColor: 'rgba(15, 52, 57, 0.4)' // Overlay azul oscuro con transparencia
          }}
        />
      </div>
      
      {/* Contenido del Hero */}
      <div className="relative z-10 text-center text-white px-4">
       
        
        <div 
          className="text-4xl md:text-6xl lg:text-8xl mb-8 min-h-[8rem] flex items-center justify-center flex-col"
          style={{ 
            fontFamily: 'Abel, sans-serif',
            fontWeight: '400',
            color: '#E0E0E0' // Color gris muy claro, casi blanco
          }}
        >
          <p>95 años </p>
          <TypewriterText />
          <p>empresas</p>
        </div>
        
      
      </div>
    </section>
  );
}
