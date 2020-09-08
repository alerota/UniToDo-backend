module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (!req.session.user)  {
            res.json({
                message: 'Devi fare il login'
            })
                return res.status(401).send()
        }
        
        else {
            return next()
        }
    }
    
}