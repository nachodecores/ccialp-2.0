import Link from "next/link";

export default function Asociarse() {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Título y descripción */}
        <div className="mb-8">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ 
              fontFamily: 'Kanit, sans-serif',
              fontWeight: '600',
              color: '#0F3439'
            }}
          >
            formá parte de la comunidad empresarial más importante de la región...
          </h2>
          
         
        </div>

        

        {/* Botón de llamada a la acción */}
        <div className="text-center">
          <Link 
            href="/asociarse"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            style={{ 
              fontFamily: 'Kanit, sans-serif',
              fontWeight: '600',
              backgroundColor: '#21A85B'
            }}
          >
            ... hacete socio!
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>

      
      </div>
    </section>
  );
}
