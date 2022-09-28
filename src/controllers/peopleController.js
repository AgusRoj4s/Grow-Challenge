const peopleService = require('../api/peopleService');

const getAllPeople = async(req, res) => {
    try {
        people = await peopleService.getAllPeople(req.query.sortby)
        res.send(people)
    } catch (error) {
        res.status(500)
        res.send(error)
    }
}

module.exports = {
    getAllPeople
}
