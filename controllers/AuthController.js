const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const registration = (req, res, next) => {
    
    const {username, password} = req.body

    //controllo campi
    if(!username || !password) {
        res.json({
            message: 'Inserisci tutti i campi'
        })
    } 
    else {
        User.findOne({username: username})
        .then(user => {
            if(user) {
                res.json({
                    message: "Esiste già username"
                })
            }
            else {
                const newUser = new User({
                    username, 
                    password
                })

                //hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) {
                            res.json({
                                message: err
                            })
                        }

                        newUser.password = hash
                        newUser.save()
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
                }))
            }
        })
    }
}

const login = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (req.body.username === '' || req.body.password === '')
            info.message = 'Inserisci tutti i campi';

        User.findOne({username: req.body.username})
        .then(user => {
            if(user) {
                req.session.user = user
                req.session.save()
                
            }
        })
        

        res.json(info);
          
    })(req, res, next);
}

const logout = (req, res, next) => {
    req.logout()
    delete req.session.user

    res.json({
        message: 'Logout effettuato'
    })
}

module.exports = {
    registration, login, logout
}