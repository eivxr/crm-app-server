const Cliente = require("../models/Cliente.js");

exports.crearCliente = async (req, res, next) => {
  const nuevoCliente = new Cliente(req.body);

  try {
    await nuevoCliente.save();
    res.json({ mensaje: "Cliente agregado correctamente" });
  } catch (error) {
    console.log(`Error creando el cliente: ${error} `);
    next();
  }
};

exports.obtenerClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    console.log(`Error al mostrar los clientes: ${error}`);
    next();
  }
};

exports.obtenerCliente = async (req, res, next) => {
  const cliente = await Cliente.findById(req.params.idCliente);

  if (!cliente) {
    res.json({ mensaje: "Cliente inexistente" });
    return next();
  }

  res.json(cliente);
};

exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      { new: true }
    );

    res.json(cliente);
  } catch (error) {
    console.log(`Error al actualizar el cliente: ${error}`);
    return next();
  }
};

//elimina un cliente por medio de su id
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Cliente.findByIdAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "Cliente eliminado correctanente" });
  } catch (error) {
    console.log(`Error al eliminar el cliente: ${error}`);
    next();
  }
};
