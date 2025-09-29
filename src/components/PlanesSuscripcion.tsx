export default function PlanesSuscripcion() {
  const planes = [
    {
      id: 'basico',
      nombre: 'Socio',
      precio: '$400',
      periodo: 'mensual',
      descripcion: 'Ideal para pequeñas empresas que buscan beneficios esenciales',
      beneficios: [
        'Acceso a convenios comerciales',
        'Participación en eventos mensuales',
        'Boletín informativo',
        'Descuentos en capacitaciones básicas',
        'Soporte por email'
      ],
      destacado: false
    },
    {
      id: 'premium',
      nombre: 'Socio Plus',
      precio: '$1.100',
      periodo: 'mensual',
      descripcion: 'Para empresas en crecimiento que buscan maximizar oportunidades',
      beneficios: [
        'Todos los beneficios del Plan Básico',
        'Acceso a convenios exclusivos',
        'Participación en eventos premium',
        'Consultoría empresarial (2 horas/mes)',
        'Descuentos en capacitaciones avanzadas',
        'Soporte prioritario telefónico',
        'Acceso a base de datos de contactos',
        'Participación en comisiones directivas'
      ],
      destacado: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mb-16">
      {/* Título de la sección */}
      <div className="text-center mb-12">
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          style={{ 
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            color: '#0F3439'
          }}
        >
          Elegí tu Plan
        </h2>
        <p 
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            lineHeight: '1.6'
          }}
        >
          Seleccioná el plan que mejor se adapte a las necesidades de tu empresa
        </p>
      </div>

      {/* Grid de planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {planes.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl ${
              plan.destacado 
                ? 'ring-2 ring-primary-green transform scale-105' 
                : 'hover:scale-105'
            }`}
          >
            {/* Badge destacado */}
            {plan.destacado && (
              <div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-semibold"
                style={{ 
                  backgroundColor: '#21A85B',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                MÁS POPULAR
              </div>
            )}

            {/* Header del plan */}
            <div className="text-center mb-6">
              <h3 
                className="text-2xl font-bold mb-2"
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600',
                  color: '#0F3439'
                }}
              >
                {plan.nombre}
              </h3>
              
              <div className="mb-4">
                <span 
                  className="text-4xl font-bold"
                  style={{ 
                    fontFamily: 'Kanit, sans-serif',
                    fontWeight: '700',
                    color: '#21A85B'
                  }}
                >
                  {plan.precio}
                </span>
                <span 
                  className="text-gray-500 ml-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  /{plan.periodo}
                </span>
              </div>

              <p 
                className="text-gray-600"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.5'
                }}
              >
                {plan.descripcion}
              </p>
            </div>

            {/* Lista de beneficios */}
            <div className="mb-8">
              <ul className="space-y-3">
                {plan.beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start">
                    <svg 
                      className="w-5 h-5 text-primary-green mt-0.5 mr-3 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span 
                      className="text-gray-700"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '400',
                        lineHeight: '1.5'
                      }}
                    >
                      {beneficio}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón de selección */}
            <div className="text-center">
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.destacado
                    ? 'bg-primary-green text-white hover:bg-green-600 hover:scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600'
                }}
              >
                {plan.destacado ? 'SELECCIONAR PREMIUM' : 'SELECCIONAR BÁSICO'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Texto informativo adicional */}
      <div className="text-center mt-12">
        <p 
          className="text-lg text-gray-500 max-w-2xl mx-auto"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            lineHeight: '1.6'
          }}
        >
          Por servicios de gestoría consultar aquí, ya que los precios varían en función de las características de la empresa.
        </p>
      </div>
    </div>
  );
}
