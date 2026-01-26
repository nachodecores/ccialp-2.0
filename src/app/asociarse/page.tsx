import HeaderPaginas from "@/components/HeaderPaginas";
import Footer from "@/components/Footer";
import FormularioSuscripcion from "@/components/FormularioSuscripcion";

export default function Asociarse() {
  return (
    <>
      {/* Header reutilizable */}
      <HeaderPaginas />

      {/* Contenido principal */}
      <main className="min-h-screen w-full py-16" style={{ backgroundColor: '#f8f9fa' }}>
        <FormularioSuscripcion />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
