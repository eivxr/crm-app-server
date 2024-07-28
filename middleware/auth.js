const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //obtenemos el header de autorizacion en funcion de un jwt
  const authHeader = req.get("Authorization");

  //   si no hay jwt no tiene permitido
  if (!authHeader) {
    const error = new Error("No jwt");
    error.statusCode = 401;
    throw error;
  }

  //   en caso de que haya jwt lo extraemos y comprobamos
  const token = authHeader && authHeader.split(" ")[1]; //bearer {jwt} por eso el split
  let verificar;
  try {
    verificar = jwt.verify(token, "secreta");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!verificar) {
    const error = new Error("No autenticado");
    error.statusCode = 401;
    throw error;
  }

  next();
};
