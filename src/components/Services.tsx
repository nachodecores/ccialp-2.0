import Link from "next/link";

export default function Services() {
  return (
    <section id="services" className="w-full py-8 relative" style={{ backgroundColor: '#ffffff' }}>
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: 'url(/assets/images/fondo-varios-1.jpg)'
        }}
      />
      <div className="max-w-4xl mx-auto px-0 md:px-20 lg:px-32 relative z-10">
        {/* Lista simple de servicios con alternancia */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-0 md:p-8 space-y-6 mb-8 mt-8">
          <div className="p-4 text-left">
            <div className="max-w-2/3">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600',
                  color: '#0F3439',
                  letterSpacing: '0.025em'
                }}
              >
                Asesoría Comercial
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  color: '#4A5568',
                  lineHeight: '1.6'
                }}
              >
                Orientación especializada para el desarrollo y crecimiento de tu negocio
              </p>
            </div>
          </div>

          <div className="p-4 text-right">
            <div className="max-w-2/3 ml-auto">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600',
                  color: '#0F3439',
                  letterSpacing: '0.025em'
                }}
              >
                Networking Empresarial
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  color: '#4A5568',
                  lineHeight: '1.6'
                }}
              >
                Conectamos empresas para generar oportunidades de negocio y colaboración
              </p>
            </div>
          </div>

          <div className="p-4 text-left">
            <div className="max-w-2/3">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600',
                  color: '#0F3439',
                  letterSpacing: '0.025em'
                }}
              >
                Capacitación
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  color: '#4A5568',
                  lineHeight: '1.6'
                }}
              >
                Programas de formación para potenciar las habilidades de tu equipo
              </p>
            </div>
          </div>

          <div className="p-4 text-right">
            <div className="max-w-2/3 ml-auto">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600',
                  color: '#0F3439',
                  letterSpacing: '0.025em'
                }}
              >
                Certificaciones
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  color: '#4A5568',
                  lineHeight: '1.6'
                }}
              >
                Procesos de certificación para validar la calidad de tus productos y servicios
              </p>
            </div>
          </div>

          <div className="p-4 text-left">
            <div className="max-w-2/3">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600',
                  color: '#0F3439',
                  letterSpacing: '0.025em'
                }}
              >
                Promoción
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  color: '#4A5568',
                  lineHeight: '1.6'
                }}
              >
                Estrategias de marketing para dar a conocer tu empresa en el mercado
              </p>
            </div>
          </div>

          <div className="p-4 text-right">
            <div className="max-w-2/3 ml-auto">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600',
                  color: '#0F3439',
                  letterSpacing: '0.025em'
                }}
              >
                Consultoría
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  color: '#4A5568',
                  lineHeight: '1.6'
                }}
              >
                Asesoramiento especializado para optimizar procesos y mejorar resultados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}