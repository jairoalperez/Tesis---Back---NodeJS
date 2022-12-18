const express= require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')
const  {passportAuth}  = require('../middlewares')


//registro y login
router.post('/registro',usuario.register)
router.post('/login', passportAuth)
router.get('/perfil',(req,res)=>{
    res.send('perfil')
})
router.get('/buscar-userc/:correo',usuario.buscaruser)



module.exports = router