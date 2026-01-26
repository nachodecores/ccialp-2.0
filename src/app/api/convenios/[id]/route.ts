import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from('convenios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener convenio:', error);
    return NextResponse.json(
      { error: 'Error al obtener el convenio' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('convenios')
      .update({
        nombre: body.nombre,
        categoria: body.categoria,
        logo: body.logo,
        activo: body.activo,
        beneficios: body.beneficios,
        alcance: body.alcance,
        contacto_nombre: body.contacto_nombre,
        contacto_email: body.contacto_email,
        contacto_telefono: body.contacto_telefono,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar convenio:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el convenio' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error } = await supabaseAdmin
      .from('convenios')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Convenio eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar convenio:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el convenio' },
      { status: 500 }
    );
  }
}
