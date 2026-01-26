'use client';

import { useState, useEffect } from 'react';
import configPrecios from '@/data/config-precios.json';

interface ConfigPrecios {
  preciosBasePorRegimen: {
    [key: string]: {
      precioBase: number;
    };
  };
  ajustesPorNaturalezaJuridica: {
    [key: string]: {
      factor: number;
    };
  };
  multiplicadoresVolumen: {
    [key: string]: number;
  };
  recargosEspeciales: {
    [key: string]: number;
  };
  costosEmpleados: {
    primerEmpleado: number;
    segundoEmpleado: number;
    factorDescuento: number;
    costoMinimo: number;
  };
  cuotaGremial: number;
}

export default function AjustarPrecios() {
  const [config, setConfig] = useState<ConfigPrecios>(configPrecios as ConfigPrecios);
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  // Datos de prueba
  const [testData, setTestData] = useState({
    regimenTributario: 'monotributo',
    naturalezaJuridica: '',
    tieneEmpleados: false,
    cantidadEmpleados: 0,
    volumenComprobantes: '0-20' as '0-20' | '21-50' | '51-100' | '100+',
    declaracionesMensuales: false,
    declaracionesAnuales: false,
  });

  const handleSave = async () => {
    try {
      setSaved(false);
      const response = await fetch('/api/guardar-precios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar la configuración');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      console.log('Configuración guardada exitosamente en config-precios.json');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert(error instanceof Error ? error.message : 'Error al guardar la configuración');
    }
  };

  const handleTest = async () => {
    try {
      const tieneEmpleados = testData.cantidadEmpleados > 0;
      const params = new URLSearchParams({
        regimenTributario: testData.regimenTributario,
        tieneEmpleados: tieneEmpleados.toString(),
        cantidadEmpleados: testData.cantidadEmpleados.toString(),
        volumenComprobantes: testData.volumenComprobantes,
        declaracionesMensuales: testData.declaracionesMensuales.toString(),
        declaracionesAnuales: testData.declaracionesAnuales.toString(),
      });
      
      if (testData.naturalezaJuridica) {
        params.append('naturalezaJuridica', testData.naturalezaJuridica);
      }

      const response = await fetch(`/api/calcular-cuota?${params}`);
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      console.error('Error al probar cálculo:', error);
    }
  };

  const updatePrecio = (regimen: string, valor: number) => {
    setConfig((prev) => ({
      ...prev,
      preciosBasePorRegimen: {
        ...prev.preciosBasePorRegimen,
        [regimen]: {
          precioBase: valor,
        },
      },
    }));
  };

  const updateAjuste = (naturaleza: string, factor: number) => {
    setConfig((prev) => ({
      ...prev,
      ajustesPorNaturalezaJuridica: {
        ...prev.ajustesPorNaturalezaJuridica,
        [naturaleza]: {
          factor: factor,
        },
      },
    }));
  };

  const updateMultiplicador = (volumen: string, valor: number) => {
    setConfig((prev) => ({
      ...prev,
      multiplicadoresVolumen: {
        ...prev.multiplicadoresVolumen,
        [volumen]: valor,
      },
    }));
  };

  const updateRecargo = (tipo: string, valor: number) => {
    setConfig((prev) => ({
      ...prev,
      recargosEspeciales: {
        ...prev.recargosEspeciales,
        [tipo]: valor,
      },
    }));
  };

  const updateCostoEmpleado = (campo: 'primerEmpleado' | 'segundoEmpleado' | 'factorDescuento' | 'costoMinimo', valor: number) => {
    setConfig((prev) => ({
      ...prev,
      costosEmpleados: {
        ...prev.costosEmpleados,
        [campo]: valor,
      },
    }));
  };

  const updateCuotaGremial = (valor: number) => {
    setConfig((prev) => ({
      ...prev,
      cuotaGremial: valor,
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-6xl mx-auto">
        <h1 
          className="text-2xl md:text-3xl font-bold mb-4 md:mb-6"
          style={{ 
            fontFamily: 'Kanit, sans-serif',
            color: '#0F3439'
          }}
        >
          Panel de Administración - Ajustar Precios
        </h1>

        {/* Sección: Cuota Gremial */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Cuota Gremial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Cuota Gremial Mensual</label>
              <input
                type="number"
                value={config.cuotaGremial}
                onChange={(e) => updateCuotaGremial(parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Todos los socios con gestoría incluyen esta cuota gremial en su total
              </p>
            </div>
          </div>
        </div>

        {/* Sección: Precios Base por Régimen Tributario */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Precios Base por Régimen Tributario
          </h2>
          <div className="space-y-3">
            {Object.entries(config.preciosBasePorRegimen).map(([regimen, precios]) => (
              <div key={regimen} className="border-b pb-3 last:border-b-0">
                <h3 className="font-semibold mb-2 text-sm capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {regimen.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Precio Base</label>
                    <input
                      type="number"
                      value={precios.precioBase}
                      onChange={(e) => updatePrecio(regimen, parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Ajustes por Naturaleza Jurídica */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Ajustes por Naturaleza Jurídica (Factor)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(config.ajustesPorNaturalezaJuridica).map(([naturaleza, ajuste]) => (
              <div key={naturaleza}>
                <label className="block text-xs text-gray-600 mb-1 capitalize">
                  {naturaleza.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={ajuste.factor}
                  onChange={(e) => updateAjuste(naturaleza, parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Multiplicadores */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Multiplicadores por Volumen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(config.multiplicadoresVolumen).map(([volumen, valor]) => (
              <div key={volumen}>
                <label className="block text-xs text-gray-600 mb-1">{volumen}</label>
                <input
                  type="number"
                  step="0.1"
                  value={valor}
                  onChange={(e) => updateMultiplicador(volumen, parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Recargos */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Recargos Especiales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(config.recargosEspeciales).map(([tipo, valor]) => (
              <div key={tipo}>
                <label className="block text-xs text-gray-600 mb-1 capitalize">
                  {tipo.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  value={valor}
                  onChange={(e) => updateRecargo(tipo, parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Costos de Empleados */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Costos de Empleados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Primer Empleado</label>
              <input
                type="number"
                value={config.costosEmpleados.primerEmpleado}
                onChange={(e) => updateCostoEmpleado('primerEmpleado', parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Segundo Empleado</label>
              <input
                type="number"
                value={config.costosEmpleados.segundoEmpleado}
                onChange={(e) => updateCostoEmpleado('segundoEmpleado', parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Factor Descuento (0-1)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={config.costosEmpleados.factorDescuento}
                onChange={(e) => updateCostoEmpleado('factorDescuento', parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Multiplicador para empleados 3+ (ej: 0.9 = 10% descuento)
              </p>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Costo Mínimo</label>
              <input
                type="number"
                value={config.costosEmpleados.costoMinimo}
                onChange={(e) => updateCostoEmpleado('costoMinimo', parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo para empleados 3+
              </p>
            </div>
          </div>
        </div>

        {/* Sección: Probar Cálculo */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-4">
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: 'Kanit, sans-serif', color: '#0F3439' }}
          >
            Probar Cálculo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Régimen Tributario *</label>
              <select
                value={testData.regimenTributario}
                onChange={(e) => setTestData({ ...testData, regimenTributario: e.target.value })}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              >
                <option value="monotributo">Monotributo</option>
                <option value="literalE">Literal E</option>
                <option value="regimenIVAGeneral">Régimen IVA General</option>
                <option value="rural">Rural</option>
                <option value="asociacionCivilSinFinesLucro">Asociación Civil Sin Fines de Lucro</option>
                <option value="trabajoDomestico">Trabajo Doméstico</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Naturaleza Jurídica</label>
              <select
                value={testData.naturalezaJuridica}
                onChange={(e) => setTestData({ ...testData, naturalezaJuridica: e.target.value })}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              >
                <option value="">Ninguna (solo régimen)</option>
                <option value="unipersonal">Unipersonal</option>
                <option value="sociedadHecho">Sociedad de Hecho (SDH)</option>
                <option value="srl">SRL</option>
                <option value="sas">SAS</option>
                <option value="sa">SA</option>
                <option value="asociacionCivilSinFinesLucro">Asociación Civil Sin Fines de Lucro</option>
                <option value="trabajoDomestico">Trabajo Doméstico</option>
                <option value="rural">Rural</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Volumen Comprobantes</label>
                  <select
                    value={testData.volumenComprobantes}
                    onChange={(e) => setTestData({ ...testData, volumenComprobantes: e.target.value as any })}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
                  >
                    <option value="0-20">0-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Cantidad de Empleados</label>
                  <input
                    type="number"
                    min="0"
                    value={testData.cantidadEmpleados}
                    onChange={(e) => setTestData({ ...testData, cantidadEmpleados: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={testData.declaracionesMensuales}
                  onChange={(e) => setTestData({ ...testData, declaracionesMensuales: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-xs text-gray-600">Declaraciones Mensuales</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={testData.declaracionesAnuales}
                  onChange={(e) => setTestData({ ...testData, declaracionesAnuales: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-xs text-gray-600">Declaraciones Anuales</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                Probar Cálculo
              </button>
              {testResult && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Cuota estimada:</span>
                    <span 
                      className="text-xl font-bold"
                      style={{ color: '#21A85B', fontFamily: 'Kanit, sans-serif' }}
                    >
                      ${testResult.total.toLocaleString('es-UY')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">IVA incluído</span>
                </div>
              )}
            </div>
            
            {/* Desglose matemático completo */}
            {testResult && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: 'Kanit, sans-serif' }}>
                  Desglose del Cálculo
                </h3>
                <div className="space-y-2 text-xs">
                  {/* Línea 1: Cuota base con ajuste por naturaleza jurídica */}
                  <div className="py-1 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600">
                        1. Cuota base {(() => {
                          const regimen = testResult.desglose.regimenTributario.replace(/([A-Z])/g, ' $1').trim();
                          let naturaleza = '';
                          if (testResult.desglose.naturalezaJuridica) {
                            const nat = testResult.desglose.naturalezaJuridica;
                            // Asegurar mayúsculas para SRL, SAS, SA
                            if (nat === 'srl') naturaleza = 'SRL';
                            else if (nat === 'sas') naturaleza = 'SAS';
                            else if (nat === 'sa') naturaleza = 'SA';
                            else naturaleza = nat.replace(/([A-Z])/g, ' $1').trim();
                          }
                          if (testResult.desglose.factorAjuste && testResult.desglose.factorAjuste !== 1) {
                            return `(${regimen} × ${naturaleza} × ${testResult.ajusteNaturaleza} × ${testResult.multiplicador})`;
                          }
                          return `(${regimen} × ${testResult.multiplicador})`;
                        })()}:
                      </span>
                      <span className="font-semibold">
                        ${(testResult.precioBaseAjustado * testResult.multiplicador).toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="ml-4 mt-1 space-y-0.5 text-gray-500">
                      <div>• Precio Base: ${testResult.precioBase.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      {testResult.desglose.factorAjuste && testResult.desglose.factorAjuste !== 1 && (
                        <div>• Ajuste Naturaleza Jurídica: × {testResult.ajusteNaturaleza}</div>
                      )}
                      {testResult.multiplicador !== 1 && (
                        <div>• Multiplicador Volumen: × {testResult.multiplicador}</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Línea 2: Costo de Empleados */}
                  <div className="py-1 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600">2. Costo de Empleados:</span>
                      <span className="font-semibold">${testResult.costoEmpleados.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    {testResult.desglose.costoPorEmpleados && testResult.desglose.costoPorEmpleados.length > 0 && (
                      <div className="ml-4 mt-1 space-y-0.5 text-gray-500">
                        {testResult.desglose.costoPorEmpleados.map((item: any) => (
                          <div key={item.empleado}>
                            • Empleado {item.empleado}: ${item.costo.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Línea 3: Recargos Especiales */}
                  <div className="py-1 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600">3. Recargos Especiales:</span>
                      <span className="font-semibold">${testResult.recargos.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    {testResult.desglose.recargosAplicados && testResult.desglose.recargosAplicados.length > 0 && (
                      <div className="ml-4 mt-1 space-y-0.5 text-gray-500">
                        {testResult.desglose.recargosAplicados.map((recargo: any) => (
                          <div key={recargo.concepto}>
                            • {recargo.concepto}: ${recargo.monto.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Línea 4: IVA */}
                  <div className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-gray-600">4. IVA:</span>
                    <span className="font-semibold">${testResult.iva.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  
                  {/* Línea 5: Cuota Gremial */}
                  <div className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-gray-600">5. Cuota Gremial (sin IVA):</span>
                    <span className="font-semibold">${testResult.cuotaGremial.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  
                  {/* Total Final */}
                  <div className="flex justify-between items-center py-2 pt-3 border-t-2 border-gray-400">
                    <span className="text-base font-bold text-gray-800">TOTAL FINAL (IVA incluído):</span>
                    <span 
                      className="text-lg font-bold"
                      style={{ color: '#21A85B', fontFamily: 'Kanit, sans-serif' }}
                    >
                      ${testResult.total.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
            style={{ fontFamily: 'Kanit, sans-serif' }}
          >
            {saved ? '✓ Guardado' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

