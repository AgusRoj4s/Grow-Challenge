const axios = require('axios');
const getAllPeople = async(sortBy) => {
    try {
        people = await getPeople()
        switch (sortBy) {
            case 'name':
                return sortArrayByParam(people, sortBy)
            case 'height':
                return sortArrayByParam(people, sortBy)
            case 'mass':
                return sortArrayByParam(people, sortBy)
            default:
                return people //default case return array ordered by url [ex: people[0].url = "https://swapi.dev/api/people/1/"]
        }
    } catch (error) {
        return error
    }
}    

const getPeople = async() => {
    let people = new Array()
    const url = "https://swapi.dev/api/people?page="
    try {
        await axios
            .all([
                axios.get(url+1), axios.get(url+2), axios.get(url+3), 
                axios.get(url+4), axios.get(url+5), axios.get(url+6), 
                axios.get(url+7), axios.get(url+8), axios.get(url+9) // Number of pages in SWAPI to get all people = 9
                ])
            .then(
                axios.spread((...responses) => {
                    for (let response of responses){
                        for (let result of response.data.results){
                            people.push(result)
                        }
                    }
            }))
            return people
    } catch (error) {
        console.error(`fail to get data: ${error}`);
        return error
    }
}

const sortArrayByParam = (array, param) => {
    if (param == 'height'){
        array.sort(orderArrayByHeight)
    }else if(param == 'mass'){
        array.sort(orderArrayByMass)
    }else{
        return array.sort(compareName)
    }
    return array
}

const orderArrayByHeight = (a, b) => {
    if(a.height == 'unknown') return 1 
    if(b.height == 'unknown') return -1
    return (a.height - b.height)
}

const orderArrayByMass = (a, b) => {
    if(a.mass == 'unknown') return 1    // When "mass":"unknown" ===> In this order, unknown goes to the final of array
    if(b.mass == 'unknown') return -1
    if(a.mass == '1,358') return 1      // When "mass":"1,358" 
    if(b.mass == '1,358') return -1
    return (a.mass - b.mass)
}

const compareName = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()){
        return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()){
        return 1;
    }
    return 0;
}

module.exports = {
    getAllPeople
}