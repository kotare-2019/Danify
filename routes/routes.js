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
    if (danProfile != undefined) {
        res.render('./dans/edit', danProfile);
    } else {
        res.send('<h1><strong>404:</strong> This Dan does not exist</h1>')
    }
})


profileRoute.get('/add/', (req, res) => {
    res.render('./dans/add');
})


profileRoute.post('/edit/:id', (req, res) => {
    console.log(req.body)
    req.body.id = req.params.id;
    for (let i = 0; i < profiles.users.length; i++) {
        if (req.body['new-category-key'] != undefined) {
            profiles.users[i][req.body['new-category-key']] = req.body['new-category-value']
        } else if (profiles.users[i].id == req.params.id) {
            Object.assign(profiles.users[i], req.body)
        }  
    }
    console.log(req.body);
    let id = Number(req.params.id)
    fs.writeFile('profiles.json', JSON.stringify(profiles, null, 2), 'utf8', (err) => {
        res.redirect('/profile/' + id);
    })
})


profileRoute.post('/add', (req, res) => {
    req.body.id = profiles.users.length + 1;
    if (req.body.name != 'Dan') {
        req.body.name = 'Dan'
        profiles.users.push(req.body)
        console.log(req.body)
    }
    fs.writeFile('profiles.json', JSON.stringify(profiles, null, 2), 'utf8', (err) => {
        res.redirect('/profile/' + req.body.id);
    }) 
})


module.exports = {
    profileRoute
}