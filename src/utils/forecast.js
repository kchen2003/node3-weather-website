const request = require('request')
// normal coding
// const forecast = (lat,lon, callback) => {
//     //const url = 'http://api.weatherstack.com/current?access_key=ab78c5b55e499428df00afdaa6b5ab19&query=37.8267,-122.4223&units=f'
//     const url = 'http://api.weatherstack.com/current?access_key=ab78c5b55e499428df00afdaa6b5ab19&query=' + lon + ',' + lat + '&units=f'
   
//     request({url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 msg: response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degree out. It feels like ' +
//                 response.body.current.feelslike + ' degrees out.'
//             })
//         }
//     })
// }

// short hand and desturcturing 
const forecast = (lat,lon, callback) => {
   
    const url = 'http://api.weatherstack.com/current?access_key=ab78c5b55e499428df00afdaa6b5ab19&query=' + lon + ',' + lat + '&units=f'
   
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                msg: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degree out. It feels like ' +
                body.current.feelslike + ' degrees out.'
            })
        }
    })
}



module.exports = forecast