const { Pool } = require('pg');
const helpers = require('./helpers')
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'backprueba',
  password: 'asd'
};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario = async (req, res) => {

  const {
    correo,
    clave,
    verificarclave,
    nombre,
    apellido,
    cargo,
    departamento
  } = req.body;

  if (clave === verificarclave) {

    const passwordencriptado = await helpers.encryptPassword(clave)
    const result = await pool.query('INSERT INTO usuario(correo,clave,nombre,apellido,cargo,departamento) VALUES($1,$2,$3,$4,$5,$6)', [
      correo, passwordencriptado, nombre, apellido, cargo, departamento])
    console.log(result)
    res.json(result.rows)

  } else {
    res.json('contraseñas no compatibles')
  }
}


const buscaruser = async (req, res) => {
  const correo = req.params.correo
  const response = await pool.query('SELECT* FROM usuario WHERE  correo=$1', [correo])
  console.log(response);
  res.json(response.rows)
}




//inventario

const crearelemento = async (req, res) => {

  const {
    nombre,
    cantidad

  } = req.body;

  const result = await pool.query('INSERT INTO inventario (nombre, cantidad) VALUES($1, $2)', [
    nombre, cantidad])
  console.log(result)
  res.json(result.rowCount)
}


const buscarinv = async (req, res) => {
  const response = await pool.query('SELECT* FROM inventario')
  console.log(response);
  res.json(response.rows)
}

const buscarinvobj = async (req, res) => {
  const id = req.params.id
  const response = await pool.query('SELECT * FROM inventario WHERE id_inventario = $1', [id])
  console.log(response);
  res.json(response.rows)
}

const editinv = async (req, res) => {
  const id = req.params.id
  const cantidad = req.params.cantidad
  const response = await pool.query('UPDATE inventario SET cantidad = $2 WHERE id_inventario = $1', [id, cantidad])
  console.log(response);
  res.json(response.rowCount)
}



//ordenes de servicio

const crearorden = async (req, res) => {

  const {
    cliente,
    direccion,
    correo,
    tipo,
    personal,
    fecha

  } = req.body;

  const result = await pool.query(`
  INSERT INTO 
  orden 
  (cliente, direccion, correo, tipo, personal, fecha) 
  VALUES
  ($1, $2, $3, $4, $5, $6)
  `
  , [cliente, direccion, correo, tipo, personal, fecha])
  console.log(result)
  res.json(result.rowCount)
}


const buscarordenes = async (req, res) => {
  const response = await pool.query(`
  SELECT * FROM orden 
  INNER JOIN servicios 
  ON orden.tipo = servicios.id_servicios
  ORDER BY id_orden desc
  `)
  console.log(response);
  res.json(response.rows)
}

const buscarorden = async (req, res) => {
  const id = req.params.id
  const response = await pool.query(`
  SELECT * FROM orden 
  INNER JOIN servicios 
  ON orden.tipo = servicios.id_servicios
  WHERE id_orden = $1
  ORDER BY id_orden desc
  `, [id])
  console.log(response);
  res.json(response.rows)
}





module.exports = {
  crearusuario, buscaruser,
  buscarinv, buscarinvobj, editinv, crearelemento,
  crearorden, buscarordenes, buscarorden


}