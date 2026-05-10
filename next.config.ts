import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', '192.168.0.184'],
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;