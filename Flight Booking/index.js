// dependencies
const express = require("express")

// import routes
const homeRoute = require('./routes/homeRoute')
const flightRoutes = require('./routes/flightRoutes')
const errorRoute = require('./routes/errorRoute')

// initializing the app
const app = express()

// app middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app utilities
app.use("/", homeRoute)
app.use("/flights", flightRoutes)

// not found route
app.use(errorRoute)

// server setup
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`  [server]: server is listening on port ${PORT}....`)
});
