const usuario = {}
const bd = require('../database')



usuario.register = (req, res) => {
   try {
      bd.crearusuario(req, res);


   } catch (e) {

      console.log(e);
   }


}


usuario.buscaruser = (req, res) => {
   try {
      bd.buscaruser(req, res);


   } catch (e) {

      console.log(e);
   }


}

module.exports = usuario