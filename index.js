const express = require('express')
const setUpDB = require('./config/database')
const router = require('./config/routes')


const app = express()
const port = 3010

setUpDB()



app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log('listening to port', port)
}) 