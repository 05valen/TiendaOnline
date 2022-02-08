const router = require('express').Router();

const Clogin = require('../controllers/loginController');
const personaController = require('../controllers/personaController');
const oficinaController = require('../controllers/oficinaController');
const areaController = require('../controllers/areaController');
const salonController = require('../controllers/salonController');
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

//Routes for Oficinas
router.get('/oficinaRoute', oficinaController.list);
router.post('/add_ofi', oficinaController.save);
router.get('/update_ofi/:IdOficina', oficinaController.edit);
router.post('/update_ofi/:IdOficina', oficinaController.update);
router.get('/delete_ofi/:IdOficina', oficinaController.delete);

//Routes for Areas
router.get('/areaRoute', areaController.list);
router.post('/add_area', areaController.save);
router.get('/update_area/:CodArea', areaController.edit);
router.post('/update_area/:CodArea', areaController.update);
router.get('/delete_area/:CodArea', areaController.delete);

//Routes for salones
router.get('/salonRoute', salonController.list);
router.post('/add_salon', salonController.save);
router.get('/update_salon/:Consecutivo', salonController.edit);
router.post('/update_salon/:Consecutivo', salonController.update);
router.get('/delete_salon/:Consecutivo', salonController.delete);

//Informe Areas 
router.get('/informeAreaRoute', informeAreaController.list);

//Informe Empleados
router.get('/informeEmpleadoRoute', informeEmpleadoController.list);








module.exports = router;