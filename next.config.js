/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['maps.googleapis.com'],
  },
  rewrites: async () => {
    return [{
      source: "/google/autocompelte",
      destination: "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    },
    {
      source: "/google/detail",
      destination: "https://maps.googleapis.com/maps/api/place/details/json"
    }]
  },
  experimental: {
    modularizeImports: {
      '@mui/material/?(((\\w*)?/?)*)': {
        transform: '@mui/material/{{ matches.[1] }}/{{member}}'
      },
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
      }
    }
  },
}

module.exports = nextConfig
