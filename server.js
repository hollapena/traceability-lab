const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '072b2e6a1ff348d9af0aba716638d4c7',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/style', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/styles.css'))
})

const port = process.env.PORT || 4546

app.listen(port, () => console.log(`Rockin' and Rollin' on ${port}`))