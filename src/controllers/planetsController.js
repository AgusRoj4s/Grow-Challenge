const planetsService = require('../api/planetsService');

const getAllPlanets = async(req, res) => {
    try {
        planets = await planetsService.getAllPlanets()
        res.send(planets)
    } catch (error) {
        res.status(500)
        res.send(error)
    }
}

module.exports = {
    getAllPlanets
}
