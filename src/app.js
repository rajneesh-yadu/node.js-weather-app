const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//defining path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')       //setting new path as templates for view
const partialPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and view location
app.set('view engine', 'hbs')                       
app.set('views', viewPath) 
hbs.registerPartials(partialPath)                         // set new path for views directory otherwise name the folder views abd comment out this line 

//Setup for static public folder
app.use(express.static(publicDirectoryPath))        //for serving static pages from public folder

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'rajneesh'
    })
})
// app.get('', (req,res) =>{
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help', (req,res) =>{
//     res.send('Help page')
// })

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About',
        age: 26,
        profile: 'Full-Stack developer',
        name: 'rajneesh'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        category: 'docs',
        name: 'rajneesh'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location.'
        })
    }
    // console.log(req.query.location)
    geocode(req.query.address, (error,{latitude, longitude, location} = { }) => {
        if (error){
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude,(error,forecastData) => {
            if (error){
                return res.send({
                    error: error
                })
            }
    
            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })    
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'rajneesh'
    })
})

app.get('/*', (req,res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'rajneesh'
    })
})

app.listen(port, () => {
    console.log('Server is up on the port' + port)
})