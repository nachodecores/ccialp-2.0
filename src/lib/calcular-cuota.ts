import configPrecios from '@/data/config-precios.json';

export interface DatosCalculo {
  regimenTributario: string;
  naturalezaJuridica?: string;
  tieneEmpleados: boolean;
  cantidadEmpleados?: number;
  volumenComprobantes: '0-20' | '21-50' | '51-100' | '100+';
  necesidadesRecurrentes?: {
    declaracionesMensuales?: boolean;
    declaracionesAnuales?: boolean;
  };
}

export interface ResultadoCalculo {
  precioBase: number;
  ajusteNaturaleza: number;
  precioBaseAjustado: number;
  multiplicador: number;
  subtotal: number;
  recargos: number;
  costoEmpleados: number;
  subtotalSinIVA: number;
  iva: number;
  cuotaGremial: number;
  total: number;
  desglose: {
    regimenTributario: string;
    naturalezaJuridica?: string;
    tienePersonal: boolean;
    cantidadEmpleados?: number;
    precioBaseRegimen: number;
    factorAjuste?: number;
    costoPorEmpleados?: Array<{ empleado: number; costo: number }>;
    multiplicadorAplicado: number;
    recargosAplicados: Array<{ concepto: string; monto: number }>;
  };
}

export function calcularCuota(datos: DatosCalculo): ResultadoCalculo {
  // 1. Obtener precio base según régimen tributario
  const preciosRegimen = configPrecios.preciosBasePorRegimen[datos.regimenTributario as keyof typeof configPrecios.preciosBasePorRegimen];
  
  if (!preciosRegimen) {
    throw new Error(`No se encontraron precios para el régimen tributario: ${datos.regimenTributario}`);
  }

  // 2. Obtener precio base único (ya no distingue sin/con personal)
  const precioBase = preciosRegimen.precioBase || 0;

  // 3. Aplicar ajuste por naturaleza jurídica (si aplica)
  let ajusteNaturaleza = 1.0;
  let precioBaseAjustado = precioBase;
  
  // Casos especiales que no requieren ajuste por naturaleza jurídica (tienen precio base directo)
  const casosEspeciales = ['rural', 'asociacionCivilSinFinesLucro', 'trabajoDomestico'];
  const requiereAjuste = !casosEspeciales.includes(datos.regimenTributario);
  
  if (requiereAjuste && datos.naturalezaJuridica) {
    const ajuste = configPrecios.ajustesPorNaturalezaJuridica[datos.naturalezaJuridica as keyof typeof configPrecios.ajustesPorNaturalezaJuridica];
    if (ajuste) {
      ajusteNaturaleza = ajuste.factor;
      precioBaseAjustado = precioBase * ajusteNaturaleza;
    }
  }

  // 4. Calcular costo por empleados (nueva lógica: 1er $1000, 2do $500, 3ro+ decremental)
  let costoEmpleados = 0;
  const costoPorEmpleados: Array<{ empleado: number; costo: number }> = [];

  if (datos.tieneEmpleados && datos.cantidadEmpleados && datos.cantidadEmpleados > 0) {
    // Obtener valores de configuración
    const costosEmpleados = configPrecios.costosEmpleados || {
      primerEmpleado: 1000,
      segundoEmpleado: 500,
      factorDescuento: 0.9,
      costoMinimo: 250
    };

    for (let i = 1; i <= datos.cantidadEmpleados; i++) {
      let costoEmpleado = 0;
      
      if (i === 1) {
        // Primer empleado
        costoEmpleado = costosEmpleados.primerEmpleado;
      } else if (i === 2) {
        // Segundo empleado
        costoEmpleado = costosEmpleados.segundoEmpleado;
      } else {
        // Tercer empleado en adelante: segundoEmpleado × (factorDescuento)^(i-2), mínimo costoMinimo
        costoEmpleado = Math.max(
          costosEmpleados.segundoEmpleado * Math.pow(costosEmpleados.factorDescuento, i - 2),
          costosEmpleados.costoMinimo
        );
      }
      
      costoPorEmpleados.push({ empleado: i, costo: Math.round(costoEmpleado * 100) / 100 });
      costoEmpleados += costoEmpleado;
    }
  }

  // 5. Aplicar multiplicador por volumen de comprobantes (solo al precio base, no a los empleados)
  const multiplicador = configPrecios.multiplicadoresVolumen[datos.volumenComprobantes] || 1.0;
  const precioBaseConMultiplicador = precioBaseAjustado * multiplicador;
  // El subtotal es precio base con multiplicador + costo de empleados (sin multiplicar)
  const subtotal = precioBaseConMultiplicador + costoEmpleados;

  // 6. Calcular recargos por necesidades recurrentes
  const recargosAplicados: Array<{ concepto: string; monto: number }> = [];
  let recargosTotal = 0;

  if (datos.necesidadesRecurrentes) {
    if (datos.necesidadesRecurrentes.declaracionesMensuales) {
      const monto = configPrecios.recargosEspeciales.declaracionesMensuales;
      recargosAplicados.push({ concepto: 'Declaraciones Mensuales', monto });
      recargosTotal += monto;
    }
    if (datos.necesidadesRecurrentes.declaracionesAnuales) {
      const monto = configPrecios.recargosEspeciales.declaracionesAnuales;
      recargosAplicados.push({ concepto: 'Declaraciones Anuales', monto });
      recargosTotal += monto;
    }
  }

  // 7. Calcular subtotal sin IVA (subtotal + recargos, sin cuota gremial)
  const subtotalSinIVA = subtotal + recargosTotal;

  // 8. Calcular IVA (22% sobre subtotal sin IVA, la cuota gremial NO lleva IVA)
  const iva = subtotalSinIVA * 0.22;

  // 9. Obtener cuota gremial (todos los socios con gestoría tienen cuota gremial, sin IVA)
  const cuotaGremial = configPrecios.cuotaGremial || 400;

  // 10. Calcular total (subtotal sin IVA + IVA + cuota gremial)
  const total = subtotalSinIVA + iva + cuotaGremial;

  return {
    precioBase,
    ajusteNaturaleza,
    precioBaseAjustado,
    multiplicador,
    subtotal,
    recargos: recargosTotal,
    costoEmpleados,
    subtotalSinIVA,
    iva,
    cuotaGremial,
    total,
    desglose: {
      regimenTributario: datos.regimenTributario,
      naturalezaJuridica: datos.naturalezaJuridica,
      tienePersonal: datos.tieneEmpleados,
      cantidadEmpleados: datos.cantidadEmpleados,
      precioBaseRegimen: precioBase,
      factorAjuste: requiereAjuste && datos.naturalezaJuridica ? ajusteNaturaleza : undefined,
      costoPorEmpleados: costoPorEmpleados.length > 0 ? costoPorEmpleados : undefined,
      multiplicadorAplicado: multiplicador,
      recargosAplicados,
    },
  };
}
