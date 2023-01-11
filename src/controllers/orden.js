const orden = {}
const bd = require('../database')



orden.buscartodo = (req, res) => {
   try {
      bd.buscarordenes(req, res);


   } catch (e) {

      console.log(e);
   }


}

orden.buscar = (req, res) => {
   try {
      bd.buscarorden(req, res);


   } catch (e) {

      console.log(e);
   }


}

orden.crear = (req, res) => {
   try {
      bd.crearorden(req, res);


   } catch (e) {

      console.log(e);
   }


}

module.exports = orden