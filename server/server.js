const express = require("express")
const app = express()
const cors = require("cors")
const mainRouter = require('./routes/router')

const { URL} = require('./db')


const mongoose = require('mongoose')

mongoose.connect(URL).then(()=> {
    console.log('Connected to MongoDB');
}).catch(e=> {
    console.log(e);
    console.log('MongoDB connection error');
})


//middlewares
app.use(cors())
app.use(express.json())

//port
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Port is working on ${port}...`))
app.use('/', mainRouter)

