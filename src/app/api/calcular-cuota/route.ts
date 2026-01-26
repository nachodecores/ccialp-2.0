import { NextRequest, NextResponse } from 'next/server';
import { calcularCuota, DatosCalculo } from '@/lib/calcular-cuota';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Obtener parámetros de la URL
    const regimenTributario = searchParams.get('regimenTributario');
    const naturalezaJuridica = searchParams.get('naturalezaJuridica') || undefined;
    const tieneEmpleados = searchParams.get('tieneEmpleados') === 'true';
    const cantidadEmpleados = searchParams.get('cantidadEmpleados') 
      ? parseInt(searchParams.get('cantidadEmpleados')!) 
      : undefined;
    const volumenComprobantes = searchParams.get('volumenComprobantes') as '0-20' | '21-50' | '51-100' | '100+' || '0-20';
    
    // Necesidades recurrentes
    const declaracionesMensuales = searchParams.get('declaracionesMensuales') === 'true';
    const declaracionesAnuales = searchParams.get('declaracionesAnuales') === 'true';

    if (!regimenTributario) {
      return NextResponse.json(
        { error: 'El parámetro "regimenTributario" es requerido' },
        { status: 400 }
      );
    }

    const datos: DatosCalculo = {
      regimenTributario,
      naturalezaJuridica,
      tieneEmpleados,
      cantidadEmpleados,
      volumenComprobantes,
      necesidadesRecurrentes: {
        declaracionesMensuales,
        declaracionesAnuales,
      },
    };

    const resultado = calcularCuota(datos);

    return NextResponse.json(resultado, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al calcular cuota:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al calcular la cuota' },
      { status: 500 }
    );
  }
}
