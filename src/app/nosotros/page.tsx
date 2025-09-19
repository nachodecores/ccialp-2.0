import Image from "next/image";

export default function Nosotros() {
  return (
    <div className="min-h-screen">
      {/* Header con navegación de vuelta */}
      <header className="w-full h-16 bg-primary-dark flex items-center justify-between px-4">
        <a 
          href="/" 
          className="text-white hover:opacity-80 transition-opacity"
        >
          ← Volver al inicio
        </a>
        <div></div>
      </header>

      {/* Contenido principal */}
      <main className="relative">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 w-full h-screen">
          <Image
            src="/assets/images/topsphere-media-CDKAIH4Ud7c-unsplash.jpg"
            alt="Fondo Nosotros"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay para mejorar legibilidad */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundColor: 'rgba(15, 52, 57, 0.6)' // Overlay más oscuro para mejor legibilidad
            }}
          />
        </div>
        
        {/* Contenido sobre el overlay */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600'
              }}
            >
              NOSOTROS
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl lg:text-2xl">
              <p 
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.6'
                }}
              >
                Con más de 95 años de historia, el Centro Comercial, Industrial y Agrario de Las Piedras 
                ha sido el motor del desarrollo empresarial en nuestra región.
              </p>
              
              <p 
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.6'
                }}
              >
                Nuestra misión es impulsar el crecimiento de las empresas, facilitar el networking 
                empresarial y brindar las herramientas necesarias para el éxito de nuestros asociados.
              </p>
              
              <p 
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.6'
                }}
              >
                Trabajamos día a día para crear un ecosistema empresarial sólido que beneficie 
                a toda la comunidad de Las Piedras y la región.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
