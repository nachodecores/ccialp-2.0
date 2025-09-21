import Link from "next/link";
import ResenaHistorica from "@/components/ResenaHistorica";
import MisionVisionValores from "@/components/MisionVisionValores";
import ComisionDirectiva from "@/components/ComisionDirectiva";

export default function Nosotros() {
  return (
    <div className="min-h-screen">
      {/* Header con navegación de vuelta */}
      <header className="w-full h-16 bg-primary-dark flex items-center justify-between px-4">
        <Link 
          href="/" 
          className="text-white hover:opacity-80 transition-opacity"
        >
          ← Volver al inicio
        </Link>
        <div></div>
      </header>

      {/* Contenido principal */}
      <main>
        <ResenaHistorica />
        <MisionVisionValores />
        <ComisionDirectiva />
      </main>
    </div>
  );
}
