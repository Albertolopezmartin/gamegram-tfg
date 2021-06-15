'use strict'

var express = require('express');
var CountryController = require('../controllers/country');
var CompanyController = require('../controllers/company');
var GameController = require('../controllers/game');
var GamreController = require('../controllers/gamre');
var GenreController = require('../controllers/genre');
var PostController = require('../controllers/post');
var UserController = require('../controllers/user');
var router = express.Router();

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
router.post('/gamre/save', GamreController.save);
router.get('/gamres/:last?', GamreController.getGamres);
router.get('/gamre/:id', GamreController.getGamre);
router.put('/gamre/:id', GamreController.update);
router.delete('/gamre/:id', GamreController.delete);
//
router.post('/save', GenreController.save);
router.get('/countries/:last?', GenreController.getCountries);
router.get('/country/:id', GenreController.getCountry);
router.put('/country/:id', GenreController.update);
router.delete('/country/:id', GenreController.delete);
//
router.post('/save', PostController.save);
router.get('/countries/:last?', PostController.getCountries);
router.get('/country/:id', PostController.getCountry);
router.put('/country/:id', PostController.update);
router.delete('/country/:id', PostController.delete);
router.post('/upload-image/:id', );
//
router.post('/save', UserController.save);
router.get('/countries/:last?', UserController.getCountries);
router.get('/country/:id', UserController.getCountry);
router.put('/country/:id', UserController.update);
router.delete('/country/:id', UserController.delete);
//



module.exports = router;