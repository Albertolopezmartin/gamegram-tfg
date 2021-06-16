'use strict'
var validator = require('validator');
var Game = require('../models/game');

var gameController = {

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
            var game = new Game();

            // Asignar valores
            game.name = params.name;
            game.description = params.description;
            game.idCom = params.idCom;

            // Guardar el objeto
            game.save((err, gameStored) => {
                if (err || !gameStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'La compañía no se ha guardado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    game: gameStored
                });
            });

            
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }
        
    },

    getGames: (req, res) => {

        var query = Game.find({});

        var last = req.params.last;

        if(last || last != undefined){
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, games) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!games){
                return res.status(404).send({
                    status: 'success',
                    message: 'No hay juegos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                games
            });
            
        });
        
    },

    getGame: (req, res) => {

        // Recoger el id de la url
        var gameId = req.params.id;

        // Comprobar que existe
        if(!gameId || gameId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el juego'
            });
        }

        // Buscar el juego
        Game.findById(gameId, (err, game) => {
            if(err || !game){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el juego'
                });
            }
        // Devolverlo en json

        return res.status(200).send({
            status: 'success',
            game
        });
        })

        
    },

    update: (req, res) => {
        // Recoger el id del juego por la url
        var gameId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_name = !validator.isEmpty(params.name);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_name){
             // Find and update
             Game.findOneAndUpdate({_id: gameId}, params, {new:true}, (err, gameUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!gameUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe la compañía'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    game: gameUpdated
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
        var gameId = req.params.id;

        // Find and delete
        Game.findOneAndDelete({_id: gameId}, (err, gameRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!gameRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el juego, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                game: gameRemoved
            });

        }); 
    },
}

module.exports = gameController;