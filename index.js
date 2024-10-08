require("dotenv").config({ path: ".env" });

const express = require("express");
const routes = require("./routes/index.js");
const connection = require("./config/db.js");

const path = require("path");

const cors = require("cors");

const PORT = process.env.PORT || 5000;

//conexion db
connection();

//servidor express
const app = express();

// Middleware para parsear JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use(cors());

//app routes
app.use("/", routes());

//carpeta publica
app.use("/uploads", express.static("uploads"));

//puerto del servidor
app.listen(PORT, () => {
  console.log(`iniciado en puerto: ${PORT}`);
});
