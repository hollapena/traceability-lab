const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '7b9bec52b1ad4d85b0a0e6bec8812175',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.use(express.json())

app.get('/api/commands', (req,res) => {
    try {
        nonExistentFunction();
      } catch (error) {
        rollbar.error(error);
      }
})

app.get('/api/critical', (req,res) => {
    try {
        nonExistentFunction();
    } catch (error) {
        rollbar.critical('This is a CRITICAL error');
    }})

app.get('/api/warning', (req,res) => {
    try {
        nonExistentFunction();

    } catch (error) {
        rollbar.warning('This is a WARNING');
    }})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/style', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/styles.css'))
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4546

app.listen(port, () => console.log(`Rockin' and Rollin' on ${port}`))