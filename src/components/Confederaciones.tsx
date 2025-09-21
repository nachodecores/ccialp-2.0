import Link from "next/link";

export default function Confederaciones() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-kanit">
            Confederaciones
          </h2>
          <p className="text-gray-600 mt-2 font-inter">
            Formamos parte de las principales organizaciones empresariales del país
          </p>
        </div>
        
        <div className="flex flex-row items-center justify-center gap-4 md:gap-16">
          {/* CEDU - Logo con fondo oscuro */}
          <Link 
            href="https://www.confederacionempresarial.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center p-4 md:p-8 bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center">
              <img 
                src="/assets/images/logoCEDU.avif"
                alt="CEDU - Confederación de Entidades del Uruguay"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </Link>

          {/* Cámara Empresarial Canaria - Logo con fondo claro */}
          <Link 
            href="https://www.cecanaria.com.uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center p-4 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center">
              <img 
                src="/assets/images/camara_empresarial_canaria.png"
                alt="Cámara Empresarial Canaria"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
