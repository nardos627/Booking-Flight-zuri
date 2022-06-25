// dependencies
const express = require('express');
const { addFlight, getFlights, getFlight, updateFlight, deleteFlight } = require('../controllers/flightControllers');

//  initializing the router
const router = express.Router();

// routes
router.get('', getFlights)
router.get('/:id', getFlight)
router.post('/add', addFlight)
router.put('/update/:id', updateFlight)
router.delete('/delete/:id', deleteFlight)

module.exports = router;

