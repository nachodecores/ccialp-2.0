export default function PlanesSuscripcion() {
  const planes = [
    {
      id: 'basico',
      nombre: 'Socio',
      precio: '$400',
      periodo: 'mensual',
      descripcion: 'Ideal para empresas que buscan beneficios esenciales y representatividad gremial',
      beneficios: [
        'Representación gremial empresarial',
        'Acceso a convenios comerciales',
        'Tarifas especiales en el uso de las instalaciones'
      ],
      destacado: false
    }
  ];

  return (
    <div className="w-full mb-16 bg-primary-dark">
      {/* Grid de planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-primary-dark p-8 rounded-2xl">
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

        {/* Tarjeta de servicios de gestoría */}
        <div className="relative bg-primary-gold rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="flex flex-col h-full justify-center">
            <p 
              className="text-xl md:text-2xl text-gray-700 text-center"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                lineHeight: '1.6'
              }}
            >
              Por servicios de gestoría y apertura de empresas{' '}
              <a
                href="https://wa.me/59899320115?text=Buenas,%20tengo%20una%20consulta%20para%20hacerles"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:opacity-80 transition-opacity"
                style={{ color: '#0F3439' }}
              >
                consultar aquí
              </a>
              , ya que los precios varían en función de las características de la empresa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
