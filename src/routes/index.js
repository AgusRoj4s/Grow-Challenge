const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');
const planetsController = require('../controllers/planetsController.js');

module.exports = () => {
    router.get("/ping", (req, res) => {
        res.send('pong')
    });
    
    router.get('/people', peopleController.getAllPeople);
    router.get('/planets', planetsController.getAllPlanets);
    return router; 
};