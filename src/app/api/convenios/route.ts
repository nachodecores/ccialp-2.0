import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activo = searchParams.get('activo');
    const categoria = searchParams.get('categoria');

    let query = supabaseAdmin
      .from('convenios')
      .select('*')
      .order('nombre', { ascending: true });

    if (activo !== null) {
      query = query.eq('activo', activo === 'true');
    }

    if (categoria) {
      query = query.eq('categoria', categoria);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener convenios:', error);
    return NextResponse.json(
      { error: 'Error al obtener los convenios' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('convenios')
      .insert({
        nombre: body.nombre,
        categoria: body.categoria || null,
        logo: body.logo || null,
        activo: body.activo !== undefined ? body.activo : true,
        beneficios: body.beneficios || null,
        alcance: body.alcance || null,
        contacto_nombre: body.contacto_nombre || null,
        contacto_email: body.contacto_email || null,
        contacto_telefono: body.contacto_telefono || null,
        fecha_inicio: body.fecha_inicio || null,
        fecha_fin: body.fecha_fin || null,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error al crear convenio:', error);
    return NextResponse.json(
      { error: 'Error al crear el convenio' },
      { status: 500 }
    );
  }
}
