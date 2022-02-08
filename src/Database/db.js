const mysql = require('mysql')
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'colegiocambridge'
});

conexion.connect((err) => {
    if (err) {
        console.log('El error de conexion es A ' + err)
        return
    }
    console.log('Conectado a la base de datos MYsql')
})

module.exports = conexion