/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    "BASE_URL":"http://localhost:3000",
    "MONGO_URL":"mongodb+srv://gauravcom:guptagrkml789@cluster0.wzm9s.mongodb.net/next_ecommerce?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET":"dtKTprXWjSWmgohFxUBidK0SPhF1mTPkmBTjI2qx",
    "REFRESH_TOKEN_SECRET":"0CCW0We9I9THstpCuUfIyQDX053NHkAox6cUEwIJ",
    "PAYPAL_CLIENT_ID":"AbJyD_uHYEiulYanbgrtFbgQG0ZtUMwlibd_W6_rQzRM06iRtww_92TXoI6RNTi8CLtAglBxVdISJSo4"
  }
}

module.exports = nextConfig
