const Producto = require('../models/Producto');


exports.agregarProducto = async (req,res,next)=>{
    const producto = new Producto(req.body);

    try {
        await producto.save();
        res.json({mensaje:'Producto agregado correctamente'})
    } catch (error) {
        console.log(`Error agregando un nuevo producto: ${error}`);
        next();
    }
}