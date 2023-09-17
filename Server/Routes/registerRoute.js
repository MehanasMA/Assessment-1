const express = require('express');
const registerController = require('../Controller/registerController');
const Route = express.Router();

Route.post('/register', registerController.register);
Route.get('/details', registerController.details);
Route.get('/locations',registerController.location)

module.exports = Route;
