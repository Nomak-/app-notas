require('dotenv').config()

const mongoose = require('mongoose')

const {MONGODB_URI} = process.env

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then (db => console.log('Conectado a la DB'))
    .catch(err => console.log(err))