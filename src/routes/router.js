const express= require('express')
const router = express.Router()
const  {passportAuth}  = require('../middlewares')
const usuario = require('../controllers/usuario')
const inventario = require('../controllers/inventario')


//registro y login
router.post('/registro',usuario.register)
router.post('/login', passportAuth)
router.get('/perfil',(req,res)=>{
    res.send('perfil')
})
router.get('/buscar-userc/:correo',usuario.buscaruser)



// inventario
router.get('/inventario', inventario.buscar)



module.exports = router