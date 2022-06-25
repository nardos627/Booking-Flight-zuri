const express = require('express');

//  initializing the router
const router = express.Router();

// routes
router.all('*', (req, res) => {
    res.status(404).json({"Error": "Oops! The route you are looking for does not exist"})
})

module.exports = router