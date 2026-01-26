export default function Services() {
  return (
    <section id="services" className="w-full py-8 relative" style={{ backgroundColor: '#ffffff' }}>
      {/* Fondo de damero con colores verdes */}
        <div 
        className="absolute inset-0 w-full h-full overflow-hidden blur-sm"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #21A85B 25%, transparent 25%),
              linear-gradient(-45deg, #21A85B 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #1A8A4A 75%),
              linear-gradient(-45deg, transparent 75%, #1A8A4A 75%),
              linear-gradient(45deg, #0F5A2E 25%, transparent 25%),
              linear-gradient(-45deg, #0F5A2E 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #F6E09D 75%),
              linear-gradient(-45deg, transparent 75%, #F6E09D 75%)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0, 0 50px, 50px -50px, -50px 0px, 0 0, 0 50px, 50px -50px, -50px 0px',
            opacity: 0.1
          }}
        />
      <div className="max-w-4xl mx-auto px-0 md:px-20 lg:px-32 relative z-10">
        {/* Lista simple de servicios con alternancia */}
        <div className="bg-white/20 rounded-xl p-0 md:p-8 space-y-6 mb-8 mt-8">
          <div className="p-4 text-left max-w-2/3">
              <h3 
                className="text-2xl font-semibold mb-3"
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

          <div className="p-4 text-right max-w-2/3 ml-auto">
              <h3 
                className="text-2xl font-semibold mb-3"
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

          <div className="p-4 text-left max-w-2/3">
              <h3 
                className="text-2xl font-semibold mb-3"
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

          <div className="p-4 text-right max-w-2/3 ml-auto">
              <h3 
                className="text-2xl font-semibold mb-3"
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

          <div className="p-4 text-left max-w-2/3">
              <h3 
                className="text-2xl font-semibold mb-3"
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

          <div className="p-4 text-right max-w-2/3 ml-auto">
              <h3 
                className="text-2xl font-semibold mb-3"
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
    </section>
  );
}