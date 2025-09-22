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

        

        {/* Texto de llamada a la acción */}
        <div className="text-center">
          <Link 
            href="/asociarse"
            className="inline-block text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-300 hover:scale-110 animate-pulse"
            style={{ 
              fontFamily: 'Kanit, sans-serif',
              fontWeight: '600',
              color: '#21A85B',
              textShadow: '0 2px 4px rgba(33, 168, 91, 0.3)'
            }}
          >
            ... hacete socio!
          </Link>
        </div>

      
      </div>
    </section>
  );
}
