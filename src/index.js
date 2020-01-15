const express = require("express");
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express();

mongoose.connect('mongodb+srv://rafonel:rafonel@testepassoca-wplbk.gcp.mongodb.net/dbOmnistack10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology:true
})

// parameters types
// Query params> req.query(filtros, ordenação, paginação, GET)
// Route params> req.params(identificar um recurso no PUT e DELETE)
// Body > req.body(dados pra criar ou editar algum registro, POST e PUT)

// MongoDB (não relacional  )

app.use(express.json());
app.use(routes);

app.listen(3333,'', ()=>{console.log("Server is running on port 3333")});
