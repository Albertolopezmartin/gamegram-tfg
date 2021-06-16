'use strict'
var validator = require('validator');
var Country = require('../models/country');

var countryController = {

    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;
        
        // Validar datos (validator)
        try{
            var validate_name = !validator.isEmpty(params.name);


        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos'
            });
        }
        if (validate_name){
            // Crear el objeto a guardar
            var country = new Country();

            // Asignar valores
            country.name = params.name;

            // Guardar el objeto
            country.save((err, countryStored) => {
                if (err || !countryStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El país no se ha guardado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    country: countryStored
                });
            });

            
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }
        
    },

    getCountries: (req, res) => {

        var query = Country.find({});

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
                    message: 'No hay Países para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                countries
            });
            
        });
        
    },

    getCountry: (req, res) => {

        // Recoger el id de la url
        var countryId = req.params.id;

        // Comprobar que existe
        if(!countryId || countryId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el país'
            });
        }

        // Buscar el país
        Country.findById(countryId, (err, country) => {
            if(err || !country){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el pais'
                });
            }
            // Devolverlo en json

            return res.status(200).send({
                status: 'success',
                country
            });
        })

        
    },

    update: (req, res) => {
        // Recoger el id del país por la url
        var countryId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_name = !validator.isEmpty(params.name);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            }); 
        }

        if(validate_name){
             // Find and update
             Country.findOneAndUpdate({_id: countryId}, params, {new:true}, (err, countryUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!countryUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el país'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    country: countryUpdated
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
        var countryId = req.params.id;

        // Find and delete
        Country.findOneAndDelete({_id: countryId}, (err, countryRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!countryRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el país, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                country: countryRemoved
            });

        }); 
    },
}

module.exports = countryController;