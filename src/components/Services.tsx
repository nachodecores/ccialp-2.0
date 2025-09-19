import Link from "next/link";

export default function Services() {
  return (
    <section id="services" className="w-full py-8" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-4xl mx-auto px-12 md:px-20 lg:px-32">
        {/* Lista simple de servicios con alternancia */}
        <div className="space-y-6 mb-8">
          <div className="p-4 text-left">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Asesoría Comercial
            </h3>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#6B6B6B'
              }}
            >
              Orientación especializada para el desarrollo y crecimiento de tu negocio
            </p>
          </div>

          <div className="p-4 text-right">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Networking Empresarial
            </h3>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#6B6B6B'
              }}
            >
              Conectamos empresas para generar oportunidades de negocio y colaboración
            </p>
          </div>

          <div className="p-4 text-left">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Capacitación
            </h3>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#6B6B6B'
              }}
            >
              Programas de formación para potenciar las habilidades de tu equipo
            </p>
          </div>

          <div className="p-4 text-right">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Certificaciones
            </h3>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#6B6B6B'
              }}
            >
              Procesos de certificación para validar la calidad de tus productos y servicios
            </p>
          </div>

          <div className="p-4 text-left">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Promoción
            </h3>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#6B6B6B'
              }}
            >
              Estrategias de marketing para dar a conocer tu empresa en el mercado
            </p>
          </div>

          <div className="p-4 text-right">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Consultoría
            </h3>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#6B6B6B'
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