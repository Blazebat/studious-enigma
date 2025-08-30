const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const BASE_URL = "https://pkaystream.cc";

// Allow all origins
app.use(cors());

// Proxy all routes
app.use(
  "/*",
  createProxyMiddleware({
    target: BASE_URL,
    changeOrigin: true,   // changes the host header to match the target
    secure: false,        // if target has self-signed SSL cert
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
  })
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
