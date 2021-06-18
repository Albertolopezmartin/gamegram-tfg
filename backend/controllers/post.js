'use strict'
var validator = require('validator');
var Post = require('../models/post');
var fs = require('fs');
var path = require('path');

var postController = {

    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;
        
        // Validar datos (validator)
        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_idUse = !validator.isEmpty(params.idUse);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos'
            });
        }
        if (validate_name && validate_idUse){
            // Crear el objeto a guardar
            var post = new Post();

            // Asignar valores
            post.name = params.name;
            post.comment = params.comment;
            post.idGam = params.idGam;
            post.idUse = params.idUse;

            if(params.photo){
                post.photo = params.photo;
            }else{
                post.photo = null;
            }

            // Guardar el objeto
            post.save((err, postStored) => {
                if (err || !postStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El post no se ha guardado'
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
        query.sort('-_id').exec((err, posts) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!posts){
                return res.status(404).send({
                    status: 'success',
                    message: 'No hay posts para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                posts
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
                message: 'No existe el post'
            });
        }

        // Buscar el post
        Post.findById(postId, (err, post) => {
            if(err || !post){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el post'
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
        // Recoger el id del post por la url
        var postId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_idUse = !validator.isEmpty(params.idUse);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            }); 
        }

        if(validate_name && validate_idUse){
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
                        message: 'No existe el post'
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
                    message: 'No se ha borrado el post, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                post: postRemoved
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
             var postId = req.params.id;

             if(postId){
                // Buscar el post, asignarle el nombre de la imagen y actualizarlo
                Post.findOneAndUpdate({_id: postId}, {photo: file_name}, {new:true}, (err, postUpdated) => {

                    if(err || !postUpdated){
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        post: postUpdated
                    });
                });
             }else{
                return res.status(200).send({
                    status: 'success',
                    photo: file_name
                });
             }
            
        }   
    }, // end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/images/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
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
        Post.find({ "$or": [
            { "name": { "$regex": searchString, "$options": "i"}},
            { "comment": { "$regex": searchString, "$options": "i"}}
        ]})
        .sort([['postdate', 'descending']])
        .exec((err, posts) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            }
            
            if(!posts || posts.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay imágenes que coincidan con tu busqueda'
                });
            }

            return res.status(200).send({
                status: 'success',
                posts
            });

        });
    }
}

module.exports = postController;