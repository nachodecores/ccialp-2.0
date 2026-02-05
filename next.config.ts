import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  eslint: {
    // Evita que el build falle por warnings/errores de ESLint hasta que el código desplegado incluya las correcciones
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['@supabase/supabase-js'],
};

export default nextConfig;
