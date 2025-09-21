import Link from "next/link";

export default function About() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#f8f9fa' }}>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Texto principal */}
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          style={{ 
            fontFamily: 'Kanit, sans-serif',
            fontWeight: '600',
            color: '#0F3439'
          }}
        >
          Tenemos historia, tenemos futuro. <br /> <Link href="/nosotros" className="text-primary-green hover:underline animate-pulse-subtle">Conocé más</Link> sobre nosotros
        </h2>
      
        

        
      </div>
    </section>
  );
}
