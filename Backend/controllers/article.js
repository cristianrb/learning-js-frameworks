'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
        var hola = req.body.hola;
    
        return res.status(200).send({
            curso: "Master en Frameworks JS",
            autor: "Cristian Ruiz",
            url: "cristianrb.github.com",
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: "Soy la acción test de mi controlador de articulos"
        });
    },

    save: (req, res) => {
        // Recoger parametros por POST
        var params = req.body;
        // Validar datos (validator)
        try {
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar",
            });
        }
        // Crear el objeto a guardar
        var article = new Article();
        // Asignar valores
        article.title = params.title;
        article.content = params.content;
        article.image = null;
        // Guardar articulo
        article.save((err, articleStored) => {
            if (err || !articleStored) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El articulo no se ha guardado'
                });
            } 

            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                article: articleStored
            });
        });
    },

    getArticles: (req, res) => {
        var query = Article.find({});
        
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }

        // Find 
       query.sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },

    getArticle: (req, res) => {
        // Recoger id de la url
        var id = req.params.id;
        // Comprobar que existe
        if (!id || id == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            });
        }
        // Buscar el articulo
        Article.findById(id, (err, article) => {
            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }

            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                article
            });
        })
    },

    update: (req, res) => {
        // Recoger el id del articulo por la url
        var articleId = req.params.id;
        // Recoger los datos que llegan por put
        var params = req.body;
        // Validar los datos
        try {
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            }); 
        }

        if (validateTitle && validateContent) {
            // Find and update
            Article.findOneAndUpdate({_id: articleId}, params, {new: true}, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        } else {
            // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });
        }
    },

    delete: (req, res) => {
        // recoger id de la url
        var articleId = req.params.id;
        // Find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar'
                });
            }

            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Articulo eliminado',
                article: articleRemoved
            });
        });  
    },

    upload: (req, res) => {
        // Configurar el modulo connect multiparty router/article.js (hecho)

        // recoger el fichero de la peticion
        var fileName = 'Imagen no subida...';
        if (!req.files) {
            return res.status(404).send({
                status: "error",
                message: fileName
            });
        }
        // Conseguir el nombre y la extension del archivo
        var filePath = req.files.file0.path;
        var fileSplit = filePath.split('\\'); // Advertencia en linux o mac: split('/');

        // Nombre del archivo
        var name = fileSplit[2];

        // Extension del archivo
        var ext = name.split('\.')[1];

        // Comprobar la extension, solo imagenes, si no es valida borrar el fichero
        if (ext != 'png' && ext != 'jpg' && ext != 'jpeg' && ext != 'gif') {
            // borrar archivo
            fs.unlink(filePath, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension no es valida'
                });
            });
        } else {
            // Si todo es valido, sacando id articulo
            var articleId = req.params.id;
            // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
            Article.findOneAndUpdate({_id: articleId}, {image: name}, {new:true}, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: "Error al guardar la imagen del articulo"
                    });
                }
                
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
            
        }
    },

    getImage: (req, res) => {
        var file = req.params.image;
        var pathFile = './upload/articles/' + file;

        fs.exists(pathFile, (exists) => {
            console.log(exists);
            if (exists) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });
    },

    search: (req, res) => {
        // sacar el string a buscar
        var searchString = req.params.search;
        // Find or
        Article.find({ "$or" : [
            { "title" : { "$regex" : searchString, "$options" : "i"}},
            { "content" : { "$regex" : searchString, "$options" : "i"}}
        ]})
        .sort([['date', 'descending']])
        .exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la peticion'
                });
            }

            if (!articles || articles.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });

        
    }
};

module.exports = controller;