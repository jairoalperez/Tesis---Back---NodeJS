const {Pool}= require('pg');
const helpers= require('./helpers')
const config={
    user: 'postgres',
    host: 'localhost',
    database: 'backprueba',
    password: 'asd'
};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario= async(req,res)=>{
    
const  { 
     correo,                           
     clave,
     verificarclave,
     nombre,
     apellido,
     cargo,
     departamento
      }= req.body;
      
      if(clave===verificarclave){

     const passwordencriptado = await helpers.encryptPassword(clave)
      const result= await pool.query('INSERT INTO usuario(correo,clave,nombre,apellido,cargo,departamento) VALUES($1,$2,$3,$4,$5,$6)', [
      correo,passwordencriptado,nombre,apellido,cargo,departamento ])
      console.log(result)
      res.json(result.rows)

      }else{
        res.json('contraseñas no compatibles')
      }
    }


    const buscaruser = async (req, res) => {
      const correo = req.params.correo
      const response = await pool.query('SELECT* FROM usuario WHERE  correo=$1', [correo])
      console.log(response);
      res.json(response.rows)
    }


    module.exports={
         crearusuario, buscaruser
        
        
     }