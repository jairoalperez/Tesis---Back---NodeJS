const express= require('express')
const router = express.Router()
const  {passportAuth}  = require('../middlewares')
const usuario = require('../controllers/usuario')
const inventario = require('../controllers/inventario')
const orden = require('../controllers/orden')


//registro y login
router.post('/registro',usuario.register)
router.post('/login', passportAuth)
router.get('/perfil',(req,res)=>{
    res.send('perfil')
})
router.get('/buscar-userc/:correo',usuario.buscaruser)



// inventario
router.post('/inventariocrear', inventario.crear)
router.get('/inventario', inventario.buscar)
router.get('/inventario/:id', inventario.buscarobj)
router.put('/inventario/:id/:cantidad', inventario.editinv)

// ordenes de servicio
router.post('/crearorden', orden.crear)
router.get('/buscarordenes', orden.buscartodo)
router.get('/buscarorden/:id', orden.buscar)

module.exports = router