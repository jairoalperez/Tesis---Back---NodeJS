const inventario = {}
const bd = require('../database')



inventario.buscar = (req, res) => {
   try {
      bd.buscarinv(req, res);


   } catch (e) {

      console.log(e);
   }


}

inventario.buscarobj = (req, res) => {
   try {
      bd.buscarinvobj(req, res);


   } catch (e) {

      console.log(e);
   }


}

inventario.editinv = (req, res) => {
   try {
      bd.editinv(req, res);


   } catch (e) {

      console.log(e);
   }


}

inventario.crear = (req, res) => {
   try {
      bd.crearelemento(req, res);


   } catch (e) {

      console.log(e);
   }


}

module.exports = inventario