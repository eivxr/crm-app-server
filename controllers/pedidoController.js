const Pedido = require("../models/Pedido");

exports.crearPedido = async (req, res, next) => {
  const pedido = new Pedido(req.body);

  try {
    await pedido.save();
    res.json({ mensaje: "Se agregó un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({})
      .populate("cliente")
      .populate({ path: "pedido.producto", model: "Producto" });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarPedido = async (req, res, next) => {
  const pedido = await Pedido.findById(req.params.idPedido);

  if (!pedido) {
    res.json({ mensaje: "Pedido no encontrado" });
    return next();
  }

  res.json(pedido);
};

exports.actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedido.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      { new: true }
    ).populate({ path: "pedido.producto", model: "Producto" });

    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarPedido = async (req, res, next) => {
  try {
    await Pedido.findOneAndDelete({ _id: req.params.idPedido });
    res.json("Pedido eliminado correctamente");
  } catch (error) {
    console.log(error);
    next();
  }
};
