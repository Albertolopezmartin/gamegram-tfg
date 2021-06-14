'use strict'
var validator = require('validator');
var Post = require('../models/post');

var postController = {

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
            var post = new Post();

            // Asignar valores
            post.name = params.name;

            // Guardar el objeto
            post.save((err, postStored) => {
                if (err || !postStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'La compañía no se ha guardado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    post: postStored
                });
            });

            
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }
        
    },

    getPosts: (req, res) => {

        var query = Post.find({});

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

    getPost: (req, res) => {

        // Recoger el id de la url
        var postId = req.params.id;

        // Comprobar que existe
        if(!postId || postId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe la compañía'
            });
        }

        // Buscar la compañía
        Post.findById(postId, (err, post) => {
            if(err || !post){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la compañía'
                });
            }
        // Devolverlo en json

        return res.status(200).send({
            status: 'success',
            post
        });
        })

        
    },

    update: (req, res) => {
        // Recoger el id de la compañía por la url
        var postId = req.params.id;

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
             Post.findOneAndUpdate({_id: postId}, params, {new:true}, (err, postUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!postUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe la compañía'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    post: postUpdated
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
        var postId = req.params.id;

        // Find and delete
        Post.findOneAndDelete({_id: postId}, (err, postRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!postRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado la compañía, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                post: postRemoved
            });

        }); 
    },
}

module.exports = postController;