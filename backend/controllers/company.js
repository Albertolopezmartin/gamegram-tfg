'use strict'
var validator = require('validator');
var Company = require('../models/company');

var companyController = {

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
            var company = new Company();

            // Asignar valores
            company.name = params.name;

            // Guardar el objeto
            company.save((err, companyStored) => {
                if (err || !companyStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'La compañía no se ha guardado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    company: companyStored
                });
            });

            
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }
        
    },

    getCompanies: (req, res) => {

        var query = Company.find({});

        var last = req.params.last;

        if(last || last != undefined){
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, companies) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!companies){
                return res.status(404).send({
                    status: 'success',
                    message: 'No hay compañías para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                companies
            });
            
        });
        
    },

    getCompany: (req, res) => {

        // Recoger el id de la url
        var companyId = req.params.id;

        // Comprobar que existe
        if(!companyId || companyId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe la compañía'
            });
        }

        // Buscar la compañía
        Company.findById(companyId, (err, company) => {
            if(err || !company){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la compañía'
                });
            }
        // Devolverlo en json

        return res.status(200).send({
            status: 'success',
            company
        });
        })

        
    },

    update: (req, res) => {
        // Recoger el id de la compañía por la url
        var companyId = req.params.id;

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
             Company.findOneAndUpdate({_id: companyId}, params, {new:true}, (err, companyUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!companyUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe la compañía'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    company: companyUpdated
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
        var companyId = req.params.id;

        // Find and delete
        Company.findOneAndDelete({_id: companyId}, (err, companyRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!companyRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado la compañía, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                company: companyRemoved
            });

        }); 
    },
}

module.exports = companyController;