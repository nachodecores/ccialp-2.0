import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar que el body tenga la estructura correcta
    if (!body.preciosBasePorRegimen || !body.ajustesPorNaturalezaJuridica || 
        !body.multiplicadoresVolumen || !body.recargosEspeciales || !body.costosEmpleados || 
        typeof body.cuotaGremial !== 'number') {
      return NextResponse.json(
        { error: 'Estructura de datos inválida' },
        { status: 400 }
      );
    }

    // Ruta al archivo JSON (desde la raíz del proyecto)
    const filePath = join(process.cwd(), 'src', 'data', 'config-precios.json');
    
    // Escribir el archivo con formato JSON legible
    const jsonContent = JSON.stringify(body, null, 2);
    await writeFile(filePath, jsonContent, 'utf-8');

    return NextResponse.json(
      { message: 'Configuración guardada exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al guardar configuración:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al guardar la configuración' },
      { status: 500 }
    );
  }
}

