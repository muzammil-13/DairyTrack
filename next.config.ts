import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow access from local network IP
  experimental: {
    allowedDevOrigins: ["192.168.226.224:9002", "localhost:9002"],
  },
  serverExternalPackages: ["firebase"],
  transpilePackages: ["firebase", "@firebase/auth", "@firebase/firestore", "@firebase/app"],
};

export default nextConfig;
