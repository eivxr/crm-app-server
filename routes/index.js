const express = require("express");
const router = express.Router();

//controllers
const clienteController = require("../controllers/clienteController.js");
const productoController = require('../controllers/productoController.js')


//CLIENTE------

//crear nuevo cliente (post)
router.post("/clientes", clienteController.crearCliente);

//mostrar clientes
router.get("/clientes", clienteController.obtenerClientes);

//mostrar un cliente por id
router.get("/clientes/:idCliente", clienteController.obtenerCliente);

//actualizar un cliente
router.put("/clientes/:idCliente", clienteController.actualizarCliente);

//eliminar un cliente
router.delete("/clientes/:idCliente", clienteController.eliminarCliente);


//PRODUCTO -------

//agregar nuevo producto

router.post('/productos', productoController.agregarProducto);


module.exports = function () {
  return router;
};
