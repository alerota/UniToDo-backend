var express = require('express');
const Category = require('../models/CategoryModel')

// ottieni tutte le categorie (disponibili e non)
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

// ottieni tutte le categorie disponibili
const getAllAvailableCategories = (req, res, next) => {
    Category.find()
    .then(categories => {
        var arrayOfCategories = []
        if(categories) {
            categories.forEach(function (category) {
                if(category.available)
                    arrayOfCategories.push(category) 
            });

            res.json({
                categories: arrayOfCategories
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

// ottieni tutte le categorie non disponibili
const getAllNotAvailableCategories = (req, res, next) => {
    Category.find()
    .then(categories => {
        var arrayOfCategories = []
        if(categories) {
            categories.forEach(function (category) {
                if(!category.available)
                    arrayOfCategories.push(category) 
            });

            res.json({
                categories: arrayOfCategories
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

// inserisci una nuova categoria
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
                if(category.available) {
                    res.json({
                        message: "Esiste già una categoria con questo nome"
                    })
                }
                
                Category.update(category, {available: true, color: color})
                .then(category => {
                    if(category) {
                        res.json({
                            message: "Categoria ri-resa disponibile"
                        })
                    }
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

// ottieni la categoria dal nome
const getCategoryByName = (req, res, next) => {
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
            message: "Errore nella visualizzazione della categoria"
        })
    })
}

// rende non disponibile una categoria
const deleteCategory = (req, res, next) => {
    const { name } = req.params

    Category.findOneAndUpdate({name: name}, {available: false}) 
    .then(category => {
        if(category) {
            res.json({
                message: 'Categoria eliminata (non disponibile)'
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
            message: "Errore nella cancellazione della categoria"
        })
    })
}

// update di una categoria
const updateCategory = (req, res, next) => {
    const { name } = req.params
    const { color } = req.body

    //controllo campi
    if(!name || !color) {
        res.json({
            message: 'Inserisci tutti i campi'
        })
    } 
    else {
        Category.findOneAndUpdate({name: name}, {color: color}) 
        .then(category => {
            if(category) {
                res.json({
                    message: 'Categoria aggiornata'
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
                message: "Errore nell\' aggiornamento della categoria"
            })
        })
    }
}

module.exports = {
    getAllCategories, 
    getAllAvailableCategories, 
    getAllNotAvailableCategories, 
    addNewCategory, 
    getCategoryByName,
    deleteCategory,
    updateCategory
}