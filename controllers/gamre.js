'use strict'
var validator = require('validator');
var Gamre = require('../models/gamre');

var gamreController = {

    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;
        
        // Validar datos (validator)
        try{
            var validate_idGam = !validator.isEmpty(params.idGam);
            var validate_idGen = !validator.isEmpty(params.idGen);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos'
            });
        }
        if (validate_idGam && validate_idGen){
            // Crear el objeto a guardar
            var gamre = new Gamre();

            // Asignar valores
            gamre.idGam = params.idGam;
            gamre.idGen = params.idGen;

            // Guardar el objeto
            gamre.save((err, gamreStored) => {
                if (err || !gamreStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'La asociación no se ha guardado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    gamre: gamreStored
                });
            });

            
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }
        
    },

    getGamres: (req, res) => {

        var query = Gamre.find({});

        var last = req.params.last;

        if(last || last != undefined){
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, countries) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!countries){
                return res.status(404).send({
                    status: 'success',
                    message: 'No hay asociaciones para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                countries
            });
            
        });
        
    },

    getGamre: (req, res) => {

        // Recoger el id de la url
        var gamreId = req.params.id;

        // Comprobar que existe
        if(!gamreId || gamreId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe la compañía'
            });
        }

        // Buscar la compañía
        Gamre.findById(gamreId, (err, gamre) => {
            if(err || !gamre){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la compañía'
                });
            }
        // Devolverlo en json

        return res.status(200).send({
            status: 'success',
            gamre
        });
        })

        
    },

    update: (req, res) => {
        // Recoger el id de la compañía por la url
        var gamreId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_idGam = !validator.isEmpty(params.idGam);
            var validate_idGen = !validator.isEmpty(params.idGen);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_idGam && validate_idGen){
             // Find and update
             Gamre.findOneAndUpdate({_id: gamreId}, params, {new:true}, (err, gamreUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!gamreUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe la compañía'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    gamre: gamreUpdated
                });
             });
        }else{
             // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }
       
    },

    delete: (req, res) => {
        // Recoger el id de la url
        var gamreId = req.params.id;

        // Find and delete
        Gamre.findOneAndDelete({_id: gamreId}, (err, gamreRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!gamreRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado la compañía, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                gamre: gamreRemoved
            });

        }); 
    },
}

module.exports = gamreController;