import Image from "next/image";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  return (
    <header 
      className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-6"
      style={{ backgroundColor: '#0F3439' }}
    >
      {/* Logo izquierdo */}
      <div className="flex items-center" style={{ marginLeft: '1rem' }}>
        <Image
          src="/assets/logos/logo-min-verde.svg"
          alt="CCIALP Logo"
          width={40}
          height={30}
          className="h-6 w-auto md:h-10 md:w-auto"
        />
      </div>

      {/* Logo central completo */}
      <div className="flex flex-col items-center text-center" style={{ gap: '0.375rem' }}>
        {/* Línea curva superior */}
        <div>
          <Image
            src="/assets/icons/linea-curva-verde-up.svg"
            alt="Línea curva superior"
            width={120}
            height={2}
            className="h-auto"
            style={{ width: '25vw', maxWidth: '12.5rem' }}
          />
        </div>
        
        {/* Texto descriptivo */}
        <p 
          className="whitespace-nowrap"
          style={{ 
            color: 'white',
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '300',
            margin: '0',
            padding: '0',
            fontSize: '2.5vw',
            lineHeight: '1'
          }}
        >
          CENTRO COMERCIAL, INDUSTRIAL Y AGRARIO
        </p>
        
        {/* Texto principal */}
        <h1 
          className="whitespace-nowrap"
          style={{ 
            color: 'white',
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            margin: '0',
            padding: '0',
            fontSize: '3.5vw',
            lineHeight: '1',
            letterSpacing: '0.5em',
          }}
        >
          LAS PIEDRAS
        </h1>
        
        {/* Línea curva inferior */}
        <div>
          <Image
            src="/assets/icons/linea-curva-verde-down.svg"
            alt="Línea curva inferior"
            width={120}
            height={2}
            className="h-auto"
            style={{ width: '25vw', maxWidth: '12.5rem' }}
          />
        </div>
      </div>

      {/* Menú desplegable derecho */}
      <div className="flex items-center" style={{ marginRight: '1rem' }}>
        <DropdownMenu />
      </div>
    </header>
  );
}
