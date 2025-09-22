import Link from "next/link";

export default function Footer() {
  return (
    <footer 
      id="contacto"
      className="w-full pt-36 pb-12 px-4 md:px-8 lg:px-16 bg-primary-dark relative"
    >
      {/* Efecto de gradiente difuso en el borde superior */}
      <div 
        className="absolute top-0 left-0 w-full h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(249,250,251,1) 0%, rgba(249,250,251,0.9) 20%, rgba(243,244,246,0.7) 40%, rgba(15,52,57,0.3) 80%, rgba(15,52,57,0.8) 95%, #0F3439 100%)',
          backdropFilter: 'blur(4px)'
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-12">
          {/* Quote centrada */}
          <div className="text-center w-7/10">
            <h3 
              className="text-lg font-semibold text-white font-kanit"
            >
              "Algunos ven al empresario como el lobo al que hay que abatir, otros lo ven como la vaca que hay que ordeñar, pero muy pocos lo ven como el caballo que tira del carro"
            </h3>
          </div>
          
          {/* Datos de contacto y redes sociales */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
            {/* Información de contacto */}
            <div className="flex-1 text-center md:text-left py-6 px-6">
              <h4 className="text-lg font-semibold mb-4 text-white font-kanit">
                Contacto
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/icons/location-blanco.svg"
                    alt="Ubicación"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p 
                    className="text-sm text-white font-inter font-normal"
                  >
                    Lavalleja 664, Las Piedras, Canelones
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/icons/phone-blanco.svg"
                    alt="Teléfono"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p 
                    className="text-sm text-white font-inter font-normal"
                  >
                    (598) 2364 1234
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/icons/mail-blanco.svg"
                    alt="Email"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p 
                    className="text-sm text-white font-inter font-normal"
                  >
                    info@ccialp.org.uy
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/icons/clock-blanco.svg"
                    alt="Horario"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <p 
                    className="text-sm text-white font-inter font-normal"
                  >
                    Lun - Vie: 10:00 - 17:00
                  </p>
                </div>
              </div>
            </div>
            
            {/* Redes sociales */}
            <div className="flex-shrink-0 flex space-x-4">
                {/* Facebook */}
                <Link 
                  href="https://www.facebook.com/ccomlp?locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <img 
                    src="/assets/icons/link-fb-blanco.svg"
                    alt="Facebook"
                    className="w-8 h-8"
                  />
                </Link>
                
                {/* Instagram */}
                <Link 
                  href="https://www.instagram.com/ccomercial.lp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <img 
                    src="/assets/icons/link-ig-blanco.svg"
                    alt="Instagram"
                    className="w-8 h-8"
                  />
                </Link>
                
                {/* LinkedIn */}
                <Link 
                  href="https://www.linkedin.com/in/centro-comercial-industrial-y-agrario-de-las-piedras-b9941776/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <img 
                    src="/assets/icons/link-lin-blanco.svg"
                    alt="LinkedIn"
                    className="w-8 h-8"
                  />
                </Link>
                
                {/* Twitter/X */}
                <Link 
                  href="https://x.com/CCIALasPiedras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <img 
                    src="/assets/icons/link-x-blanco.svg"
                    alt="Twitter"
                    className="w-8 h-8"
                  />
                </Link>
                
                {/* YouTube */}
                <Link 
                  href="https://www.youtube.com/@centrocomercial5753"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <img 
                    src="/assets/icons/link-yt-blanco.svg"
                    alt="YouTube"
                    className="w-8 h-8"
                  />
                </Link>
            </div>
          </div>
        </div>
        
        {/* Línea divisoria y copyright */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <p 
            className="text-center text-xs text-white font-inter font-normal"
          >
            © 2025 Centro Comercial, Industrial y Agrario de Las Piedras. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
