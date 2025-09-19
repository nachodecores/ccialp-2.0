import Link from "next/link";

export default function Footer() {
  return (
    <footer 
      className="w-full py-8 px-4 md:px-8 lg:px-16 bg-primary-dark"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Información de contacto */}
          <div className="flex-1 text-center md:text-left">
            <div className="py-12 px-6">
              <h3 
                className="text-lg font-semibold mb-4 text-white font-kanit font-semibold"
              >
                "Algunos ven al empresario como el lobo al que hay que abatir, otros lo ven como la vaca que hay que ordeñar, pero muy pocos lo ven como el caballo que tira del carro"
              </h3>
            </div>
            
            
            <div className="space-y-2">
              <p 
                className="text-sm text-white font-inter font-normal"
              >
                📍 Lavalleja 664, Las Piedras, Canelones
              </p>
              
              <p 
                className="text-sm text-white font-inter font-normal"
              >
                📞 (598) 2364 1234
              </p>
              
              <p 
                className="text-sm text-white font-inter font-normal"
              >
                ✉️ info@ccialp.org.uy
              </p>
              
              <p 
                className="text-sm text-white font-inter font-normal"
              >
                🕒 Lun - Vie: 10:00 - 17:00
              </p>
            </div>
          </div>
          
          {/* Redes sociales */}
          <div className="flex-shrink-0">
           
            
            <div className="flex space-x-4">
              {/* Facebook */}
              <Link 
                href="https://facebook.com/ccialp"
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
                href="https://instagram.com/ccialp"
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
                href="https://linkedin.com/company/ccialp"
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
                href="https://twitter.com/ccialp"
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
                href="https://youtube.com/@ccialp"
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
            © 2024 Centro Comercial, Industrial y Agrario de Las Piedras. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
