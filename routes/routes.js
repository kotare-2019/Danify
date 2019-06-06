const express = require('express')
const profileRoute = express.Router()
const profiles = require('../profiles')
const fs = require('fs')


const profileData = {
    contents: profiles
}


profileRoute.get('/profile/:id', (req, res) => {
    let danProfile = profiles.users.find(item => {
        return req.params.id == item.id
    })
    console.log(danProfile)
    if (danProfile != undefined) {
        res.render('./dans/profile', danProfile);
    } else {
        res.send('<h1><strong>404:</strong> This Dan does not exist</h1>');
    } 
})


profileRoute.get('/edit/:id', (req, res) => {
    let danProfile = profiles.users.find(item => {
        return req.params.id == item.id;
    })
    console.log(danProfile)
    if (danProfile != undefined) {
        res.render('./dans/edit', danProfile);
    } else {
        res.send('<h1><strong>404:</strong> This Dan does not exist</h1>')
    }
})


profileRoute.post('/edit/:id', (req, res) => {

    req.body.id = req.params.id;
    for (let i = 0; i < profiles.users.length; i++) {
        if (profiles.users[i].id == req.params.id) {
            profiles.users[i] = req.body;
            
        }  
    }
    console.log(req.body);
    res.redirect('/profile/1');
})


module.exports = {
    profileRoute
}