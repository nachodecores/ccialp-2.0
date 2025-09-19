import Link from "next/link";

export default function CentrosPyme() {
  return (
    <section 
      className="w-full flex items-center justify-center" 
      style={{ 
        backgroundColor: '#e83843',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        gap: '2rem'
      }}
    >
      {/* Descripción breve */}
      <p 
        className="text-center flex items-center"
        style={{ 
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontWeight: '400',
          color: '#ffffff',
          fontSize: '1rem',
          height: '1.5rem'
        }}
      >
        TENEMOS OFICINA DEL 
      </p>
      
      {/* Logo como enlace */}
      <Link 
        href="https://www.ande.org.uy/centros-pymes.html"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover:opacity-80 transition-opacity duration-300"
      >
        <img 
          src="/assets/logos/logo-cpy-blanco.jpg"
          alt="Centros Pyme - ANDE"
          className="w-auto"
          style={{ 
            maxHeight: '3.5rem',
            backgroundColor: 'transparent'
          }}
        />
      </Link>
    </section>
  );
}
