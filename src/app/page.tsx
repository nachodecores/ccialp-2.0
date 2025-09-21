import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Convenios from "@/components/Convenios";
import CentrosPyme from "@/components/CentrosPyme";
import Noticias from "@/components/Noticias";
import Confederaciones from "@/components/Confederaciones";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <CentrosPyme />
      <Convenios />
      <Noticias />
      <Confederaciones />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
