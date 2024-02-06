/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  
  basePath:  "",
  
  assetPrefix :  "",

  images: {
    loader: 'imgix',
    path: '/',
  },

}

module.exports = nextConfig
