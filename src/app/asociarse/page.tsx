import HeaderPaginas from "@/components/HeaderPaginas";
import Footer from "@/components/Footer";

export default function Asociarse() {
  return (
    <div className="min-h-screen">
      {/* Header reutilizable */}
      <HeaderPaginas />

      {/* Contenido principal */}
      <main className="w-full py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-4xl mx-auto">
          {/* Título y descripción */}
          <div className="text-center mb-12">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Solicitar Asociación
            </h1>
            
            <p 
              className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                lineHeight: '1.6'
              }}
            >
              Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas 
              para iniciar el proceso de asociación.
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <form className="space-y-6">
              {/* Información personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Información de la empresa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="empresa"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Nombre de la empresa *
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="telefono"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                    placeholder="099 123 456"
                  />
                </div>
              </div>

              {/* Rubro y descripción */}
              <div>
                <label 
                  htmlFor="rubro"
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Rubro de actividad *
                </label>
                <input
                  type="text"
                  id="rubro"
                  name="rubro"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                  placeholder="Ej: Comercio, Industria, Servicios, etc."
                />
              </div>

              <div>
                <label 
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  ¿Por qué querés asociarte? *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors resize-none"
                  placeholder="Contanos brevemente por qué querés formar parte de nuestro Centro..."
                />
              </div>

              {/* Botón de envío */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  style={{ 
                    fontFamily: 'Kanit, sans-serif',
                    fontWeight: '600',
                    backgroundColor: '#21A85B'
                  }}
                >
                  ENVIAR SOLICITUD
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                    />
                  </svg>
                </button>
              </div>

              {/* Texto informativo */}
              <div className="text-center pt-4">
                <p 
                  className="text-sm text-gray-500"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Al enviar este formulario, aceptás que nos pongamos en contacto contigo 
                  para continuar con el proceso de asociación.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
