const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const http = require("http");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

// LINUX :
let mongoPort =
  "mongodb+srv://rafonel:rafonel@testepassoca-wplbk.gcp.mongodb.net/test?retryWrites=true&w=majority";
// WINDOWS:
//let mongoPort =
// "mongodb://rafonel:rafonel@testepassoca-shard-00-00-wplbk.gcp.mongodb.net:27017,testepassoca-shard-00-01-wplbk.gcp.mongodb.net:27017,testepassoca-shard-00-02-wplbk.gcp.mongodb.net:27017/test?ssl=true&replicaSet=TestePassoca-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set("useCreateIndex", true); // stop DeprecationWarning
mongoose.connect(mongoPort, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// parameters types
// Query params> req.query(filtros, ordenação, paginação, GET)
// Route params> req.params(identificar um recurso no PUT e DELETE)
// Body > req.body(dados pra criar ou editar algum registro, POST e PUT)

// MongoDB (não relacional  )
app.use(cors());
app.use(express.json());
app.use(routes);

const port = 8080;
server.listen(port, "", () => {
  console.log("Server is running on port " + port);
});
