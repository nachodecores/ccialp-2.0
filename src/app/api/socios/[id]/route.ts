import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { Socio } from '@/types/socios';

// GET /api/socios/[id] - Obtener un socio específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseAdmin = await getSupabaseAdmin();
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from('socios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Socio no encontrado' },
          { status: 404 }
        );
      }
      console.error('Error al obtener socio:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al obtener el socio' },
      { status: 500 }
    );
  }
}

// PUT /api/socios/[id] - Actualizar socio
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseAdmin = await getSupabaseAdmin();
    const { id } = await params;
    const body = await request.json();

    // Validar que el socio existe
    const { data: socioExistente, error: errorExistente } = await supabaseAdmin
      .from('socios')
      .select('id')
      .eq('id', id)
      .single();

    if (errorExistente || !socioExistente) {
      return NextResponse.json(
        { error: 'Socio no encontrado' },
        { status: 404 }
      );
    }

    // Preparar datos para actualizar (solo campos que vienen en el body)
    const datosActualizacion: Partial<Socio> = {};

    // Campos que se pueden actualizar
    const camposPermitidos = [
      'rut', 'nombre', 'apellido', 'razon_social', 'nombre_fantasia',
      'forma_juridica', 'descripcion', 'segmento_principal', 'tipo_socio',
      'celular', 'telefono', 'email', 'calle', 'numero', 'depto', 'ciudad',
      'observaciones_direccion', 'forma_pago', 'frecuencia_pago', 'cuota_mensual',
      'al_dia_cuota', 'cliente_cpy',
      'adherido_dia_piedras'
    ];

    camposPermitidos.forEach(campo => {
      if (body[campo] !== undefined) {
        if (campo === 'cuota_mensual' && body[campo] !== null) {
          datosActualizacion[campo as keyof Socio] = parseFloat(body[campo]) as any;
        } else if (campo === 'al_dia_cuota') {
          // al_dia_cuota es booleano
          datosActualizacion[campo as keyof Socio] = body[campo] as any;
        } else {
          datosActualizacion[campo as keyof Socio] = body[campo] || null;
        }
      }
    });

    const { data, error } = await supabaseAdmin
      .from('socios')
      .update(datosActualizacion)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar socio:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el socio' },
      { status: 500 }
    );
  }
}

// DELETE /api/socios/[id] - Eliminar socio
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseAdmin = await getSupabaseAdmin();
    const { id } = await params;

    // Verificar que el socio existe
    const { data: socioExistente, error: errorExistente } = await supabaseAdmin
      .from('socios')
      .select('id, numero_socio, nombre')
      .eq('id', id)
      .single();

    if (errorExistente || !socioExistente) {
      return NextResponse.json(
        { error: 'Socio no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar el socio (CASCADE eliminará beneficiarios y carnés asociados)
    const { error } = await supabaseAdmin
      .from('socios')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar socio:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Socio ${socioExistente.numero_socio} - ${socioExistente.nombre} eliminado correctamente`
    });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el socio' },
      { status: 500 }
    );
  }
}

