const path = require("path");

const { SERVER_PORT, SERVER_HOST } = require(path.resolve("./settings.json"));
const { fast, listen } = require("./src/config/server");

const PORT = process.env.PORT || SERVER_PORT;
const HOST = process.env.HOST || SERVER_HOST;

listen(PORT, HOST);
