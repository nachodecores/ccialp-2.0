export default function ResenaHistorica() {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto */}
          <div className="space-y-6">
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
          
          {/* Elemento visual decorativo */}
          <div className="flex justify-center lg:justify-end">
            <div 
              className="w-80 h-80 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #21A85B 0%, #0F3439 100%)',
                boxShadow: '0 20px 40px rgba(33, 168, 91, 0.3)'
              }}
            >
              <div className="text-center text-white">
                <div 
                  className="text-6xl font-bold mb-2"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                >
                  95+
                </div>
                <div 
                  className="text-xl font-semibold"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Años de Historia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
