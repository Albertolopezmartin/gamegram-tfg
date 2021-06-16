'use strict'

var express = require('express');

var CountryController = require('../controllers/country');
var CompanyController = require('../controllers/company');
var GameController = require('../controllers/game');
var GenreController = require('../controllers/genre');
var PostController = require('../controllers/post');
var UserController = require('../controllers/user');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/photoss'});

router.post('/country/save', CountryController.save);
router.get('/countries/:last?', CountryController.getCountries);
router.get('/country/:id', CountryController.getCountry);
router.put('/country/:id', CountryController.update);
router.delete('/country/:id', CountryController.delete);
//
router.post('/company/save', CompanyController.save);
router.get('/companies/:last?', CompanyController.getCompanies);
router.get('/company/:id', CompanyController.getCompany);
router.put('/company/:id', CompanyController.update);
router.delete('/company/:id', CompanyController.delete);
//
router.post('/game/save', GameController.save);
router.get('/games/:last?', GameController.getGames);
router.get('/game/:id', GameController.getGame);
router.put('/game/:id', GameController.update);
router.delete('/game/:id', GameController.delete);
//
router.post('/genre/save', GenreController.save);
router.get('/genres/:last?', GenreController.getGenres);
router.get('/genre/:id', GenreController.getGenre);
router.put('/genre/:id', GenreController.update);
router.delete('/genre/:id', GenreController.delete);
//
router.post('/post/save', PostController.save);
router.get('/posts/:last?', PostController.getPosts);
router.get('/post/:id', PostController.getPost);
router.put('/post/:id', PostController.update);
router.delete('/post/:id', PostController.delete);
router.post('/post/upload-image/:id', md_upload, PostController.upload);
//
router.post('/user/save', UserController.save);
router.get('/users/:last?', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);
router.post('/user/upload-image/:id', md_upload, UserController.upload);
//



module.exports = router;