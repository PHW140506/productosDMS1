var router = require('express').Router()
var { producto } = require('../conexion')

// Ruta raiz
router.get('/', (req, res) => {
    res.render('pages/index')
})

// Ruta para abrir la pagina de insertar
router.get('/insertarProducto', (req, res) => {
    res.render('pages/insertarProducto') 
})

// Ruta o peticion para insertar un producto nuevo
router.post('/guardarProducto', (req, res) => {
    producto.create(req.body)
    .then(() => {
        console.log('Se ha insertado correctamente el nuevo producto')
        res.redirect('/listarProducto')
    })
    .catch((e) => {
        console.log('Error al insertar producto nuevo: ' + e)
    })
})

// Ruta o peticion para listar productos
router.get('/listarProducto', (req, res) => {
    producto.findAll()
    .then((data) => {
        res.render('pages/listarProducto', { productos: data })
    })
    .catch((e) => {
        console.log('Error en la consulta: ' + e)
    })
})

// Ruta para buscar producto por su ID
router.get('/buscarProducto/:idProducto', (req, res) => {
    producto.findAll({
        where: {
            idProducto: req.params.idProducto
        }
    })
    .then((data) => {
        res.render('pages/modificarProducto', { producto: data })
    })
    .catch((e) => {
        console.log('Error en la consulta: ' + e)
    })
})

// Ruta para modificar producto
router.post('/modificarProducto', (req, res) => {
    var idProducto = req.body.idProducto
    const productoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto
    }
    producto.update(productoModificado, {
        where: {
            idProducto: idProducto
        }
    })
    .then(() => {
        console.log('Producto modificado exitosamente')
        res.redirect('/listarProducto')
    })
    .catch((e) => {
        console.log('Error al modificar producto: ' + e)
    })
})

// Ruta para eliminar producto
router.get('/eliminarProducto/:idProducto', (req, res) => {
    producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
    .then(() => {
        console.log('El producto se ha eliminado exitosamente')
        res.redirect('/listarProducto')
    })
    .catch((e) => {
        console.log('No fue posible eliminar el producto: ' + e)
    })
})

module.exports = router