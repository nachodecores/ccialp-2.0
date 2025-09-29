import HeaderPaginas from "@/components/HeaderPaginas";
import Footer from "@/components/Footer";
import NoticiasCompletas from "@/components/NoticiasCompletas";

export default function Noticias() {
  return (
    <div className="min-h-screen">
      {/* Header reutilizable */}
      <HeaderPaginas />

      {/* Contenido principal */}
      <main className="w-full py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#f8f9fa' }}>
        <NoticiasCompletas />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
