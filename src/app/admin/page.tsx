import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Panel de Administración
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/admin/socios"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Gestión de Socios
            </h2>
            <p className="text-gray-600 text-sm">
              Administrar socios, ver estadísticas y gestionar carnés QR
            </p>
          </Link>
          
          <Link 
            href="/admin/ajustar-precios"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ajustar Precios
            </h2>
            <p className="text-gray-600 text-sm">
              Configurar precios base, ajustes y recargos del sistema de cálculo
            </p>
          </Link>
          
          <Link 
            href="/admin/convenios"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Gestión de Convenios
            </h2>
            <p className="text-gray-600 text-sm">
              Administrar convenios con empresas y sus beneficios
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
