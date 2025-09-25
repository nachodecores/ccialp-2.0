import Link from "next/link";
import Image from "next/image";

export default function HeaderPaginas() {
  return (
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
        <span>Volver</span>
      </Link>
      <div></div>
    </header>
  );
}
