const mongoose = require('mongoose')

const setUpDB = () => {
    mongoose.connect('mongodb://localhost:27017/bookmark-app',{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
        .then(response => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = setUpDB