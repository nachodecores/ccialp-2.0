export default function ResenaHistorica() {
  return (
    <section 
      className="w-full py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden parallax-section" 
      style={{ 
        backgroundImage: 'url(/assets/images/acta_inicial.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.85)' // Overlay blanco semi-transparente
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ 
              fontFamily: 'Kanit, sans-serif',
              fontWeight: '600',
              color: '#0F3439'
            }}
          >
            Nuestra Historia
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Contenido de texto centrado */}
          <div className="space-y-6 text-center">
            <p 
              className="text-lg leading-relaxed"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#2C2C2C',
                lineHeight: '1.7'
              }}
            >
              Con más de 95 años de historia, el Centro Comercial, Industrial y Agrario de Las Piedras 
              ha sido el motor del desarrollo empresarial en nuestra región.
            </p>
            
            <p 
              className="text-lg leading-relaxed"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#2C2C2C',
                lineHeight: '1.7'
              }}
            >
              Fundado en 1929, nuestra institución ha acompañado el crecimiento de Las Piedras, 
              adaptándose a los cambios y desafíos de cada época, siempre con el compromiso de 
              fortalecer el tejido empresarial local.
            </p>
            
            <p 
              className="text-lg leading-relaxed"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#2C2C2C',
                lineHeight: '1.7'
              }}
            >
              Desde nuestros inicios, hemos trabajado incansablemente para crear oportunidades, 
              facilitar el networking empresarial y brindar las herramientas necesarias para 
              el éxito de nuestros asociados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
