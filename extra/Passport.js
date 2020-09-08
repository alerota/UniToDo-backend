const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/UserModel')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
            
            if(!username || !password) {
                console.log()
                res.json({
                    message: 'Inserisci tutti i campi'
                })
            } 

            User.findOne({username: username})
            .then(user => {
                if(!user) {
                    return done(null, false, {
                        message: 'User non trovato'
                    })
                }
                else {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if(err) {
                            return done(null, false, {
                                error: err
                            })
                        }

                        if(result) {
                            return done(null, false, {
                                message: 'Login'
                            })
                        } 
                        else{
                            return done(null, false, {
                                message: 'Password non corretta'
                            })
                        }
                    })
                }
            })
            .catch(error => {
                res.json({
                    message: 'Errore'
                })
            })
        })
    )

    /*passport.serializeUser((user, done) => {
        done(null, user.id);
    })
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })*/
}