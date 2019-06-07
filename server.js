const express = require('express')
const server = express()
const hbs = require('express-handlebars')
const profiles = require('./profiles')
const { profileRoute } = require('./routes/routes')
server.use(express.urlencoded({extended: true}))

const profileData = {
  contents: profiles
}


server.use('/', profileRoute)



server.get('/', (req, res) =>{
  res.render('./dans/index', profiles)
  console.log(profiles)
})


server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))


server.set('view engine', 'hbs')
server.use(express.static('public'))


module.exports = server