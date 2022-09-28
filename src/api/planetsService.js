const axios = require('axios');
const peopleService = require('../api/peopleService');

const getAllPlanets = async() => {
    try {
        peopleOrderedByUrl = await peopleService.getAllPeople()// (Get array of people ordered by url [ex: peopleOrderedByUrl[0].url = "https://swapi.dev/api/people/1/"])
        planets = await getPlanets(peopleOrderedByUrl)
        return planets
    } catch (error) {
        return error
    }
}    

const getPlanets = async(peopleOrderedByUrl) => {
    let planets = new Array()
    const url = "https://swapi.dev/api/planets?page="
    try {
        await axios
            .all([
                axios.get(url+1), axios.get(url+2), axios.get(url+3), 
                axios.get(url+4), axios.get(url+5), axios.get(url+6),  //Number of pages in SWAPI to get all planets = 6
                ])
            .then(
                await axios.spread((...responses) => {
                    for (const response of responses){
                        for (const planet of response.data.results){
                            let finalPlanet = planet
                            let residentsNames = new Array()

                            for(const resident of planet.residents){
                                let url = resident.split('/')//[ex: url = [ 'https:', '', 'swapi.dev', 'api', 'people', '1', '' ] ===> url[5] = 1
                                
                                if(url[5] < 17)residentsNames.push(peopleOrderedByUrl[url[5] - 1].name)       //}     peopleOrderedByUrl[15] = "https://swapi.dev/api/people/16/"
                                else if(url[5] > 17) residentsNames.push(peopleOrderedByUrl[url[5] - 2].name) //}
                            }                                                                                 //}===> https://swapi.dev/api/people/17 : 404 error (this request doesnt exist)
                            finalPlanet.residents = residentsNames                                            //}
                            planets.push(finalPlanet)                                                         //}     peopleOrderedByUrl[16] = "https://swapi.dev/api/people/18/"  
                        }                                                                                     //}     peopleOrderedByUrl[17] = "https://swapi.dev/api/people/19/"
                    }
            }))
            return planets
    } catch (error) {
        console.error(`fail to get data: ${error}`);
        return error
    }
}

module.exports = {
    getAllPlanets
}
