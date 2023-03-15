/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    "BASE_URL":"http://localhost:3000",
    "MONGO_URL":"mongodb+srv://gauravcom:guptagrkml789@cluster0.wzm9s.mongodb.net/next_ecommerce?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
