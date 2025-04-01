export default {
  apps: [{
    name: "workerday",
    script: "server.js",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "development",
      PORT: 3000
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
      HTTPS_PORT: 8443,
      CERT_PATH: "./certs"
    }
  }]
};
