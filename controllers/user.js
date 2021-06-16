'use strict'
var validator = require('validator');
var User = require('../models/user');

var userController = {

    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;
        
        // Validar datos (validator)
        try{
            var validate_nick = !validator.isEmpty(params.nick);
            var validate_email = !validator.isEmpty(params.email);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos'
            });
        }
        if (validate_nick && validate_email){
            // Crear el objeto a guardar
            var user = new User();

            // Asignar valores
            user.nick = params.nick;
            user.email = params.email;

            // Guardar el objeto
            user.save((err, userStored) => {
                if (err || !userStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'La compañía no se ha guardado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    user: userStored
                });
            });

            
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }
        
    },

    getUsers: (req, res) => {

        var query = User.find({});

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
                    message: 'No hay Compañías para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                countries
            });
            
        });
        
    },

    getUser: (req, res) => {

        // Recoger el id de la url
        var userId = req.params.id;

        // Comprobar que existe
        if(!userId || userId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe la compañía'
            });
        }

        // Buscar la compañía
        User.findById(userId, (err, user) => {
            if(err || !user){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la compañía'
                });
            }
        // Devolverlo en json

        return res.status(200).send({
            status: 'success',
            user
        });
        })

        
    },

    update: (req, res) => {
        // Recoger el id de la compañía por la url
        var userId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_nick = !validator.isEmpty(params.nick);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_nick){
             // Find and update
             User.findOneAndUpdate({_id: userId}, params, {new:true}, (err, userUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!userUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe la compañía'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    user: userUpdated
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
        var userId = req.params.id;

        // Find and delete
        User.findOneAndDelete({_id: userId}, (err, userRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!userRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado la compañía, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                user: userRemoved
            });

        }); 
    },
}

module.exports = userController;