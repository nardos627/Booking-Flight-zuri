// dependencies
const express = require('express');

//  initializing the router
const router = express.Router();

// routes
router.get('', (req, res) => {
    try {
      res.status(200).json({"Message": "Welcome to my flight booking API. Navigate to /flights"})
    } catch (error) {
      res.status(500).json({"Error": `${error.message}`})
    }}
)

module.exports = router
