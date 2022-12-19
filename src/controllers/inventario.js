const inventario = {}
const bd = require('../database')



inventario.buscar = (req, res) => {
   try {
      bd.buscarinv(req, res);


   } catch (e) {

      console.log(e);
   }


}

module.exports = inventario