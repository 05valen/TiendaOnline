const router = require('express').Router();
const Clogin = require('../controllers/loginController');
const personaController = require('../controllers/personaController');
const areaController = require('../controllers/areaController');
const informeAreaController = require('../controllers/informeAreaController');
const informeEmpleadoController = require('../controllers/informeEmpleadoController');
const { render } = require('ejs');

//Routes for  home
router.get('/',(req, res) => {
    var Datos= [];
    Datos.Alert = []
    res.render('index',{data:Datos})  // alerta
    
   } );

//Login EN MANTENIMIENTO
router.get('/logout', Clogin.logout); 
router.get('/login', Clogin.login);
router.post('/login',Clogin.Logeado);
   
//Routes for Personas
router.get('/personaRoute',Clogin.isAutheticated, personaController.list);
router.post('/add', personaController.save);
router.get('/update/:IdPersona', personaController.edit);
router.post('/update/:IdPersona', personaController.update);
router.get('/delete/:IdPersona', personaController.delete);



//Routes for Areas
router.get('/areaRoute', areaController.list);
router.post('/add_area', areaController.save);
router.get('/update_area/:CodArea', areaController.edit);
router.post('/update_area/:CodArea', areaController.update);
router.get('/delete_area/:CodArea', areaController.delete);


//Informe Areas 
router.get('/informeAreaRoute', informeAreaController.list);

//Informe Empleados
router.get('/informeEmpleadoRoute', informeEmpleadoController.list);








module.exports = router;