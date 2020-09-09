var express = require('express');
const Category = require('../models/CategoryModel')

const getAllCategories = (req, res, next) => {
    Category.find()
    .then(categories => {
        if(categories) {
            res.json({
                categories: categories
            })
        }
        else {
            res.json({
                categories: []
            })
        }
    })
    .catch(error => {
        res.json({
            message: 'Errore nella visualizzazione delle categorie'
        })
    })
}

module.exports = {
    getAllCategories
}