var express = require('express');

const index = (req, res, next) => {
    app.use(express.static(path.join(__dirname, '../frontend/build/index.html')));
}

const dashboard = (req, res, next) => {
    res.json ({
        message: "dashboard"
    })
}

module.exports = {
    index, dashboard
}