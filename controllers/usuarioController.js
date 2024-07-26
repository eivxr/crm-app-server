const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.registrarUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 11);

  try {
    await usuario.save();
    res.status(200).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Error al crear usuario, intente de nuevo" });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;

  try {
  } catch (error) {}
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    //en caso de que el usuario no exista
    await res.status(401).json({ mensaje: "Ese usuario no existe." });
    next();
  } else {
    // password correcto o incorrecto
    if (!bcrypt.compareSync(password, usuario.password)) {
      await res.status(401).json({ mensaje: "Password incorrecto" });
      next();
    } else {
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          id: usuario._id,
        },
        "secreta",
        { expiresIn: "2h" }
      );

      res.status(200).json({token: token});
    }
  }
};
