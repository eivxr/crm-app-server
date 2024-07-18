const express = require("express");
const router = express.Router();

//controllers
const clienteController = require("../controllers/clienteController.js");
const productoController = require("../controllers/productoController.js");
const pedidoController = require("../controllers/pedidoController.js");

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

router.post(
  "/productos",
  productoController.subirArchivo,
  productoController.agregarProducto
);

//mostrar todos los productos
router.get("/productos", productoController.mostrarProductos);

//mostrar un producto por su id
router.get("/productos/:idProducto", productoController.mostrarProducto);

//actualizar un producto
router.put(
  "/productos/:idProducto",
  productoController.subirArchivo,
  productoController.actualizarProducto
);

//eliminar producto
router.delete("/productos/:idProducto", productoController.eliminarProducto);

//buscar un producto por texto
router.post("/productos/busqueda/:query", productoController.buscarProducto);

//PEDIDOS-------

//crear un nuevo pedido
router.post("/pedidos", pedidoController.crearPedido);
//mostrar todos los pedidos
router.get("/pedidos", pedidoController.mostrarPedidos);
//mostrar pedido
router.get("/pedidos/:idPedido", pedidoController.mostrarPedido);
//actualizar pedido
router.put("/pedidos/:idPedido", pedidoController.actualizarPedido);
//eliminar pedido
router.delete("/pedidos/:idPedido", pedidoController.eliminarPedido);

module.exports = function () {
  return router;
};
