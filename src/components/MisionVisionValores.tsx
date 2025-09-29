'use client';

import { useEffect, useRef, useState } from 'react';

export default function MisionVisionValores() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <section ref={sectionRef} className="w-full py-16 px-4 md:px-8 lg:px-16 flex flex-col gap-8 relative" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Logo de fondo transparente */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ 
          opacity: 0.12,
          zIndex: 1
        }}
      >
        <img
          src="/assets/logos/logo-min-verde.svg"
          alt="CCIALP Logo"
          className="w-[500px] h-[350px] md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[500px] object-contain"
          style={{ 
            filter: 'blur(1px)',
            transform: 'scale(1.2)'
          }}
        />
      </div>
      
      <div className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10 py-24">
          {/* Misión */}
          <div 
            className={`text-left transition-all duration-700 ease-out w-2/3 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
            }`}
            style={{ transitionDelay: '0.1s', marginLeft: '0', marginRight: 'auto' }}
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              MISION
            </h3>
            <p 
              className="text-base leading-relaxed"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#2C2C2C',
                lineHeight: '1.6'
              }}
            >
              Impulsar el crecimiento y desarrollo de las empresas asociadas, facilitando 
              el networking empresarial y brindando las herramientas necesarias para 
              el éxito de nuestros socios. Trabajamos día a día para crear un ecosistema 
              empresarial sólido que permita a nuestros miembros acceder a oportunidades 
              de negocio, capacitación especializada y servicios de consultoría que 
              fortalezcan su competitividad en el mercado.
            </p>
          </div>
          
          {/* Visión */}
          <div 
            className={`text-left transition-all duration-700 ease-out w-2/3 mx-auto ${
              isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              VISION
            </h3>
            <p 
              className="text-base leading-relaxed"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#2C2C2C',
                lineHeight: '1.6'
              }}
            >
              Ser el referente principal en el desarrollo empresarial de Las Piedras, 
              creando un ecosistema sólido que beneficie a toda la comunidad y 
              fortalezca el tejido empresarial regional. Aspiramos a ser reconocidos 
              como el centro de excelencia que conecta empresas, genera sinergias 
              y promueve la innovación, contribuyendo al desarrollo económico sostenible 
              de nuestra región y posicionando a Las Piedras como un polo empresarial 
              de referencia a nivel nacional.
            </p>
          </div>
          
          {/* Valores */}
          <div 
            className={`text-left transition-all duration-700 ease-out w-2/3 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
            }`}
            style={{ transitionDelay: '0.5s', marginLeft: 'auto', marginRight: '0' }}
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              VALORES
            </h3>
            <ul 
              className="text-base leading-relaxed space-y-2"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                color: '#2C2C2C',
                lineHeight: '1.6'
              }}
            >
              <li><strong>Compromiso:</strong> Con el desarrollo de nuestros socios y la comunidad local.</li>
              <li><strong>Transparencia:</strong> En todas nuestras acciones y decisiones.</li>
              <li><strong>Colaboración:</strong> Como base para el crecimiento conjunto.</li>
              <li><strong>Excelencia:</strong> En cada servicio que brindamos.</li>
              <li><strong>Innovación:</strong> Para adaptarnos a los desafíos del futuro.</li>
              <li><strong>Integridad:</strong> Como principio fundamental en nuestras relaciones.</li>
              <li><strong>Sostenibilidad:</strong> Para garantizar un futuro próspero para las próximas generaciones.</li>
            </ul>
          </div>
      </div>
    </section>
  );
}
