const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./app");

const startServer = (server, port, message) => {
  server.listen(port);

  server.on("listening", () => process.stdout.write(message));
};

const startHttpAppServer = () => {
  const port = process.env.HTTP_PORT || 9876;
  const server = http.createServer(app);

  startServer(server, port, `Listening (http) on ${port}\n`);
};

const startHttpsAppServer = () => {
  const port = process.env.HTTPS_PORT || 9878;

  const options = {
    key: fs.readFileSync(`${process.env.CERT_DIR}/app.server.key`),
    cert: fs.readFileSync(`${process.envCERT_DIR}/app.server.crt`),
    secureProtocol: process.env.SECURE_PROTOCOL
  };

  const server = https.createServer(options, app);

  startServer(server, port, `Listening (https) on ${port}\n`);
};

startHttpAppServer();
