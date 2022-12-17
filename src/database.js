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
     verificarclave
      }= req.body;
      
      if(clave===verificarclave){

     const passwordencriptado = await helpers.encryptPassword(clave)
      const result= await pool.query('INSERT INTO usuario(correo,clave) VALUES($1,$2)', [
      correo,passwordencriptado ])
      console.log(result)
      res.json(result.rows)

      }else{
        res.json('contraseñas no compatibles')
      }
    }


    module.exports={
         crearusuario
        
        
     }