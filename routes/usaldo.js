'use strict'

var express = require('express');
var usaldoController = require('../controllers/usaldo');

var app = express();

var fileUpload = require('express-fileupload');
app.use(fileUpload());

//Ahora usamos el router de express
var api = express.Router();
//Cargamos el middleware
var md_auth = require('../middlewares/authenticated');

//Para poder subir archivos, en este caso imagenes, ocupamos el middleware connect-multiparty
var mutlipart = require('connect-multiparty');
var md_upload = mutlipart({ uploadDir: './uploads/users' });

//Para pruebas del controlador
//var upload = require('../controllers/usaldo.js');
app.post('/uploadcsv', usaldoController.uploadCsv);
//api.post('/uploadcsv', usaldoController.uploadCsv);

module.exports = api;
module.exports = app;