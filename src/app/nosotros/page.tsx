import ResenaHistorica from "@/components/ResenaHistorica";
import MisionVisionValores from "@/components/MisionVisionValores";
import ComisionDirectiva from "@/components/ComisionDirectiva";
import HeaderPaginas from "@/components/HeaderPaginas";

export default function Nosotros() {
  return (
    <div className="min-h-screen">
      {/* Header reutilizable */}
      <HeaderPaginas />

      {/* Contenido principal */}
      <main>
        <ResenaHistorica />
        <MisionVisionValores />
        <ComisionDirectiva />
      </main>
    </div>
  );
}
