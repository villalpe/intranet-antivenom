'use strict'
//Cargamos Modulos
//bcrypt para cifrar contraseñas
var bcrypt = require('bcrypt-nodejs');
//fs para manipular archivos
var fs = require('fs');
//para acceder a rutas de nuestro explorador de archivos
var path = require('path');

//importar servicio de jwt y luego lo ponemos en el metodo login
var jwt = require('../services/jwt');

var csv = require('fast-csv');
var mongoose = require('mongoose');
var express = require('express');

var app = express();

var fileUpload = require('express-fileupload');

app.use(fileUpload());

var User = require('../models/user');
var Asaldo = require('../models/asaldo');

//Acciones
function pruebas(req, res){
	res.status(200).send({message: "Probando el controlador Antiguedad de Saldos en metodo pruebas..."});
}

function uploadCsv (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    var asaldoFile = req.files.file;
 
    var asaldos = [];
         
    csv
     .fromString(asaldoFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
          
         asaldos.push(data);
     })
     .on("end", function(){
         Asaldo.create(asaldos, function(err, documents) {
            if (err) throw err;
         });
          
         res.send(asaldos.length + ' Antiguedad de Saldos have been successfully uploaded.');
     });
};

module.exports = {
	pruebas,
	uploadCsv
	//getAsaldos
};