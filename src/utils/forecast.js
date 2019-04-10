const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a5c5abe6e28675de5062e4b3289494db/' + latitude +',' + longitude

    request({url, json:true},(error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Location not found! Try another location.', undefined)
        }
        else{
            // callback(undefined,"It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain." )
            callback(undefined, body.daily.data[0].summary + " High today is " + body.daily.data[0].temperatureMax + ", with low of " + body.daily.data[0].temperatureMin + ". It is currently " + body.currently.temperature + " degrees farenhiteit out. There is a " + body.currently.precipProbability + "% chance of rain." )
        }
    })
}

module.exports = forecast