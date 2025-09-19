import Link from "next/link";
import Image from "next/image";
import conveniosData from '@/data/convenios.json';

export default function Convenios() {
  const convenios = conveniosData.filter(convenio => convenio.activo);
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Fondo estático claro */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-green/3 via-white to-primary-dark/2"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Título y descripción */}
        <div className="text-center mb-8">
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            style={{ 
              fontFamily: 'Kanit, sans-serif',
              fontWeight: '600',
              color: '#0F3439'
            }}
          >
            Ser socio del Centro tiene sus beneficios
          </h2>
        
        </div>

        {/* Carrusel de logos con animación infinita */}
        <div className="mb-16 overflow-hidden">
          <div className="flex animate-scroll space-x-8 pb-4">
            {/* Primera fila de logos */}
            {convenios.map((convenio) => (
              <div 
                key={`first-${convenio.id}`} 
                className="flex-shrink-0 w-32 h-20 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <Image
                    src={convenio.logo}
                    alt={`Logo de ${convenio.nombre}`}
                    width={64}
                    height={32}
                    className="w-16 h-8 object-contain"
                  />
                  <p className="text-xs text-gray-600 font-medium mt-2">{convenio.nombre}</p>
                </div>
              </div>
            ))}
            {/* Segunda fila de logos para el loop infinito */}
            {convenios.map((convenio) => (
              <div 
                key={`second-${convenio.id}`} 
                className="flex-shrink-0 w-32 h-20 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <Image
                    src={convenio.logo}
                    alt={`Logo de ${convenio.nombre}`}
                    width={64}
                    height={32}
                    className="w-16 h-8 object-contain"
                  />
                  <p className="text-xs text-gray-600 font-medium mt-2">{convenio.nombre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón para ver todos los convenios */}
        <div className="text-center">
          <div className="relative inline-block group">
            {/* Efecto de brillo de fondo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-green via-primary-green/80 to-primary-green rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
            
            <Link 
              href="/convenios"
              className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-green to-primary-green/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-primary-green/20"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                backgroundColor: '#21A85B',
                background: 'linear-gradient(135deg, #21A85B 0%, #1A8A4A 100%)'
              }}
            >
              <span className="relative z-10">CONOCER TODOS NUESTROS CONVENIOS</span>
              
              
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
