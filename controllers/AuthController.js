const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registration = (req, res, next) => {
    var username = req.body.username 
    User.findOne({username: username})
        .then(user => {
            if(user) {
                res.json({
                    message: "Esiste già username"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
                    if(err) {
                        res.json({
                            error: err
                        })
                    }
            
                    let user = new User({
                        username: req.body.username,
                        password: hashedPass
                    })
                
                    user.save()
                    .then(user => {
                        res.json({
                            message: 'User aggiunto'
                        })
                    })
                    .catch(error => {
                        res.json({
                            message: 'Errore'
                        })
                    })
                })
            }
        })
    
}

const login = (req, res, next) => {
    var username = req.body.username 
    var password = req.body.password

    User.findOne({username: username})
        .then(user => {
            if(user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if(err) {
                        res.json({
                            error: err
                        })
                    }
                    if(result) {
                        let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
                        
                        res.json({
                            message: 'Login',
                            token: token
                        })
                    } 
                    else{
                        res.json({
                            message: 'Password non corretta'
                        })
                    }
                })
            }
            else {
                res.json({
                    message: 'User non trovato'
                })
            }
        })
}

module.exports = {
    registration, login
}