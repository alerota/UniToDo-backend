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

const addNewCategory = (req, res, next) => {
    const {name, color} = req.body

    //controllo campi
    if(!name || !color) {
        res.json({
            message: 'Inserisci tutti i campi'
        })
    } 
    else {
        Category.findOne({name: name})
        .then(category => {
            if(category) {
                res.json({
                    message: "Esiste già una categoria con questo nome"
                })
            }
            else {
                const newCategory = new Category({
                    name, 
                    color
                })

                        
                newCategory.save()
                .then(category => {
                    res.json({
                        message: 'Categoria aggiunta'
                    })
                })
                .catch(error => {
                    res.json({
                        message: 'Errore con la creazione della categoria'
                    })
                })
            }
        })
    }
}

const getCategoryByName = (req, res, next) => {
    //const par = req.params.name;
    const { name } = req.params


    Category.findOne({name: name}) 
    .then(category => {
        if(category) {
            res.json({
                category: category
            })
        }
        else{
            res.json({
                message: 'Non esite una categoria con questo nome'
            })
        }
    })
    .catch(error => {
        res.json({
            message: "dlkasjldkakldaj" + error
        })
    })
}

module.exports = {
    getAllCategories, addNewCategory, getCategoryByName
}