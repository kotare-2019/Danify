const express = require('express')
const profileRoute = express.Router()
const profiles = require('../profiles')
const fs = require('fs')


const profileData = {
    contents: profiles
}


profileRoute.get('/profile/:id', (req, res) => {
    let danProfile = profiles.users.find(item => {
        req.params.id === item.id
    })
    // console.log(danProfile)
    res.send(`This is profile number ${req.params.id}`)
})


profileRoute.get('/edit/:id', (req, res) => {
    let danProfile = profiles.users.find(item => {
        return req.params.id == item.id;
    })
    res.send(`This is the edit page for ${req.params.id}`)
})


module.exports = {
    profileRoute
}