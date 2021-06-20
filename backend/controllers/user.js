'use strict'
var validator = require('validator');
var User = require('../models/user');
const jwt = require("jsonwebtoken");
var fs = require('fs');

var userController = {

    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;
        
        // Validar datos (validator)
        try{
            var validate_nick = !validator.isEmpty(params.nick);
            var validate_email = !validator.isEmpty(params.email);
            var validate_pass = !validator.isEmpty(params.pass);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos'
            });
        }
        if (validate_nick && validate_email && validate_pass){
            // Crear el objeto a guardar
            var user = new User();

            // Asignar valores
            user.nick = params.nick;
            user.email = params.email;
            user.pass = params.pass;
            user.idCou = params.idCou;

            if(params.pfp){
                user.pfp = params.pfp;
            }else{
                user.pfp = null;
            }

            // Guardar el objeto
            user.save((err, userStored) => {
                if (err || !userStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El usuario no se ha guardado'
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
        query.sort('-_id').exec((err, users) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!users){
                return res.status(404).send({
                    status: 'success',
                    message: 'No hay usuarios para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                users
            });
            
        });
        
    },

    getUserById: (req, res) => {

        // Recoger el id de la url
        var userId = req.params.id;

        // Comprobar que existe
        if(!userId || userId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el usuario'
            });
        }

        // Buscar el usuario
        User.findById(userId, (err, user) => {
            if(err || !user){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el usuario'
                });
            }
        // Devolverlo en json

        return res.status(200).send({
            status: 'success',
            user
        });
        })

        
    },

    getUser: (req, res) => {

        // Recoger el id de la url
        var userNick = req.params.nick;

        // Comprobar que existe
        if(!userNick || userNick == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el usuario'
            });
        }

        // Buscar el usuario
        User.findOne({nick: userNick}, (err, user) => {
            if(err || !user){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el usuario'
                });
            }
        // Devolverlo en json

        return res.status(200).send({
            status: 'success',
            user
        });
        })

        
    },

    login: (req, res, next) => {
        User.find({ nick: req.body.nick })
          .exec()
          .then(user => {
            
            if (user.length < 1) {
              return res.status(401).json({
                message: "Auth failed"
              });
            }
            if (req.body.pass == user[0].pass){
                const token = jwt.sign(
                    {
                      nick: user[0].nick,
                      userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                  );
                  return res.status(200).json({
                    message: "Auth successful",
                    token: token
                  });
            } else {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
          });
    },

    update: (req, res) => {
        // Recoger el id del usuario por la url
        var userId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_nick = !validator.isEmpty(params.nick);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
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
                        message: 'No existe el usuario'
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
                    message: 'No se ha borrado el usuario, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                user: userRemoved
            });

        }); 
    },

    upload: (req, res) => {

        // Recoger el fichero de la petición
        var file_name = 'Imagen no subida';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprobar la extension, solo imagenes, si es valida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            
            // borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida'
                });
            });
        
        }else{
             // Si todo es valido, sacando id de la url
             var userId = req.params.id;

             if(userId){
                // Buscar el usuario, asignarle el nombre de la imagen y actualizarlo
                User.findOneAndUpdate({_id: userId}, {pfp: file_name}, {new:true}, (err, userUpdated) => {

                    if(err || !userUpdated){
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        user: userUpdated
                    });
                });
             }else{
                return res.status(200).send({
                    status: 'success',
                    pfp: file_name
                });
             }
            
        }   
    }, // end upload file

    getImage: (req, res) => {
        var file = req.params.getImage;
        var path_file = './upload/images/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                console.log(path_file);
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });
    },

    search: (req, res) => {
        // Sacar el string a buscar
        var searchString = req.params.search;

        // Find or
        User.find({ "$or": [
            { "nick": { "$regex": searchString, "$options": "i"}}
        ]})
        .exec((err, users) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            }
            
            if(!users || users.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay usuarios que coincidan con tu busqueda'
                });
            }

            return res.status(200).send({
                status: 'success',
                users
            });

        });
    }
}

module.exports = userController;