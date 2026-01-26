"use client";

import { useState, useEffect } from 'react';
import { calcularCuota, DatosCalculo } from '@/lib/calcular-cuota';

type TipoAsociacion = 'gremial' | 'gestoria' | null;

export default function FormularioSuscripcion() {
  const [tipoAsociacion, setTipoAsociacion] = useState<TipoAsociacion>(null);
  const [resultadoCalculo, setResultadoCalculo] = useState<any>(null);
  const [calculando, setCalculando] = useState(false);

  // Para socio gremial: ¿tiene empresa?
  const [tieneEmpresa, setTieneEmpresa] = useState<boolean | null>(null);

  // Datos de la empresa (comunes a ambos tipos si tienen empresa)
  const [datosEmpresa, setDatosEmpresa] = useState({
    actividadPrincipal: '',
    nombreFirma: '',
    domicilio: '',
    rut: '',
    bps: '',
  });

  // Datos del formulario de gestoría
  const [datosGestoria, setDatosGestoria] = useState({
    naturalezaJuridica: '',
    regimenTributario: '',
    tieneEmpleados: false,
    cantidadEmpleados: 0,
    volumenComprobantes: '0-20' as '0-20' | '21-50' | '51-100' | '100+',
    declaracionesMensuales: false,
    declaracionesAnuales: false,
  });

  // Datos de contacto (comunes a ambos)
  const [datosContacto, setDatosContacto] = useState({
    nombre: '',
    telefono: '',
    email: '',
    numeroDocumento: '',
  });

  // Calcular cuota en tiempo real cuando cambian los datos relevantes
  useEffect(() => {
    if (tipoAsociacion === 'gestoria' && datosGestoria.regimenTributario) {
      const calcular = async () => {
        setCalculando(true);
        try {
          const datos: DatosCalculo = {
            regimenTributario: datosGestoria.regimenTributario,
            naturalezaJuridica: datosGestoria.naturalezaJuridica || undefined,
            tieneEmpleados: datosGestoria.tieneEmpleados,
            cantidadEmpleados: datosGestoria.tieneEmpleados ? datosGestoria.cantidadEmpleados : undefined,
            volumenComprobantes: datosGestoria.volumenComprobantes,
            necesidadesRecurrentes: {
              declaracionesMensuales: datosGestoria.declaracionesMensuales,
              declaracionesAnuales: datosGestoria.declaracionesAnuales,
            },
          };
          const resultado = calcularCuota(datos);
          setResultadoCalculo(resultado);
        } catch (error) {
          console.error('Error al calcular:', error);
          setResultadoCalculo(null);
        } finally {
          setCalculando(false);
        }
      };
      calcular();
    } else {
      setResultadoCalculo(null);
    }
  }, [tipoAsociacion, datosGestoria]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que si es socio gremial, haya respondido si tiene empresa
    if (tipoAsociacion === 'gremial' && tieneEmpresa === null) {
      alert('Por favor, indica si tienes empresa o no.');
      return;
    }
    
    // Aquí se enviará la solicitud
    console.log('Enviar solicitud:', { 
      tipoAsociacion, 
      tieneEmpresa: tipoAsociacion === 'gremial' ? tieneEmpresa : true,
      datosEmpresa, 
      datosGestoria, 
      datosContacto, 
      resultadoCalculo 
    });
  };

  return (
    <div className="max-w-4xl mx-auto pt-8">
      {/* Título y descripción */}
      <div className="text-center mb-8">
        <h1 
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
          style={{ 
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            color: '#0F3439'
          }}
        >
          Solicitar Asociación
        </h1>
        
        <p 
          className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            lineHeight: '1.5'
          }}
        >
          Completá el formulario y nos pondremos en contacto contigo a la brevedad 
          para iniciar el proceso de asociación.
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Selección de tipo de asociación */}
          {!tipoAsociacion && (
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                ¿Qué tipo de asociación te interesa? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTipoAsociacion('gremial')}
                  className="p-6 border-2 border-gray-300 rounded-xl hover:border-primary-green hover:bg-green-50 transition-all text-left"
                >
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                    Socio Gremial
                  </h3>
                  <p className="text-gray-600 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Representación gremial y acceso a convenios
                  </p>
                  <p className="text-2xl font-bold" style={{ color: '#21A85B', fontFamily: 'Kanit, sans-serif' }}>
                    $400/mes
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setTipoAsociacion('gestoria')}
                  className="p-6 border-2 border-gray-300 rounded-xl hover:border-primary-green hover:bg-green-50 transition-all text-left"
                >
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                    Con Gestoría
                  </h3>
                  <p className="text-gray-600 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Gestoría completa + beneficios gremiales
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Cuota según características de tu empresa
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Botón para volver atrás */}
          {tipoAsociacion && (
            <button
              type="button"
              onClick={() => {
                setTipoAsociacion(null);
                setResultadoCalculo(null);
                setTieneEmpresa(null);
                setDatosEmpresa({
                  actividadPrincipal: '',
                  nombreFirma: '',
                  domicilio: '',
                  rut: '',
                  bps: '',
                });
                setDatosContacto({
                  nombre: '',
                  telefono: '',
                  email: '',
                  numeroDocumento: '',
                });
              }}
              className="text-sm text-gray-600 hover:text-gray-800 mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              ← Cambiar tipo de asociación
            </button>
          )}

          {/* Formulario para Socio Gremial */}
          {tipoAsociacion === 'gremial' && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <strong>Cuota fija:</strong> $400/mes
                </p>
              </div>

              {/* Pregunta: ¿Tiene empresa? */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ¿Tiene empresa? *
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={tieneEmpresa === false}
                      onChange={() => setTieneEmpresa(false)}
                      className="mr-2 text-primary-green"
                    />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>No</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={tieneEmpresa === true}
                      onChange={() => setTieneEmpresa(true)}
                      className="mr-2 text-primary-green"
                    />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>Sí</span>
                  </label>
                </div>
              </div>

              {/* Datos de la empresa (si tiene empresa) */}
              {tieneEmpresa === true && (
                <div className="border-b pb-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                    Datos de la empresa
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Actividad principal *
                      </label>
                      <select
                        required
                        value={datosEmpresa.actividadPrincipal}
                        onChange={(e) => setDatosEmpresa({ ...datosEmpresa, actividadPrincipal: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="comercio">Comercio</option>
                        <option value="servicios">Servicios</option>
                        <option value="profesional">Profesional independiente</option>
                        <option value="asociacionCivil">Asociación Civil Sin Fines de Lucro</option>
                        <option value="rural">Rural</option>
                        <option value="domestico">Trabajo doméstico</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Nombre de la firma/empresa *
                      </label>
                      <input
                        type="text"
                        required
                        value={datosEmpresa.nombreFirma}
                        onChange={(e) => setDatosEmpresa({ ...datosEmpresa, nombreFirma: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="Nombre de la empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Domicilio *
                      </label>
                      <input
                        type="text"
                        required
                        value={datosEmpresa.domicilio}
                        onChange={(e) => setDatosEmpresa({ ...datosEmpresa, domicilio: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="Dirección completa"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Número RUT
                        </label>
                        <input
                          type="text"
                          value={datosEmpresa.rut}
                          onChange={(e) => setDatosEmpresa({ ...datosEmpresa, rut: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                          placeholder="Opcional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Número BPS
                        </label>
                        <input
                          type="text"
                          value={datosEmpresa.bps}
                          onChange={(e) => setDatosEmpresa({ ...datosEmpresa, bps: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                          placeholder="Opcional"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Datos de contacto */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                  Datos de Contacto
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Nombre y apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={datosContacto.nombre}
                      onChange={(e) => setDatosContacto({ ...datosContacto, nombre: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={datosContacto.telefono}
                      onChange={(e) => setDatosContacto({ ...datosContacto, telefono: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="099 123 456"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={datosContacto.email}
                    onChange={(e) => setDatosContacto({ ...datosContacto, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Cédula de identidad *
                  </label>
                  <input
                    type="text"
                    required
                    value={datosContacto.numeroDocumento}
                    onChange={(e) => setDatosContacto({ ...datosContacto, numeroDocumento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    placeholder="12345678"
                  />
                </div>
              </div>
            </>
          )}

          {/* Formulario para Con Gestoría */}
          {tipoAsociacion === 'gestoria' && (
            <>
              {/* SECCIÓN 1: Datos de la empresa */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                  SECCIÓN 1 – Datos de la empresa
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Nombre de la firma/empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={datosEmpresa.nombreFirma}
                      onChange={(e) => setDatosEmpresa({ ...datosEmpresa, nombreFirma: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Domicilio *
                    </label>
                    <input
                      type="text"
                      required
                      value={datosEmpresa.domicilio}
                      onChange={(e) => setDatosEmpresa({ ...datosEmpresa, domicilio: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Dirección completa"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Número RUT
                      </label>
                      <input
                        type="text"
                        value={datosEmpresa.rut}
                        onChange={(e) => setDatosEmpresa({ ...datosEmpresa, rut: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="Opcional"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Número BPS
                      </label>
                      <input
                        type="text"
                        value={datosEmpresa.bps}
                        onChange={(e) => setDatosEmpresa({ ...datosEmpresa, bps: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        placeholder="Opcional"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: Carga administrativa continua */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                  SECCIÓN 2 – Carga administrativa continua
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Actividad principal *
                    </label>
                    <select
                      required
                      value={datosEmpresa.actividadPrincipal}
                      onChange={(e) => setDatosEmpresa({ ...datosEmpresa, actividadPrincipal: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="comercio">Comercio</option>
                      <option value="servicios">Servicios</option>
                      <option value="profesional">Profesional independiente</option>
                      <option value="asociacionCivil">Asociación Civil Sin Fines de Lucro</option>
                      <option value="rural">Rural</option>
                      <option value="domestico">Trabajo doméstico</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Régimen tributario *
                    </label>
                    <select
                      required
                      value={datosGestoria.regimenTributario}
                      onChange={(e) => {
                        const nuevoRegimen = e.target.value;
                        setDatosGestoria({ 
                          ...datosGestoria, 
                          regimenTributario: nuevoRegimen,
                          // Limpiar naturaleza jurídica si el régimen no la requiere
                          naturalezaJuridica: ['rural', 'asociacionCivilSinFinesLucro', 'trabajoDomestico', 'noSe'].includes(nuevoRegimen) 
                            ? '' 
                            : datosGestoria.naturalezaJuridica
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="monotributo">Monotributo</option>
                      <option value="literalE">Literal E</option>
                      <option value="regimenIVAGeneral">Régimen IVA General</option>
                      <option value="rural">Rural</option>
                      <option value="asociacionCivilSinFinesLucro">Asociación Civil Sin Fines de Lucro</option>
                      <option value="trabajoDomestico">Trabajo doméstico</option>
                      <option value="noSe">No sé</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Naturaleza jurídica
                      {datosGestoria.regimenTributario && 
                       !['rural', 'asociacionCivilSinFinesLucro', 'trabajoDomestico', 'noSe'].includes(datosGestoria.regimenTributario) && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <select
                      required={
                        !!datosGestoria.regimenTributario && 
                        !['rural', 'asociacionCivilSinFinesLucro', 'trabajoDomestico', 'noSe'].includes(datosGestoria.regimenTributario)
                      }
                      value={datosGestoria.naturalezaJuridica}
                      onChange={(e) => setDatosGestoria({ ...datosGestoria, naturalezaJuridica: e.target.value })}
                      disabled={!!datosGestoria.regimenTributario && ['rural', 'asociacionCivilSinFinesLucro', 'trabajoDomestico', 'noSe'].includes(datosGestoria.regimenTributario)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="unipersonal">Unipersonal</option>
                      <option value="sociedadHecho">Sociedad de Hecho (SDH)</option>
                      <option value="srl">SRL</option>
                      <option value="sas">SAS</option>
                      <option value="sa">SA</option>
                      <option value="asociacionCivilSinFinesLucro">Asociación Civil Sin Fines de Lucro</option>
                      <option value="trabajoDomestico">Trabajo doméstico</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ¿Tu empresa tiene empleados en planilla? *
                    </label>
                    <div className="flex items-center space-x-6 gap-4">
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={datosGestoria.tieneEmpleados === false}
                            onChange={() => setDatosGestoria({ ...datosGestoria, tieneEmpleados: false, cantidadEmpleados: 0 })}
                            className="mr-2 text-primary-green"
                          />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>No</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={datosGestoria.tieneEmpleados === true}
                            onChange={() => setDatosGestoria({ ...datosGestoria, tieneEmpleados: true })}
                            className="mr-2 text-primary-green"
                          />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Sí</span>
                        </label>
                      </div>
                      {datosGestoria.tieneEmpleados && (
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700 whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                            ¿Cuántos? *
                          </label>
                          <input
                            type="number"
                            min="1"
                            required={datosGestoria.tieneEmpleados}
                            value={datosGestoria.cantidadEmpleados || ''}
                            onChange={(e) => setDatosGestoria({ ...datosGestoria, cantidadEmpleados: parseInt(e.target.value) || 0 })}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Volumen mensual de comprobantes (emitidos + recibidos) *
                    </label>
                    <select
                      required
                      value={datosGestoria.volumenComprobantes}
                      onChange={(e) => setDatosGestoria({ ...datosGestoria, volumenComprobantes: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    >
                      <option value="0-20">0 a 20</option>
                      <option value="21-50">21 a 50</option>
                      <option value="51-100">51 a 100</option>
                      <option value="100+">Más de 100</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Necesidades administrativas recurrentes
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={datosGestoria.declaracionesMensuales}
                          onChange={(e) => setDatosGestoria({ ...datosGestoria, declaracionesMensuales: e.target.checked })}
                          className="mr-2 text-primary-green"
                        />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>Necesito que gestionen mis declaraciones mensuales (empresas CEDE)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={datosGestoria.declaracionesAnuales}
                          onChange={(e) => setDatosGestoria({ ...datosGestoria, declaracionesAnuales: e.target.checked })}
                          className="mr-2 text-primary-green"
                        />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>Necesito que gestionen mis declaraciones anuales</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={!datosGestoria.declaracionesMensuales && !datosGestoria.declaracionesAnuales}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setDatosGestoria({
                                ...datosGestoria,
                                declaracionesMensuales: false,
                                declaracionesAnuales: false,
                              });
                            }
                          }}
                          className="mr-2 text-primary-green"
                        />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>Ninguna de las anteriores</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 3: Datos de contacto */}
              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                  SECCIÓN 3 – Datos de contacto
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={datosContacto.nombre}
                      onChange={(e) => setDatosContacto({ ...datosContacto, nombre: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={datosContacto.telefono}
                      onChange={(e) => setDatosContacto({ ...datosContacto, telefono: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="099 123 456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={datosContacto.email}
                      onChange={(e) => setDatosContacto({ ...datosContacto, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Cédula de identidad *
                    </label>
                    <input
                      type="text"
                      required
                      value={datosContacto.numeroDocumento}
                      onChange={(e) => setDatosContacto({ ...datosContacto, numeroDocumento: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="12345678"
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN 4: Resultado automático */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}>
                  SECCIÓN 4 – Resultado automático
                </h2>
                
                {calculando ? (
                  <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Calculando...</p>
                ) : resultadoCalculo ? (
                  <>
                    <div className="mb-4">
                      <p className="text-lg font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Tu cuota mensual estimada es:
                      </p>
                      <p 
                        className="text-4xl font-bold"
                        style={{ color: '#21A85B', fontFamily: 'Kanit, sans-serif' }}
                      >
                        ${resultadoCalculo.total.toLocaleString('es-UY')}
                      </p>
                      <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        IVA incluído
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Este valor es estimativo. El monto final se confirma al revisar la documentación y el régimen tributario correspondiente.
                    </p>
                  </>
                ) : (
                  <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Completa los campos de la Sección 2 para ver tu cuota estimada.
                  </p>
                )}
              </div>
            </>
          )}

          {/* Botón de envío */}
          {tipoAsociacion && (
            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                style={{ 
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: '600',
                  backgroundColor: '#21A85B'
                }}
              >
                ENVIAR SOLICITUD
                <img 
                  src="/assets/icons/icono-enviar.svg" 
                  alt="Enviar" 
                  className="ml-2 w-4 h-4" 
                />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
