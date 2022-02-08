const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const conexion = require('../Database/db')
var Datos = [];

//Login
exports.login = (req, respagina) => {
  Datos.Alert = []
  if (req.user)
    Datos.Usuario = req.user
  else
    Datos.Usuario = {user:false}
  console.log(Datos)
  respagina.render('login', { data: Datos });
};

exports.Logeado =(reqpagina, respagina) => {
  var tabla;
  
  try {
    var DatosLogin = [reqpagina.body.Correo, reqpagina.body.password];
    reqpagina.getConnection((err, connection) => {
      const queryUno = connection.query('SELECT Nombre,Apellido,Correo,Contraseña '+
        'FROM administrador '+
        'WHERE administrador.Correo = ?', DatosLogin[0], (err, result) => {
          Datos.Alert = {
            alert: true,
            alertTitle: 'Inicio De Sesion ',
            alerMessage: 'Contraseña, Usuario o Perfil incorrecto ',
            alertIcon: 'error',
            showConfirmButton: false,
            time: 2000,
            ruta: '/login',
            Script: 'script'
          }

          console.log("valentina");
          if (err) {
            console.log(err)
            respagina.render('login', { data: Datos })
          } else {
            if (result.length == 0) {
              respagina.render('login', { data: Datos })
              console.log("valentina1");
            } else {
              if ((reqpagina.body.password != result[0].Contraseña)) {
                respagina.render('login', { data: Datos })
                console.log("valentina2");
              } else {
                console.log("valentina3");
                const Nombre = result[0].Nombre;
                const Apellido = result[0].Apellido;
                const Correo = result[0].Correo;
            
                const token = jwt.sign({ Nombre:Nombre, Apellido:Apellido,Correo:Correo},

                //  process.env.JwtSecreto , {  // semilla conf jwt
                "String",{
                   expiresIn:"1d"  //tiempo de expirar
                  
                  
                }
                )

                const cookiesOptions = {  // colocar milesimas 
                  expires: new Date(Date.now() + "1d" * 24 * 60 * 60 * 1000),
                  httpOnly: true
                }
                respagina.cookie('jwt', token, cookiesOptions);
                Datos.Alert = {
                  alert: true,
                  alertTitle: 'Inicio de Sesion',
                  alerMessage: 'Bienvenido ' + Nombre + ' ' + Apellido,
                  alertIcon: 'success',
                  showConfirmButton: false,
                  time: 2000,
                  ruta: '/',
                  Script: 'script'
                }
                Datos.Usuario = {user:false,perfil:false}
                respagina.render('login', { data: Datos })
              }
            }
          }
        });
        console.log(queryUno.sql) //consultar como crea el sql
    });
  } catch (error) {
    console.log("Error" + error)
  }
};
//existencia de jwt
exports.isAutheticated = async (reqpagina, res, next) => {
  console.log(reqpagina.cookies)
  if (reqpagina.cookies.jwt) {
    try {
      const decodificada =  await promisify(jwt.verify)(reqpagina.cookies.jwt, "String")
      const Q = conexion.query('SELECT Nombre,Apellido,Correo '+
        'FROM administrador'+
        'WHERE administrador.Correo = ?', [decodificada.Correo], (err, result) => {
          console.log("Result")
          console.log(result)
          if (!result) { return next() }
          reqpagina.user = {Nombre:result[0].Nombre, Apellido:result[0].Apellido}  // envia de la pg los parms de usuario
          console.log(result[0].nombre)
          return next()
        });
    } catch (error) {
      console.log(error)
      return
    }
  } else {
    return next()
  }
}

exports.logout = (req, respagina) => {
  respagina.clearCookie('jwt');  // elimina el cookie
  Datos.Alert = {
    alert: true,
    alertTitle: 'Inicio De Sesion ',
    alerMessage: 'Salida de Sesion Correcta ',
    alertIcon: 'success',
    showConfirmButton: false,
    time: 2000,
    ruta: '/login',
    Script: 'script'
  }
  Datos.Usuario = {user:false, perfil:false}
  respagina.render('login', { data: Datos });
}