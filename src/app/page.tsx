import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Convenios from "@/components/Convenios";
import Asociarse from "@/components/Asociarse";
import CentrosPyme from "@/components/CentrosPyme";
// import Noticias from "@/components/Noticias";
import Confederaciones from "@/components/Confederaciones";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <CentrosPyme />
      <Convenios />
      <Asociarse />
      {/* <Noticias /> */}
      <Confederaciones />
      <Footer />
    </div>
  );
}
