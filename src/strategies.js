const passport = require('passport');
const { Strategy } = require('passport-local');
const { Pool } = require('pg');
const helpers =require('./helpers')

const config={
    user: 'postgres',
    host: 'localhost',
    database: 'backprueba',
    password: 'asd'
};
  
  const pool = new Pool(config); 
  
  const LocalStrategy = new Strategy(
  {
    usernameField: 'correo',
    passwordField: 'password',
  },
  async (correo, password, done) => {
    try {
      
      const user={
        correo:correo,
        clave:password
      }

      const result= await pool.query('SELECT * FROM usuario WHERE correo=$1',[user.correo])
      
      console.log(result.rows[0])
      if(result.rowCount>0){
         const newuser =result.rows[0];
         const validpassword= await helpers.compararclave(user.clave,newuser.clave) 
        
         if(validpassword){
          
          done(null,newuser,console.log('bienvenido'))
          


         }else{
              done(null,false,console.log('password incorrecto'))
              
         }
      }else{
        return done(null, false,console.log('el usuario no existe'))   
        
      }
      
    } catch (e) {
      console.log(e);
      return done(null, false);
    }
  }
);





module.exports={
  LocalStrategy
}