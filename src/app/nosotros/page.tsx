import Link from "next/link";
import Image from "next/image";
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
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <Image
            src="/assets/logos/back-to-main.svg"
            alt="Volver al inicio"
            width={24}
            height={20}
            className="w-6 h-5"
          />
          <span>Volver al inicio</span>
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
