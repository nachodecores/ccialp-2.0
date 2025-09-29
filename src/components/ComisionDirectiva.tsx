export default function ComisionDirectiva() {
  const comision = [
    {
      id: 1,
      nombre: "Carlos Delfino",
      cargo: "Presidente",
      empresa: "Ferox S.R.L.",
      esEjecutivo: true
    },
    {
      id: 2,
      nombre: "Andrés Barabino",
      cargo: "Vicepresidente",
      empresa: "Carambula Administraciones",
      esEjecutivo: true
    },
    {
      id: 3,
      nombre: "Joaquín Vilar",
      cargo: "Secretario",
      empresa: "Joyería Arte",
      esEjecutivo: true
    },
    {
      id: 4,
      nombre: "Oscar Vargas",
      cargo: "Tesorero",
      empresa: "eShop Informática",
      esEjecutivo: true
    },
    {
      id: 5,
      nombre: "Natalia Machín",
      cargo: "Vocal",
      empresa: "Maple Vila",
      esEjecutivo: false
    },
    {
      id: 6,
      nombre: "Fabricio Camacho",
      cargo: "Vocal",
      empresa: "FullCar",
      esEjecutivo: false
    },
    {
      id: 7,
      nombre: "Gastón Rossi",
      cargo: "Vocal",
      empresa: "Rossi Administraciones",
      esEjecutivo: false
    },
    {
      id: 8,
      nombre: "Cristina Villamayor",
      cargo: "Vocal",
      empresa: "Empresa Villamayor",
      esEjecutivo: false
    },
    {
      id: 9,
      nombre: "Victorio Geron",
      cargo: "Vocal",
      empresa: "Inmobiliaria Las Piedras",
      esEjecutivo: false
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ 
              fontFamily: 'Kanit, sans-serif',
              fontWeight: '600',
              color: '#0F3439'
            }}
          >
            Comisión Directiva
          </h2>
          <p 
            className="text-lg"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
              color: '#6B6B6B',
              lineHeight: '1.6'
            }}
          >
            Conoce a los miembros que lideran nuestra institución
          </p>
        </div>
        
        {/* Formato Lista */}
        <div className="max-w-4xl mx-auto">
          {/* Cargos Ejecutivos */}
          <div className="mb-12">
            <h3 
              className="text-2xl font-bold mb-6"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Cargos Ejecutivos
            </h3>
            <div className="space-y-4">
              {comision.filter(miembro => miembro.esEjecutivo).map((miembro, index) => (
                <div 
                  key={miembro.id}
                  className="flex items-center py-4 px-6 bg-gradient-to-r from-primary-green/5 to-transparent border-l-4 border-primary-green hover:from-primary-green/10 transition-colors duration-200"
                >
                  {/* Avatar pequeño */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: '#21A85B' }}>
                    <span className="text-sm text-white font-bold">
                      {miembro.nombre.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 
                          className="text-lg font-semibold"
                          style={{ 
                            fontFamily: 'Kanit, sans-serif',
                            fontWeight: '600',
                            color: '#0F3439'
                          }}
                        >
                          {miembro.nombre}
                        </h4>
                        <p 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '400',
                            color: '#6B6B6B'
                          }}
                        >
                          {miembro.empresa}
                        </p>
                      </div>
                      <div 
                        className="text-sm font-semibold px-3 py-1 rounded-full mt-2 md:mt-0 inline-block"
                        style={{ 
                          backgroundColor: '#21A85B',
                          color: '#ffffff',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {miembro.cargo}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocales */}
          <div>
            <h3 
              className="text-2xl font-bold mb-6"
              style={{ 
                fontFamily: 'Kanit, sans-serif',
                fontWeight: '600',
                color: '#0F3439'
              }}
            >
              Vocales
            </h3>
            <div className="space-y-3">
              {comision.filter(miembro => !miembro.esEjecutivo).map((miembro, index) => (
                <div 
                  key={miembro.id}
                  className="flex items-center py-3 px-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-l-4 border-gray-300"
                >
                  {/* Avatar pequeño */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: '#6B6B6B' }}>
                    <span className="text-xs text-white font-bold">
                      {miembro.nombre.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 
                          className="text-base font-semibold"
                          style={{ 
                            fontFamily: 'Kanit, sans-serif',
                            fontWeight: '600',
                            color: '#0F3439'
                          }}
                        >
                          {miembro.nombre}
                        </h4>
                        <p 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '400',
                            color: '#6B6B6B'
                          }}
                        >
                          {miembro.empresa}
                        </p>
                      </div>
                      <div 
                        className="text-xs font-semibold px-2 py-1 rounded-full mt-2 md:mt-0 inline-block"
                        style={{ 
                          backgroundColor: '#6B6B6B',
                          color: '#ffffff',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {miembro.cargo}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
