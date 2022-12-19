const express = require ('express')
const passport=require('passport')
const session=require('express-session')
const app = express()
const {Strategy} =require('passport-local')
const { LocalStrategy } = require('./strategies')
const fs = require('fs')
const cors = require('cors')
const {content} = require('./pdf/pdfContent')
const fonts = require('./pdf/fonts')
const styles = require('./pdf/styles')
const PdfPrinter = require('pdfmake')


//middlewares

app.use(cors())

app.use(session({
    secret:'xd',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });
  
  passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
  });

app.use(passport.initialize())
app.use(passport.session());
//router
app.use(require('./routes/router'));


//servidor activo
const port = 8000;
app.listen(port, ()=>{
    console.log('servidor activo en puerto 8000')
})