'use strict'

var express = require('express');
var CountryController = require('../controllers/country');

var router = express.Router();

router.post('/save', CountryController.save);
router.get('/countries/:last?', CountryController.getCountries);
router.get('/country/:id', CountryController.getCountry);



module.exports = router;