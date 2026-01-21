import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Временно отключаем оптимизацию, чтобы быстро продолжать верстку,
    // даже если встроенный оптимизатор /_next/image не может получить картинки с :4000.
    // Когда бек/статик стабилизируется — можно убрать и вернуть оптимизацию.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
