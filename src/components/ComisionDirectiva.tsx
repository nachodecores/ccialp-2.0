export default function ComisionDirectiva() {
  const comision = [
    {
      id: 1,
      nombre: "Dr. Juan Pérez",
      cargo: "Presidente",
      empresa: "Pérez & Asociados",
      telefono: "(598) 2364 1234",
      email: "jperez@ccialp.org.uy"
    },
    {
      id: 2,
      nombre: "Ing. María González",
      cargo: "Vicepresidenta",
      empresa: "González Industrial",
      telefono: "(598) 2364 5678",
      email: "mgonzalez@ccialp.org.uy"
    },
    {
      id: 3,
      nombre: "Lic. Carlos Rodríguez",
      cargo: "Secretario",
      empresa: "Rodríguez Consultores",
      telefono: "(598) 2364 9012",
      email: "crodriguez@ccialp.org.uy"
    },
    {
      id: 4,
      nombre: "C.P. Ana Martínez",
      cargo: "Tesorera",
      empresa: "Martínez Contadores",
      telefono: "(598) 2364 3456",
      email: "amartinez@ccialp.org.uy"
    },
    {
      id: 5,
      nombre: "Arq. Roberto Silva",
      cargo: "Vocal",
      empresa: "Silva Arquitectos",
      telefono: "(598) 2364 7890",
      email: "rsilva@ccialp.org.uy"
    },
    {
      id: 6,
      nombre: "Dra. Laura Fernández",
      cargo: "Vocal",
      empresa: "Fernández Legal",
      telefono: "(598) 2364 2468",
      email: "lfernandez@ccialp.org.uy"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comision.map((miembro) => (
            <div 
              key={miembro.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#21A85B' }}>
                <span className="text-2xl text-white font-bold">
                  {miembro.nombre.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              {/* Información del miembro */}
              <div className="text-center">
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ 
                    fontFamily: 'Kanit, sans-serif',
                    fontWeight: '600',
                    color: '#0F3439'
                  }}
                >
                  {miembro.nombre}
                </h3>
                
                <div 
                  className="text-sm font-semibold mb-2 px-3 py-1 rounded-full inline-block"
                  style={{ 
                    backgroundColor: '#21A85B',
                    color: '#ffffff',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  {miembro.cargo}
                </div>
                
                <p 
                  className="text-sm mb-3"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400',
                    color: '#6B6B6B'
                  }}
                >
                  {miembro.empresa}
                </p>
                
                <div className="space-y-1">
                  <p 
                    className="text-xs"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#2C2C2C'
                    }}
                  >
                    📞 {miembro.telefono}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#2C2C2C'
                    }}
                  >
                    ✉️ {miembro.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
