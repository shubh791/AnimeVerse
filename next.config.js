/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [{ pathname: '/assets/**' }],
  },
}

export default nextConfig
