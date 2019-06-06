const express = require('express')
const server = express()

server.use(express.urlencoded({extended: true}))

server.get('/', (req, res) =>{
  res.send("Welcome to Songify")
})


module.exports = server