
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
//// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars enginer and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kevin Chen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kevin Chen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is my help message to display.',
        name: 'Kevin Chen'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send( {
            error:'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitute, longitute, location } = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitute, longitute, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData.msg,
                location: location,
                address: req.query.address
            })
            
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kevin Chen',    
        errMsg: 'Help articles not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kevin Chen',
        errMsg: 'Page not found'
    })
})

app.listen(port, () =>{
    //console.log('Server is up on port ' + port)
})