import ResenaHistorica from "@/components/ResenaHistorica";
import MisionVisionValores from "@/components/MisionVisionValores";
import ComisionDirectiva from "@/components/ComisionDirectiva";
import HeaderPaginas from "@/components/HeaderPaginas";
import Footer from "@/components/Footer";

export default function Nosotros() {
  return (
    <div className="min-h-screen">
      {/* Header reutilizable */}
      <HeaderPaginas />

      {/* Contenido principal */}
      <main>
        <MisionVisionValores />
        <ResenaHistorica />
        <ComisionDirectiva />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
