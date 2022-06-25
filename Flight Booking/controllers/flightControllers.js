// dependencies
const { readFileSync, writeFileSync } = require('fs')
const path = require('path')

// defining the file directory
const fileDir = path.join(__dirname, '../model/flights.json')

// GET all flights
const getFlights = (req, res) => {
    try {
        const data = readFileSync(fileDir)
        const flights = JSON.parse(data)

        // logging the success messseng
        console.log(`Request of all the flights data was successfull!`)
        return res.status(200).send(flights)
    } catch (error) {
        console.log(`An error occured while reading or parsing the file ${fileDir.split('/')[-1]}!`)
        return res.status(500).json({ "Error": `${error.message}` })
    }
}

// GET a flight
const getFlight = (req, res) => {
    try {
        // read the data in the database and parse the data
        const data = readFileSync(fileDir)
        const flights = JSON.parse(data)

        // getting the id property from the URL params
        var id = req.params.id
        
        for(let i = 0; i < flights.length; i++) {
            if (id == flights[i].id) {
                // logging the success message
                console.log(`Request of the flight with id ${id} was successfull!`)
                return res.send(flights[i])
            } else {
                return res.json({"Message": "The flight booking data you are looking does not exist!"})
            }
        }

    } catch (error) {
        res.status(500).json({ "Error": `${error.message}` })
        console.log(`An error occured while reading or parsing the file ${fileDir.split('/')[-1]}!`)
    }
}

// POST a new flight details
const addFlight = async (req, res) => {

    try {
        // read the data in the database and parse the data
        const data = readFileSync(fileDir)
        const flights = JSON.parse(data)

        // destructuring the properties from the body
        var { title, time, price, date} = req.body
        
        // Check that all required fields are filled out
        let _title = typeof (title) === 'string' && title.length > 0 ? title : false
        let _time = typeof (time) === 'string' && time.length > 0 ? time : false
        let _price = typeof (+(price)) === 'number' && `${+(price)}`.length > 0 ? +(price) : false
        let _date = typeof (new Date(date)) === 'object' && (new Date(date)) !== null && !isNaN((new Date(date))) ? (new Date(date)).toDateString() : false

        // defining new object for the flight data
        let flight = {
            'id': (new Date()).getTime().toString(36),
            'title': _title,
            'time': _time,
            'price': _price,
            'date': _date
        }

        if ( _title && _time && _price && _date) { 
            // pushing the validated data to the flights.json file
            flights.push(flight)

            // logging success message 
            console.log(`The flight with id ${flight.id} was added successfully!`)
            writeFileSync(fileDir, JSON.stringify(flights))
        }
        // return the flights data 
        res.status(200).send(flights)

    } catch (error) {
        // send an error response
        res.status(500).json({"Error": `${error.message}`})
    }
}

// UPDATE a flight by id
const updateFlight = (req, res) => {
    try {
        // read the data in the database and parse the data
        const data = readFileSync(fileDir)
        const flights = JSON.parse(data)


        var id = req.params.id

        // destructuring the properties from the body
        var { title, time, price, date} = req.body
        
        // Check that all required fields are filled out
        let _title = typeof (title) === 'string' && title.length > 0 ? title : false
        let _time = typeof (time) === 'string' && time.length > 0 ? time : false
        let _price = typeof (+(price)) === 'number' && `${+(price)}`.length > 0 ? +(price) : false
        let _date = typeof (new Date(date)) === 'object' && (new Date(date)) !== null && !isNaN((new Date(date))) ? (new Date(date)).toDateString() : false

        let foundFlight = flights.find(function(flight) { 
            if (flight.id === id) { 
                return flight
            }
        })

        if (foundFlight) { 
            // defining new object for the flight data
            foundFlight = {
                "id": foundFlight.id,
                "title": _title || foundFlight.title,
                "time": _time || foundFlight.time, 
                "price": _price || foundFlight.price, 
                "date": _date || foundFlight.date
            }

            // push the updated flight data and remove the previous data
            flights.push(foundFlight);
            flights.splice(flights.length - 2, 1)

            // logging success message 
            console.log(`The flight with id ${foundFlight.id} was added successfully!`)
            writeFileSync(fileDir, JSON.stringify(flights))

            // return the flights data 
            res.status(200).send(flights)
        } else { 
            // if the flight is not found
            res.status(400).json({"Error": `The flight with the id ${id} does not exist!`})
        }
    } catch (error) {
        // send an error response
        res.status(500).json({"Error": `${error.message}`})
    }
}

// DELETE a flight by id
const deleteFlight = (req, res) => {
    try {
         // read the data in the database and parse the data
        const data = readFileSync(fileDir)
        const flights = JSON.parse(data)

        // getting the id properity from URL params
        var id = req.params.id

        // delete a specific flight by finding the index
        const flightIdx = flights.findIndex((flight) => { 
            return flight.id === id
        })
        
        // removing the flight from the fligths array
        flights.splice(flightIdx, 1)

        // write the new info to the file
        writeFileSync(fileDir, JSON.stringify(flights))

        // logging success message 
        console.log(`The flight with id ${id} was deleted successfully!`)
        // return the new flights data
        return res.status(200).send(flights)

    } catch (error) {
        // send an error response
        res.status(500).json({"Error": `${error.message}`})
    }
}

module.exports = { addFlight, getFlights, getFlight, updateFlight, deleteFlight }


