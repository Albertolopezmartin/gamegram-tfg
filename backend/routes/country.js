'use strict'

var express = require('express');
var CountryController = require('../controllers/country');

var router = express.Router();

router.post('/save', CountryController.save);
router.get('/countries/:last?', CountryController.getCountries);
router.get('/country/:id', CountryController.getCountry);
router.put('/country/:id', CountryController.update);
router.delete('/country/:id', CountryController.delete);



module.exports = router;