/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Clases dinámicas que Tailwind debe incluir
    'bg-primary-green',
    'bg-primary-dark', 
    'text-primary-green',
    'text-primary-dark',
    'border-primary-green',
    'hover:bg-primary-green',
    'hover:text-white',
    'animate-scroll',
    'animate-pulse',
    'animate-bounce',
    'animate-bounce-subtle',
    
    // Clases de padding y margin que pueden ser dinámicas
    'py-4', 'py-8', 'py-12', 'py-16', 'py-24',
    'px-4', 'px-6', 'px-8', 'px-12', 'px-16', 'px-24',
    'mb-2', 'mb-4', 'mb-6', 'mb-8', 'mb-12', 'mb-16',
    'mt-2', 'mt-4', 'mt-6', 'mt-8', 'mt-12', 'mt-16',
    
    // Clases de tamaño de texto
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl',
    'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl',
    
    // Clases de grid y flex
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'md:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-3',
    'flex-col', 'flex-row', 'md:flex-row', 'md:flex-col',
    
    // Clases de posicionamiento
    'fixed', 'absolute', 'relative', 'top-0', 'bottom-0', 'left-0', 'right-0',
    'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
    
    // Clases de transición y hover
    'transition-all', 'transition-colors', 'transition-opacity', 'duration-200', 'duration-300',
    'hover:opacity-80', 'hover:shadow-lg', 'hover:shadow-xl', 'hover:scale-105',
    
            // Clases de fuentes oficiales
            'font-inter', 'font-kanit', 'font-abel', 'font-aboreto', 'font-adlam', 'font-afacad', 'font-comfortaa',
    
    // Clases de responsive
    'md:text-4xl', 'md:text-5xl', 'md:text-6xl', 'md:text-7xl', 'md:text-8xl', 'md:text-9xl',
    'lg:text-5xl', 'lg:text-6xl', 'lg:text-7xl', 'lg:text-8xl', 'lg:text-9xl',
    'md:h-10', 'md:h-12', 'md:h-16', 'md:h-20', 'md:w-10', 'md:w-12', 'md:w-16', 'md:w-20',
    'lg:h-12', 'lg:h-16', 'lg:h-20', 'lg:w-12', 'lg:w-16', 'lg:w-20'
  ],
  theme: {
    extend: {
      colors: {
        // Colores primarios (sin duplicación)
        primary: {
          green: '#21A85B',    // Verde del logo
          dark: '#0F3439',    // Azul oscuro, complemento del logo
          gold: '#F8F0C0',    // Oro claro
        },
        
        // Colores secundarios - Variaciones del verde
        secondary: {
          green: {
            50: '#F6E09D',    // Verde claro
            100: '#E6D18C',   // Verde medio claro
            200: '#D4C275',   // Verde medio
            300: '#1A8A4A',   // Verde oscuro
            400: '#0F5A2E',   // Verde muy oscuro
          },
          
          // Variaciones del azul
          blue: {
            50: '#2C6F78',    // Azul claro
            100: '#1F5A62',   // Azul medio
            200: '#14434A',   // Azul oscuro
            300: '#0A2428',   // Azul muy oscuro
          }
        },
        
        // Colores neutros
        neutral: {
          50: '#F5F5F5',      // Gris muy claro
          100: '#6B6B6B',     // Gris medio
          200: '#2C2C2C',     // Gris oscuro
        }
      },
      
              // Configuración de fuentes oficiales del proyecto
              fontFamily: {
                'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
                'kanit': ['var(--font-kanit)', 'Kanit', 'sans-serif'],
                'abel': ['var(--font-abel)', 'Abel', 'sans-serif'],
                'aboreto': ['var(--font-aboreto)', 'Aboreto', 'sans-serif'],
                'adlam': ['var(--font-adlam)', 'ADLaM Display', 'sans-serif'],
                'afacad': ['var(--font-afacad)', 'Afacad', 'sans-serif'],
                'comfortaa': ['var(--font-comfortaa)', 'Comfortaa', 'sans-serif'],
              },
      
      // Pesos de fuente personalizados
      fontWeight: {
        'light': '300',
        'normal': '400',
        'semibold': '600',
        'bold': '700',
      },
      
      // Animaciones personalizadas
      animation: {
        'scroll': 'scroll 20s linear infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'checkerboard': 'checkerboard 20s linear infinite',
      },
      
      // Keyframes personalizados
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            color: '#21A85B',
            textShadow: '0 2px 4px rgba(33, 168, 91, 0.3)',
            transform: 'scale(1)'
          },
          '25%': { 
            opacity: '0.8',
            color: '#0F5A2E',
            textShadow: '0 4px 8px rgba(33, 168, 91, 0.5)',
            transform: 'scale(1.02)'
          },
          '50%': { 
            opacity: '0.9',
            color: '#1A8A4A',
            textShadow: '0 6px 12px rgba(33, 168, 91, 0.7)',
            transform: 'scale(1.05)'
          },
          '75%': { 
            opacity: '0.85',
            color: '#0F5A2E',
            textShadow: '0 4px 8px rgba(33, 168, 91, 0.5)',
            transform: 'scale(1.02)'
          }
        },
        'checkerboard': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(-100px) translateY(-100px)' }
        }
      }
    },
  },
  plugins: [],
}
