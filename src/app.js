
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const errorHandler = require('errorhandler');


const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

// importing routes
const rutasRoutes = require('./routes/rutas');


dotenv.config({path:path.join(__dirname,'/env/.env')})

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'tiendaOnline'
}, 'single'));
app.use(express.urlencoded({extended: false}));


//utilizar los cookies
app.use(cookieParser())

// routes
app.use('/', rutasRoutes);
//llamar la rutar de
if ('development' === app.get('env')) {
  app.use(errorHandler());
}



// El directorio public
app.use('/public', express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});