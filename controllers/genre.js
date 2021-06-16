'use strict'
var validator = require('validator');
var Genre = require('../models/genre');

var genreController = {

    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;
        
        // Validar datos (validator)
        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_description = !validator.isEmpty(params.description);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos'
            });
        }
        if (validate_name && validate_description){
            // Crear el objeto a guardar
            var genre = new Genre();

            // Asignar valores
            genre.name = params.name;
            genre.description = params.description;

            // Guardar el objeto
            genre.save((err, genreStored) => {
                if (err || !genreStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El género no se ha guardado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    genre: genreStored
                });
            });

            
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }
        
    },

    getGenres: (req, res) => {

        var query = Genre.find({});

        var last = req.params.last;

        if(last || last != undefined){
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, genres) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!genres){
                return res.status(404).send({
                    status: 'success',
                    message: 'No hay géneros para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                genres
            });
            
        });
        
    },

    getGenre: (req, res) => {

        // Recoger el id de la url
        var genreId = req.params.id;

        // Comprobar que existe
        if(!genreId || genreId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el género'
            });
        }

        // Buscar el género
        Genre.findById(genreId, (err, genre) => {
            if(err || !genre){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el género'
                });
            }
        // Devolverlo en json

        return res.status(200).send({
            status: 'success',
            genre
        });
        })

        
    },

    update: (req, res) => {
        // Recoger el id del género por la url
        var genreId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_description = !validator.isEmpty(params.description);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            }); 
        }

        if(validate_name && validate_description){
             // Find and update
             Genre.findOneAndUpdate({_id: genreId}, params, {new:true}, (err, genreUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!genreUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el género'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    genre: genreUpdated
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
        var genreId = req.params.id;

        // Find and delete
        Genre.findOneAndDelete({_id: genreId}, (err, genreRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!genreRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el género, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                genre: genreRemoved
            });

        }); 
    },
}

module.exports = genreController;