const express = require('express')
const server = express()
const hbs = require('express-handlebars')
const profiles = require('./profiles')
const { profileRoute } = require('./routes/routes')


const profileData = {
  contents: profiles
}


server.use('/', profileRoute)
server.use(express.urlencoded({extended: true}))


server.get('/', (req, res) =>{
  res.render('./dans/index', profiles)
})


server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
  // partialsDir: __dirname + '/views/partials/'
}))


server.set('view engine', 'hbs')
server.use(express.static('public'))

module.exports = server