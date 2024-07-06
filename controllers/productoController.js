const Producto = require("../models/Producto");

const multer = require("multer");
const shortid = require("shortid");

const { unlink } = require("fs");

//configuracion de subida de archivos
const configuracionMulter = {
  limits: { fileSize: 100000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato de archivo no válido"), false);
    }
  },
};

const upload = multer(configuracionMulter).single("image");

//subir imagen del producto
exports.subirArchivo = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return res.json(`error subiendo archivo: ${error}`);
    } else {
      return next();
    }
  });
};

//agregar un producto
exports.agregarProducto = async (req, res, next) => {
  const producto = new Producto(req.body);

  try {
    if (req.file.filename) {
      producto.image = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Producto agregado correctamente" });
  } catch (error) {
    console.log(`Error agregando un nuevo producto: ${error}`);
    next();
  }
};

exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.log(`Error al mostrar los productos: ${error}`);
    next();
  }
};

exports.mostrarProducto = async (req, res, next) => {
  const producto = await Producto.findById(req.params.idProducto);
  if (!producto) {
    res.json({ mensaje: "Este producto no existe." });
    return next();
  }

  res.json(producto);
};

exports.actualizarProducto = async (req, res, next) => {
  try {
    // seleccionar producto
    let productoAnterior = await Producto.findById(req.params.idProducto);

    //construir nuevo producto
    let nuevoProducto = req.body;

    //verificar si hay imagen nueva
    if (req.file) {
      nuevoProducto.image = req.file.filename;
      const imagenAnteriorPath =
        __dirname + `/../uploads/${productoAnterior.image}`;
      unlink(imagenAnteriorPath, (error) => {
        if (error) {
          return console.log(error);
        }
      });
    } else {
      nuevoProducto.image = productoAnterior.image;
    }

    let producto = await Producto.findOneAndUpdate(
      { _id: req.params.idProducto },
      nuevoProducto,
      {
        new: true,
      }
    );

    // mostrar producto
    await res.json({
      mensaje: "Se ha actualizado la informacion de este producto",
      producto,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

//eliminar un producto
exports.eliminarProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findOneAndDelete({ _id:req.params.idProducto });

    if(producto.image){
        const imagenAnterioPath = __dirname + `/../uploads/${producto.image}`;
        // Eliminar archivo con filesystem
        unlink( imagenAnterioPath, (error) => {
            if(error) {
                console.log(error);
            }
            return;
        });
    }
    res.json({ producto, mensaje:'Producto Eliminado'});
  } catch (error) {
    console.log(`error al eliminar producto: ${error}`);
  }
};
