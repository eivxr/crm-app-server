const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: "Clientes",
  },
  productos: [
    {
      producto: {
        type: Schema.ObjectId,
        cantidad: Number,
      },
    },
  ],
  total: {
    type: Number,
  },
});

module.exports = mongoose.model("Pedido", pedidosSchema);
